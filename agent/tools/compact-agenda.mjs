#!/usr/bin/env node
/* Agenda compaction — the agenda-side twin of compact-log.mjs.
 *
 * en/action.md's own convention (its Agenda preamble and agent/AGENT.md) says finished items are
 * archived to the "Done" section; in practice every closed item stayed inline in Research/System
 * (249 inline [x] blocks as of 2026-11-11, ~4,400 lines of Research alone). This tool moves every
 * inline `- [x]` block out of the Research/System buckets and inserts a compact one-liner at the
 * top of the Done section (newest first, by the block's own finishing-log pointer):
 *
 *   - [x] **<title>** — done (→ log YYYY-MM-DD HH:MM) → [[links]]
 *
 * The full outcome text always already lives in the log (14-day live window; older entries in
 * agent/action-log/archive-en.md) and in the knowledge files, so the one-liner loses nothing
 * that is not retrievable — it removes a restatement. Detail is dropped from the zh/jp mirrors
 * entirely, matching the established mirror rule (mirrors keep only the live window).
 *
 * Per-locale processing from each locale's own text (its own headings, its own pointer spellings:
 * "(→ log …)", "（→ 日志 …）", "（→ ログ …）") — the locales are structurally parallel but not
 * line-identical, so nothing is assumed to correspond positionally.
 *
 * Dry-run by default; pass --write to apply. Prints per-locale before/after counts.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', '..');
const WRITE = process.argv.includes('--write');

const LOCALES = [
  {
    lc: 'en', file: 'en/action.md',
    research: /^### Research —/, system: /^### System —/, done: /^### Done —/,
  },
  {
    lc: 'zh', file: 'zh/action.md',
    research: /^### 研究/, system: /^### 系统/, done: /^### 已完成/,
  },
  {
    lc: 'jp', file: 'jp/action.md',
    research: /^### リサーチ/, system: /^### システム/, done: /^### Done/,
  },
];
const ITEM_START = /^- \[x\] /;
const ANY_ITEM = /^- \[/;
const SECTION_HEAD = /^### /;
// "(→ log 2026-11-08 12:50)" / "（→ 日志 2026-08-26 12:27）" / "（→ ログ …）"
const POINTER = /[（(]→\s*(?:log|日志|ログ)\s+(\d{4}-\d{2}-\d{2})(?:\s+(\d{2}:\d{2}))?[）)]/g;
const WIKILINK = /\[\[([a-zA-Z0-9][a-zA-Z0-9-]*)\]\]/g;

function compactLocale({ lc, file, research, system, done }) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const lines = src.split('\n');
  const iResearch = lines.findIndex(l => research.test(l));
  const iSystem = lines.findIndex(l => system.test(l));
  const iDone = lines.findIndex(l => done.test(l));
  if (iResearch === -1 || iSystem === -1 || iDone === -1)
    throw new Error(`${lc}: missing section heading (research=${iResearch} system=${iSystem} done=${iDone})`);
  if (!(iResearch < iSystem && iSystem < iDone))
    throw new Error(`${lc}: unexpected section order`);

  const endOfAgenda = iDone; // first Done heading line ends the System bucket
  const blocks = [];
  let cur = null;
  for (let i = iResearch; i < endOfAgenda; i++) {
    const l = lines[i];
    if (ITEM_START.test(l)) {
      if (cur) blocks.push(cur);
      cur = { start: i, lines: [l] };
    } else if (cur) {
      if (ANY_ITEM.test(l) || SECTION_HEAD.test(l)) {
        blocks.push(cur);
        cur = null;
      } else {
        cur.lines.push(l);
      }
    }
  }
  if (cur) blocks.push(cur);

  const entries = blocks.map(b => {
    const text = b.lines.join('\n');
    // Title: after the "- [x] **" prefix, to the first closing "**" (titles carry backticks
    // but no nested bold — verified against all 249 blocks in the first run).
    let joined = b.lines.map(s => s.trim()).join(' ');
    const open = joined.indexOf('**');
    const close = joined.indexOf('**', open + 2);
    const title = close === -1 ? joined.slice(open + 2) : joined.slice(open + 2, close);
    // Pointer: the LAST finishing-log pointer in the block.
    let m, last = null;
    POINTER.lastIndex = 0;
    while ((m = POINTER.exec(text)) !== null) last = m;
    // Wiki links: deduped, first-appearance order.
    const links = [];
    WIKILINK.lastIndex = 0;
    while ((m = WIKILINK.exec(text)) !== null) if (!links.includes(m[1])) links.push(m[1]);
    return {
      start: b.start, nlines: b.lines.length,
      title: title.replace(/\s+/g, ' ').trim(),
      date: last ? last[1] : '0000-00-00',
      time: last ? (last[2] || '') : '',
      links,
    };
  });

  // Remove blocks (a block owns its trailing blank line if one follows).
  const drop = new Set();
  for (const e of entries) {
    for (let i = e.start; i < e.start + e.nlines; i++) drop.add(i);
    const after = e.start + e.nlines;
    if (after < endOfAgenda && lines[after].trim() === '') drop.add(after);
  }
  const kept = lines.filter((_, i) => !drop.has(i));
  const iDoneKept = kept.findIndex(l => done.test(l));

  const oneLiners = entries
    .slice()
    .sort((a, b) => (a.date + a.time) < (b.date + b.time) ? 1 : -1)
    .map(e => {
      const ptr = e.date === '0000-00-00' ? '' : ` (→ log ${e.date}${e.time ? ' ' + e.time : ''})`;
      const lnk = e.links.length ? ` → ${e.links.map(t => `[[${t}]]`).join(' ')}` : '';
      return `- [x] **${e.title}** — done${ptr}${lnk}`;
    });

  const out = kept.slice();
  if (oneLiners.length) {
    const insertAt = iDoneKept + 1; // right after the Done heading line
    const hadBlankAfterHeading = out[insertAt] !== undefined && out[insertAt].trim() === '';
    const payload = hadBlankAfterHeading ? ['', ...oneLiners] : [...oneLiners, ''];
    out.splice(insertAt, 0, ...payload);
  }

  const result = {
    lc, file, moved: entries.length,
    linesBefore: lines.length, linesAfter: out.length,
    noPointer: entries.filter(e => e.date === '0000-00-00').length,
    entrySample: oneLiners[0] || '',
  };
  if (WRITE) fs.writeFileSync(path.join(ROOT, file), out.join('\n'));
  return result;
}

for (const spec of LOCALES) {
  const r = compactLocale(spec);
  console.log(
    `${r.lc}: moved ${r.moved} [x] item(s) → Done` +
    (r.noPointer ? ` (${r.noPointer} without a log pointer — filed last)` : '') +
    ` · lines ${r.linesBefore} → ${r.linesAfter}`
  );
  if (r.entrySample) console.log(`   newest: ${r.entrySample.slice(0, 140)}`);
}
if (!WRITE) console.log('\nDry run — pass --write to apply.');
