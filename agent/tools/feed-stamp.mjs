#!/usr/bin/env node
/* Feed stamp — make a feed's `updated:` a measurement instead of a claim.
 *
 * Why this exists (filed 10-23 04:35, System: "The feed frontmatter writes local time labelled
 * `Z`"). The generator runs on a UTC+8 host and wrote its LOCAL wall clock into a field suffixed
 * `Z` — `en/feed/2026-10-23.md` says `updated: 2026-10-23T04:10:00Z` while the 04:10 run actually
 * happened at 2026-10-22T20:10:00Z. The build's batch-coverage lint (build.js) then compares that
 * instant against `en/agent.md`'s honest `last_processed: 2026-10-23T04:35:00+08:00` (= 20:35Z on
 * 10-22) and concludes the agent never learned a batch that it had just learned. A date without a
 * zone is a claim, not a measurement — the same bug `disclosure-lag.mjs` was calibrated against on
 * NVD's `published` field (which OMITS the `Z`; this one INVENTED one).
 *
 * Two defects, one writer-side fix:
 *   1. mislabelled zone — local UTC+8 wall clock stamped `Z`, so the instant is 8h in the future.
 *   2. stale on MERGE    — later batches append items but leave `updated` at an earlier run's value
 *                          (10-22's file was last written 20:17 local and still says 12:15).
 * Stamping the file after the model returns fixes both, because the value comes from the clock
 * rather than from the model's recollection of the clock.
 *
 * Usage:
 *   node agent/tools/feed-stamp.mjs --file en/feed/2026-10-23.md          # stamp now (UTC Z)
 *   node agent/tools/feed-stamp.mjs --file en/feed/2026-10-23.md --dry     # show, don't write
 *   node agent/tools/feed-stamp.mjs --file en/feed/2026-10-23.md --mirrors # + zh/ + jp/ twins
 *   node agent/tools/feed-stamp.mjs --repair-from-git [--since YYYY-MM-DD]  # backfill from git
 *                                                                          commit times (default: 7d)
 * `updated` is written as a true UTC instant with `Z`, which is what the CLAUDE.md template always
 * intended (`schedule: 04:03 … UTC+8` beside a `Z` value) and what `Date.parse` reads unambiguously.
 * build.js warns if any dated feed's `updated` carries no offset or resolves to a future instant —
 * i.e. if a writer ever regresses past this tool.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const has = f => args.includes(f);
const val = f => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

const dry = has('--dry');
const ZONE = /(Z|[+-]\d{2}:?\d{2})$/;

function stampText(text, iso) {
  /* Two places carry the same instant: the frontmatter and the Metadata table's `Generated` row.
     Stamping only the first leaves a file that contradicts itself two hundred lines later. */
  let out = text, changed = false, old = null;
  const m = text.match(/^updated:[ \t]*(\S+)[ \t]*$/m);
  if (m) {
    old = m[1];
    if (m[1] !== iso) { out = out.replace(/^updated:[ \t]*\S+[ \t]*$/m, `updated: ${iso}`); changed = true; }
  }
  const g = text.match(/^\|[ \t]*Generated[ \t]*\|[ \t]*(\S+)[ \t]*\|/m);
  if (g && g[1] !== iso) {
    out = out.replace(/^(\|[ \t]*Generated[ \t]*\|[ \t]*)\S+([ \t]*\|)/m, `$1${iso}$2`);
    changed = true;
    if (!old) old = g[1];
  }
  return { text: out, changed, old, reason: m ? 'stamped' : 'no updated: line' };
}

function write(file, text) {
  if (!dry) fs.writeFileSync(file, text);
}

/* ── mode 1: stamp one feed (and optionally its zh/jp twins) ── */
if (val('--file')) {
  const files = [val('--file')];
  const rel = path.relative(ROOT, path.resolve(ROOT, val('--file')));
  const [lang, ...rest] = rel.split(path.sep);
  if (has('--mirrors') && lang === 'en') {
    /* The zh/jp twins of a dated feed, and the three `latest.md` copies — the copies carry the
       same frontmatter, so a stamp that skipped them would leave the site's front page claiming a
       different instant than the feed it points at. */
    for (const l of ['zh', 'jp']) files.push(path.join(l, ...rest));
    if (/^\d{4}-\d{2}-\d{2}\.md$/.test(rest[1] || '')) {
      for (const l of ['en', 'zh', 'jp']) files.push(path.join(l, 'feed', 'latest.md'));
    }
  }
  const at = val('--at');
  const when = at ? new Date(at) : new Date();
  if (!Number.isFinite(when.getTime())) { console.error(`bad --at: ${at}`); process.exit(2); }
  const iso = when.toISOString().replace(/\.\d{3}Z$/, 'Z');   // second precision, real UTC
  for (const f of files) {
    const p = path.resolve(ROOT, f);
    if (!fs.existsSync(p)) { console.error(`✗ missing: ${f}`); process.exitCode = 1; continue; }
    const r = stampText(fs.readFileSync(p, 'utf8'), iso);
    write(p, r.text);
    console.log(`${r.changed ? '✓' : '·'} ${f}  ${r.old || '—'} → ${iso}${dry ? '  (dry)' : ''}`);
  }
  process.exit(process.exitCode || 0);
}

/* ── mode 2: repair every dated feed from its own git commit instant ──
   The commit time is the one honest record of when a feed file was last written: the generator's
   own `date +%H:%M` lands in the commit SUBJECT as local wall clock, and git stores the true
   instant with its offset. Repair only rewrites files whose `updated` is wrong, so re-running is
   a no-op. */
if (has('--repair-from-git')) {
  /* Scope: the trailing window, not all of history. Older files are never compared against
     `last_processed` (they are always in the past), and a bulk edit's commit time says nothing
     about when that day's feed was written — rewriting 228 files would be a diff with no
     claim behind it. Default: the last 7 days, the window the build's lints actually read. */
  const since = val('--since') || new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  let repaired = 0, checked = 0;
  for (const lang of ['en', 'zh', 'jp']) {
    const dir = path.join(ROOT, lang, 'feed');
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(n => /^\d{4}-\d{2}-\d{2}\.md$/.test(n) && n >= `${since}.md`).sort()) {
      const rel = path.join(lang, 'feed', f);
      let ci = '';
      try { ci = execFileSync('git', ['log', '-1', '--format=%cI', '--', rel], { cwd: ROOT }).toString().trim(); } catch { /* untracked */ }
      if (!ci) { console.log(`· ${rel}  (untracked — skipped)`); continue; }
      const iso = new Date(ci).toISOString().replace(/\.\d{3}Z$/, 'Z');
      const p = path.join(ROOT, rel);
      const r = stampText(fs.readFileSync(p, 'utf8'), iso);
      checked++;
      if (!r.changed) continue;
      write(p, r.text);
      repaired++;
      console.log(`✓ ${rel}  ${r.old} → ${iso}${dry ? '  (dry)' : ''}`);
    }
  }
  console.log(`\n${repaired} refreshed of ${checked} dated feed files${dry ? ' (dry run)' : ''}.`);
  process.exit(0);
}

console.error('usage: feed-stamp.mjs --file <path> [--mirrors] [--at ISO] [--dry]\n' +
              '       feed-stamp.mjs --repair-from-git [--dry]');
process.exit(2);
