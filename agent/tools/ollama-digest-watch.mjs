#!/usr/bin/env node
/**
 * ollama-digest-watch.mjs — is the blob a published audit called broken still the blob the
 * registry serves, and did the at-risk tag class grow?
 *
 * WHY THIS EXISTS. arXiv 2609.05881 ("Broken on Arrival", v3 2026-10-29) screened all 305
 * eligible code-capable GGUF tags across 15 model lines in the official Ollama library and
 * found **7 (2.3%)** solving ≤6 of 164 HumanEval+ tasks — all low-bit (≤3-bit) quantizations
 * of ≤4B models. The actionable fact for this feed is NOT the rate: nobody re-tests a tag a
 * reader is told to download, registries churn, and the interesting number is the MOVEMENT —
 * a tag that was broken and now pulls different bytes is a candidate fix; a tag that pulls
 * different bytes is ALSO a candidate silent re-upload (a digest change alone is ambiguous,
 * and this watch never says "fixed" — only a re-screen can, which is inference-bound and
 * out of scope). Filed as an act-pass agenda item 2026-10-31, answered first-hand 2026-11-16:
 * all seven blobs still byte-identical (full 64-char digest match against the audit's own
 * `census_digests.json`), ~3 months unchanged. This watch makes the NEXT observation free.
 *
 * TWO ARMS, both UNMETERED (registry.ollama.ai + ollama.com; zero api.github.com, zero NVD):
 *   digest arm — GET the manifest for each watched tag, take the model-layer digest (for an
 *     Ollama manifest the layer digest IS the blob's sha256, which is what the audit recorded
 *     as `blob_sha256` — verified byte-for-byte on 2026-11-16), and report only movement:
 *     `unchanged` / `digest-changed` / `tag-gone` (404 — gone, never "fixed").
 *   tags arm — fetch `ollama.com/library/<line>/tags` for the three suspect lines
 *     (llama3.2, phi3.5, qwen2.5-coder), diff against the census's frozen inventory subset
 *     for those lines, and split the unscreened tags into at-risk (≤3-bit instruct-shaped
 *     quantizations of ≤4B models — the paper's failure band, unscreened screen candidates)
 *     vs everything else (higher bits, larger models, base, text, pointer aliases).
 *
 * Verdict vocabulary is deliberately one-sided: this watch can only say MOVE or GROW, never
 * FIXED or SAFE — the same suppression-only direction as every other watch here.
 *
 * Usage:
 *   node agent/tools/ollama-digest-watch.mjs                 # one pass, print movement
 *   node agent/tools/ollama-digest-watch.mjs --watch         # update agent/data/ollama-digest-state.json
 *   node agent/tools/ollama-digest-watch.mjs --json
 *   node agent/tools/ollama-digest-watch.mjs --selftest
 *
 * Cost: 7 manifest GETs + 3 tag pages = 10 unmetered requests per run.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const has = (f) => args.includes(f);

const STORE = argOf('--store', 'agent/data/ollama-digest-state.json');

/**
 * The seven audit-flagged tags with the audit's own recorded blob sha256 (quantcheck
 * `rerun-2026-10/serial/census_digests.json`, CC BY 4.0; verified live 2026-11-16).
 * Paper: https://arxiv.org/abs/2609.05881 — code+data: https://github.com/aditi-p31/quantcheck
 */
export const WATCHED = [
  { tag: 'llama3.2:1b-instruct-q2_K',        census: 'd1ede02a2111e30c0585383c5702933a07f1d6d7cb9e5727ae41d48e3885d1f3' },
  { tag: 'llama3.2:1b-instruct-q3_K_S',      census: '81881dcc12ece016e1aca828677376b0a772cd296aff2b6dd3a8505b5bd9cb31' },
  { tag: 'phi3.5:3.8b-mini-instruct-q2_K',   census: '54d47caa8bf30afce66f6945667b03df2df4deb94711c21d854706481c9c4c4b' },
  { tag: 'qwen2.5-coder:3b-instruct-q2_K',   census: '14c4247b8ce438992cf4fb41d5461ff9d3730a561345c47a224d21ea90f8545e' },
  { tag: 'qwen2.5-coder:3b-instruct-q3_K_L', census: '7a88dc11faae61e335bc9993f57f056a63eeb9d82b76ea6a8021f5657365d7c2' },
  { tag: 'qwen2.5-coder:3b-instruct-q3_K_M', census: '9bb5d28b842a91987a4d0c9a0616a69a3f031bcf535817c1f901639d1949a2ab' },
  { tag: 'qwen2.5-coder:3b-instruct-q3_K_S', census: '81d167af7fa3dc4e7eb361fc6df220638eb0f0783c49d317f5c4a3f8f94380d9' },
];

/** The census's own tag sets for the three suspect lines (from inventory_candidates.json,
 *  generated 2026-08-10 — the screened universe for these lines, `channel: ollama-official`).
 *  Tags beyond these sets are UNSCREENED — that conflates "added after the snapshot" with
 *  "outside the census's scope" (the census screened no qwen2.5-coder 32b line at all, and no
 *  7b/14b fp16/q4_1/q5_0/q5_1), so the diff is reported as unscreened, never as "new since
 *  August". The at-risk split is the part that matters: a ≤3-bit instruct-shaped tag outside
 *  the screened set is an unscreened screen candidate either way. */
export const CENSUS_LINES = {
  'llama3.2': ["1b-instruct-fp16","1b-instruct-q2_K","1b-instruct-q3_K_L","1b-instruct-q3_K_M","1b-instruct-q3_K_S","1b-instruct-q4_0","1b-instruct-q4_K_M","1b-instruct-q4_K_S","1b-instruct-q5_K_M","1b-instruct-q5_K_S","1b-instruct-q6_K","1b-instruct-q8_0","3b-instruct-fp16","3b-instruct-q2_K","3b-instruct-q3_K_L","3b-instruct-q3_K_M","3b-instruct-q3_K_S","3b-instruct-q4_0","3b-instruct-q4_K_M","3b-instruct-q4_K_S","3b-instruct-q5_K_M","3b-instruct-q5_K_S","3b-instruct-q6_K","3b-instruct-q8_0"],
  'phi3.5': ["3.8b-mini-instruct-fp16","3.8b-mini-instruct-q2_K","3.8b-mini-instruct-q3_K_L","3.8b-mini-instruct-q3_K_M","3.8b-mini-instruct-q3_K_S","3.8b-mini-instruct-q4_0","3.8b-mini-instruct-q4_K_M","3.8b-mini-instruct-q4_K_S","3.8b-mini-instruct-q5_K_M","3.8b-mini-instruct-q5_K_S","3.8b-mini-instruct-q6_K","3.8b-mini-instruct-q8_0"],
  'qwen2.5-coder': ["0.5b-instruct-fp16","0.5b-instruct-q2_K","0.5b-instruct-q3_K_L","0.5b-instruct-q3_K_M","0.5b-instruct-q3_K_S","0.5b-instruct-q4_0","0.5b-instruct-q4_K_M","0.5b-instruct-q4_K_S","0.5b-instruct-q5_K_M","0.5b-instruct-q5_K_S","0.5b-instruct-q6_K","0.5b-instruct-q8_0","1.5b-instruct-fp16","1.5b-instruct-q2_K","1.5b-instruct-q3_K_L","1.5b-instruct-q3_K_M","1.5b-instruct-q3_K_S","1.5b-instruct-q4_0","1.5b-instruct-q4_K_M","1.5b-instruct-q4_K_S","1.5b-instruct-q5_K_M","1.5b-instruct-q5_K_S","1.5b-instruct-q6_K","1.5b-instruct-q8_0","14b-instruct-q2_K","14b-instruct-q3_K_L","14b-instruct-q3_K_M","14b-instruct-q3_K_S","3b-instruct-fp16","3b-instruct-q2_K","3b-instruct-q3_K_L","3b-instruct-q3_K_M","3b-instruct-q3_K_S","3b-instruct-q4_0","3b-instruct-q4_K_M","3b-instruct-q4_K_S","3b-instruct-q5_K_M","3b-instruct-q5_K_S","3b-instruct-q6_K","3b-instruct-q8_0","7b-instruct-q2_K","7b-instruct-q3_K_L","7b-instruct-q3_K_M","7b-instruct-q3_K_S","7b-instruct-q4_0","7b-instruct-q4_K_M","7b-instruct-q4_K_S","7b-instruct-q5_K_M","7b-instruct-q5_K_S","7b-instruct-q6_K"],
};

/** The at-risk class the paper names: low-bit (≤3-bit) quantizations of models with AT MOST
 *  FOUR BILLION parameters — both axes, because the same levels are fine on smaller lines
 *  (the paper's G1 test: qwen 0.5b/1.5b score 9–15/15 where 3b scores 0). A NEW tag whose
 *  suffix parses into the class is an unscreened screen candidate; an unparseable size falls
 *  back to the bit axis alone and is flagged, because an unknown size is not a known-safe one. */
const LOW_BIT = /^(q2_K|q3_K_S|q3_K_M|q3_K_L)$/;
const ALIAS_LIKE = /^(latest|[0-9.]+[a-z]?|.*-(fp16|q8_0))$/;
const MAX_AT_RISK_B = 4;

export function quantSuffixOf(tag) {
  const i = tag.indexOf(':');
  if (i === -1) return null;
  return tag.slice(i + 1);
}

export function paramsBOf(suffix) {
  const m = suffix.match(/^([0-9.]+)b/);
  return m ? parseFloat(m[1]) : null;
}

/** Classify a NEW tag found on a suspect line. `at-risk` = a ≤3-bit instruct-shaped quant of
 *  a ≤4B model that the census never screened; `other` = anything else (higher bits, larger
 *  models, base, text, alias). */
export function classifyNewTag(tag) {
  const s = quantSuffixOf(tag);
  if (!s) return 'other';
  if (ALIAS_LIKE.test(s)) return 'other';
  if (s.includes('-base') || s.includes('-text')) return 'other';
  const last = s.split('-').pop();
  if (!LOW_BIT.test(last)) return 'other';
  const b = paramsBOf(s);
  return b === null || b <= MAX_AT_RISK_B ? 'at-risk' : 'other';
}

export function fetchJson(url) {
  const out = execFileSync('curl', ['-sS', '--max-time', '30', url], { maxBuffer: 20 * 1024 * 1024 }).toString();
  return JSON.parse(out);
}

function modelDigest(manifest) {
  const layer = (manifest.layers || []).find((l) => l.mediaType === 'application/vnd.ollama.image.model');
  return layer ? layer.digest : null;
}

/** Digest arm: one manifest GET per watched tag. Verdicts: unchanged / digest-changed /
 *  tag-gone / unreadable (never "fixed" — a changed digest is ambiguous by itself). */
export async function checkDigests(baseline) {
  const rows = [];
  for (const w of baseline) {
    const [model, ref] = w.tag.split(':');
    let entry;
    try {
      const res = execFileSync('curl', ['-sS', '--max-time', '30', '-w', '\n%{http_code}',
        `https://registry.ollama.ai/v2/library/${model}/manifests/${ref}`], { maxBuffer: 20 * 1024 * 1024 }).toString();
      const nl = res.lastIndexOf('\n');
      const code = res.slice(nl + 1).trim();
      const body = res.slice(0, nl);
      if (code === '404') {
        entry = { tag: w.tag, verdict: 'tag-gone', live: null, census: w.census };
      } else if (code !== '200') {
        entry = { tag: w.tag, verdict: 'unreadable', live: null, census: w.census, http: code };
      } else {
        const live = modelDigest(JSON.parse(body));
        const verdict = !live ? 'unreadable' : live === `sha256:${w.census}` ? 'unchanged' : 'digest-changed';
        entry = { tag: w.tag, verdict, live, census: w.census };
      }
    } catch {
      entry = { tag: w.tag, verdict: 'unreadable', live: null, census: w.census };
    }
    rows.push(entry);
  }
  return rows;
}

/** Tags arm: the current tag list for one line, diffed against the census set. Returns
 *  { live, new: [{tag, class}] } — `at-risk` first, because that is the class that grew.
 *  Alias-like tags (`latest`, bare size aliases, and — for DIFF purposes only — fp16/q8_0
 *  suffix tags) are pointer tags naming blobs the screened universe already carries under
 *  explicit tags, not separate artifacts, so they are dropped rather than reported. */
export function diffLine(line, censusTags, html) {
  const tags = [...new Set((html.match(/href="\/library\/([a-z0-9.\-]+:[a-zA-Z0-9_\-.]+)"/g) || [])
    .map((m) => m.replace(/href="\/library\//, '').replace(/"$/, '')))];
  const known = new Set(censusTags.map((t) => `${line}:${t}`));
  const fresh = tags.filter((t) => {
    if (known.has(t)) return false;
    const s = quantSuffixOf(t);
    return s ? !/^(latest|[0-9.]+[a-z]?|.*-(fp16|q8_0))$/.test(s) : true;
  }).sort();
  const classified = fresh.map((t) => ({ tag: t, cls: classifyNewTag(t) }));
  classified.sort((a, b) => (a.cls === b.cls ? a.tag.localeCompare(b.tag) : a.cls === 'at-risk' ? -1 : 1));
  return { line, live: tags.length, new: classified };
}

// ── selftest ────────────────────────────────────────────────────────────────────
function selftest() {
  let n = 0, failed = 0;
  const t = (name, cond) => { n++; if (!cond) { failed++; console.error(`FAIL: ${name}`); process.exitCode = 1; } };
  t('WATCHED has 7 rows', WATCHED.length === 7);
  t('every census digest is 64 hex chars', WATCHED.every((w) => /^[0-9a-f]{64}$/.test(w.census)));
  t('every watched tag is ≤3-bit instruct-shaped', WATCHED.every((w) => classifyNewTag(w.tag) === 'at-risk'));
  t('q2_K is at-risk', classifyNewTag('llama3.2:1b-instruct-q2_K') === 'at-risk');
  t('q3_K_L is at-risk', classifyNewTag('m:3b-instruct-q3_K_L') === 'at-risk');
  t('32b q2_K is NOT at-risk (size axis)', classifyNewTag('m:32b-instruct-q2_K') === 'other');
  t('14b q3_K_M is NOT at-risk (size axis)', classifyNewTag('m:14b-instruct-q3_K_M') === 'other');
  t('unknown size falls back to bit axis', classifyNewTag('m:mini-instruct-q2_K') === 'at-risk');
  t('paramsBOf parses 0.5b', paramsBOf('0.5b-instruct-q2_K') === 0.5);
  t('paramsBOf parses 32b', paramsBOf('32b-instruct-q2_K') === 32);
  t('paramsBOf null without size', paramsBOf('mini-instruct-q2_K') === null);
  t('q4_K_M is not', classifyNewTag('m:1b-instruct-q4_K_M') === 'other');
  t('q5_0 is not', classifyNewTag('m:1b-instruct-q5_0') === 'other');
  t('fp16 is not', classifyNewTag('m:1b-instruct-fp16') === 'other');
  t('q8_0 is not (alias-like)', classifyNewTag('m:1b-instruct-q8_0') === 'other');
  t('latest alias is not', classifyNewTag('m:latest') === 'other');
  t('bare size alias is not', classifyNewTag('m:1b') === 'other');
  t('base variant is not', classifyNewTag('m:0.5b-base-q2_K') === 'other');
  t('text variant is not', classifyNewTag('m:1b-text-q2_K') === 'other');
  t('quantSuffixOf splits on first colon', quantSuffixOf('a:b:c') === 'b:c');
  t('quantSuffixOf null without colon', quantSuffixOf('nocolon') === null);
  const diff = diffLine('llama3.2', CENSUS_LINES['llama3.2'],
    '<a href="/library/llama3.2:1b-instruct-q2_K">x</a> <a href="/library/llama3.2:9b-instruct-q2_K">y</a> <a href="/library/llama3.2:2b-instruct-q2_K">w</a> <a href="/library/llama3.2:latest">z</a>');
  t('diffLine finds the unscreened tags', diff.new.some((x) => x.tag === 'llama3.2:9b-instruct-q2_K') && diff.new.some((x) => x.tag === 'llama3.2:2b-instruct-q2_K'));
  t('diffLine classes the ≤4b q2_K variant at-risk', diff.new.find((x) => x.tag === 'llama3.2:2b-instruct-q2_K').cls === 'at-risk');
  t('diffLine classes the 9b q2_K variant other', diff.new.find((x) => x.tag === 'llama3.2:9b-instruct-q2_K').cls === 'other');
  t('diffLine sorts at-risk first', diff.new[0].cls === 'at-risk');
  t('diffLine drops the census tag', !diff.new.some((x) => x.tag === 'llama3.2:1b-instruct-q2_K'));
  t('diffLine drops the alias', !diff.new.some((x) => x.tag === 'llama3.2:latest'));
  t('diffLine dedupes', diff.new.length === 2);
  console.log(failed === 0 ? `selftest: ${n}/${n} pass` : `selftest: ${n - failed}/${n} pass (${failed} FAIL)`);
}

if (has('--selftest')) { selftest(); process.exit(process.exitCode || 0); }

// ── main ────────────────────────────────────────────────────────────────────────
const now = new Date().toISOString();
const state = existsSync(STORE) ? JSON.parse(readFileSync(STORE, 'utf8')) : { updated: null, rows: {}, tags: {} };
const digests = await checkDigests(WATCHED);
const moved = digests.filter((r) => r.verdict === 'digest-changed' || r.verdict === 'tag-gone');
const unreadable = digests.filter((r) => r.verdict === 'unreadable');

const lineDiffs = [];
for (const [line, censusTags] of Object.entries(CENSUS_LINES)) {
  if (!censusTags.length) continue;
  try {
    const html = execFileSync('curl', ['-sS', '--max-time', '30', `https://ollama.com/library/${line}/tags`],
      { maxBuffer: 20 * 1024 * 1024 }).toString();
    lineDiffs.push(diffLine(line, censusTags, html));
  } catch { lineDiffs.push({ line, live: null, new: [], error: 'unreadable' }); }
}
const atRisk = lineDiffs.flatMap((d) => d.new.filter((x) => x.cls === 'at-risk').map((x) => `${d.line} → ${x.tag}`));

if (has('--watch')) {
  for (const r of digests) {
    const prev = state.rows[r.tag];
    if (!prev) {
      state.rows[r.tag] = { digest: r.live, census: r.census, first_seen: now, history: [] };
    } else if (prev.digest !== r.live) {
      prev.history.push({ at: now, from: prev.digest, to: r.live, verdict: r.verdict });
      prev.digest = r.live;
    }
  }
  for (const d of lineDiffs) {
    const names = d.new.map((x) => x.tag);
    const prev = state.tags[d.line] || { seen: [], history: [] };
    const fresh = names.filter((n) => !prev.seen.includes(n));
    if (fresh.length) prev.history.push({ at: now, new: fresh });
    prev.seen = names; prev.last_live = d.live;
    state.tags[d.line] = prev;
  }
  state.updated = now;
  writeFileSync(STORE, JSON.stringify(state, null, 1) + '\n');
}

if (has('--json')) {
  console.log(JSON.stringify({ generated: now, digests, lineDiffs, moved: moved.length, at_risk_new: atRisk }, null, 1));
} else {
  console.log(`ollama-digest-watch ${now}`);
  console.log(`  digest arm: ${digests.length - moved.length - unreadable.length} unchanged, ${moved.length} moved/gone, ${unreadable.length} unreadable`);
  for (const r of moved) console.log(`  ⚠ ${r.tag}: ${r.verdict} (census ${r.census.slice(0, 12)}…, live ${r.live ? r.live.slice(7, 19) + '…' : 'null'})`);
  console.log(`  tags arm: ${lineDiffs.map((d) => `${d.line} ${d.live ?? '?'} tags/${d.new.length} new`).join(' · ')}`);
  console.log(`  at-risk new (unscreened ≤3-bit instruct): ${atRisk.length ? atRisk.join(', ') : 'none'}`);
  console.log(`  note: digest-changed is ambiguous (fix or silent re-upload) — only a re-screen decides, which is inference-bound`);
}
