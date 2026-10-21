#!/usr/bin/env node
/* Artifact provenance check — does the package metadata bind a *build*, or only a name?
 *
 * Why this exists (filed & done 2026-10-22 04:26, from the LiteLLM 1.107.0 compromise): CLAUDE.md's
 * perishable-claims rules already give one-call checks for version presence (registry JSON) and repo
 * state (GitHub API). Neither answers the question the LiteLLM batch turned on: **is there a
 * machine-readable statement about who built this artifact, and does it name a source revision?**
 *
 * The batch's own primary sources answer it three different ways, and the difference is the lesson:
 *   - PyPI PEP 740 attestations exist and are one call away — litellm publishes **none** (404 on
 *     every file), so an installer had nothing to check.
 *   - A PEP 740 publish attestation binds artifact → **repository + workflow + file digest**, NOT →
 *     git revision. It would not have caught litellm's tag-1.108.0/sdist-1.107.0 mismatch.
 *   - What *did* name the attacker's source was SLSA provenance on the container images
 *     (`source: github.com/Berri-AI/litellm@20535d8f`), read from the registry *after* the fact.
 *     Nobody's pipeline read it before pulling.
 * So the tool reports the two things separately: **who attests** (publisher identity) and **what
 * revision** (gitCommit, npm SLSA v1 only). "Attested" without a revision is a weaker claim than the
 * word suggests, and the output says so rather than printing a green check.
 *
 * Usage:
 *   node agent/tools/artifact-provenance.mjs --pypi cryptography,litellm
 *   node agent/tools/artifact-provenance.mjs --npm vite,@anthropic-ai/claude-code
 *   node agent/tools/artifact-provenance.mjs --file watchlist.txt      # lines: pypi:<pkg> / npm:<pkg>
 *   node agent/tools/artifact-provenance.mjs --file watchlist.txt --census
 *   node agent/tools/artifact-provenance.mjs --pypi litellm --json
 *
 * Classes (one per package):
 *   attested        every file carries a provenance bundle that names a publisher
 *   partial         some files attested, some not (usually platform wheels vs sdist)
 *   unsigned        artifacts published, zero attestation — nothing for a gate to read
 *   unattestable    the registry itself has no provenance for this file (PyPI pre-2024 uploads)
 *   error           registry refused / version absent (version-presence claims: check upstream)
 *
 * No auth needed. PyPI: 1 project call + 1 call per file (files capped; use --max-files).
 */
import fs from 'node:fs';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const has = f => args.includes(f);

const PYPI = argOf('--pypi');
const NPM = argOf('--npm');
const FILE = argOf('--file');
const JSON_OUT = has('--json');
const CENSUS = has('--census');
const MAX_FILES = Number(argOf('--max-files', '12'));

const UA = { 'user-agent': 'trending-md-provenance/1.0 (+https://trending.md/en/sources/)' };

/* ── PyPI (PEP 740) ─────────────────────────────────────────────────────────────────────────────
   The Integrity API is the only surface that carries attestations; the legacy /pypi/<pkg>/json
   `provenance` field reads null for *every* file, including ones that have a bundle — so a check
   written against the JSON API silently reports "unsigned" for signed projects. Calibrated
   2026-10-22: cryptography 50.0.2 → JSON `provenance: null`, Integrity API → publisher
   `pyca/cryptography` + `pypi-publish.yml`. Use the Integrity endpoint, not the JSON field. */
async function pypiOne(pkg) {
  const r = { eco: 'pypi', pkg, version: null, files: 0, attested: 0, publisher: null, revision: null, cls: 'error', note: '' };
  let meta;
  try {
    const res = await fetch(`https://pypi.org/pypi/${encodeURIComponent(pkg)}/json`, { headers: UA });
    if (!res.ok) { r.note = `pypi ${res.status}`; return r; }
    meta = await res.json();
  } catch (e) { r.note = `fetch ${e.message}`; return r; }
  r.version = meta?.info?.version ?? null;
  const files = meta?.releases?.[r.version] ?? [];
  r.files = files.length;
  if (!files.length) { r.note = 'no files for latest version (yanked/deleted?)'; r.cls = 'error'; return r; }
  const probe = files.slice(0, MAX_FILES);
  const pubs = new Map();
  for (const f of probe) {
    const url = `https://pypi.org/integrity/${encodeURIComponent(pkg)}/${encodeURIComponent(r.version)}/${encodeURIComponent(f.filename)}/provenance`;
    try {
      const res = await fetch(url, { headers: UA });
      if (res.status === 404) continue;
      if (!res.ok) continue;
      const body = await res.json();
      r.attested++;
      for (const b of body.attestation_bundles ?? []) {
        const p = b.publisher ?? {};
        const key = `${p.kind ?? '?'}:${p.repository ?? '?'}:${p.workflow ?? '?'}`;
        pubs.set(key, (pubs.get(key) ?? 0) + 1);
      }
    } catch { /* a single failing file should not sink the package */ }
  }
  if (pubs.size === 1) r.publisher = [...pubs.keys()][0];
  else if (pubs.size > 1) r.publisher = [...pubs.keys()].sort().join(' | ');
  if (r.attested === probe.length) r.cls = 'attested';
  else if (r.attested > 0) r.cls = 'partial';
  else r.cls = 'unsigned';
  if (probe.length < files.length) r.note = `probed ${probe.length}/${files.length} files`;
  // PEP 740 publish attestations carry repository+workflow+publish predicate only — never a commit.
  if (r.attested > 0) r.revision = 'none (publish attestation binds repo+workflow+digest)';
  return r;
}

/* ── npm ────────────────────────────────────────────────────────────────────────────────────────
   npm is the stronger of the two: a `slsa.dev/provenance/v1` bundle carries
   `resolvedDependencies[].digest.gitCommit` and `runDetails.builder.id`, so an artifact can be tied
   to a revision. The publish attestation bundle (npm/attestation spec) carries the publisher only. */
async function npmOne(pkg) {
  const r = { eco: 'npm', pkg, version: null, files: 1, attested: 0, publisher: null, revision: null, cls: 'error', note: '' };
  let doc;
  try {
    const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg).replace(/%40/g, '@')}`, { headers: UA });
    if (!res.ok) { r.note = `npm ${res.status}`; return r; }
    doc = await res.json();
  } catch (e) { r.note = `fetch ${e.message}`; return r; }
  r.version = doc?.['dist-tags']?.latest ?? null;
  const dist = doc?.versions?.[r.version]?.dist ?? {};
  if (!dist.attestations) { r.cls = 'unsigned'; r.note = dist.signatures ? 'npm signature, no attestation' : ''; return r; }
  try {
    const res = await fetch(dist.attestations.url, { headers: UA });
    if (!res.ok) { r.note = `attestations ${res.status}`; return r; }
    const body = await res.json();
    r.attested = 1;
    const types = [];
    for (const b of body.attestations ?? []) {
      types.push(b.predicateType ?? '?');
      if (b.predicateType !== 'https://slsa.dev/provenance/v1') continue;
      const st = decodeDssE(b.bundle?.dsseEnvelope?.payload);
      const pred = st?.predicate ?? {};
      const ep = pred.buildDefinition?.externalParameters ?? {};
      const wf = ep.workflow ?? {};
      if (wf.repository) r.publisher = `${wf.repository}${wf.path ? ' · ' + wf.path : ''}`;
      const dep = (pred.buildDefinition?.resolvedDependencies ?? []).find(d => d?.digest?.gitCommit);
      if (dep) r.revision = `${dep.uri ?? '?'}@${dep.digest.gitCommit}`;
      const builder = pred.runDetails?.builder?.id;
      if (builder) r.note = `builder ${builder}`;
    }
    r.cls = 'attested';
    if (r.revision) r.revision = r.revision.replace(/^git\+/, '');
    else r.revision = 'unbound (no gitCommit in resolvedDependencies)';
    if (!r.publisher && types.length) r.note = `predicates: ${types.join(', ')}`;
  } catch (e) { r.note = `attestations ${e.message}`; }
  return r;
}

function decodeDssE(payloadB64) {
  if (!payloadB64) return null;
  try { return JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8')); } catch { return null; }
}

function pairsFromArgs() {
  const out = [];
  const add = (spec, eco) => String(spec).split(',').map(s => s.trim()).filter(Boolean).forEach(pkg => out.push({ eco, pkg }));
  if (PYPI) add(PYPI, 'pypi');
  if (NPM) add(NPM, 'npm');
  if (FILE) {
    const raw = fs.readFileSync(FILE, 'utf8');
    let lines;
    if (raw.trimStart().startsWith('{')) {
      // JSON manifest: { "watch": ["pypi:litellm", "npm:vite", ...] } — repeatable censuses
      // should not depend on a hand-kept text file drifting from the registry.
      const m = JSON.parse(raw);
      lines = (m.watch ?? []).map(String);
    } else {
      lines = raw.split('\n').map(l => l.replace(/#.*/, '').trim()).filter(Boolean);
    }
    for (const l of lines) {
      const m = l.match(/^(pypi|npm):\s*(\S+)$/);
      if (m) out.push({ eco: m[1], pkg: m[2] });
      else out.push({ eco: 'pypi', pkg: l }); // bare name defaults to PyPI
    }
  }
  return out;
}

const pairs = pairsFromArgs();
if (!pairs.length) {
  console.error('usage: node agent/tools/artifact-provenance.mjs --pypi <a,b> | --npm <a,@b/c> | --file <list> [--census] [--json]');
  process.exit(2);
}

const results = [];
for (const p of pairs) {
  const r = p.eco === 'npm' ? await npmOne(p.pkg) : await pypiOne(p.pkg);
  results.push(r);
  if (!JSON_OUT && !CENSUS) {
    const perFile = r.eco === 'pypi' ? ` files ${r.attested}/${r.files}` : '';
    console.log(`${r.cls.padEnd(12)} ${r.eco}:${r.pkg}@${r.version ?? '?'}${perFile}`);
    if (r.publisher) console.log(`             publisher : ${r.publisher}`);
    if (r.revision) console.log(`             revision  : ${r.revision}`);
    if (r.note) console.log(`             note      : ${r.note}`);
  }
}

if (CENSUS) {
  const by = eco => results.filter(r => r.eco === eco);
  const tally = cls => results.filter(r => r.cls === cls).length;
  console.log(`\ncensus — ${results.length} packages`);
  for (const eco of ['pypi', 'npm']) {
    const rows = by(eco);
    if (!rows.length) continue;
    const n = c => rows.filter(r => r.cls === c).length;
    console.log(`  ${eco.padEnd(5)} attested ${n('attested')}  partial ${n('partial')}  unsigned ${n('unsigned')}  error ${n('error')}  (n=${rows.length})`);
  }
  const attestedShare = results.filter(r => r.cls === 'attested').length;
  const revisionBound = results.filter(r => r.revision && !/^(none|unbound)/.test(r.revision)).length;
  console.log(`  total attested ${attestedShare}/${results.length} (${Math.round((attestedShare / results.length) * 100)}%), revision-bound ${revisionBound}/${results.length}`);
  console.log(`  -> "attested" is not "revision-bound": only npm SLSA v1 carries a gitCommit; PyPI's publish attestation names repo+workflow only.`);
  const misses = results.filter(r => r.cls === 'unsigned').map(r => `${r.eco}:${r.pkg}@${r.version}`);
  if (misses.length) console.log(`  unsigned: ${misses.join(', ')}`);
}

if (JSON_OUT) console.log(JSON.stringify({ generatedFor: new Date().toISOString(), results }, null, 2));
