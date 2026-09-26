#!/usr/bin/env node
// disclosure-watch.mjs — standing watch for pending security disclosures whose *absence* is
// currently the data point. Opened 2026-09-02: OpenAI's "Path to Astra" post self-designates
// Astra "Critical" and names two zero-days the model discovered and chained during evals with
// "disclosure in progress" — the externally checkable claim of an otherwise self-graded report.
// openai.com 403s a plain fetch (Cloudflare), so the post itself can't be fingerprinted; the
// watch instead looks where a disclosure lands:
//   1. NVD keyword search (services.nvd.nist.gov, no key, 5 req/30s) filtered to CVEs published
//      since the post — a Chrome/V8/OS CVE crediting OpenAI is the canonical landing.
//   2. Hacker News (Algolia search_by_date API) — an independent writeup surfaces as a new story.
// Same close-out as the MCP-drift, evidence-tier and release watches: a best-effort standing tool
// wired into agent-run.sh, so the disclosure surfaces itself in the run log instead of costing a
// per-run manual web check whose "no disclosure yet" slowly becomes an unnoticed null.
//
//   node agent/tools/disclosure-watch.mjs --manifest agent/tools/disclosure-watch.json \
//        --state agent/data/disclosure-watch.json
//
// Behavior: for each watch item, query both channels and print ONLY new hits vs the state file
// (first run seeds the baseline). A run with no new hits prints a one-line null — a null is a data
// point, not an error. Exits non-zero only when every channel fetch fails, which callers treat as
// non-fatal.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : null;
};
const manifestPath = arg('manifest') ?? 'agent/tools/disclosure-watch.json';
const statePath = arg('state') ?? 'agent/data/disclosure-watch.json';

let state = { items: {}, runs: 0, first_run: null, last_run: null };
try { state = { ...state, ...JSON.parse(readFileSync(statePath, 'utf8')) }; } catch { /* first run */ }

const get = async (url) => {
  const res = await fetch(url, { headers: { 'user-agent': 'trending-md-disclosure-watch/1.0' }, signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`${res.status} ${url.slice(0, 80)}`);
  return res.json();
};

// NVD requires the pub window to be ≤ 120 days; clamp the item's `since` accordingly.
const clampSince = (iso) => {
  const min = Date.now() - 119 * 24 * 3600 * 1000;
  const t = Math.max(Date.parse(iso) || 0, min);
  return new Date(t).toISOString().replace('Z', '.000').slice(0, 23);
};

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const now = new Date().toISOString();
const changes = [];
const errors = [];

for (const item of manifest.watch) {
  const prev = state.items[item.id] ?? { nvd_seen: [], hn_seen: [], hf_seen: [], osv_seen: [], npm_seen: [] };
  const observed = { nvd_seen: [...prev.nvd_seen], hn_seen: [...prev.hn_seen], hf_seen: [...(prev.hf_seen ?? [])], osv_seen: [...(prev.osv_seen ?? [])], npm_seen: [...(prev.npm_seen ?? [])] };

  // 1. NVD keyword search since the post date.
  for (const kw of item.nvd_keywords ?? []) {
    try {
      const url = 'https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=' +
        encodeURIComponent(kw) +
        `&pubStartDate=${encodeURIComponent(clampSince(item.nvd_since ?? now))}` +
        `&pubEndDate=${encodeURIComponent(new Date().toISOString().replace('Z', '.000').slice(0, 23))}` +
        '&resultsPerPage=50';
      const d = await get(url);
      for (const v of d.vulnerabilities ?? []) {
        const cve = v.cve.id;
        if (observed.nvd_seen.includes(cve)) continue;
        const desc = (v.cve.descriptions ?? []).find((x) => x.lang === 'en')?.value ?? '';
        if (prev.nvd_seen.length) { // seed run records silently; later runs announce
          changes.push(`${item.id} NVD: ${cve} — ${desc.slice(0, 140)}`);
        }
        observed.nvd_seen.push(cve);
      }
      await new Promise((r) => setTimeout(r, 1000)); // stay under the no-key rate limit
    } catch (err) {
      errors.push(`${item.id}/nvd/${kw}: ${String(err.message || err).split('\n')[0]}`);
    }
  }

  // 2. Hacker News stories matching the item's title fingerprint.
  if (item.hn_query) {
    try {
      const sinceEpoch = Math.floor((Date.parse(item.nvd_since ?? now) || Date.now()) / 1000);
      const url = 'https://hn.algolia.com/api/v1/search_by_date?query=' + encodeURIComponent(item.hn_query) +
        '&tags=story&hitsPerPage=50&numericFilters=created_at_i%3E' + sinceEpoch;
      const d = await get(url);
      const re = new RegExp(item.hn_title_regex ?? '', 'i');
      for (const h of d.hits ?? []) {
        const title = h.title ?? '';
        if (!re.test(title)) continue;
        if (observed.hn_seen.includes(h.objectID)) continue;
        if (prev.hn_seen.length) {
          changes.push(`${item.id} HN: "${title}" https://news.ycombinator.com/item?id=${h.objectID} (${h.points ?? 0} pts)`);
        }
        observed.hn_seen.push(h.objectID);
      }
    } catch (err) {
      errors.push(`${item.id}/hn: ${String(err.message || err).split('\n')[0]}`);
    }
  }

  // 3. Hugging Face org catalog — a new model ID in a watched org (e.g. the MiniMax M3 Pro
  //    rumor: the release lands in the org's HF catalog before/with any HN story, and the
  //    release name need not match the rumor's, so an absent hf_model_regex watches ALL new
  //    models — quiet orgs make that low-noise).
  if (item.hf_org) {
    try {
      const url = 'https://huggingface.co/api/models?author=' + encodeURIComponent(item.hf_org) +
        '&sort=lastModified&direction=-1&limit=50';
      const d = await get(url);
      const re = item.hf_model_regex ? new RegExp(item.hf_model_regex, 'i') : null;
      for (const m of Array.isArray(d) ? d : []) {
        const id = m.id ?? m.modelId;
        if (!id) continue;
        if (re && !re.test(id)) continue;
        if (observed.hf_seen.includes(id)) continue;
        if ((prev.hf_seen ?? []).length) {
          changes.push(`${item.id} HF: ${id} (lastModified ${m.lastModified ?? '?'}) https://huggingface.co/${id}`);
        }
        observed.hf_seen.push(id);
      }
    } catch (err) {
      errors.push(`${item.id}/hf: ${String(err.message || err).split('\n')[0]}`);
    }
  }

  // 4. OSV / GitHub Security Advisory — watches a specific package whose *advisory absence* is
  //    the current data point (the GHAPPIER lesson, 2026-09-26: @dforge-core/dforge-mcp shipped
  //    a backdoored version with valid provenance and 17 days later still had zero GHSA/OSV
  //    entries — "no advisory" is perishable exactly like "no CVSS", so it gets a channel, not a
  //    memory. A new vuln id fires once, then joins the baseline.
  if (item.osv_package) {
    try {
      const res = await fetch('https://api.osv.dev/v1/query', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'user-agent': 'trending-md-disclosure-watch/1.0' },
        body: JSON.stringify({ package: { name: item.osv_package, ecosystem: item.osv_ecosystem ?? 'npm' } }),
        signal: AbortSignal.timeout(30_000),
      });
      if (!res.ok) throw new Error(`${res.status} api.osv.dev`);
      const d = await res.json();
      for (const v of d.vulns ?? []) {
        const id = v.id;
        if (!id || observed.osv_seen.includes(id)) continue;
        if ((prev.osv_seen ?? []).length) {
          const summary = (v.summary ?? v.details ?? '').replace(/\s+/g, ' ').slice(0, 140);
          changes.push(`${item.id} OSV: ${id} — ${summary} https://osv.dev/vulnerability/${id}`);
        }
        observed.osv_seen.push(id);
      }
    } catch (err) {
      errors.push(`${item.id}/osv: ${String(err.message || err).split('\n')[0]}`);
    }
  }

  // 5. npm registry packument state — watches a package whose *version-presence* is the
  //    current data point (GHAPPIER follow-up, 2026-09-26 13:04: the backdoored 0.2.21 of
  //    @dforge-core/dforge-mcp was unpublished by someone still unknown; "unpublished" and
  //    "publishing stopped" are perishable exactly like "no advisory"). One packument GET:
  //    a NEW version fires (publishing resumed — possibly another campaign), and a version
  //    listed in `npm_absent_versions` reappearing fires as REPUBLISHED (the registry has no
  //    republish guard, so an unpublished backdoored tarball can legally come back).
  if (item.npm_package) {
    try {
      const url = 'https://registry.npmjs.org/' + encodeURIComponent(item.npm_package);
      const d = await get(url);
      const versions = Object.keys(d.versions ?? {});
      const latest = d['dist-tags']?.latest ?? '?';
      const absent = item.npm_absent_versions ?? [];
      for (const v of versions) {
        if (observed.npm_seen.includes(v)) continue;
        if ((prev.npm_seen ?? []).length) {
          if (absent.includes(v)) {
            changes.push(`${item.id} npm: ${v} REPUBLISHED — was unpublished, latest is now ${latest} https://www.npmjs.com/package/${item.npm_package}`);
          } else {
            changes.push(`${item.id} npm: new version ${v} (latest ${latest}) https://www.npmjs.com/package/${item.npm_package}`);
          }
        }
        observed.npm_seen.push(v);
      }
    } catch (err) {
      errors.push(`${item.id}/npm: ${String(err.message || err).split('\n')[0]}`);
    }
  }

  observed.nvd_seen.sort();
  observed.hn_seen.sort();
  observed.hf_seen.sort();
  observed.osv_seen.sort();
  observed.npm_seen.sort();
  observed.checked = now;
  state.items[item.id] = observed;
}

state.runs += 1;
state.last_run = now;
if (!state.first_run) state.first_run = now;
mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

if (errors.length && errors.length >= (manifest.watch.length)) {
  console.error(`disclosure-watch: all channel fetches failed: ${errors.join('; ')}`);
  process.exit(1);
}
if (errors.length) console.error(`disclosure-watch: ${errors.length} partial failure(s): ${errors.join('; ')}`);
if (changes.length === 0) {
  const watched = manifest.watch.map((w) => w.id).join(', ');
  console.log(`disclosure-watch: null — no disclosure landed for [${watched}] (run #${state.runs})`);
} else {
  console.log(`disclosure-watch: ${changes.length} new hit(s) (run #${state.runs}):`);
  for (const c of changes) console.log(`  ${c}`);
}
