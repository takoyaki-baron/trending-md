#!/usr/bin/env node
/* build.js — Pre-render all .md files to static .html pages */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

/* ── Markdown parser (same logic as the SPA, now running at build time) ── */
const RE_FENCE = /```(\w*)\n([\s\S]*?)```/g;
const RE_CODE  = /`([^`]+)`/g;
const RE_BOLD  = /\*\*(.+?)\*\*/g;
const RE_ITAL  = /\*(.+?)\*/g;
const RE_IMG   = /!\[([^\]]*)\]\(([^)]+)\)/g;
const RE_LINK  = /\[([^\]]+)\]\(([^)]+)\)/g;

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function parseMD(src) {
  let codes = [];
  src = src.replace(RE_FENCE, (_, lang, code) => {
    codes.push({ lang, code: code.replace(/^\n|\n$/g, '') });
    return `«CODE${codes.length - 1}»`;
  });
  let inlines = [];
  src = src.replace(RE_CODE, (_, code) => {
    inlines.push(code);
    return `«I${inlines.length - 1}»`;
  });

  function unesc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function _inline(text) {
    text = text.replace(RE_BOLD, '<strong>$1</strong>');
    text = text.replace(RE_ITAL, '<em>$1</em>');
    text = text.replace(RE_IMG, '<img src="$2" alt="$1" loading="lazy">');
    text = text.replace(RE_LINK, '<a href="$2">$1</a>');
    text = text.replace(/«I(\d+)»/g, (_, i) => `<code>${unesc(inlines[+i])}</code>`);
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  function _fence(idx) {
    const c = codes[+idx];
    return `<pre><code>${unesc(c.code)}</code></pre>`;
  }

  function _table(block) {
    const lines = block.split('\n').filter(l => l.includes('|'));
    if (lines.length < 2) return null;
    if (!/^[\s|:-]+$/.test(lines[1].replace(/\|/g, ''))) return null;
    const headers = lines[0].split('|').filter(c => c.trim()).map(c => c.trim());
    let t = '<table><thead><tr>' + headers.map(h => `<th>${_inline(h)}</th>`).join('') + '</tr></thead><tbody>';
    for (let i = 2; i < lines.length; i++) {
      const cells = lines[i].split('|').filter(c => c.trim()).map(c => c.trim());
      t += '<tr>' + cells.map(c => `<td>${_inline(c)}</td>`).join('') + '</tr>';
    }
    return t + '</tbody></table>';
  }

  const blocks = src.split(/\n\n+/);
  let html = '';

  for (let block of blocks) {
    if (!block.trim()) continue;
    let fm = block.trim().match(/^«CODE(\d+)»$/);
    if (fm) { html += _fence(fm[1]); continue; }
    if (/^[-*_]{3,}\s*$/.test(block.trim())) { html += '<hr>'; continue; }
    let hm = block.match(/^(#{1,6})\s+(.*?)(?:\s+\{#[\w-]+\})?\s*$/m);
    if (hm && !block.includes('\n')) {
      html += `<h${hm[1].length}>${_inline(hm[2])}</h${hm[1].length}>`;
      continue;
    }
    if (/^>\s/.test(block)) {
      const inner = block.split('\n').map(l => l.replace(/^>\s?/, '')).join('\n');
      html += `<blockquote><p>${_inline(inner)}</p></blockquote>`;
      continue;
    }
    if (/^[-*+]\s/.test(block)) {
      const items = block.split('\n').filter(l => /^[-*+]\s/.test(l)).map(l => l.replace(/^[-*+]\s/, ''));
      html += '<ul>' + items.map(i => `<li>${_inline(i)}</li>`).join('') + '</ul>';
      continue;
    }
    if (/^\d+\.\s/.test(block)) {
      const items = block.split('\n').filter(l => /^\d+\.\s/.test(l)).map(l => l.replace(/^\d+\.\s/, ''));
      html += '<ol>' + items.map(i => `<li>${_inline(i)}</li>`).join('') + '</ol>';
      continue;
    }
    if (block.includes('|')) {
      const tbl = _table(block);
      if (tbl) { html += tbl; continue; }
    }
    html += `<p>${_inline(block)}</p>`;
  }
  return html;
}

/* ── Frontmatter parser ── */
function parseFrontmatter(text) {
  let body = text, meta = {};
  if (text.startsWith('---')) {
    const end = text.indexOf('---', 4);
    if (end !== -1) {
      const fm = text.slice(4, end);
      body = text.slice(end + 3).trim();
      fm.split('\n').forEach(line => {
        const [k, ...v] = line.split(':');
        if (k && v.length) meta[k.trim()] = v.join(':').trim();
      });
    }
  }
  return { meta, body };
}

/* ── HTML shell ── */
function shell(title, content, breadcrumbs, meta) {
  const bc = breadcrumbs || '';
  const dateStr = meta.date ? `<span class="bc-meta">${esc(meta.date)}</span>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} — trending.md</title>
<meta name="description" content="Dense trending signals optimized for agentic web search. Markdown-first.">
<meta name="robots" content="index, follow, max-snippet:-1">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📈</text></svg>">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="Dense trending information optimized for agentic web search. Markdown-first.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://trending.md">
<style>
  :root {
    --bg: #fafafa; --surface: #fff; --border: #e5e5e5;
    --text: #1a1a1a; --text-secondary: #6b6b6b; --text-tertiary: #9b9b9b;
    --accent: #2563eb; --accent-dim: #dbeafe; --tag-bg: #f3f4f6; --tag-text: #4b5563;
    --divider: #f0f0f0; --code-bg: #f5f5f5; --blockquote-border: #2563eb;
    --table-border: #e5e5e5; --table-stripe: #fafafa;
    --velocity-hot: #dc2626; --velocity-up: #16a34a;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0d0d0d; --surface: #171717; --border: #2a2a2a;
      --text: #ededed; --text-secondary: #a0a0a0; --text-tertiary: #6b6b6b;
      --accent: #60a5fa; --accent-dim: #1e3a5f; --tag-bg: #1f1f1f; --tag-text: #9ca3af;
      --divider: #1f1f1f; --code-bg: #1a1a1a; --table-border: #2a2a2a; --table-stripe: #1a1a1a;
    }
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased;
  }
  header { border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--surface) 92%, transparent); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 10; }
  .header-inner { max-width: 820px; margin: 0 auto; padding: 16px 20px; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  .logo { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text); text-decoration: none; }
  .logo span { color: var(--accent); }
  .header-nav { display: flex; gap: 14px; font-size: 0.82rem; }
  .header-nav a { color: var(--text-secondary); text-decoration: none; }
  .header-nav a:hover, .header-nav a.active { color: var(--accent); }
  .header-nav a.active { font-weight: 600; }
  main { max-width: 820px; margin: 0 auto; padding: 0 20px 60px; }
  .breadcrumb { display: flex; gap: 6px; padding: 14px 0 6px; flex-wrap: wrap; font-size: 0.8rem; }
  .breadcrumb a, .breadcrumb span { padding: 4px 10px; border-radius: 4px; text-decoration: none; color: var(--text-secondary); background: var(--tag-bg); }
  .breadcrumb a:hover { background: var(--accent-dim); color: var(--accent); }
  .breadcrumb .current { background: var(--accent); color: #fff; }
  .breadcrumb .bc-meta { color: var(--text-tertiary); padding: 4px 6px; font-size: 0.72rem; }
  .content { padding-top: 8px; }
  .content h1 { font-size: 1.4rem; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.02em; }
  .content h2 { font-size: 1.05rem; font-weight: 700; margin: 32px 0 10px; padding-top: 16px; border-top: 1px solid var(--divider); letter-spacing: -0.01em; }
  .content h2:first-of-type { border-top: none; margin-top: 8px; }
  .content h3 { font-size: 0.9rem; font-weight: 600; margin: 16px 0 4px; color: var(--text-secondary); }
  .content p { font-size: 0.88rem; margin: 6px 0; color: var(--text-secondary); }
  .content a { color: var(--accent); text-decoration: none; }
  .content a:hover { text-decoration: underline; }
  .content strong { color: var(--text); font-weight: 600; }
  .content ul, .content ol { padding-left: 20px; margin: 6px 0; }
  .content li { font-size: 0.86rem; margin: 2px 0; color: var(--text-secondary); }
  .content li strong { color: var(--text); }
  .content blockquote { border-left: 3px solid var(--blockquote-border); padding: 4px 14px; margin: 8px 0; background: var(--accent-dim); border-radius: 0 4px 4px 0; font-size: 0.84rem; color: var(--text-secondary); }
  .content code { font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace; font-size: 0.8rem; background: var(--code-bg); padding: 1px 5px; border-radius: 3px; color: var(--text); }
  .content pre { background: var(--code-bg); padding: 12px 16px; border-radius: 6px; overflow-x: auto; margin: 8px 0; font-size: 0.8rem; line-height: 1.5; }
  .content pre code { background: none; padding: 0; }
  .content table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 0.84rem; }
  .content th, .content td { padding: 8px 12px; text-align: left; border-bottom: 1px solid var(--table-border); }
  .content th { font-weight: 600; color: var(--text); background: var(--table-stripe); }
  .content tr:nth-child(even) td { background: var(--table-stripe); }
  .content hr { border: none; border-top: 1px solid var(--divider); margin: 20px 0; }
  .content h2 code { font-size: 0.75rem; background: var(--tag-bg); }
  footer { max-width: 820px; margin: 0 auto; padding: 20px; border-top: 1px solid var(--border); font-size: 0.76rem; color: var(--text-tertiary); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  footer a { color: var(--text-secondary); }
  footer a:hover { color: var(--accent); }
  .agent-hint { font-size: 0.72rem; color: var(--text-tertiary); margin-top: 2px; }
  .vel-hot { color: var(--velocity-hot); font-weight: 700; }
  .vel-up { color: var(--velocity-up); font-weight: 600; }
  @media (max-width: 600px) { .header-inner { padding: 12px 16px; } main { padding: 0 16px 40px; } .content h1 { font-size: 1.2rem; } .content h2 { font-size: 0.95rem; } }
</style>
</head>
<body>
<header>
  <div class="header-inner">
    <a href="/" class="logo">trending<span>.md</span></a>
    <nav class="header-nav">
      <a href="/" class="active">feed</a>
      <a href="/about">about</a>
      <a href="/archive/">archive</a>
      <a href="https://github.com/takoyaki-baron/trending-md">github</a>
    </nav>
  </div>
</header>
<main>
  <div class="breadcrumb">${bc}${dateStr}</div>
  <div class="content">
${content}
  </div>
</main>
<footer>
  <div><strong>trending.md</strong> — Markdown-first trending signals.<br><span class="agent-hint">🤖 Agents: <code>curl https://trending.md/feed/latest.md</code></span></div>
  <div><a href="/feed/latest.md">raw md</a> · <a href="/about">about</a> · <a href="https://github.com/takoyaki-baron/trending-md">github</a></div>
</footer>
</body>
</html>`;
}

/* ── Build pages ── */
function buildPage(mdPath, htmlPath, title, breadcrumbs) {
  const md = fs.readFileSync(mdPath, 'utf8');
  const { meta, body } = parseFrontmatter(md);
  const content = parseMD(body);
  const html = shell(title || meta.title || 'trending.md', content, breadcrumbs || '', meta);
  const dir = path.dirname(htmlPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(htmlPath, html);
  console.log(`  ✓ ${htmlPath}`);
}

// Clean dist
const dist = path.join(ROOT, 'dist');
if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true });
fs.mkdirSync(dist, { recursive: true });

console.log('Building static pages…\n');

// Homepage — latest feed
buildPage('feed/2026-08-11.md', 'dist/index.html', 'Latest Trending Signals',
  '<span class="current">feed</span>');

// Feed index
buildPage('feed/index.md', 'dist/feed/index.html', 'Feed Index',
  '<a href="/">feed</a> <span class="current">index.md</span>');

// Individual feed days
for (const day of ['2026-08-09', '2026-08-10', '2026-08-11']) {
  buildPage(`feed/${day}.md`, `dist/feed/${day}.html`, `Trending — ${day}`,
    `<a href="/">feed</a> <span class="current">${day}.md</span>`);
}

// Archive
buildPage('archive/index.md', 'dist/archive/index.html', 'Archive',
  '<a href="/">feed</a> <a href="/archive/">archive</a> <span class="current">index.md</span>');

// About
buildPage('about.md', 'dist/about.html', 'About',
  '<span class="current">about.md</span>');

// Copy raw assets (markdown feeds, llms.txt, sitemap.xml, _headers)
const assets = [
  '_headers', 'llms.txt', 'sitemap.xml',
  'about.md',
  'feed/latest.md', 'feed/2026-08-09.md', 'feed/2026-08-10.md', 'feed/2026-08-11.md', 'feed/index.md',
  'archive/index.md',
];
console.log('');
for (const a of assets) {
  const src = path.join(ROOT, a);
  const dst = path.join(dist, a);
  const d = path.dirname(dst);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.copyFileSync(src, dst);
  console.log(`  → ${a}`);
}

console.log('\nDone. Deploy-ready static site in dist/');
