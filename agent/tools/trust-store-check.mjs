#!/usr/bin/env node
/* Trust-store check — is a CA still an *anchor* in the stores that actually decide handshakes?
 *
 * Why this exists (filed & done 2026-10-22 12:31, from the eMudhra key-leak matrix): thesis 25 has
 * carried the claim "the blocklist reaches browsers, not libraries" since 10-21 as an *argument*.
 * mitmproxy's `--emudhra` flag makes it testable, because the compromised P-384 key (d=4) and its
 * full cross-signed chain ship in `mitmproxy/certs.py` — anyone can mint a leaf and point every
 * stack at it. Doing that first-hand (10-22 12:31) produced a split that is NOT browser-vs-library:
 *
 *   anchored  → macOS keychain, Java `cacerts`, Homebrew ca-certificates, /etc/ssl/cert.pem
 *               (a forged leaf chained to eMudhra verified, live: curl 200, Node 200, Java
 *               HANDSHAKE OK, Python HANDSHAKE OK)
 *   absent    → certifi, curl.se/mk-ca-bundle, Mozilla's root program
 *               (every one of them rejected the same chain: unable to get local issuer certificate)
 *
 * The lesson the tool encodes: **a stack's security follows its trust *source*, not its species.**
 * Node on macOS, Python on Homebrew and Java are all "libraries" and all accepted the forged chain,
 * because they read the OS/vendor store; certifi and curl's bundle are also libraries and all
 * rejected it, because they pin a Mozilla-derived set. So "does the blocklist reach libraries?" has
 * no single answer — it is one question per (stack, trust source) pair, and the trust source is a
 * fingerprint you can look up. That lookup is this tool.
 *
 * What presence means — and what it does NOT mean:
 *   - present: that store will validate ANY leaf whose chain reaches this CA. Absence of a distrust
 *     flag is the store's answer, not an endorsement of the key's secrecy.
 *   - absent:  that store refuses every chain through it, independent of the leaf.
 *   - It does not tell you which store a given process loaded. Check that the way the matrix did:
 *     point the process at the chain and watch the handshake (`--demo` prints the recipe).
 *
 * Usage:
 *   node agent/tools/trust-store-check.mjs --cert /tmp/lab/cert1.pem
 *   node agent/tools/trust-store-check.mjs --chain mitmproxy-chain.pem     # every cert, key skipped
 *   node agent/tools/trust-store-check.mjs --sha256 34EAEA0CEBC90ADAF9D0C5E2ED9B78C9879E1B6C...
 *   node agent/tools/trust-store-check.mjs --stores                        # what it checks
 *   node agent/tools/trust-store-check.mjs --cert a.pem --json
 *
 * Stores (each reported as present / absent / unavailable — never silently dropped):
 *   mozilla   CCADB "IncludedCACertificateReportPEMCSV" — the root program's included set
 *   certifi   PyPI certifi's bundled cacert.pem (what `requests`, and most Python, actually reads)
 *   curl      https://curl.se/ca/cacert.pem (mk-ca-bundle output; most Linux distros ship a variant)
 *   macos     /System/Library/Keychains/SystemRootCertificates.keychain (local, via `security`)
 *   macos-file /etc/ssl/cert.pem — the SECOND macOS store, added 2026-10-29 after a feed item counted
 *             one store's lines and published them as another store's certificates. macOS has two
 *             bundles and they do not contain the same roots: measured on macOS 15.5 (24F74), the
 *             keychain holds **2** eMudhra roots (G1, G3) while `/etc/ssl/cert.pem` holds **4**
 *             (C1, C3, G1, G3) — so "macOS still trusts it" is two claims, and OpenSSL/libcurl-style
 *             stacks read the file, not the keychain. They are reported as separate rows for that
 *             reason; collapsing them is the error this row exists to prevent.
 *   java      the JVM's `cacerts` (local, via `keytool -list -rfc`)
 *   linux     /etc/ssl/certs/ca-certificates.crt (local, Debian/Ubuntu layout)
 *
 * Local stores are host-specific: on CI you will see `unavailable` for macos/java, and that is the
 * honest answer — report the set you measured, never a universal.
 *
 * Two counting traps this tool's own output has to survive (both seen in the wild on 2026-10-29):
 *   (a) `grep -c <name> /etc/ssl/cert.pem` counts LINES, and every cert contributes a `subject=` and
 *       an `issuer=` line carrying the same name — so 8 matches there were **4** certificates. Count
 *       certificates, never matches.
 *   (b) `security find-certificate -c <CN>` with no keychain argument searches the user's default
 *       search list, which does NOT include SystemRootCertificates — it answers "could not be found"
 *       for a root that is anchored. The keychain path is mandatory; a bare `-c` miss proves nothing.
 *
 * Perishability: a bundle is a *snapshot*. certifi/curl/Homebrew change on release; CCADB changes
 * on root-program decisions; Java and macOS ship roots for years. Re-run before publishing any
 * "still trusted / no longer trusted" claim, and record the version you saw (this prints them).
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const argOf = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i === -1 ? dflt : args[i + 1];
};
const has = f => args.includes(f);

const SOURCES = {
  mozilla: {
    kind: 'remote',
    url: 'https://ccadb.my.salesforce-sites.com/mozilla/IncludedCACertificateReportPEMCSV',
    note: "Mozilla root program · included set (CSV, SHA-256 Fingerprint column)",
  },
  certifi: {
    kind: 'remote',
    url: 'https://raw.githubusercontent.com/certifi/python-certifi/master/certifi/cacert.pem',
    note: 'PyPI certifi bundle (python/requests)',
  },
  curl: {
    kind: 'remote',
    url: 'https://curl.se/ca/cacert.pem',
    note: 'curl.se ca-bundle (mk-ca-bundle, Mozilla-derived)',
  },
  macos: {
    kind: 'local',
    note: 'macOS SystemRootCertificates keychain (`security find-certificate`)',
    run: () => execFileSync('security', ['find-certificate', '-a', '-p',
      '/System/Library/Keychains/SystemRootCertificates.keychain'], { encoding: 'utf8' }),
  },
  'macos-file': {
    kind: 'local',
    note: '/etc/ssl/cert.pem — the bundle OpenSSL/libcurl-style stacks read on macOS',
    run: () => fs.readFileSync('/etc/ssl/cert.pem', 'utf8'),
  },
  java: {
    kind: 'local',
    note: 'JVM cacerts (`keytool -list -rfc -cacerts`)',
    run: () => execFileSync('keytool', ['-list', '-rfc', '-cacerts', '-storepass', 'changeit'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }),
  },
  linux: {
    kind: 'local',
    note: '/etc/ssl/certs/ca-certificates.crt (Debian/Ubuntu layout)',
    run: () => fs.readFileSync('/etc/ssl/certs/ca-certificates.crt', 'utf8'),
  },
};
const ALL = Object.keys(SOURCES);

const CERT_RE = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
const derOf = pem => Buffer.from(pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, ''), 'base64');
const sha256 = der => crypto.createHash('sha256').update(der).digest('hex').toUpperCase();
const norm = fp => (fp || '').replace(/[^0-9a-fA-F]/g, '').toUpperCase();

function subjectOf(pem) {
  try {
    return execFileSync('openssl', ['x509', '-noout', '-subject'], { input: pem, encoding: 'utf8' })
      .replace(/^subject=\s*/, '').trim();
  } catch { return '(subject unreadable)'; }
}

/* Every store reduces to a set of SHA-256 fingerprints. For CCADB the column is authoritative and
 * matches the cert DER, so we read it directly rather than parsing embedded PEM out of CSV cells. */
async function loadStore(name) {
  const src = SOURCES[name];
  try {
    let fps;
    if (name === 'mozilla') {
      const res = await fetch(src.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const csv = await res.text();
      const lines = csv.split('\n');
      const head = lines[0];
      const colStart = head.indexOf('"SHA-256 Fingerprint"');
      if (colStart === -1) throw new Error('SHA-256 Fingerprint column missing');
      const before = (head.slice(0, colStart).match(/,/g) || []).length;
      fps = new Set();
      for (const line of lines.slice(1)) {
        const cells = line.match(/"(?:[^"]|"")*"/g) || [];
        if (cells.length <= before) continue;
        fps.add(norm(cells[before].replace(/"/g, '')));
      }
    } else {
      const text = src.kind === 'remote'
        ? await (await fetch(src.url)).text()
        : src.run();
      fps = new Set();
      for (const pem of text.match(CERT_RE) || []) fps.add(sha256(derOf(pem)));
    }
    if (!fps.size) throw new Error('store parsed to zero certificates');
    return { name, ok: true, size: fps.size, fps };
  } catch (e) {
    return { name, ok: false, error: e.message.split('\n')[0] };
  }
}

function targets() {
  const out = [];
  const paths = [];
  args.forEach((a, i) => { if ((a === '--cert' || a === '--chain') && args[i + 1]) paths.push(args[i + 1]); });
  for (const f of paths) {
    const text = fs.readFileSync(f, 'utf8');
    for (const pem of text.match(CERT_RE) || []) {
      out.push({ pem, fp: sha256(derOf(pem)), label: f });
    }
  }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--sha256' && args[i + 1]) out.push({ pem: null, fp: norm(args[i + 1]), label: args[i + 1].slice(0, 16) + '…' });
  }
  return out;
}

const json = has('--json');
if (has('--stores')) {
  for (const n of ALL) console.log(`${n.padEnd(8)} ${SOURCES[n].kind.padEnd(7)} ${SOURCES[n].note}`);
  process.exit(0);
}
if (has('--demo')) {
  console.log(`Forge a leaf with the compromised key, then point each stack at it:
  1. openssl req -new -key leaf.key -subj /CN=localhost -out leaf.csr
  2. openssl x509 -req -in leaf.csr -CA <ca>.pem -CAkey <leaked>.pem -days 90 -sha384 \\
       -extfile <(printf 'subjectAltName=DNS:localhost\\nbasicConstraints=CA:FALSE\\nextendedKeyUsage=serverAuth\\n') -out leaf.pem
  3. openssl s_server -accept 8443 -cert leaf.pem -key leaf.key -cert_chain <chain>.pem -www -quiet
  4. curl https://localhost:8443/ ; node/java/python against 127.0.0.1:8443
Measure the *handshake*, not the file: present-in-a-store is necessary, not sufficient.`);
  process.exit(0);
}

const tgts = targets();
if (!tgts.length) {
  console.error('usage: trust-store-check.mjs --cert <pem> | --chain <pem> | --sha256 <hex> [--json]');
  process.exit(2);
}

const stores = await Promise.all(ALL.map(loadStore));

const report = tgts.map(t => {
  const row = { fingerprint: t.fp, subject: t.pem ? subjectOf(t.pem) : '(fingerprint only)', stores: {} };
  for (const s of stores) row.stores[s.name] = !s.ok ? `unavailable (${s.error})` : (s.fps.has(t.fp) ? 'present' : 'absent');
  const reachable = stores.filter(s => s.ok);
  row.anchoredIn = reachable.filter(s => s.fps.has(t.fp)).map(s => s.name);
  row.meetsUnreachable = stores.filter(s => !s.ok).map(s => s.name);
  row.summary = `anchored in ${row.anchoredIn.length}/${reachable.length} reachable stores`;
  return row;
});

if (json) {
  console.log(JSON.stringify({
    checked: new Date().toISOString(),
    storeSizes: Object.fromEntries(stores.map(s => [s.name, s.ok ? s.size : `unavailable: ${s.error}`])),
    certificates: report,
  }, null, 2));
  process.exit(0);
}

console.log(`store sizes: ${stores.map(s => `${s.name}=${s.ok ? s.size : 'unavailable'}`).join(' ')}\n`);
for (const r of report) {
  console.log(`── ${r.subject}`);
  console.log(`   sha256 ${r.fingerprint}`);
  for (const s of stores) {
    const v = r.stores[s.name];
    const mark = v === 'present' ? 'ANCHOR' : v === 'absent' ? 'absent' : 'n/a   ';
    console.log(`   ${mark.padEnd(7)} ${s.name.padEnd(8)} ${v}`);
  }
  console.log(`   → ${r.summary}${r.meetsUnreachable.length ? ` (not checked: ${r.meetsUnreachable.join(', ')})` : ''}\n`);
}

const anyPresent = report.some(r => r.anchoredIn.length);
console.log(anyPresent
  ? 'ANCHOR means: this store will validate ANY leaf whose chain reaches this CA. It says nothing\n' +
    'about whether the key is secret — a leaked CA key plus a still-anchored root is a working forgery.'
  : 'No reachable store anchors this certificate — chains through it fail everywhere checked.');
