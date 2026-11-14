#!/usr/bin/env node
/* Doc twin — does this page have a machine-readable sibling, and is the page even readable?
 *
 * Why this exists (filed 2026-10-23 12:45, calibrated live 2026-10-23 12:29): CLAUDE.md rule 7
 * already says "a JS-only vendor page has a machine-readable twin — find it, name it". Every run
 * then re-derives that by hand, and a single batch showed three different shapes plus a fourth
 * nobody had named:
 *
 *   twin  OpenAI docs — a banner on the HTML says "Markdown versions of documentation pages are
 *         available by appending `.md`"; the HTML is a 639 KB nav shell, the twin is 37 KB of
 *         clean Markdown that carried the exact figures the rendered page buries.
 *   plain taler.net — 47 KB HTML, content in the markup, nothing to find.
 *   gate  bleepingcomputer — a Cloudflare "Just a moment…" interstitial. This is a THIRD state:
 *         not present, not absent, *unreadable* — and it is intermittent, so a 200 on one fetch
 *         is not evidence the next fetch reads (measured: 403 interstitial, 200 real HTML minutes
 *         apart). A pass that gets one 200 and never re-checks can publish a page it never read.
 *   shell modelcontextprotocol.io — 316 KB of 200 OK HTML with the prose rendered client-side;
 *         the fact was not in the fetch. Its twin is `llms.txt` (50 KB) + `.md` URLs that 307
 *         to a versioned path — the twin exists but a naive `path + '.md'` misses it.
 *
 * The four judgement calls this tool makes, each of which was a hand-made mistake first:
 *   1. A 200 is not a twin. SPA catch-alls answer `200 text/html` for any `.md` path. A candidate only
 *      counts if its body is NOT HTML and it is not byte-identical to the original.
 *   2. A redirect is not a miss. MCP's `.md` 307s to a versioned URL; follow it and report the
 *      final URL, because that is the URL to cite.
 *   3. A gate is not a miss either. Name the marker and the status, because "I could not read it"
 *      and "it does not say that" are different sentences and only one of them is publishable.
 *   4. A hint in the HTML is the cheapest twin discovery: `rel=alternate` markdown links, an
 *      explicit "append .md" banner, or a mention of `llms.txt`.
 *
 * API-twin arm (added 2026-11-14 20:48, toninoble.com): a client-rendered SPA can serve its
 * routes as shells — toninoble.com serves the shell with an HTTP 404 STATUS on deep paths (the
 * browser renders it anyway), so the page reads "unreadable" to every fetcher while working in
 * every browser, and its `llms.txt`/`.md` candidates all 404. The content sits at the app's OWN
 * data endpoint (`/api/posts/<slug>`), and the request template is inside the bundle the shell
 * names. When the page is a shell (tiny visible text + an external script) and no page-level
 * twin was found, the tool fetches up to 2 same-origin bundles, extracts single-interpolation
 * backtick endpoint templates plus any `"/api…"` base string, substitutes the URL's own slug,
 * and accepts a candidate as THIS page's twin only when its text carries the slug (the site's
 * generic API shape is not a sibling). "No markdown twin" and "no twin" are therefore different
 * claims: the twin can be an API route no static-file probe would ever guess.
 *
 * Usage:
 *   node agent/tools/doc-twin.mjs --probe <url> [<url> ...]
 *   node agent/tools/doc-twin.mjs --probe <url> --json
 *   node agent/tools/doc-twin.mjs --ua-census [--days 7] [--max 300]   # the client-string class
 *   node agent/tools/doc-twin.mjs --selftest        # the four calibrated shapes, asserts verdicts
 *
 * Verdicts (one per URL):
 *   twin found (url)    a machine-readable sibling was fetched and verified non-HTML
 *   plain HTML ok       no twin needed — the HTML itself carries visible text
 *   auth-gated (marker) a login/session interstitial: the page exists, this session may not read it
 *   JS gate (marker)    a blocking interstitial (Cloudflare / DataDome / Akamai / PerimeterX)
 *   JS shell (script %) 200 HTML whose prose is client-rendered — look for llms.txt before citing
 *   no twin             not readable (status / empty body): neither a twin nor the page was read
 *
 * Perishability: a twin is a *site configuration*. OpenAI added its `.md` sibling at some point and
 * can remove it, and a gate is per-request. Re-probe before publishing any "the docs say" claim and
 * cite the twin URL, not the page you hoped it was.
 */
const args = process.argv.slice(2);
const has = f => args.includes(f);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : (args[i + 1] ?? dflt);
};

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const TIMEOUT_MS = 20000;
const MIN_TWIN_BYTES = 200;

/* ── gate markers: an interstitial, named ─────────────────────────────────────────────────── */
const GATES = [
  ['cloudflare-interstitial', /Just a moment\.\.\./i],
  ['cloudflare-challenge', /cf_chl_|cf-browser-verification|cdn-cgi\/challenge-platform/i],
  ['datadome', /datadome|geo\.captcha-delivery\.com/i],
  ['akamai-denied', /Reference&#32;&#35;\d|Reference #\d/i],
  ['perimeterx', /px-captcha|_pxhd/i],
  ['incapsula', /_Incapsula_Resource/i],
];
/* A bare "enable JavaScript" notice is not a gate on its own — many real pages carry it — so it
 * only counts when the page is also tiny or blocked. */
const SOFT_JS_NOTICE = /(enable|turn on)\s+javascript/i;

/* ── auth markers: a session interstitial, NOT a bot gate ─────────────────────────────────
 * An anonymous session is served a login interstitial at HTTP 200. The page exists; the server
 * has decided this session may not have it. That is a different sentence from "the page does not
 * say that", and it changes the advice: no twin will get past an authentication boundary, so the
 * second-best artifact is a third party's copy (an aggregator, a vendor mirror, a scanner feed).
 * Markers are matched on the BODY first, then on the landing URL — a redirect to an identity
 * provider leaves the marker in the URL, not in any body we ever see. */
const BODY_AUTH = [
  ['iam-rp', /IAM\s+RP\b/i],
  ['sessions-me', /\/sessions\/me\b/],
  ['iam-callback', /iam_callback/i],
  ['oidc-authorize', /target_link_uri/i],
];
/* URL markers are weaker than body markers and must never fire on their own: a documentation
 * page about OAuth lives at `/oauth/authorize` exactly as an IdP endpoint does. The one that IS
 * unambiguous is the identity PROVIDER's own host, so it is named separately; the path forms are
 * only read when the body is also thin or blocked (probe() enforces that, not this function). */
const URL_AUTH = [
  ['login-idp', /^https?:\/\/(accounts\.google\.com|login\.microsoftonline\.com|[^/]*\.okta\.com|login\.salesforce\.com)\//i],
  ['login-path', /^https?:\/\/[^/]+\/(?:login|signin|sign-in|adfs|saml2?)(?:[/?#]|$)/i],
];

function authGateFor(body, finalUrl) {
  const hay = body || '';
  for (const [name, re] of BODY_AUTH) if (re.test(hay)) return name;
  const where = finalUrl || '';
  for (const [name, re] of URL_AUTH) if (re.test(where)) return name;
  return null;
}

const isHtml = (ct, body) =>
  /html/i.test(ct || '') || /^\s*(<!doctype html|<html)/i.test(body || '');

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scriptBytes(html) {
  let n = 0;
  for (const m of html.matchAll(/<script[\s\S]*?<\/script>/gi)) n += m[0].length;
  return n;
}

async function fetchOne(url) {
  const started = Date.now();
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': UA, accept: '*/*' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const body = await res.text();
    return {
      url,
      finalUrl: res.url || url,
      redirected: (res.url || url) !== url,
      status: res.status,
      contentType: res.headers.get('content-type') || '',
      bytes: Buffer.byteLength(body),
      body,
      ms: Date.now() - started,
    };
  } catch (e) {
    return { url, finalUrl: url, status: 0, contentType: '', bytes: 0, body: '', error: e.message, ms: Date.now() - started };
  }
}

/* ── candidate derivation: what a twin can be called on this site ─────────────────────────── */
function candidates(url, html) {
  const out = [];
  const u = new URL(url);
  const path = u.pathname.replace(/\/+$/, '');
  const withPath = p => {
    const c = new URL(u.href);
    c.pathname = p;
    c.search = '';
    return c.href;
  };
  if (path && !/\.(md|txt|json|xml|html?)$/i.test(path)) {
    out.push({ kind: 'path + .md', url: withPath(path + '.md') });
  }
  if (u.pathname.endsWith('/')) {
    out.push({ kind: 'dir index.md', url: withPath(u.pathname + 'index.md') });
  }
  if (!u.search) {
    out.push({ kind: '?format=md', url: u.href + '?format=md' });
    out.push({ kind: '?format=json', url: u.href + '?format=json' });
  }
  /* llms.txt: site root, then the first path segment (docs sub-sites usually scope it there) */
  const seg = u.pathname.split('/').filter(Boolean)[0];
  out.push({ kind: 'llms.txt (root)', url: u.origin + '/llms.txt' });
  if (seg && seg !== 'llms.txt') out.push({ kind: `llms.txt (/${seg})`, url: u.origin + '/' + seg + '/llms.txt' });

  /* hints declared by the page itself come first — cheapest and most authoritative */
  const hinted = [];
  for (const m of (html || '').matchAll(/<link[^>]+rel=["']alternate["'][^>]*>/gi)) {
    const tag = m[0];
    if (/markdown|md/i.test(tag) && /href=/i.test(tag)) {
      const href = tag.match(/href=["']([^"']+)["']/i);
      if (href) hinted.push({ kind: 'rel=alternate markdown', url: new URL(href[1], url).href });
    }
  }
  /* an explicit "append .md" / "llms.txt" banner in the HTML body text */
  const text = visibleText(html || '').slice(0, 4000);
  const appendMd = /append(ing)?\s+[`"']?\.md/i.test(text);
  const mentionsLlms = /llms\.txt/i.test(text);
  return { candidates: hinted.concat(out), hints: { appendMd, mentionsLlms } };
}

function looksLikeTwin(probe, original) {
  if (!probe || probe.status !== 200) return false;
  if (probe.bytes < MIN_TWIN_BYTES) return false;
  if (isHtml(probe.contentType, probe.body)) return false; // SPA catch-all trap
  if (original && probe.body === original.body) return false; // same bytes = not a sibling
  return true;
}

/* ── API twins: the SPA's own data endpoint, derived from its bundle ──────────────────────
 * Added 2026-11-14 20:48 (toninoble.com, the item-37 quote-not-read case). A client-rendered
 * SPA serves its routes as HTML shells — and toninoble.com serves the shell with an HTTP 404
 * STATUS on deep paths (the browser renders it anyway), so the page is "unreadable" to every
 * fetcher while working in every browser. The content is one request away at the app's OWN
 * data endpoint (`/api/posts/<slug>`), and the request template sits in the bundle the shell
 * names: `getPost:e=>ut(`/posts/${encodeURIComponent(e)}`)` beside a `"/api"` base string.
 * The arm: when the page is a shell, fetch its script bundles, extract backtick endpoint
 * templates with exactly ONE interpolation, substitute the URL's own last path segment (the
 * slug), probe each candidate, and count as THIS page's twin only a response whose text
 * contains the slug — the site's generic API shape is not this page's sibling. Caps: 2
 * bundles, 8 templates, 4 probes — a probe is not a crawler. */
const API_TWIN_MAX_BUNDLES = 2;
const API_TWIN_MAX_TEMPLATES = 8;
const API_TWIN_MAX_PROBES = 4;

function isShellPage(original, textLen) {
  return (
    isHtml(original.contentType, original.body) &&
    original.body &&
    /<script[^>]+src=/.test(original.body) &&
    textLen < 400
  );
}

function apiTwinCandidates(bundleSrc) {
  const out = new Set();
  for (const m of bundleSrc.matchAll(/`([^`\\]*)`/g)) {
    const t = m[1];
    if (!t.startsWith('/') || !t.includes('${')) continue;
    const parts = t.split(/\$\{[^}]*\}/);
    if (parts.length !== 2) continue; // more than one parameter — cannot fill from the URL
    const [pre, post] = parts;
    /* the one interpolation must be a PATH slot: the static head ends with `/` (or is empty).
     * `/posts${cond?"?drafts=1":""}` — a conditional QUERY suffix — has an empty suffix after
     * splitting and reads as fillable, but substituting the slug into it joins `posts` + slug
     * with no separator. We can only ever fill a path segment from the page URL, never a query. */
    if (!(pre === '' || pre.endsWith('/'))) continue;
    if (post && /[a-z0-9]/i.test(post.replace(/\.(json|md|xml)/i, ''))) continue;
    out.add(t);
  }
  return [...out];
}

async function apiTwinArm(original, url, seen, checked, slug) {
  if (!slug) return null;
  const bundleUrls = [];
  for (const m of original.body.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)) {
    const u = new URL(m[1], url);
    if (u.origin !== new URL(url).origin) continue; // CDN analytics etc. never carry the app's API layer
    if (!/\.js(\?|$)/i.test(u.pathname + u.search)) continue;
    bundleUrls.push(u.href);
  }
  const templates = new Set();
  let bases = new Set(['']);
  let fetched = 0;
  for (const b of bundleUrls) {
    if (fetched >= API_TWIN_MAX_BUNDLES || templates.size >= API_TWIN_MAX_TEMPLATES) break;
    const p = await fetchOne(b);
    fetched++;
    checked.push({ kind: `api twin (bundle ${fetched})`, url: b, status: p.status, contentType: p.contentType, bytes: p.bytes, finalUrl: p.finalUrl, ms: p.ms });
    if (p.status !== 200) continue;
    for (const t of apiTwinCandidates(p.body)) templates.add(t);
    /* an api base lives beside the templates as a plain string ("/api") — joining it is the
     * difference between a probe of the page route (the shell again) and the data endpoint */
    for (const m of p.body.matchAll(/["'](\/api[a-z0-9/_-]*)["']/gi)) bases.add(m[1]);
  }
  const slugs = encodeURIComponent(slug);
  let probed = 0;
  for (const t of templates) {
    if (probed >= API_TWIN_MAX_PROBES) break;
    for (const base of bases) {
      if (probed >= API_TWIN_MAX_PROBES) break;
      const cand = new URL(base + t.replace(/\$\{[^}]*\}/, slugs), url).href;
      if (seen.has(cand)) continue;
      seen.add(cand);
      probed++;
      const p = await fetchOne(cand);
      checked.push({ kind: 'api twin', url: cand, status: p.status, contentType: p.contentType, bytes: p.bytes, finalUrl: p.finalUrl, ms: p.ms });
      const subjectOk =
        p.status === 200 &&
        !isHtml(p.contentType, p.body) &&
        slug.replace(/[^a-z0-9]/gi, '').length >= 2 &&
        p.body.toLowerCase().includes(slug.toLowerCase());
      if (subjectOk && looksLikeTwin(p, original)) {
        return { kind: `api twin (${base || 'origin'}${t})`, url: cand, finalUrl: p.finalUrl, contentType: p.contentType, bytes: p.bytes };
      }
    }
  }
  return null;
}

async function probe(url) {
  const original = await fetchOne(url);
  const html = isHtml(original.contentType, original.body) ? original.body : '';
  const { candidates: cands, hints } = candidates(url, html);
  const text = visibleText(original.body || '');

  /* one request per distinct candidate, capped — a probe is not a crawler */
  const seen = new Set([original.finalUrl, url]);
  const checked = [];
  let twin = null;
  for (const c of cands) {
    if (checked.length >= 6) break;
    if (seen.has(c.url)) continue;
    seen.add(c.url);
    const p = await fetchOne(c.url);
    checked.push({ ...c, status: p.status, contentType: p.contentType, bytes: p.bytes, finalUrl: p.finalUrl, ms: p.ms });
    if (!twin && looksLikeTwin(p, original)) {
      twin = { ...c, finalUrl: p.finalUrl, contentType: p.contentType, bytes: p.bytes };
      /* an llms.txt is an INDEX, not this page's twin — keep hunting for a page-level sibling,
       * but remember it either way (it is the thing to cite when the page has no twin) */
      if (/llms\.txt/.test(c.kind)) twin.index = true;
    }
    if (twin && !twin.index) break;
  }

  /* API-twin arm: a shell page's content often lives at the app's own data endpoint, and the
   * request template for it is in the bundle the shell names. Runs only when no page-level
   * twin was found and the page itself is a shell — never spends requests on readable pages. */
  if (!twin && isShellPage(original, text.length)) {
    const slug = url.split('?')[0].split('#')[0].replace(/\/+$/, '').split('/').pop();
    const apiTwin = await apiTwinArm(original, url, seen, checked, slug);
    if (apiTwin) twin = apiTwin;
  }

  const gate = GATES.find(([, re]) => re.test(original.body || ''));
  const auth = authGateFor(original.body, original.finalUrl);
  const scripts = scriptBytes(original.body || '');
  const scriptShare = original.bytes ? scripts / original.bytes : 0;

  let verdict, reason;
  const pageTwin = twin && !twin.index ? twin : null;
  const indexTwin = twin && twin.index ? twin : null;
  if (pageTwin) {
    verdict = `twin found (${pageTwin.finalUrl})`;
    reason = `${fmt(original.bytes)} ${original.contentType.split(';')[0] || '?'} → ${fmt(pageTwin.bytes)} ${pageTwin.contentType.split(';')[0] || '?'} via ${pageTwin.kind}`;
  } else if (auth && (original.status >= 400 || text.length < 2000)) {
    verdict = `auth-gated (${auth})`;
    reason = `HTTP ${original.status}, login/session interstitial — the page exists but this session may not read it; a twin sits behind the same boundary, so go to a third-party artifact instead of hunting`;
  } else if (gate && (original.status >= 400 || text.length < 2000)) {
    verdict = `JS gate (${gate[0]})`;
    reason = `HTTP ${original.status}, interstitial marker in body, ${text.length} chars of text`;
  } else if (original.status === 200 && isHtml(original.contentType, original.body) && scriptShare > 0.35 && text.length < 2500) {
    verdict = `JS shell (${Math.round(scriptShare * 100)}% scripts)`;
    reason = `HTTP 200 but ${fmt(original.bytes)} of HTML carries only ${text.length} chars of text — prose is client-rendered`;
  } else if (original.status === 200 && text.length >= 400 && !isHtml(original.contentType, original.body)) {
    verdict = `twin found (${original.finalUrl})`;
    reason = `the URL already serves ${original.contentType.split(';')[0] || 'non-HTML'} (${fmt(original.bytes)})`;
  } else if (original.status === 200 && text.length >= 400) {
    verdict = 'plain HTML ok';
    reason = `${fmt(original.bytes)} HTML, ${text.length} chars of visible text, no twin needed`;
  } else {
    verdict = `no twin (unreadable: HTTP ${original.status || 'ERR'}${original.error ? ' · ' + original.error : ''})`;
    reason = original.error || `HTTP ${original.status}, ${original.bytes} bytes, ${text.length} chars of text`;
  }

  return {
    url,
    verdict,
    reason,
    authGated: verdict.startsWith('auth-gated') ? auth : null,
    twin: pageTwin ? pageTwin.finalUrl : null,
    index: indexTwin ? indexTwin.finalUrl : null,
    original: {
      status: original.status,
      finalUrl: original.finalUrl,
      contentType: original.contentType,
      bytes: original.bytes,
      visibleText: text.length,
      scriptShare: +scriptShare.toFixed(2),
    },
    hints,
    checked,
  };
}

const fmt = n => (n >= 1024 * 1024 ? (n / 1048576).toFixed(1) + ' MB' : n >= 1024 ? Math.round(n / 1024) + ' KB' : n + ' B');

function print(r) {
  console.log(`doc-twin: ${r.url}`);
  console.log(`  verdict: ${r.verdict}`);
  console.log(`  reason:  ${r.reason}`);
  console.log(
    `  page:    HTTP ${r.original.status} · ${r.original.contentType || '?'} · ${fmt(r.original.bytes)} · ${r.original.visibleText} chars text · ${Math.round(r.original.scriptShare * 100)}% scripts`
  );
  if (r.original.finalUrl !== r.url) console.log(`  landed:  ${r.original.finalUrl}`);
  if (r.index) console.log(`  index:   ${r.index}  (site index — cite this when the page itself has no twin)`);
  const hintBits = [];
  if (r.hints.appendMd) hintBits.push('page advertises "append .md"');
  if (r.hints.mentionsLlms) hintBits.push('page mentions llms.txt');
  if (hintBits.length) console.log(`  hints:   ${hintBits.join('; ')}`);
  for (const c of r.checked) {
    console.log(`  probe:   ${c.status} ${fmt(c.bytes)} ${c.contentType.split(';')[0] || '-'} · ${c.kind} · ${c.finalUrl}`);
  }
}

const CALIBRATION = [
  ['https://developers.openai.com/api/docs/guides/decisions', /^twin found/],
  ['https://www.taler.net/en/ngi-taler.html', /^(plain HTML ok|twin found)/],
  ['https://modelcontextprotocol.io/docs/getting-started/intro', /^(twin found|JS shell)/],
  /* the API-twin arm's filing case: 404-status shell, content at /api/posts/<slug> */
  ['https://toninoble.com/post/ctrlc-ctrlv-ctrlcve', /^twin found .*api/],
];

/* offline units for the auth classifier — the live calibration cannot reach a gated page on
 * demand, so the detector is pinned on bodies. Each row is a shape seen or feared in the wild. */
const AUTH_UNITS = [
  ['HPE IAM interstitial', `<script>window.__IAM={"iam_callback":"/iam_callback","target_link_uri":"https://x/authorize"}</script>`, 'https://hpe.com/bulletin', 'iam-rp|iam-callback|oidc-authorize'],
  ['redirect to an IdP', '<html><body>redirecting</body></html>', 'https://login.microsoftonline.com/common/oauth2/authorize?x=1', 'login-idp|login-path'],
  ['cookie-walled page', '<html><title>Sign in</title></html>', 'https://example.com/login?returnTo=/docs', 'login-path'],
  ['an OAuth DOC page (must NOT fire)', '<p>Send the user to /authorize with a redirect_uri and state parameter.</p>'.repeat(40), 'https://docs.example.com/oauth/authorize', null],
  ['an ordinary page (must NOT fire)', '<p>Install the package and run the test suite.</p>'.repeat(40), 'https://example.com/docs/intro', null],
];

/* ── UA census: is the block a *client string* rather than a page? ────────────────────────────
 * A wall is not a property of a URL; it is a property of a (URL, client string) pair, and the two
 * directions both exist in this feed's corpus, measured a few hours apart on 2026-11-01:
 *   · `drupal.org/sa-contrib-2026-254` → 3,038-byte "Client Challenge" to a Chrome UA (three
 *     consecutive requests), 34,311 bytes of advisory to `curl/8.7.1`, `Wget`, `python-requests`
 *     and to **no UA at all**.
 *   · `karpathy.bearblog.dev/hacker-tube/` → 404 / 9 bytes to `curl/*` and to no UA, 14,966 bytes
 *     to a browser UA.
 * So one client string is never right, and a checker that names only one reports a live page as
 * unreadable — or, worse, reports "the page does not say that". This mode measures the class over
 * the feed's own citations: every cited URL is fetched twice, and the pair is classified.
 *
 *   node agent/tools/doc-twin.mjs --ua-census [--feed-dir en/feed] [--days 7] [--max 300]
 *                                   [--concurrency 6] [--json]
 *
 * Verdicts: `same` (both read, similar size) · `browser-walled` (only the named client reads) ·
 * `named-walled` (only the browser reads) · `both-walled` · `curl-bin-served` (both undici clients
 * walled, the real `curl` binary read it — a FINGERPRINT gate, the openai.com shape) ·
 * `differs` (both read, sizes far apart) · `unreadable` (neither). A host with any gated row is
 * the host to name in the write-up; the report is per-host because the rule is per-host. Since
 * 2026-11-08 the census carries the third client on `both-walled` rows only, and every row keeps
 * its A/B `pairVerdict` beside the final one — the tally shows both, so the rescue rate is a
 * count, not a memory.
 */
const CLIENT_A = { label: 'browser', ua: UA };
const CLIENT_B = { label: 'named', ua: 'curl/8.7.1 trending-md-doc-twin/1.0' };
/* The THIRD client is a transport, not a string (filed 2026-11-05 20:39, the openai.com filing
 * case): `curl` the BINARY answered 403 with a JS interstitial on four attempts — including with
 * the exact Chrome UA this tool sends — while Node's `fetch` with that same string returned
 * 200 / 428,571 bytes, 2/2 in each direction. CLIENT_A and CLIENT_B above both ride Node's
 * undici stack, so they share one TLS fingerprint and one header shape; a gate keyed on the
 * FINGERPRINT treats them as the same client no matter what UA either sends. Spawning the real
 * `curl` binary changes the fingerprint, which is the axis a UA retry can never reach. The UA
 * held constant at CLIENT_A's.
 * First live run's correction (2026-11-08, the census's own rescue row): the one `both-walled`
 * URL the third client cleared — `pypi.org/project/heretic-llm/` — flipped back on re-test, for
 * EVERY client: undici try 1 served the ~3 KB stub, undici try 2 the full 97 KB page, and
 * curl-with-curl-UA the stub — so that row was a per-request INSTABILITY (PyPI intermittently
 * serves a short JS-notice stub whose visible text matches the wall regex), not a fingerprint
 * gate, and `curl-bin-served` must be read as "the third ROLL read it", never as "curl reads
 * this host". The transport axis still earns its cost: the 6 rows that stayed walled across all
 * three clients (npmjs.com ×4, theblock.co, arxiv.org) are measured gates, and a host that
 * stubs undici but serves curl STABLY remains exactly the shape this client exists to catch.
 * Only paid on rows already `both-walled` — the class the first two clients cannot rescue. */
const CLIENT_C = { label: 'curl-bin', ua: UA };
/* execFile (not exec): the URL is one argv element, never a shell string, and a page body stays
 * in memory — nothing is written to a temp path an interpolated filename could hijack. The status
 * code rides a sentinel line appended by `-w`; it is stripped before any text test runs. */
import { execFile } from 'node:child_process';
function fetchViaCurlBin(url, ua, timeoutMs = TIMEOUT_MS) {
  return new Promise((resolve) => {
    execFile('curl',
      ['-sS', '-L', '--compressed', '--max-time', String(Math.ceil(timeoutMs / 1000)),
       '-A', ua, '-H', 'Accept: text/html,application/xhtml+xml,*/*',
       '-o', '-', '-w', '\n@@CURL_STATUS:%{http_code}@@', url],
      { maxBuffer: 64 * 1024 * 1024, timeout: timeoutMs + 5_000 },
      (err, stdout) => {
        const s = String(stdout || '');
        const m = s.match(/@@CURL_STATUS:(\d+)@@\s*$/);
        if (!m) return resolve({ status: 0, bytes: 0, text: '', wall: true, error: err ? err.message : 'no status line' });
        const body = s.slice(0, m.index);
        const status = Number(m[1]);
        const text = visibleText(body);
        resolve({ status, bytes: Buffer.byteLength(body), text, wall: isWall(status, text) });
      });
  });
}
/* The three-client classifier: A/B decide the pair verdict as before; C is consulted only on
 * `both-walled` and can upgrade it to `curl-bin-served`. Pure so the selftest can pin it. */
function classifyUaPair3(a, b, c) {
  const pair = classifyUaPair(a, b);
  if (pair !== 'both-walled') return { pair, final: pair };
  const kc = kindOf(c);
  const final = kc === 'ok' ? 'curl-bin-served' : pair;
  return { pair, final, curlbin: `${c.status}/${c.text.length}` };
}
const WALL_RE = /client challenge|enable javascript|javascript is disabled|just a moment|checking your browser|attention required|access denied|verify you are human|cf-chl|ddos protection by|请启用 ?javascript|请稍候/i;
/* short AND says what it is — length alone would refuse a genuinely short page (the same two-test
 * rule claim-unit-lint's `isBlockShell` uses, deliberately kept in step with it) */
const isWall = (status, text) => {
  if (status >= 400) return true;
  const t = (text || '').trim();
  if (!t) return status === 0;   // a 200 with no visible text is a shell, not a page
  return t.length < 1200 && WALL_RE.test(t.slice(0, 900));
};
async function fetchAs(url, ua) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': ua, accept: '*/*' }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    const body = await res.text();
    /* the WALL test runs on the *visible* text, not the bytes: drupal.org's challenge is 3,038
     * bytes of HTML wrapping 226 chars of prose, so a byte-length test reads it as a real page
     * (measured — the first run of this census classified the filing case as `differs`). */
    const text = visibleText(body);
    return { status: res.status, bytes: Buffer.byteLength(body), text, wall: isWall(res.status, text) };
  } catch (e) {
    return { status: 0, bytes: 0, text: '', wall: true, error: e.message };
  }
}
/* A 5xx is not a wall and a 404 is not a wall — the first run of this census called a
 * `fortiguard.fortinet.com` page `named-walled` because the named client got a **500** while the
 * browser got **9,915 chars of advisory**, and lumped dead links into `both-walled`. A client-string
 * claim needs both sides to have *answered*: one client refused, the other served prose. */
const kindOf = (r) => {
  if (r.status === 0) return 'unreachable';
  if (r.status === 404 || r.status === 410) return 'gone';
  /* **429 is the census's own footprint, not the page's.** The full 1,300-URL run rate-limited
   * `huggingface.co` on 28 URLs and the first classifier filed all of them as `both-walled`, which
   * would have published this run's own throttling as a page property — 26 of the 89 `both-walled`
   * rows were this. A rate limiter answers on a timescale; a gate answers per request. */
  if (r.status === 429) return 'rate-limited';
  if (r.status >= 500) return 'error';
  if (r.wall) return 'wall';
  return 'ok';
};
function classifyUaPair(a, b) {
  const ka = kindOf(a), kb = kindOf(b);
  if ([ka, kb].includes('unreachable')) return 'unreachable';
  if ([ka, kb].includes('gone')) return 'gone';
  if (ka === 'rate-limited' || kb === 'rate-limited') return 'rate-limited';
  if (ka === 'wall' && kb === 'wall') return 'both-walled';
  if (ka === 'wall') return 'browser-walled';   // the named client was served
  if (kb === 'wall') return 'named-walled';     // the browser was served
  if (ka !== 'ok' || kb !== 'ok') return 'client-error';  // one side 5xx'd — not a gate
  const lo = Math.min(a.text.length, b.text.length);
  const hi = Math.max(a.text.length, b.text.length);
  if (hi > 0 && hi / Math.max(lo, 1) > 1.5) return 'differs';
  return 'same';
}
async function uaCensus() {
  const { readFileSync, readdirSync } = await import('node:fs');
  const { join } = await import('node:path');
  const feedDir = argOf('--feed-dir', 'en/feed');
  const days = Number(argOf('--days', '7'));
  const max = Number(argOf('--max', '300'));
  const conc = Number(argOf('--concurrency', '6'));
  /* An API endpoint or a repo page is not a prose source: it answers JSON or a rendered page whose
   * UA behaviour says nothing about citations a reader would click. */
  const SKIP = /^https?:\/\/(api\.github\.com|raw\.githubusercontent\.com|news\.ycombinator\.com|cveawg\.mitre\.org|services\.nvd\.nist\.gov|nvd\.nist\.gov|github\.com|www\.github\.com|huggingface\.co\/[^/]+\/[^/]+\/raw\/)/;
  const files = readdirSync(feedDir).filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort().slice(-days);
  const urls = new Set();
  for (const f of files) {
    const text = readFileSync(join(feedDir, f), 'utf8');
    for (const m of text.matchAll(/https?:\/\/[^\s)`|>'"]+/g)) {
      const u = m[0].replace(/[.,;]+$/, '');
      if (!SKIP.test(u)) urls.add(u);
    }
  }
  const list = [...urls].slice(0, max);
  const rows = [];
  let cursor = 0;
  const hostGap = 700;
  const lastReq = {};
  await Promise.all(Array.from({ length: Math.min(conc, list.length) }, async () => {
    while (cursor < list.length) {
      const url = list[cursor++];
      let host = '';
      try { host = new URL(url).hostname; } catch { continue; }
      const wait = hostGap - (Date.now() - (lastReq[host] ?? 0));
      if (wait > 0) await new Promise(r => setTimeout(r, wait));
      lastReq[host] = Date.now();
      const a = await fetchAs(url, CLIENT_A.ua);
      const b = await fetchAs(url, CLIENT_B.ua);
      /* The third client is consulted ONLY on `both-walled` — the class the two UA strings cannot
       * rescue — so a normal run pays zero extra requests (measured: 63 of 1,299 rows were
       * both-walled over a month). The row keeps the A/B pair verdict beside the final one, so the
       * interesting number — how many both-walled rows stop being walls — is readable from the
       * tally itself instead of being reconstructed. (First run of this edit hit a TDZ error —
       * `pair` referenced inside its own destructuring initializer — which is why the census
       * checks its own stdout: an empty JSON file is a failed run, not an empty class.) */
      const pair = classifyUaPair(a, b);
      let final = pair, curlbin;
      if (pair === 'both-walled') {
        ({ final, curlbin } = classifyUaPair3(a, b, await fetchViaCurlBin(url, CLIENT_C.ua)));
      }
      rows.push({ url, host, verdict: final, pairVerdict: pair, browser: `${a.status}/${a.text.length}`, named: `${b.status}/${b.text.length}`, ...(curlbin ? { curlbin } : {}) });
    }
  }));
  const tally = {};
  for (const r of rows) tally[r.verdict] = (tally[r.verdict] ?? 0) + 1;
  const byHost = {};
  for (const r of rows) {
    if (r.verdict === 'same') continue;
    (byHost[r.host] ??= []).push(r);
  }
  if (has('--json')) {
    console.log(JSON.stringify({ files, urls: list.length, tally, hosts: byHost, rows }, null, 2));
    return;
  }
  console.log(`ua-census: ${list.length} cited URL(s) over ${files.length} feed(s) (${files[0]} … ${files.at(-1)})`);
  console.log(`  ${Object.entries(tally).sort((x, y) => y[1] - x[1]).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
  const gated = rows.filter(r => r.verdict !== 'same');
  if (!gated.length) {
    console.log('  no client-string disagreement in this window — the class is empty here, which is a measurement, not a proof');
    return;
  }
  console.log('\n  per host (a wall is a property of the host, not of the page):');
  for (const [host, rs] of Object.entries(byHost).sort((x, y) => y[1].length - x[1].length)) {
    const kinds = [...new Set(rs.map(r => r.verdict))].join(', ');
    console.log(`  ${String(rs.length).padStart(3)}  ${host} — ${kinds}`);
    for (const r of rs.slice(0, 3)) console.log(`        ${r.verdict}  browser ${r.browser}  named ${r.named}  ${r.url}`);
  }
}

async function main() {
  if (has('--ua-census')) return uaCensus();
  if (has('--selftest')) {
    let pass = 0;
    let total = 0;
    for (const [url, re] of CALIBRATION) {
      total++;
      const r = await probe(url);
      const ok = re.test(r.verdict);
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${url} → ${r.verdict}`);
      if (ok) pass++;
    }
    console.log('');
    for (const [name, body, finalUrl, expect] of AUTH_UNITS) {
      total++;
      const got = authGateFor(body, finalUrl);
      /* the HPE row may match any of three markers — assert the CLASS, not a spelling */
      const ok = expect === null ? got === null : expect.split('|').includes(got);
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${name} → ${got ?? 'not gated'}`);
      if (ok) pass++;
    }
    console.log('');
    /* the third client is a classifier change, so its decision table is pinnable offline —
     * no network needed (the rows are the shapes the census can meet) */
    const ok3 = { status: 200, bytes: 30000, text: 'x'.repeat(4000), wall: false };
    const wall3 = { status: 403, bytes: 3000, text: 'Just a moment...', wall: true };
    const err3 = { status: 500, bytes: 0, text: '', wall: false };
    const UA3_UNITS = [
      ['both-walled + curl-bin reads → curl-bin-served', classifyUaPair3(wall3, wall3, ok3), 'both-walled', 'curl-bin-served'],
      ['both-walled + curl-bin walled → both-walled (kept)', classifyUaPair3(wall3, wall3, wall3), 'both-walled', 'both-walled'],
      ['both-walled + curl-bin 5xx → both-walled (a 500 is not a wall)', classifyUaPair3(wall3, wall3, err3), 'both-walled', 'both-walled'],
      ['same + curl-bin never consulted → final stays same', classifyUaPair3(ok3, ok3, ok3), 'same', 'same'],
      ['browser-walled pair → C not consulted, pair kept', classifyUaPair3(wall3, ok3, ok3), 'browser-walled', 'browser-walled'],
    ];
    for (const [name, got, pair, final] of UA3_UNITS) {
      total++;
      const ok = got.pair === pair && got.final === final;
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${name} → pair ${got.pair} final ${got.final}`);
      if (ok) pass++;
    }
    console.log(`\nselftest: ${pass}/${total} matched`);
    if (pass !== total) process.exitCode = 1;
    return;
  }
  const i = args.indexOf('--probe');
  const urls = i === -1 ? [] : args.slice(i + 1).filter(a => /^https?:\/\//.test(a));
  if (!urls.length) {
    console.log('doc-twin: nothing to probe. Usage: --probe <url> [<url> ...] | --ua-census [--days N] | --selftest');
    return;
  }
  const out = [];
  for (const u of urls) {
    const r = await probe(u);
    out.push(r);
    if (!has('--json')) {
      print(r);
      console.log('');
    }
  }
  if (has('--json')) console.log(JSON.stringify(out.length === 1 ? out[0] : out, null, 2));
}

try {
  await main();
} catch (e) {
  console.log(`doc-twin failed (non-fatal): ${e.message}`);
}
