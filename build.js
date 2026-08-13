#!/usr/bin/env node
/* build.js — Pre-render all .md files to static .html pages with i18n
   Fully data-driven: add a language in i18n.js + create <code>/ dir → nothing else changes. */
const fs = require('fs');
const path = require('path');
const { strings, langs, defaultLang } = require('./i18n.js');

const ROOT = __dirname;

/* ── Markdown parser ── */
const RE_FENCE = /```(\w*)\n([\s\S]*?)```/g;
const RE_CODE  = /`([^`]+)`/g;
const RE_BOLD  = /\*\*(.+?)\*\*/g;
const RE_ITAL  = /\*(.+?)\*/g;
const RE_IMG   = /!\[([^\]]*)\]\(([^)]+)\)/g;
const RE_LINK  = /\[([^\]]+)\]\(([^)]+)\)/g;
const RE_WIKI  = /\[\[([^\]]+)\]\]/g;   // [[topic]] → internal knowledge-library link

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function parseMD(src, lang) {
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
    text = text.replace(RE_WIKI, (_, t) => `<a href="/${lang}/agent/knowledge/${t}/">${t}</a>`);

    // Protect anchors produced above so the auto-linkifiers don't re-wrap them.
    const anchors = [];
    text = text.replace(/<a\b[^>]*>.*?<\/a>/g, m => { anchors.push(m); return `«A${anchors.length - 1}»`; });

    // Auto-link bare URLs and CVE IDs — a valid link beats plain text.
    text = text.replace(/https?:\/\/[^\s<"«»]+/g, (m) => {
      const url = m.replace(/[.,;:!?)\]]+$/, '');
      return `<a href="${url}">${url}</a>`;
    });
    text = text.replace(/\b(CVE-\d{4}-\d{4,7})\b/g, '<a href="https://www.cve.org/CVERecord?id=$1">$1</a>');

    // Restore anchors.
    text = text.replace(/«A(\d+)»/g, (_, i) => anchors[+i]);

    // Inline code: linkify bare owner/repo slugs to their GitHub repo.
    text = text.replace(/«I(\d+)»/g, (_, i) => {
      const c = inlines[+i];
      if (/^[A-Za-z0-9][A-Za-z0-9_.-]*\/[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(c)
          && !/\.(md|json|html?|toml|ya?ml|jsx?|tsx?|css|sh|py|jsonc)$/i.test(c)) {
        return `<a href="https://github.com/${c}"><code>${unesc(c)}</code></a>`;
      }
      return `<code>${unesc(c)}</code>`;
    });

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

  function _listItems(block, markerRe) {
    const items = [];
    let cur = null;
    for (const line of block.split('\n')) {
      if (markerRe.test(line)) {
        if (cur !== null) items.push(cur);
        cur = line.replace(markerRe, '').trim();
      } else if (cur !== null) {
        cur += ' ' + line.trim();
      }
    }
    if (cur !== null) items.push(cur);
    return items;
  }

  // Render leading task-list markers (- [ ] / - [~] / - [x]) as styled checkboxes.
  function _checkbox(s) {
    return s.replace(/^\[([ xX~])\]\s+/, (_, m) => {
      const cls = m === ' ' ? 'todo-open' : (m === '~' ? 'todo-doing' : 'todo-done');
      const glyph = m === ' ' ? '☐' : (m === '~' ? '◐' : '☑');
      return `<span class="todo ${cls}">${glyph}</span> `;
    });
  }

  const blocks = src.split(/\n\n+/);
  let html = '';

  for (let block of blocks) {
    if (!block.trim()) continue;
    let fm = block.trim().match(/^«CODE(\d+)»$/);
    if (fm) { html += _fence(fm[1]); continue; }
    if (/^[-*_]{3,}\s*$/.test(block.trim())) { html += '<hr>'; continue; }
    let hm = block.match(/^(#{1,6})\s+(.*?)(?:\s+\{#[\w-]+\})?\s*$/m);
    if (hm && block.indexOf(hm[0]) === 0) {
      html += `<h${hm[1].length}>${_inline(hm[2].trim())}</h${hm[1].length}>`;
      const rest = block.slice(hm[0].length).trim();
      if (rest) {
        if (/^[-*+]\s/.test(rest)) {
          html += '<ul>' + _listItems(rest, /^[-*+]\s/).map(i => `<li>${_inline(_checkbox(i))}</li>`).join('') + '</ul>';
        } else if (/^\d+\.\s/.test(rest)) {
          html += '<ol>' + _listItems(rest, /^\d+\.\s/).map(i => `<li>${_inline(_checkbox(i))}</li>`).join('') + '</ol>';
        } else if (rest.includes('|')) {
          const tbl = _table(rest);
          html += tbl ? tbl : `<p>${_inline(rest)}</p>`;
        } else {
          html += `<p>${_inline(rest)}</p>`;
        }
      }
      continue;
    }
    if (/^>\s/.test(block)) {
      const inner = block.split('\n').map(l => l.replace(/^>\s?/, '')).join('\n');
      html += `<blockquote><p>${_inline(inner)}</p></blockquote>`;
      continue;
    }
    if (/^[-*+]\s/.test(block)) {
      html += '<ul>' + _listItems(block, /^[-*+]\s/).map(i => `<li>${_inline(_checkbox(i))}</li>`).join('') + '</ul>';
      continue;
    }
    if (/^\d+\.\s/.test(block)) {
      html += '<ol>' + _listItems(block, /^\d+\.\s/).map(i => `<li>${_inline(_checkbox(i))}</li>`).join('') + '</ol>';
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

/* ── Structured data extractor for JSON-LD ── */
function extractItems(body) {
  const items = [];
  const sections = body.split(/\n## \d+\. /);
  for (let i = 1; i < sections.length; i++) {
    const sec = sections[i];
    const lines = sec.split('\n');
    const title = lines[0].trim();
    let velocity = '', source = '', points = '', age = '';
    const tags = [];
    let desc = '', whyItMatters = '', benchmark = '';
    const links = [];
    let phase = 'meta';

    for (let j = 1; j < lines.length; j++) {
      const l = lines[j].trim();
      if (!l) continue;

      if (l.startsWith('- **Velocity:**')) {
        const v = l.replace(/^- \*\*Velocity:\*\*\s*/, '');
        velocity = v.includes('trending') ? 'trending' : v.includes('rising') ? 'rising' : 'steady';
      } else if (l.startsWith('- **Source:**')) {
        const src = l.replace(/^- \*\*Source:\*\*\s*/, '');
        const ptsMatch = src.match(/([\d,]+)\+?\s*pts?/);
        if (ptsMatch) points = ptsMatch[1].replace(/,/g, '');
        const ageMatch = src.match(/(\d+h)\s*ago/);
        if (ageMatch) age = ageMatch[1];
        source = src.replace(/\s*·\s*[\d,+]+\s*pts?\s*·\s*\d+h\s*ago.*/, '').trim();
      } else if (l.startsWith('- **Tags:**')) {
        const tagStr = l.replace(/^- \*\*Tags:\*\*\s*/, '');
        tagStr.replace(/`([^`]+)`/g, (_, t) => tags.push(t));
        phase = 'content';
      } else if (l.startsWith('**Why it matters:**')) {
        whyItMatters = l.replace(/\*\*Why it matters:\*\*\s*/, '');
        phase = 'why';
      } else if (l.startsWith('> ')) {
        benchmark += (benchmark ? ' · ' : '') + l.replace(/^>\s?/, '');
        phase = 'benchmark';
      } else if (l.startsWith('[`🔗')) {
        const m = l.match(/\[`[^`]*`\]\(([^)]+)\)/g);
        if (m) m.forEach(lk => {
          const lm = lk.match(/\[`([^`]*)`\]\(([^)]+)\)/);
          if (lm) links.push({ label: lm[1].replace(/^🔗\s*/, ''), url: lm[2] });
        });
      } else if (l.startsWith('---')) {
        break;
      } else if (phase === 'content' && !l.startsWith('**Why') && !l.startsWith('>') && !l.startsWith('[`')) {
        desc += (desc ? ' ' : '') + l;
      }
    }

    items.push({ id: i, title, velocity, source, points: parseInt(points) || 0, age, tags, description: desc, whyItMatters, benchmark, links });
  }
  return items;
}

function generateJSONLD(items, meta, lang) {
  const base = `/${lang}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'trending.md — Trending Signals',
    description: 'Dense trending information ranked by velocity',
    dateCreated: meta.date || '',
    dateModified: meta.updated || '',
    numberOfItems: items.length,
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.id,
      item: {
        '@type': 'Article',
        name: item.title,
        url: `https://trending.md${base}/feed/${meta.date || 'latest'}#item-${item.id}`,
        description: item.description,
        about: item.tags.join(', '),
        headline: item.title,
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'velocity', value: item.velocity },
        { '@type': 'PropertyValue', name: 'source', value: item.source },
        { '@type': 'PropertyValue', name: 'points', value: item.points },
        { '@type': 'PropertyValue', name: 'age', value: item.age },
        { '@type': 'PropertyValue', name: 'tags', value: item.tags.join(', ') },
        { '@type': 'PropertyValue', name: 'whyItMatters', value: item.whyItMatters },
        { '@type': 'PropertyValue', name: 'benchmark', value: item.benchmark },
      ],
      citation: item.links.map(l => ({
        '@type': 'CreativeWork', name: l.label, url: l.url,
      })),
    })),
  });
}

/* ── Semantic HTML post-processor ── */
function semanticHTML(html, items) {
  for (const item of items) {
    const vel = item.velocity;
    html = html.replace(
      new RegExp(`(<h2>${item.id}\\. .+?</h2>)`, ''),
      (_m, h2) => `<article id="item-${item.id}" data-velocity="${vel}" data-points="${item.points}" data-tags="${item.tags.join(',')}">${h2}`
    );
  }
  html = html.replace(/<hr>/g, '</article><hr>');
  html = html.replace(/<h2>Metadata<\/h2>/, '</article><h2>Metadata</h2>');
  html = html.replace(/<div class="content">\n/, '<div class="content">\n<article id="intro">');
  html = html.replace(/(<article id="item-1")/, '</article>$1');
  return html;
}

/* ── HTML shell (i18n-aware, fully data-driven) ── */
function shell(title, content, breadcrumbs, meta, activeNav, lang, jsonld) {
  const s = strings[lang] || strings.en;
  const base = `/${lang}`;

  // Language dropdown: all languages, current one selected
  const langOptions = langs.map(l => {
    const ls = strings[l];
    const sel = l === lang ? ' selected' : '';
    return `<option value="/${l}/"${sel}>${ls.label}</option>`;
  }).join('');
  const langSelect = `<select class="lang-select" onchange="if(this.value)window.location=this.value" aria-label="Language">${langOptions}</select>`;

  const nav = activeNav || 'feed';
  const navLink = (href, label, key) =>
    `<a href="${href}"${key === nav ? ' class="active"' : ''}>${label}</a>`;

  const bc = breadcrumbs || '';
  const dateStr = meta.date ? `<span class="bc-meta">${esc(meta.date)}</span>` : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} — trending.md</title>
<meta name="description" content="${esc(s.siteDesc)}">
<meta name="robots" content="index, follow, max-snippet:-1">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📈</text></svg>">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(s.ogDesc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://trending.md${base}/">
${jsonld ? `<script type="application/ld+json">\n${jsonld}\n</script>` : ''}
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", "Hiragino Sans", "Hiragino Kaku Gothic ProN", sans-serif;
    background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased;
  }
  header { border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--surface) 92%, transparent); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 10; }
  .header-inner { max-width: 820px; margin: 0 auto; padding: 16px 20px; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  .logo { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text); text-decoration: none; }
  .logo span { color: var(--accent); }
  .header-nav { display: flex; gap: 14px; font-size: 0.82rem; align-items: baseline; }
  .header-nav a { color: var(--text-secondary); text-decoration: none; }
  .header-nav a:hover, .header-nav a.active { color: var(--accent); }
  .header-nav a.active { font-weight: 600; }
  .lang-select { font-size: 0.76rem; padding: 3px 6px; border: 1px solid var(--border); border-radius: 4px; background: var(--surface); color: var(--text-secondary); cursor: pointer; margin-left: 4px; }
  .lang-select:focus { outline: none; border-color: var(--accent); }
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
  .content li .todo { display: inline-block; width: 1.2em; text-align: center; font-weight: 700; margin-left: -1.2em; }
  .todo-open { color: var(--text-tertiary); }
  .todo-doing { color: var(--accent); }
  .todo-done { color: var(--velocity-up); }
  .vel-hot { color: var(--velocity-hot); font-weight: 700; }
  .vel-up { color: var(--velocity-up); font-weight: 600; }
  @media (max-width: 600px) { .header-inner { padding: 12px 16px; } main { padding: 0 16px 40px; } .content h1 { font-size: 1.2rem; } .content h2 { font-size: 0.95rem; } }
</style>
</head>
<body>
<header>
  <div class="header-inner">
    <a href="${base}/" class="logo">trending<span>.md</span></a>
    <nav class="header-nav">
      ${navLink(`${base}/`, s.navFeed, 'feed')}
      ${navLink(`${base}/about`, s.navAbout, 'about')}
      ${navLink(`${base}/agent/`, s.navAgent, 'agent')}
      ${navLink(`${base}/action/`, s.navAction, 'action')}
      ${navLink(`${base}/agent/knowledge/`, s.navKnowledge, 'knowledge')}
      ${navLink(`${base}/archive/`, s.navArchive, 'archive')}
      ${navLink(`${base}/sources/`, s.navSources, 'sources')}
      <a href="https://github.com/takoyaki-baron/trending-md">${s.navGitHub}</a>
      ${langSelect}
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
  <div><strong>${s.footerTitle}</strong><br><span class="agent-hint">🤖 ${s.footerAgent} <code>curl https://trending.md${base}/feed/latest.md</code></span></div>
  <div><a href="${base}/feed/latest.md">${s.footerRaw}</a> · <a href="${base}/about">${s.footerAbout}</a> · <a href="https://github.com/takoyaki-baron/trending-md">github</a></div>
</footer>
</body>
</html>`;
}

/* ── Build pages ── */
function buildPage(mdPath, htmlPath, title, breadcrumbs, activeNav, lang) {
  const md = fs.readFileSync(path.join(ROOT, mdPath), 'utf8');
  const { meta, body } = parseFrontmatter(md);
  let content = parseMD(body, lang);

  let jsonld = null;
  if (mdPath.includes('feed/20')) {  // daily feed pages
    const items = extractItems(body);
    jsonld = generateJSONLD(items, meta, lang);
    content = semanticHTML(content, items);
  }

  const html = shell(title || meta.title || 'trending.md', content, breadcrumbs || '', meta, activeNav || 'feed', lang, jsonld);
  const dir = path.dirname(htmlPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(htmlPath, html);
  console.log(`  ✓ ${htmlPath}`);
}

/* ── Discover feed days from source directory ── */
function discoverFeedDays(srcDir) {
  const dir = path.join(ROOT, srcDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f) && f !== 'latest.md')
    .map(f => f.replace('.md', ''))
    .sort()
    .reverse();  // newest first for homepage
}

/* ── Discover knowledge-library topics for a locale (agent/knowledge/<lang>/*.md) ── */
function discoverKnowledgeTopics(lang) {
  const dir = path.join(ROOT, 'agent', 'knowledge', lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(f => f.replace(/\.md$/, ''))
    .sort();
}

/* ── Sources aggregation (domain → citation stats + co-citation graph) ── */
const SOURCE_ALIASES = {
  'raw.githubusercontent.com': 'github.com',
  'github.githubassets.com': 'github.com',
  'blog.csdn.net': 'csdn.net', 'agent.csdn.net': 'csdn.net', 'adg.csdn.net': 'csdn.net',
  'eu.36kr.com': '36kr.com',
  'm.thepaper.cn': 'thepaper.cn',
  'tech.yahoo.com': 'yahoo.com', 'finance.yahoo.com': 'yahoo.com',
  'en.theblockbeats.news': 'theblockbeats.news',
  'app.primeintellect.ai': 'primeintellect.ai',
};

function normalizeHost(url) {
  try {
    let h = new URL(url).hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '');
    return SOURCE_ALIASES[h] || h;
  } catch (e) { return null; }
}

const SOURCE_CATEGORIES = ['code', 'vendor', 'news', 'security', 'research', 'community', 'data', 'other'];
const SRC_CAT_COLORS = {
  code: '#2563eb', vendor: '#16a34a', news: '#ea580c', security: '#dc2626',
  research: '#9333ea', community: '#0891b2', data: '#ca8a04', other: '#6b7280',
};

function classifyDomain(host, curated) {
  const c = curated[host];
  if (c && c.cat) return c.cat;
  if (/^(github|gitlab|bitbucket|gitee)\./.test(host) || /(npmjs\.com|pypi\.org|crates\.io|huggingface\.co)$/.test(host)) return 'code';
  if (host === 'arxiv.org' || /papers\.cool$/.test(host)) return 'research';
  if (host === 'news.ycombinator.com' || /dev\.to$/.test(host) || /reddit\.com$/.test(host) || /hellogithub/.test(host) || /stackoverflow/.test(host)) return 'community';
  if (/cve|cisa\.gov|nist|vuldb|security|hackernews|darkreading|csoonline|fieldeffect|msrc|cybersecurity/i.test(host)) return 'security';
  if (/star|trend|stats|llm-stats|artificialanalysis|analytics|knownagents|whatstrending|topaiproduct|ranking|radar|history/i.test(host)) return 'data';
  if (/blog|news|daily|weekly|times|post|media|press|journal|techcrunch|thenextweb|cnbc|fortune|arstechnica|36kr|csdn|scmp|pandaily|theblockbeats|gigazine|cnbctv18/i.test(host)) return 'news';
  return 'other';
}

function extractSources() {
  const dir = path.join(ROOT, 'en', 'feed');
  if (!fs.existsSync(dir)) return { counts: {}, cooc: {}, totalItems: 0, days: 0, latest: '' };
  const files = fs.readdirSync(dir).filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort();
  const counts = {}, cooc = {};
  let totalItems = 0;
  const URL_RE = /https?:\/\/[^\s"'<>`)\]]+/g;

  for (const f of files) {
    const body = parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8')).body;
    const sections = body.split(/\n## \d+\. /);
    for (let i = 1; i < sections.length; i++) {
      totalItems++;
      const hosts = new Set();
      const urls = sections[i].match(URL_RE) || [];
      for (const u of urls) {
        const h = normalizeHost(u.replace(/[.,;:!?»]+$/, ''));
        if (!h) continue;
        counts[h] = (counts[h] || 0) + 1;
        hosts.add(h);
      }
      const arr = Array.from(hosts);
      for (let a = 0; a < arr.length; a++) {
        for (let b = a + 1; b < arr.length; b++) {
          const key = [arr[a], arr[b]].sort().join('|');
          cooc[key] = (cooc[key] || 0) + 1;
        }
      }
    }
  }
  return { counts, cooc, totalItems, days: files.length, latest: files[files.length - 1] || '' };
}

function sourcesEntries(data, curated) {
  return Object.keys(data.counts).map(host => {
    const count = data.counts[host];
    return {
      host,
      count,
      cat: classifyDomain(host, curated),
      note: (curated[host] && curated[host]) || null,
    };
  }).sort((a, b) => b.count - a.count || a.host.localeCompare(b.host));
}

function buildGraph(entries, cooc, topN) {
  const top = entries.slice(0, topN);
  const idx = {};
  top.forEach((e, i) => { idx[e.host] = i; });
  const nodes = top.map(e => ({ id: e.host, c: e.count, cat: e.cat }));
  const edges = [];
  for (const key of Object.keys(cooc)) {
    const parts = key.split('|');
    const a = idx[parts[0]], b = idx[parts[1]];
    if (a !== undefined && b !== undefined) edges.push({ s: a, t: b, w: cooc[key] });
  }
  return { nodes, edges };
}

function buildSourcesContent(lang, data, curated) {
  const s = strings[lang];
  const catLabels = {
    code: s.catCode, vendor: s.catVendor, news: s.catNews, security: s.catSecurity,
    research: s.catResearch, community: s.catCommunity, data: s.catData, other: s.catOther,
  };
  const entries = sourcesEntries(data, curated);
  const total = entries.reduce((n, e) => n + e.count, 0);
  const max = entries.length ? entries[0].count : 1;

  const stats = [
    { k: s.srcStatDomains, v: entries.length },
    { k: s.srcStatCitations, v: total },
    { k: s.srcStatDays, v: data.days },
    { k: s.srcStatItems, v: data.totalItems },
  ];
  const legend = SOURCE_CATEGORIES.map(c => `<span class="src-cat src-cat-${c}">${catLabels[c]}</span>`).join(' ');

  const rows = entries.map((e, i) => {
    const barW = (e.count / max * 100).toFixed(1);
    const note = e.note && e.note[lang] ? esc(e.note[lang]) : `<em>${esc(s.srcUnclassified)}</em>`;
    return `<tr>
      <td class="src-rank">${i + 1}</td>
      <td class="src-host"><a href="https://${e.host}" rel="nofollow noopener" target="_blank">${e.host}</a></td>
      <td class="src-count">${e.count}<span class="src-barwrap"><span class="src-bar" style="width:${barW}%"></span></span></td>
      <td class="src-catcol"><span class="src-cat src-cat-${e.cat}">${catLabels[e.cat]}</span></td>
      <td class="src-notecol">${note}</td>
    </tr>`;
  }).join('');

  const graph = buildGraph(entries, data.cooc, 40);

  return `<style>
  .src-stats { display: flex; gap: 10px; flex-wrap: wrap; margin: 12px 0; }
  .src-stat { flex: 1 1 120px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; }
  .src-stat b { display: block; font-size: 1.3rem; color: var(--text); }
  .src-stat span { font-size: 0.72rem; color: var(--text-tertiary); }
  .src-cat { display: inline-block; font-size: 0.68rem; padding: 1px 7px; border-radius: 9px; color: #fff; white-space: nowrap; }
  .src-cat-code { background: #2563eb; } .src-cat-vendor { background: #16a34a; }
  .src-cat-news { background: #ea580c; } .src-cat-security { background: #dc2626; }
  .src-cat-research { background: #9333ea; } .src-cat-community { background: #0891b2; }
  .src-cat-data { background: #ca8a04; } .src-cat-other { background: #6b7280; }
  .src-legend { display: flex; gap: 6px; flex-wrap: wrap; margin: 6px 0 4px; }
  #src-graph { border: 1px solid var(--border); border-radius: 8px; background: var(--surface); overflow: hidden; margin: 8px 0 16px; }
  #src-graph svg { display: block; }
  #src-graph text { font-family: inherit; }
  .src-table { font-size: 0.8rem; }
  .src-table td { vertical-align: middle; }
  .src-rank { color: var(--text-tertiary); width: 2em; text-align: right; }
  .src-host a { font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 0.78rem; }
  .src-count { white-space: nowrap; color: var(--text); font-weight: 600; }
  .src-barwrap { display: block; width: 70px; height: 4px; background: var(--divider); border-radius: 2px; margin-top: 2px; }
  .src-bar { display: block; height: 100%; background: var(--accent); border-radius: 2px; }
  .src-catcol { white-space: nowrap; }
  .src-notecol { color: var(--text-secondary); font-size: 0.78rem; min-width: 220px; }
  .src-notecol em { color: var(--text-tertiary); }
  </style>
<h1>${esc(s.sourcesTitle)}</h1>
<p>${esc(s.srcIntro)}</p>
<div class="src-stats">${stats.map(x => `<div class="src-stat"><b>${x.v}</b><span>${x.k}</span></div>`).join('')}</div>
<h2>${esc(s.srcGraphTitle)}</h2>
<div class="src-legend">${legend}</div>
<div id="src-graph"></div>
<script>
(function () {
  var DATA = ${JSON.stringify(graph)};
  var COLORS = ${JSON.stringify(SRC_CAT_COLORS)};
  var el = document.getElementById('src-graph');
  if (!el || !DATA.nodes.length) return;
  var W = 800, H = 560, cx = W / 2, cy = H / 2;
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.setAttribute('width', '100%');
  el.appendChild(svg);

  var N = DATA.nodes.length;
  var pos = [], vel = [], rad = [];
  for (var i = 0; i < N; i++) {
    var ang = (i / N) * Math.PI * 2;
    var rr = Math.min(W, H) * 0.42;
    pos.push({ x: cx + Math.cos(ang) * rr * (0.6 + 0.4 * (i % 3)), y: cy + Math.sin(ang) * rr * (0.6 + 0.4 * ((i + 1) % 3)) });
    vel.push({ x: 0, y: 0 });
    rad.push(4 + Math.sqrt(DATA.nodes[i].c) * 2.1);
  }

  var edges = [];
  for (var e = 0; e < DATA.edges.length; e++) {
    var ed = DATA.edges[e];
    var line = document.createElementNS(NS, 'line');
    line.setAttribute('stroke', 'var(--border)');
    line.setAttribute('stroke-width', (0.5 + Math.sqrt(ed.w) * 0.7).toFixed(2));
    line.setAttribute('stroke-opacity', '0.5');
    svg.appendChild(line);
    edges.push({ line: line, s: ed.s, t: ed.t });
  }

  var circles = [], labels = [];
  for (var i = 0; i < N; i++) {
    var g = document.createElementNS(NS, 'g');
    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', rad[i]);
    c.setAttribute('cx', pos[i].x);
    c.setAttribute('cy', pos[i].y);
    c.setAttribute('fill', COLORS[DATA.nodes[i].cat] || COLORS.other);
    c.setAttribute('fill-opacity', '0.82');
    c.setAttribute('stroke', 'var(--surface)');
    c.setAttribute('stroke-width', '1');
    var t = document.createElementNS(NS, 'text');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('x', pos[i].x);
    t.setAttribute('y', pos[i].y + rad[i] + 10);
    t.setAttribute('font-size', '9');
    t.setAttribute('style', 'fill:var(--text-secondary)');
    t.textContent = DATA.nodes[i].id;
    var title = document.createElementNS(NS, 'title');
    title.textContent = DATA.nodes[i].id + ' — ' + DATA.nodes[i].c + ' citations';
    c.appendChild(title);
    g.appendChild(c); g.appendChild(t);
    svg.appendChild(g);
    circles.push(c); labels.push(t);
  }

  function tick() {
    var i, j, dx, dy, d2, d, f, fx, fy;
    for (i = 0; i < N; i++) for (j = i + 1; j < N; j++) {
      dx = pos[j].x - pos[i].x; dy = pos[j].y - pos[i].y;
      d2 = dx * dx + dy * dy + 0.01; d = Math.sqrt(d2);
      f = 300 / d2;
      fx = dx / d * f; fy = dy / d * f;
      vel[i].x -= fx; vel[i].y -= fy;
      vel[j].x += fx; vel[j].y += fy;
    }
    for (i = 0; i < edges.length; i++) {
      var s = edges[i].s, t = edges[i].t;
      dx = pos[t].x - pos[s].x; dy = pos[t].y - pos[s].y;
      d = Math.sqrt(dx * dx + dy * dy) + 0.01;
      f = (d - 60) * 0.03;
      fx = dx / d * f; fy = dy / d * f;
      vel[s].x += fx; vel[s].y += fy;
      vel[t].x -= fx; vel[t].y -= fy;
    }
    for (i = 0; i < N; i++) {
      vel[i].x += (cx - pos[i].x) * 0.01;
      vel[i].y += (cy - pos[i].y) * 0.01;
    }
    for (i = 0; i < N; i++) {
      vel[i].x *= 0.85; vel[i].y *= 0.85;
      pos[i].x += vel[i].x; pos[i].y += vel[i].y;
      pos[i].x = Math.max(rad[i], Math.min(W - rad[i], pos[i].x));
      pos[i].y = Math.max(rad[i] + 4, Math.min(H - rad[i] - 12, pos[i].y));
    }
    for (i = 0; i < edges.length; i++) {
      edges[i].line.setAttribute('x1', pos[edges[i].s].x);
      edges[i].line.setAttribute('y1', pos[edges[i].s].y);
      edges[i].line.setAttribute('x2', pos[edges[i].t].x);
      edges[i].line.setAttribute('y2', pos[edges[i].t].y);
    }
    for (i = 0; i < N; i++) {
      circles[i].setAttribute('cx', pos[i].x);
      circles[i].setAttribute('cy', pos[i].y);
      labels[i].setAttribute('x', pos[i].x);
      labels[i].setAttribute('y', pos[i].y + rad[i] + 10);
    }
  }

  var steps = 260, n = 0;
  function loop() {
    tick();
    if (++n < steps) requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<h2>${esc(s.srcTableTitle)}</h2>
<table class="src-table"><thead><tr><th>#</th><th>domain</th><th>citations</th><th>category</th><th>note</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function buildSourcesMD(lang, data, curated) {
  const s = strings[lang];
  const entries = sourcesEntries(data, curated);
  const total = entries.reduce((n, e) => n + e.count, 0);
  const lines = [];
  lines.push('---');
  lines.push('title: Sources');
  lines.push(`generated: ${data.latest}`);
  lines.push(`domains: ${entries.length}`);
  lines.push(`citations: ${total}`);
  lines.push('---');
  lines.push('');
  lines.push('# Sources');
  lines.push('');
  lines.push(s.srcIntro);
  lines.push('');
  lines.push('| # | Domain | Citations | Category | Note |');
  lines.push('|---|--------|-----------|----------|------|');
  entries.forEach((e, i) => {
    const note = (e.note && e.note[lang]) ? e.note[lang].replace(/\|/g, '\\|') : '';
    lines.push(`| ${i + 1} | [${e.host}](https://${e.host}) | ${e.count} | ${e.cat} | ${note} |`);
  });
  lines.push('');
  return lines.join('\n');
}

function buildSourcesJSON(data, curated) {
  const entries = sourcesEntries(data, curated).map(e => ({
    domain: e.host,
    citations: e.count,
    category: e.cat,
    note: {
      en: (e.note && e.note.en) || '',
      zh: (e.note && e.note.zh) || '',
      jp: (e.note && e.note.jp) || '',
    },
  }));
  return {
    generated: data.latest,
    days: data.days,
    items: data.totalItems,
    totalCitations: entries.reduce((n, e) => n + e.citations, 0),
    categories: SOURCE_CATEGORIES,
    domains: entries,
  };
}

/* ── Clean + init dist ── */
const dist = path.join(ROOT, 'dist');
if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true });
fs.mkdirSync(dist, { recursive: true });

/* ══════════════════════════════════════════════════════════════════════
   BUILD — data-driven: one iteration per language, all symmetric
   ══════════════════════════════════════════════════════════════════════ */
for (const lang of langs) {
  const s = strings[lang];
  const srcPrefix = `${lang}/`;       // all languages: en/, zh/, jp/
  const base = `dist/${lang}`;
  const basePath = `/${lang}`;
  const days = discoverFeedDays(`${srcPrefix}feed`);

  console.log(`\n[${lang}] Building…`);

  if (days.length === 0) {
    console.log('  (no feed days found, skipping)');
    continue;
  }

  // Homepage — latest feed (newest day)
  buildPage(`${srcPrefix}feed/${days[0]}.md`, `${base}/index.html`, s.homeTitle,
    `<span class="current">${s.breadcrumbFeed}</span>`, 'feed', lang);

  // Feed index
  buildPage(`${srcPrefix}feed/index.md`, `${base}/feed/index.html`, s.feedIndexTitle,
    `<a href="${basePath}/">${s.breadcrumbFeed}</a> <span class="current">index.md</span>`, 'feed', lang);

  // Individual feed days
  for (const day of days) {
    const dayTitle = `${s.dayTitleMark} — ${day}`;
    buildPage(`${srcPrefix}feed/${day}.md`, `${base}/feed/${day}/index.html`, dayTitle,
      `<a href="${basePath}/">${s.breadcrumbFeed}</a> <a href="${basePath}/feed/">${day}.md</a> <span class="current">${day}.md</span>`, 'feed', lang);
  }

  // Archive
  buildPage(`${srcPrefix}archive/index.md`, `${base}/archive/index.html`, s.archiveTitle,
    `<a href="${basePath}/">${s.breadcrumbFeed}</a> <a href="${basePath}/archive/">${s.breadcrumbArchive}</a> <span class="current">index.md</span>`, 'archive', lang);

  // About
  buildPage(`${srcPrefix}about.md`, `${base}/about.html`, s.aboutTitle,
    `<span class="current">about.md</span>`, 'about', lang);

  // Learnt agent
  buildPage(`${srcPrefix}agent.md`, `${base}/agent/index.html`, s.agentTitle,
    `<span class="current">${s.navAgent}</span>`, 'agent', lang);

  // Action — the agent's self-proposed capability-expansion todos + dated log
  buildPage(`${srcPrefix}action.md`, `${base}/action/index.html`, s.actionTitle,
    `<span class="current">${s.navAction}</span>`, 'action', lang);
}

/* ── Knowledge library (learnt agent's cold-storage) — trilingual, one build per locale ── */
for (const lang of langs) {
  const s = strings[lang];
  const kBase = `${dist}/${lang}/agent/knowledge`;
  const kTopics = discoverKnowledgeTopics(lang);
  if (kTopics.length === 0) continue;

  buildPage(`agent/knowledge/${lang}/index.md`, `${kBase}/index.html`, s.knowledgeTitle,
    `<a href="/${lang}/agent/">${s.navAgent}</a> <span class="current">${s.navKnowledge}</span>`, 'knowledge', lang);
  for (const topic of kTopics) {
    const src = `agent/knowledge/${lang}/${topic}.md`;
    const { meta } = parseFrontmatter(fs.readFileSync(path.join(ROOT, src), 'utf8'));
    buildPage(src, `${kBase}/${topic}/index.html`, meta.title || topic,
      `<a href="/${lang}/agent/">${s.navAgent}</a> <a href="/${lang}/agent/knowledge/">${s.navKnowledge}</a> <span class="current">${topic}</span>`, 'knowledge', lang);
  }
}

/* ── Sources aggregation page (trilingual: HTML + raw .md + canonical JSON) ── */
const curatedSources = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'sources', 'domains.json'), 'utf8')); }
  catch (e) { return {}; }
})();
const srcData = extractSources();

for (const lang of langs) {
  const s = strings[lang];
  const srcDir = path.join(dist, lang, 'sources');
  fs.mkdirSync(srcDir, { recursive: true });
  fs.writeFileSync(path.join(srcDir, 'index.html'),
    shell(s.sourcesTitle, buildSourcesContent(lang, srcData, curatedSources),
      `<span class="current">${s.navSources}</span>`, { date: srcData.latest }, 'sources', lang, null));
  console.log(`  ✓ ${lang}/sources/index.html`);
  fs.writeFileSync(path.join(dist, lang, 'sources.md'), buildSourcesMD(lang, srcData, curatedSources));
  console.log(`  ✓ ${lang}/sources.md`);
}
fs.writeFileSync(path.join(dist, 'sources.json'), JSON.stringify(buildSourcesJSON(srcData, curatedSources), null, 2));
console.log('  ✓ sources.json');

/* ── Root redirect page — dynamic language chooser ── */
const langLinks = langs.map(l => {
  const ls = strings[l];
  return `<a href="/${l}/">${ls.label}</a>`;
}).join(' &nbsp;·&nbsp; ');

fs.writeFileSync(path.join(dist, 'index.html'), `<!DOCTYPE html>
<html lang="${defaultLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>trending.md</title>
<meta http-equiv="refresh" content="0;url=/${defaultLang}/">
<link rel="canonical" href="https://trending.md/${defaultLang}/">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px auto; max-width: 400px; text-align: center; line-height: 2; }
  a { color: #2563eb; text-decoration: none; font-size: 1.1rem; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>
<p>${langLinks}</p>
</body>
</html>`);
console.log('\n  ✓ dist/index.html (root redirect)');

/* ── Auto-generated sitemap.xml — always in sync with the build ── */
const today = new Date().toISOString().slice(0, 10);
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://trending.md/</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>`;

for (const lang of langs) {
  const base = `/${lang}`;
  const days = discoverFeedDays(`${lang}/feed`);

  // Homepage
  sitemap += `
  <url>
    <loc>https://trending.md${base}/</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>`;

  // Daily feed HTML pages
  for (const day of days) {
    sitemap += `
  <url>
    <loc>https://trending.md${base}/feed/${day}/</loc>
    <lastmod>${day}</lastmod>
    <priority>0.8</priority>
  </url>`;
  }

  // Daily feed raw .md
  for (const day of days) {
    sitemap += `
  <url>
    <loc>https://trending.md${base}/feed/${day}.md</loc>
    <lastmod>${day}</lastmod>
    <priority>0.7</priority>
  </url>`;
  }

  // Feed index, Archive, About
  sitemap += `
  <url>
    <loc>https://trending.md${base}/feed/</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://trending.md${base}/archive/</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://trending.md${base}/about</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://trending.md${base}/agent/</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://trending.md${base}/action/</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://trending.md${base}/sources/</loc>
    <priority>0.5</priority>
  </url>`;
}

// Knowledge library pages (trilingual)
for (const lang of langs) {
  const kTopics = discoverKnowledgeTopics(lang);
  if (kTopics.length === 0) continue;
  sitemap += `
  <url>
    <loc>https://trending.md/${lang}/agent/knowledge/</loc>
    <priority>0.4</priority>
  </url>`;
  for (const topic of kTopics) {
    sitemap += `
  <url>
    <loc>https://trending.md/${lang}/agent/knowledge/${topic}/</loc>
    <priority>0.4</priority>
  </url>`;
  }
}

// Backward-compat root raw .md paths (for parity)
const enDays = discoverFeedDays(`${defaultLang}/feed`);
for (const day of enDays) {
  sitemap += `
  <url>
    <loc>https://trending.md/feed/${day}.md</loc>
    <lastmod>${day}</lastmod>
    <priority>0.7</priority>
  </url>`;
}

sitemap += '\n</urlset>\n';

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log('  ✓ dist/sitemap.xml (auto-generated)');

/* ── Copy raw assets ── */
const assetsRoot = ['_headers', 'llms.txt'];
console.log('');
for (const a of assetsRoot) {
  const dst = path.join(dist, a);
  fs.copyFileSync(path.join(ROOT, a), dst);
  console.log(`  → ${a}`);
}

// Per-language raw .md copies + backward-compat root copies for default lang
for (const lang of langs) {
  const srcDir = path.join(ROOT, lang);
  if (!fs.existsSync(srcDir)) continue;

  // Collect all .md files under <lang>/
  function collectMD(dir, base) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const fp = path.join(dir, e.name);
      const rel = path.join(base, e.name);
      if (e.isDirectory()) {
        files.push(...collectMD(fp, rel));
      } else if (e.name.endsWith('.md')) {
        files.push(rel);
      }
    }
    return files;
  }

  const mdFiles = collectMD(srcDir, '');
  for (const rel of mdFiles) {
    const src = path.join(ROOT, lang, rel);
    const dst = path.join(dist, lang, rel);
    const d = path.dirname(dst);
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.copyFileSync(src, dst);
    console.log(`  → ${lang}/${rel}`);
  }

  // latest.md — copy newest day as latest
  const days = discoverFeedDays(`${lang}/feed`);
  if (days.length > 0) {
    const latestDst = path.join(dist, lang, 'feed', 'latest.md');
    if (!fs.existsSync(path.dirname(latestDst))) fs.mkdirSync(path.dirname(latestDst), { recursive: true });
    fs.copyFileSync(path.join(ROOT, lang, 'feed', `${days[0]}.md`), latestDst);
    console.log(`  → ${lang}/feed/latest.md (→ ${days[0]}.md)`);
  }

  // Backward-compat: also copy default lang to root so /feed/latest.md still works
  if (lang === defaultLang) {
    for (const rel of mdFiles) {
      const src = path.join(ROOT, lang, rel);
      const dst = path.join(dist, rel);
      const d = path.dirname(dst);
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
      fs.copyFileSync(src, dst);
      console.log(`  → ${rel} (backward-compat root)`);
    }
    // also copy latest to root
    if (days.length > 0) {
      fs.copyFileSync(path.join(ROOT, lang, 'feed', `${days[0]}.md`), path.join(dist, 'feed', 'latest.md'));
      console.log(`  → feed/latest.md (backward-compat root)`);
    }
  }
}

console.log('\nDone. Deploy-ready static site in dist/');
