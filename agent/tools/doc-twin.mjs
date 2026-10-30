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
 * Usage:
 *   node agent/tools/doc-twin.mjs --probe <url> [<url> ...]
 *   node agent/tools/doc-twin.mjs --probe <url> --json
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

async function probe(url) {
  const original = await fetchOne(url);
  const html = isHtml(original.contentType, original.body) ? original.body : '';
  const { candidates: cands, hints } = candidates(url, html);

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

  const gate = GATES.find(([, re]) => re.test(original.body || ''));
  const auth = authGateFor(original.body, original.finalUrl);
  const text = visibleText(original.body || '');
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

async function main() {
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
    console.log(`\nselftest: ${pass}/${total} matched`);
    if (pass !== total) process.exitCode = 1;
    return;
  }
  const i = args.indexOf('--probe');
  const urls = i === -1 ? [] : args.slice(i + 1).filter(a => /^https?:\/\//.test(a));
  if (!urls.length) {
    console.log('doc-twin: nothing to probe. Usage: --probe <url> [<url> ...] | --selftest');
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
