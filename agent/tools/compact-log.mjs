#!/usr/bin/env node
/* Log-window compaction (AGENT.md memory model; build.js "Log-window budget check").
 *
 * Moves every `### YYYY-MM-DD HH:MM` entry older than the 14-day cutoff OUT of the live log:
 *   - en/action.md  → agent/action-log/archive-en.md  (verbatim, newest-first, en-only cold storage)
 *   - zh/action.md, jp/action.md → dropped (mirrors keep only the live window; rebuilt by translation)
 *
 * Dry-run by default; pass --write to apply. Prints the date window it acted on.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', '..');
const WRITE = process.argv.includes('--write');
const LOG_WINDOW_DAYS = 14;

const TODAY = process.env.COMPACT_TODAY || new Date().toISOString().slice(0, 10);
const cutoff = new Date(Date.parse(`${TODAY}T00:00:00Z`) - LOG_WINDOW_DAYS * 86400000)
  .toISOString().slice(0, 10);

const HEAD_RE = /^### (\d{4}-\d{2}-\d{2}) \d{2}:\d{2}$/;

/** Split a locale's action file into { head, logHead, entries[], tail } at its own log heading. */
function splitLog(file, headingRe) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  const i = lines.findIndex(l => headingRe.test(l));
  if (i === -1) throw new Error(`no log heading in ${file}`);
  // entry blocks start at the first "### " after the log heading
  const first = lines.findIndex((l, n) => n > i && HEAD_RE.test(l));
  if (first === -1) throw new Error(`no log entries in ${file}`);
  const prefix = lines.slice(0, first).join('\n');   // front matter + agenda + "## Log" + preamble
  const entryLines = lines.slice(first);
  const entries = [];
  let cur = null;
  for (const l of entryLines) {
    if (HEAD_RE.test(l)) {
      if (cur) entries.push(cur);
      cur = { date: l.match(HEAD_RE)[1], head: l, lines: [l] };
    } else {
      if (!cur) throw new Error(`stray content before first entry in ${file}`);
      cur.lines.push(l);
    }
  }
  if (cur) entries.push(cur);
  return { file, prefix, entries };
}

/** Trailing blank lines belong to the file, not the last entry. */
function trimTail(entryLines) {
  const out = entryLines.slice();
  while (out.length && out[out.length - 1].trim() === '') out.pop();
  return out;
}

const en = splitLog(path.join(ROOT, 'en', 'action.md'), /^## Log\s*$/);
const mirrors = [
  splitLog(path.join(ROOT, 'zh', 'action.md'), /^## 日志\s*$/),
  splitLog(path.join(ROOT, 'jp', 'action.md'), /^## ログ\s*$/),
];

const stale = en.entries.filter(e => e.date < cutoff);
if (!stale.length) {
  console.log(`nothing to compact: newest-archived candidate cutoff ${cutoff}, oldest live entry ${en.entries[en.entries.length - 1].date}`);
  process.exit(0);
}
console.log(`cutoff ${cutoff} (today ${TODAY} − ${LOG_WINDOW_DAYS}d)`);
console.log(`en: archiving ${stale.length} entr${stale.length === 1 ? 'y' : 'ies'} ` +
  `${stale[0].date} ${stale[0].head.slice(4)} → ${stale[stale.length - 1].date} ${stale[stale.length - 1].head.slice(4)}`);
const staleDates = new Set(stale.map(e => e.date));

// ── en: rewrite live log, prepend archived entries to the cold store ──
const keep = en.entries.filter(e => e.date >= cutoff);
const liveEn = [en.prefix, keep.map(e => trimTail(e.lines).join('\n')).join('\n\n'), ''].join('\n');

const ARCHIVE = path.join(ROOT, 'agent', 'action-log', 'archive-en.md');
const archSrc = fs.readFileSync(ARCHIVE, 'utf8');
const archLines = archSrc.split('\n');
const archFirst = archLines.findIndex(l => HEAD_RE.test(l));
if (archFirst === -1) throw new Error('archive has no entries');
const archHead = archLines.slice(0, archFirst).join('\n').replace(/\n+$/, '\n\n');
const archBody = archLines.slice(archFirst).join('\n').replace(/\s*$/, '');

// archive is newest-first: anything newer than the current top goes above it
const archTopDate = archLines[archFirst].match(HEAD_RE)[1];
const above = stale.filter(e => e.date >= archTopDate).sort((a, b) => b.head.localeCompare(a.head));
const below = stale.filter(e => e.date < archTopDate).sort((a, b) => b.head.localeCompare(a.head));
if (below.length) throw new Error(`stale entries (${below.map(e => e.head).join(', ')}) predate the archive top (${archTopDate}) — manual merge needed`);
const archivedBlock = above.map(e => trimTail(e.lines).join('\n')).join('\n\n');
const newArchive = `${archHead}${archivedBlock}\n\n${archBody}\n`;

console.log(`archive: ${archSrc.split('\n').filter(l => HEAD_RE.test(l)).length} entries → ` +
  `${newArchive.split('\n').filter(l => HEAD_RE.test(l)).length} (+${above.length} on top)`);

// ── mirrors: drop the same dates from the live window ──
for (const m of mirrors) {
  const drop = m.entries.filter(e => e.date < cutoff);
  const missed = [...staleDates].filter(d => !m.entries.some(e => e.date === d));
  console.log(`${path.relative(ROOT, m.file)}: dropping ${drop.length} entr${drop.length === 1 ? 'y' : 'ies'}` +
    (missed.length ? ` — ⚠ missing ${missed.join(', ')}` : ''));
  const kept = m.entries.filter(e => e.date >= cutoff);
  const out = [m.prefix, kept.map(e => trimTail(e.lines).join('\n')).join('\n\n'), ''].join('\n');
  if (WRITE) fs.writeFileSync(m.file, out);
}

const liveCount = liveEn.split('\n').filter(l => HEAD_RE.test(l)).length;
console.log(`en live window: ${en.entries.length} → ${liveCount} entries (${keep[keep.length - 1].date} → ${keep[0].date})`);

if (WRITE) {
  fs.writeFileSync(path.join(ROOT, 'en', 'action.md'), liveEn);
  fs.writeFileSync(ARCHIVE, newArchive);
  console.log('written.');
} else {
  console.log('(dry run — pass --write to apply)');
}
