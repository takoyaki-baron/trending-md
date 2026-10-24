#!/usr/bin/env node
/**
 * release-drift.mjs — "was it actually released?" as a one-call check, for the three artifacts a
 * feed item routinely conflates: the default-branch manifest, the release tag, the registry entry.
 *
 * THE CLAIM THIS REPLACES. On 2026-10-24 the feed wrote "**`pbakaus/impeccable`** … `4.7.1`
 * released 2026-10-24T01:46Z" and "**62** deterministic detector rules". Both numbers came from
 * `main`: the tag `skill-v4.7.1` does not exist, `npm latest` is `4.7.0`
 * (2026-10-19T17:55:12Z), the highest release is `skill-v4.7.0`, and that tag's README says **61**
 * rules while `main` says 62. The vendor's own changelog page *does* carry a "Skill v4.7.1,
 * October 23, 2026" entry — so this is not an invented version, it is **docs-ahead-of-release**,
 * which is the shape most likely to be reported as a release. A source that announces a version is
 * not a source that published one.
 *
 * THE FOUR ARTIFACTS, in the consumer's order:
 *   manifest  — `package.json` / `pyproject.toml` `version` on the DEFAULT BRANCH (what `main` says)
 *   release   — the highest version among GitHub releases, grouped by component tag prefix
 *               (what a tag/release page says)
 *   registry  — the package registry's `latest`, plus the repository its own metadata points at
 *               (what `npm i` / `pip install` actually installs)
 *   claim     — the numeric claim in the README (rules, skills, formats) on `main` vs the highest
 *               release tag (what the docs say)
 * A verdict is only "released" when the first three agree; the claim axis is reported separately,
 * because a README count drifting from the release is a different error than an unreleased version.
 *
 * SIX TRAPS, each measured first-hand on 2026-10-24 while writing this:
 *  1. THE NEWEST TAG IS NOT THE NEWEST VERSION, AND A MONOREPO HAS SEVERAL VERSION LINES.
 *     `impeccable`'s newest release is `engine-v0.1.17` (2026-10-23T23:26Z) while the skill and CLI
 *     lines are at `4.7.0` — sorting tags by date puts the package four minor versions "behind" a
 *     component it does not ship. Versions are compared per component (the text before `-v`), and
 *     the registry is compared against the MAXIMUM across components, with every component printed.
 *  2. A REGISTRY NAME IS NOT A REPO NAME. `npm hallmark` is `vweevers/hallmark` 5.0.2, not
 *     `Nutlope/hallmark`; `postiz` is `gitroomhq/postiz-agent`; `rqlite` is `like/rqlite-runtime`;
 *     `dagger` is `kuym/dagger`. Four of nine naive name lookups in the calibration batch resolved
 *     to a DIFFERENT project, so the registry record's own `repository` field is compared to the
 *     repo under test (and reported `no-own-repository` when it has none, like `npm puter`).
 *  3. A MANIFEST VERSION CAN BE A PLACEHOLDER. `gitroomhq/postiz-app`'s `package.json` says
 *     `gitroom 1.0.0` while every release says `v2.25.x` — a 1.0.0/0.0.0 manifest whose `name` is
 *     not the repo name is reported as `manifest-name-mismatch`, not as "behind".
 *  4. `no-release` IS A STATE, NOT A MISSING VALUE. `Nutlope/hallmark` publishes NO GitHub releases
 *     at all, so `main` is the only release — the same "main as the release" class without any
 *     version drift to measure. An empty atom feed is that state, never "unreadable".
 *  5. A RENAMED REPO'S REGISTRY METADATA KEEPS THE OLD SLUG. `npm ruflo` points at
 *     `ruvnet/claude-flow`, which 301s to `ruvnet/ruflo` — same project, prior name. Read as a
 *     collision, that would mark a perfectly in-sync package as a name squat; the redirect is
 *     followed (`registry-prior-name`) so only a slug that does NOT redirect to the repo under test
 *     counts as `name-collision`.
 *  6. A NAME-ONLY REGISTRY PACKAGE IS NOT A RELEASE CHANNEL. `npm wasmtime` is `0.0.2` with no
 *     repository field while the project ships `50.0.0`; `npm reactos` is `0.0.0`. Reading the
 *     version gap as "the registry lags" turns a stubbed/unrelated package into a finding about the
 *     project. When the registry record names no repository AND its major differs from the release
 *     line, the verdict is `registry-unrelated` — the name is shared, nothing else.
 *
 * Usage:
 *   node release-drift.mjs --repos owner/repo[,owner/repo…]      # per-repo verdicts
 *   node release-drift.mjs --repos … --npm owner/repo=pkg        # explicit registry name
 *   node release-drift.mjs --repos … --pypi owner/repo=pkg
 *   node release-drift.mjs --repos … --claim "detector rules"    # numeric-claim drift
 *   node release-drift.mjs --repos … --census                    # tally + the unreleased share
 *   node release-drift.mjs --repos … --no-github                 # raw + registry only, 0 quota
 *   node release-drift.mjs --repos … --json
 *   node release-drift.mjs --selftest
 *
 * Cost: `raw.githubusercontent.com`, `github.com/<repo>/releases.atom`, `registry.npmjs.org` and
 * `pypi.org/pypi` are unmetered — a 20-repo census costs ZERO api.github.com calls unless a repo's
 * default branch is none of main/master/develop, in which case one API call is made and counted.
 * The summary always prints the API call count.
 */

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const REPOS = (argOf('--repos', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const CLAIM = argOf('--claim', null);
const CENSUS = args.includes('--census');
const JSON_OUT = args.includes('--json');
const NO_GITHUB = args.includes('--no-github');
const SELFTEST = args.includes('--selftest');

const UA = { 'User-Agent': 'trending.md learnt-agent (release-drift)' };
const DAY = 24 * 3600 * 1000;
let apiCalls = 0;

// ── version parsing / comparison ────────────────────────────────────────────────────────────────
/** Parse the first semver-ish triple in a tag or version string. `null` when there is none. */
function parseVersion(s) {
  if (!s) return null;
  const m = String(s).match(/v?(\d+)\.(\d+)\.(\d+)(?:[-+]([0-9A-Za-z.-]+))?/);
  if (!m) return null;
  // `raw` is the bare triple: `skill-v4.7.1` and `v4.7.1` must compare as the same version.
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] || null,
    raw: `${m[1]}.${m[2]}.${m[3]}${m[4] ? `-${m[4]}` : ''}` };
}
/** -1 / 0 / 1, prerelease sorts before its own release. */
function cmpVersion(a, b) {
  const pa = parseVersion(a), pb = parseVersion(b);
  if (!pa || !pb) return 0;
  for (const k of ['major', 'minor', 'patch']) {
    if (pa[k] !== pb[k]) return pa[k] < pb[k] ? -1 : 1;
  }
  if (pa.pre && !pb.pre) return -1;
  if (!pa.pre && pb.pre) return 1;
  if (pa.pre && pb.pre) return pa.pre < pb.pre ? -1 : pa.pre > pb.pre ? 1 : 0;
  return 0;
}
/**
 * Split tags into component lines. `skill-v4.7.0` → prefix `skill`; `v2.25.2` → prefix `(root)`;
 * `engine-v0.1.17` → `engine`. The prefix is everything before the last `-v<digit>`.
 */
function componentOf(tag) {
  const m = String(tag).match(/^(.*?)[-_]?v?(\d+\.\d+\.\d+.*)$/);
  if (!m) return '(root)';
  const prefix = (m[1] || '').replace(/[-_]$/, '');
  return prefix || '(root)';
}
/** { component: highestVersion } — the version line, not the release date, is what decides. */
function highestPerComponent(tags) {
  const out = {};
  for (const t of tags) {
    const c = componentOf(t), v = parseVersion(t);
    if (!v) continue;
    if (!out[c] || cmpVersion(v.raw, out[c]) > 0) out[c] = v.raw;
  }
  return out;
}
/** The highest version across all component lines — what a registry publishes under one name. */
function highestOverall(tags) {
  const per = highestPerComponent(tags);
  let best = null;
  for (const v of Object.values(per)) if (!best || cmpVersion(v, best) > 0) best = v;
  return best;
}

// ── numeric-claim extraction ───────────────────────────────────────────────────────────────────
/**
 * Every number that sits immediately before the claim phrase — `62 deterministic detector rules`
 * matches `--claim "detector rules"`. Returns unique numbers, ascending. Occurrences are counted
 * too: a README that says it twice is not two different numbers.
 */
function claimNumbers(text, phrase) {
  if (!text || !phrase) return { numbers: [], occurrences: 0 };
  const words = phrase.trim().split(/\s+/).map(escapeRe).join('\\s+');
  const re = new RegExp(`\\b(\\d+)\\b[^.\\n]{0,30}?${words}`, 'gi');
  const found = [];
  let m;
  while ((m = re.exec(text))) found.push(+m[1]);
  return { numbers: [...new Set(found)].sort((a, b) => a - b), occurrences: found.length };
}
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// ── repository identity ───────────────────────────────────────────────────────────────────────
/** `git+https://github.com/A/B.git` → `a/b`. `null` when there is no repo URL at all. */
function repoSlugFromUrl(url) {
  if (!url) return null;
  const s = String(url).replace(/^git\+/, '').replace(/^git:\/\//, 'https://');
  const m = s.match(/github\.com[/:]([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return `${m[1]}/${m[2].replace(/\.git$/, '')}`.toLowerCase();
}

// ── state machine ─────────────────────────────────────────────────────────────────────────────
/**
 * Decide the verdict from the four artifacts. Pure, so `--selftest` covers every branch without a
 * network call. `manifest`, `release`, `registry` are version strings or null; `nameCollision` is
 * true when the registry record points at a different repo.
 */
function verdict({ manifest, manifestName, repoName, tags, registry, nameCollision, unrelated, unreachable }) {
  if (unreachable) return 'unreadable';
  if (nameCollision) return 'name-collision';
  if (unrelated) return 'registry-unrelated';
  const rel = highestOverall(tags || []);
  const hasManifest = !!manifest;
  if (!hasManifest && !registry && !rel) return 'no-manifest';
  if (!rel) {
    // No release at all: `main` is the release. Still worth knowing whether a registry has one.
    return 'no-release';
  }
  if (!registry) return 'release-no-registry';
  const mRel = cmpVersion(registry, rel);
  if (mRel < 0) return 'registry-lags-release';
  if (mRel > 0) return 'registry-ahead-of-tags';
  if (!hasManifest) return 'in-sync';
  // A placeholder manifest is not "behind" — it is unversioned.
  const placeholder = (/^(0\.0\.0|1\.0\.0)$/.test(manifest) || !manifest)
    && manifestName && repoName && manifestName.toLowerCase() !== repoName.toLowerCase();
  if (placeholder) return 'manifest-name-mismatch';
  const mMan = cmpVersion(manifest, rel);
  if (mMan > 0) return 'manifest-ahead';
  if (mMan < 0) return 'manifest-behind';
  return 'in-sync';
}

// ── network ───────────────────────────────────────────────────────────────────────────────────
async function get(url, { as = 'text' } = {}) {
  try {
    const r = await fetch(url, { headers: UA, redirect: 'follow' });
    if (!r.ok) return { status: r.status, body: null };
    const body = as === 'json' ? await r.json() : await r.text();
    return { status: r.status, body };
  } catch (e) {
    return { status: 0, body: null, error: String(e && e.message || e) };
  }
}

async function findManifest(repo) {
  const files = ['package.json', 'pyproject.toml', 'Cargo.toml'];
  for (const branch of ['main', 'master', 'develop']) {
    for (const f of files) {
      const { status, body } = await get(`https://raw.githubusercontent.com/${repo}/${branch}/${f}`);
      if (status !== 200 || body == null) continue;
      const info = readManifest(f, body);
      if (info) return { ...info, file: f, branch };
    }
  }
  if (!NO_GITHUB) {
    apiCalls++;
    const { status, body } = await get(`https://api.github.com/repos/${repo}`, { as: 'json' });
    if (status === 200 && body && body.default_branch) {
      const branch = body.default_branch;
      for (const f of files) {
        const { status: s2, body: b2 } = await get(`https://raw.githubusercontent.com/${repo}/${branch}/${f}`);
        if (s2 === 200 && b2 != null) {
          const info = readManifest(f, b2);
          if (info) return { ...info, file: f, branch };
        }
      }
    }
  }
  return null;
}

function readManifest(file, body) {
  if (file === 'package.json') {
    try {
      const j = JSON.parse(body);
      if (!j.version) return null;
      const repoUrl = typeof j.repository === 'string' ? j.repository : j.repository && j.repository.url;
      return { version: j.version, name: j.name || null, repository: repoUrl || null };
    } catch { return null; }
  }
  const m = body.match(/^\s*version\s*=\s*["']([^"']+)["']/m);
  if (!m) return null;
  const n = body.match(/^\s*name\s*=\s*["']([^"']+)["']/m);
  const r = body.match(/^\s*repository\s*=\s*["']([^"']+)["']/m);
  return { version: m[1], name: n ? n[1] : null, repository: r ? r[1] : null };
}

async function findReleases(repo) {
  const { status, body } = await get(`https://github.com/${repo}/releases.atom`);
  if (body == null) return null;
  const entries = body.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  return entries.map(e => {
    const title = (e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const updated = (e.match(/<updated>([^<]+)<\/updated>/) || [])[1] || null;
    const id = (e.match(/Repository\/\d+\/([^<]+)<\/id>/) || [])[1] || '';
    return { tag: decodeEntities(id.trim()), title: decodeEntities(title.trim()), updated };
  }).filter(e => e.tag);
}
function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

async function findRegistry(repo, explicit) {
  const name = explicit ? explicit.split(':').pop() : repo.split('/')[1];
  const eco = explicit && explicit.includes(':') ? explicit.split(':')[0] : null;
  const tries = eco ? [eco] : ['npm', 'pypi'];
  for (const e of tries) {
    if (e === 'npm') {
      const { status, body } = await get(`https://registry.npmjs.org/${encodeURIComponent(name)}`, { as: 'json' });
      if (status !== 200 || !body || !body['dist-tags']) continue;
      const latest = body['dist-tags'].latest;
      const repoUrl = body.repository && (body.repository.url || body.repository);
      return { ecosystem: 'npm', name, version: latest, published: body.time && body.time[latest] || null, repository: repoUrl || null };
    }
    if (e === 'pypi') {
      const { status, body } = await get(`https://pypi.org/pypi/${encodeURIComponent(name)}/json`, { as: 'json' });
      if (status !== 200 || !body || !body.info) continue;
      const latest = body.info.version;
      const urls = body.urls && body.urls[0];
      // PyPI has no `repository` field; the provenance lives in `project_urls` (or `home_page`).
      const pu = body.info.project_urls || {};
      const repoUrl = Object.entries(pu).map(([k, v]) => `${k} ${v}`)
        .find((s) => /github\.com/i.test(s)) || body.info.home_page || null;
      return { ecosystem: 'pypi', name, version: latest,
        published: urls && urls.upload_time_iso_8601 || null, repository: repoUrl && { url: repoUrl } };
    }
  }
  return null;
}

async function probeRepo(repo, npmMap, pypiMap) {
  const explicit = npmMap[repo] ? `npm:${npmMap[repo]}` : pypiMap[repo] ? `pypi:${pypiMap[repo]}` : null;
  const [manifest, tags, registry] = await Promise.all([
    findManifest(repo),
    findReleases(repo),
    findRegistry(repo, explicit),
  ]);
  const repoName = repo.split('/')[1];
  const ownRepo = registry && repoSlugFromUrl(registry.repository);
  let nameCollision = !!(ownRepo && ownRepo !== repo.toLowerCase());
  // A RENAMED REPO'S REGISTRY METADATA KEEPS THE OLD SLUG. `npm ruflo` points at
  // `ruvnet/claude-flow`, which 301s to `ruvnet/ruflo` — the same project under its prior name.
  // The redirect is read from github.com directly (unmetered), so this costs no API quota.
  let renamedTo = null;
  if (nameCollision) {
    renamedTo = await followRename(ownRepo);
    if (renamedTo && renamedTo.toLowerCase() === repo.toLowerCase()) nameCollision = false;
  }

  const flags = [];
  if (renamedTo) flags.push(`registry-prior-name (${ownRepo} → ${renamedTo})`);
  // A NAME-ONLY REGISTRY PACKAGE IS NOT A RELEASE CHANNEL. `npm wasmtime` is 0.0.2 with no
  // repository field while the project releases 50.0.0; `npm reactos` is 0.0.0. When the registry
  // record names no repository AND its major differs from the release line, the package is a
  // different thing that shares the name — comparing versions across the two measures nothing.
  const relVersion = tags && tags.length ? highestOverall(tags.map(t => t.tag)) : null;
  let unrelated = false;
  if (registry && !ownRepo && relVersion) {
    const rv = parseVersion(registry.version), lv = parseVersion(relVersion);
    if (rv && lv && rv.major !== lv.major) {
      unrelated = true;
      flags.push(`registry-unrelated (${registry.name}@${registry.version} shares only the name)`);
    } else {
      flags.push('registry-unverified (no repository field on the registry record)');
    }
  }
  const placeholder = manifest && (/^(0\.0\.0|1\.0\.0)$/.test(manifest.version))
    && manifest.name && manifest.name.toLowerCase() !== repoName.toLowerCase();
  if (placeholder) flags.push(`manifest-name-mismatch (${manifest.name} ${manifest.version} vs repo ${repoName})`);

  let claim = null;
  if (CLAIM && tags && tags.length) {
    const best = highestOverallTagname(tags);
    const mainReadme = await get(`https://raw.githubusercontent.com/${repo}/main/README.md`);
    const tagReadme = best ? await get(`https://raw.githubusercontent.com/${repo}/${best}/README.md`) : { body: null };
    const a = claimNumbers(mainReadme.body, CLAIM);
    const b = claimNumbers(tagReadme.body, CLAIM);
    claim = { phrase: CLAIM, main: a.numbers, release: b.numbers, releaseTag: best,
      drift: a.numbers.length && b.numbers.length && a.numbers.join(',') !== b.numbers.join(',') };
    if (claim.drift) flags.push('claim-drift');
  }

  const state = verdict({
    manifest: manifest && manifest.version,
    manifestName: manifest && manifest.name,
    repoName,
    tags: (tags || []).map(t => t.tag),
    registry: registry && registry.version,
    nameCollision,
    unrelated,
    unreachable: tags === null,
  });

  return {
    repo,
    state,
    flags,
    manifest: manifest ? { version: manifest.version, name: manifest.name, file: manifest.file, branch: manifest.branch, repository: manifest.repository } : null,
    release: tags && tags.length ? { highest: highestOverall(tags.map(t => t.tag)), components: highestPerComponent(tags.map(t => t.tag)), newest: tags[0] } : null,
    noReleases: !!(tags && !tags.length),
    registry,
    registryOwnRepo: ownRepo,
    claim,
  };
}
/** Where does a GitHub slug redirect to? `gitroomhq/old` → `gitroomhq/new` on a rename. */
async function followRename(slug) {
  try {
    const r = await fetch(`https://github.com/${slug}`, { headers: UA, redirect: 'manual' });
    const loc = r.headers.get('location');
    if (!loc) return null;
    const m = loc.match(/github\.com\/([^/?#]+\/[^/?#]+)/);
    return m ? m[1].replace(/\.git$/, '') : null;
  } catch { return null; }
}
/** The TAG (not the version) whose parsed version is highest — needed to fetch that tag's README. */
function highestOverallTagname(tags) {
  let best = null, bestV = null;
  for (const t of tags) {
    const v = parseVersion(t.tag);
    if (!v) continue;
    if (!bestV || cmpVersion(v.raw, bestV) > 0) { bestV = v.raw; best = t.tag; }
  }
  return best;
}

// ── rendering ────────────────────────────────────────────────────────────────────────────────
function rowText(r) {
  const rel = r.release ? r.release.highest : (r.noReleases ? '—' : '?');
  const reg = r.registry ? `${r.registry.name}@${r.registry.version} (${r.registry.ecosystem})` : '—';
  const man = r.manifest ? `${r.manifest.version}` : '—';
  const bits = [`${r.state.padEnd(22)} ${r.repo}`,
    `    manifest ${man}${r.manifest ? ` [${r.manifest.file}@${r.manifest.branch}${r.manifest.name ? `, name=${r.manifest.name}` : ''}]` : ''}`,
    `    release  ${rel}${r.release ? ` [${Object.entries(r.release.components).map(([c, v]) => `${c} ${v}`).join(' / ')}]` : r.noReleases ? ' [no GitHub releases at all]' : ''}`,
    `    registry ${reg}${r.registryOwnRepo ? ` → ${r.registryOwnRepo}` : r.registry ? ' → (no repository field)' : ''}`];
  if (r.claim && r.claim.main.length) {
    bits.push(`    claim    "${r.claim.phrase}" main ${r.claim.main.join(',')} vs ${r.claim.releaseTag || '—'} ${r.claim.release.length ? r.claim.release.join(',') : '—'}${r.claim.drift ? '  ← DRIFT' : ''}`);
  }
  if (r.flags && r.flags.length) bits.push(`    flags    ${r.flags.join(' · ')}`);
  return bits.join('\n');
}

function census(rows) {
  const tally = {};
  for (const r of rows) tally[r.state] = (tally[r.state] || 0) + 1;
  const total = rows.length;
  const lines = [`Census over ${total} repos:`];
  for (const [k, n] of Object.entries(tally).sort((a, b) => b[1] - a[1])) {
    lines.push(`  ${k.padEnd(22)} ${String(n).padStart(2)}  ${(100 * n / total).toFixed(0)}%`);
  }
  const unreleased = rows.filter(r => ['manifest-ahead', 'no-release'].includes(r.state));
  if (unreleased.length) {
    lines.push(`  "released today" that is not installable from a registry/tag: ${unreleased.length}/${total}`);
    for (const r of unreleased) {
      const detail = r.state === 'manifest-ahead'
        ? `main ${r.manifest.version} vs release ${r.release.highest} vs ${r.registry.name}@${r.registry.version}`
        : 'no release artifact at all';
      lines.push(`    - ${r.repo}: ${detail}`);
    }
  }
  const drift = rows.filter(r => r.claim && r.claim.drift);
  if (drift.length) {
    lines.push(`  numeric-claim drift (main vs highest release tag): ${drift.length}/${rows.filter(r => r.claim && r.claim.main.length).length} checked`);
    for (const r of drift) lines.push(`    - ${r.repo}: "${r.claim.phrase}" ${r.claim.main.join(',')} → ${r.claim.release.join(',')} at ${r.claim.releaseTag}`);
  }
  const flagged = rows.filter(r => r.flags && r.flags.length);
  if (flagged.length) {
    lines.push('  flags:');
    for (const r of flagged) lines.push(`    - ${r.repo}: ${r.flags.join(' · ')}`);
  }
  lines.push(`  api.github.com calls: ${apiCalls}`);
  return lines.join('\n');
}

// ── selftest ─────────────────────────────────────────────────────────────────────────────────
function selftest() {
  let pass = 0, fail = 0;
  const ok = (name, cond) => { cond ? pass++ : (fail++, console.log(`  ✗ ${name}`)); };

  // version parsing + comparison
  ok('parse 4.7.1', parseVersion('skill-v4.7.1').raw === '4.7.1');
  ok('cmp 4.7.1 > 4.7.0', cmpVersion('4.7.1', '4.7.0') === 1);
  ok('cmp 0.1.17 < 4.7.0', cmpVersion('0.1.17', '4.7.0') === -1);
  ok('prerelease < release', cmpVersion('3.0.0-rc1', '3.0.0') === -1);
  ok('no version → null', parseVersion('latest') === null);

  // component grouping — trap 1
  const impTags = ['engine-v0.1.17', 'skill-v4.7.0', 'engine-v0.1.16', 'cli-v4.7.0', 'skill-v4.6.0'];
  ok('components grouped', JSON.stringify(highestPerComponent(impTags)) === JSON.stringify({ engine: '0.1.17', skill: '4.7.0', cli: '4.7.0' }));
  ok('highest overall ignores the newest-by-date engine', highestOverall(impTags) === '4.7.0');
  ok('root tag → (root)', componentOf('v2.25.2') === '(root)');
  ok('hyphen prefix', componentOf('impeccable-engine-v0.1.17') === 'impeccable-engine');

  // claim extraction — occurrences, not lines
  const readme = 'x 62 deterministic detector rules y. Also 62 deterministic detector rules.';
  ok('claim numbers unique', JSON.stringify(claimNumbers(readme, 'detector rules').numbers) === '[62]');
  ok('claim occurrences counted', claimNumbers(readme, 'detector rules').occurrences === 2);
  ok('claim crosses one word', claimNumbers('1 skill, 24 commands, and 62 deterministic detector rules', 'detector rules').numbers.join() === '62');
  ok('claim stops at a full stop', JSON.stringify(claimNumbers('61 rules. Then 62 detector rules', 'detector rules').numbers) === '[62]');

  // repo identity — trap 2
  ok('git+https slug', repoSlugFromUrl('git+https://github.com/pbakaus/impeccable.git') === 'pbakaus/impeccable');
  ok('git:// slug', repoSlugFromUrl('git://github.com/A/B.git') === 'a/b');
  ok('no repo → null', repoSlugFromUrl(null) === null);

  // state machine
  const V = o => verdict({ manifest: null, manifestName: null, repoName: 'repo', tags: [], registry: null, nameCollision: false, unreachable: false, ...o });
  ok('in-sync', V({ manifest: '4.7.0', manifestName: 'x', tags: ['v4.7.0'], registry: '4.7.0' }) === 'in-sync');
  ok('manifest ahead', V({ manifest: '4.7.1', manifestName: 'x', tags: ['v4.7.0'], registry: '4.7.0' }) === 'manifest-ahead');
  ok('manifest behind', V({ manifest: '4.6.0', manifestName: 'x', tags: ['v4.7.0'], registry: '4.7.0' }) === 'manifest-behind');
  ok('registry ahead of tags', V({ manifest: '4.7.1', manifestName: 'x', tags: ['v4.7.0'], registry: '4.7.1' }) === 'registry-ahead-of-tags');
  ok('registry lags release', V({ manifest: '4.7.0', manifestName: 'x', tags: ['v4.7.0'], registry: '4.6.0' }) === 'registry-lags-release');
  ok('no release at all', V({ manifest: '2.0.0', manifestName: 'hallmark', tags: [], registry: null }) === 'no-release');
  ok('release without registry', V({ manifest: '1.0.0', manifestName: 'rqlite', tags: ['v8.0.0'] }) === 'release-no-registry');
  ok('name collision wins', V({ nameCollision: true, tags: ['v5.0.2'], registry: '5.0.2' }) === 'name-collision');
  ok('name-only registry package', V({ unrelated: true, tags: ['v50.0.0'], registry: '0.0.2' }) === 'registry-unrelated');
  ok('unreadable', V({ unreachable: true }) === 'unreadable');
  ok('nothing at all', V({}) === 'no-manifest');
  ok('placeholder manifest', V({ manifest: '1.0.0', manifestName: 'gitroom', repoName: 'postiz-app', tags: ['v2.25.2'], registry: '2.25.2' }) === 'manifest-name-mismatch');
  ok('real 1.0.0 manifest is not a placeholder', V({ manifest: '1.0.0', manifestName: 'repo', repoName: 'repo', tags: ['v1.0.0'], registry: '1.0.0' }) === 'in-sync');

  console.log(`\nrelease-drift --selftest: ${pass}/${pass + fail} passed`);
  process.exit(fail ? 1 : 0);
}

// ── main ─────────────────────────────────────────────────────────────────────────────────────
async function main() {
  if (SELFTEST) return selftest();
  if (!REPOS.length) {
    console.error('usage: node release-drift.mjs --repos owner/repo[,owner/repo…] [--claim "phrase"] [--census] [--json] [--selftest]');
    process.exit(2);
  }
  const mapOf = (flag) => {
    const out = {};
    for (const spec of (argOf(flag, '') || '').split(',').map(s => s.trim()).filter(Boolean)) {
      const [k, v] = spec.split('=');
      if (k && v) out[k] = v;
    }
    return out;
  };
  const npmMap = mapOf('--npm'), pypiMap = mapOf('--pypi');

  const rows = [];
  for (const repo of REPOS) {
    process.stderr.write(`· ${repo}\n`);
    rows.push(await probeRepo(repo, npmMap, pypiMap));
  }

  if (JSON_OUT) {
    console.log(JSON.stringify({ apiCalls, rows }, null, 2));
    return;
  }
  for (const r of rows) console.log(rowText(r) + '\n');
  if (CENSUS) console.log(census(rows));
}

main();
