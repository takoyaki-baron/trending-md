---
title: Security — the CVE stream + attack-surface synthesis
topic: security
created: 2026-08-16
---

# Security — the CVE stream + attack-surface synthesis (Aug 2026)

The consolidated reference for the vulnerability stream that has run through every Aug 2026 feed
batch. The agent-infra-specific items (MCP SSRF checklist, agent-exec surface mechanics) also live in
[[agent-stack]]'s security section; this file is the *broader* enterprise/OS CVE ledger plus the
pattern-level synthesis the memory window points to.

## The pattern-level synthesis

Five recurring shapes, each with a canonical instance:

1. **The standing-credentials pivot.** A tool that holds live access to production data gets an
   unauth RCE/SQLi, and the compromise cascades. Canonical: Metabase CVE-2026-72898 (CVSS 10.0 SQLi
   in password-reset — the app holds standing credentials to every connected warehouse). TeamCity
   (9.8, agent polling protocol) and Apache Allura (9.8, git argument injection) are the same shape
   in CI-CD and forge tools. SAP Commerce Cloud CVE-2026-58231 (10.0, Data Hub Adapter) extends it:
   the adapter plugs Commerce Cloud into product/order/inventory systems, so a hit reaches well
   beyond the exposed service.
2. **Patch-then-reverse-engineer → negative time-to-exploit (08-16, updated 08-16 04:36).** Attackers
   reverse-engineer a just-shipped fix and weaponize it before most orgs patch. Canonical: SAP
   Commerce Cloud CVE-2026-58231 drew honeypot exploitation *three days after the patch with no public
   PoC* (Defused). The deeper finding (Mandiant M-Trends 2026, Google Cloud): mean time-to-exploit is
   now **−7 days** — exploitation precedes the patch, on average — on a trajectory of +63d (2018) →
   ~32d (2022) → −1d (2024) → −7d (2026); corroborated by Qualys (−1d), CrowdStrike 2026 (42% of
   vulns exploited before public disclosure; eCrime breakout 29 min median / 27s fastest), VulnCheck
   (28.96% of KEV vulns exploited on/before CVE-publish day, up from 23.6%), Flashpoint (745d in 2020
   → ~44d in 2025). The SAP 3-day case is now the *slow* end — Marimo CVE-2026-39987 (9h41m from
   disclosure, no PoC) and cPanel CVE-2026-41940 (<24h) show hours. A CVSS 10.0 patch is no longer a
   routine update; the reverse-engineering window *is* the exposure window, and patch velocity is
   structurally obsolete (median remediation 74 days vs −7d MTE).
3. **Default-exposed surfaces.** A product ships a network service on by default, with no auth, and
   the internet finds it. Canonical: macOS Screen Sharing CVE-2026-65400 (9.8) — an auth-state bug
   lets a network attacker authenticate with no credentials and reach root; macOS auto-opens VNC on
   TCP 5900 when Screen Sharing is enabled (~40,000 internet-exposed Macs), and the Dutch NCSC
   confirmed active exploitation ending in Monero miners. The same shape as the auto-exposed
   agent-exec surface (UFO/AgenticSeek) but on a desktop OS.
4. **AI-assisted exploitation (offensive).** The exploit-development cycle is being compressed with
   coding agents. Canonical: Rapid7's SharePoint chain (CVE-2026-55040 JWT `alg:none` bypass +
   CVE-2026-63520 .NET type instantiation → unauth RCE) — an explicit AI-assisted experiment of 24
   active days, 96 sessions, ~80,000 tool calls, human-steered. The offensive mirror of Vercel
   deepsec; attackers probed the PoC against honeypots within a day.
5. **Supply-chain-by-design.** RCE through the very channel that distributes updates. Canonical:
   WPMU DEV Dashboard CVE-2026-16051 (9.8) — no package-integrity check + no replay protection on
   signed management requests, so a replayed/forged signed request installs arbitrary code through
   the plugin update channel. Cl0p/PTC Windchill CVE-2026-12569 (9.8) is the ransomware instance
   (~50 firms, engineering IP exfiltrated).

## The CVE ledger (newest first)

- **SAP Commerce Cloud Data Hub Adapter CVE-2026-58231** (CVSS 10.0) — insufficient authorization +
  weak input validation let an unauth attacker abuse a default auth client for arbitrary code
  execution; exploited 3 days post-patch with no public PoC; affected COM_CLOUD 2211 / 2211-JDK21.
  Defused detected the first honeypot hits Aug 14 (3 days after SAP's Aug 11 patch; no public PoC),
  from AS11402 (216.249.99.43) as automated mass scanning; Shadowserver fingerprints 4,200+
  internet-exposed SAP Commerce Cloud instances. Workaround: IP Filter Set on the vulnerable endpoint.
- **macOS Screen Sharing CVE-2026-65400** (9.8) — auth-bypass on VNC/TCP 5900 → root; patched Aug 6
  (Tahoe 26.6.1 / Sequoia 15.7.9 / Sonoma 14.8.9); Dutch NCSC confirmed in-the-wild exploitation
  ending in Monero miners; ~40,000 potentially exposed Macs. Disable Screen Sharing or block 5900.
- **Rapid7 SharePoint chain CVE-2026-55040 (9.1) + CVE-2026-63520 (8.1)** — JWT validation bypass
  (`RequireSignedTokens=false` → `alg:none` accepted; signing key resolves from attacker-supplied
  `x5t`) chained with unsafe .NET type instantiation in BCS → unauth RCE on on-prem SharePoint.
  PoC dropped Aug 11; fixes shipped a month apart, so patching one half leaves the other weaponizable.
- **Lazarus CVE-2026-68820** (afd.sys UAF zero-day) — local → SYSTEM, no interaction; Operation Dream
  Job (fake Lockheed Martin/Enveil recruiters on LinkedIn) delivered the Troy backdoor + a
  post-quantum (Kyber/ML-KEM) payload, then installed FudModule v3.1 (blinds 94 ETW channels). CISA
  KEV deadline Aug 25; rootkit sample dated Jul 7 → ~5 weeks pre-patch exploitation.
- **Windows DNS Server CVE-2026-62878** (9.8) — stack overflow, unauth/network/no-interaction,
  "wormable" per ZDI; headline of the 398-CVE August Patch Tuesday, alongside actively-exploited
  **CVE-2026-62832** (LegacyHive, User Profile Service → SYSTEM).
- **GeoServer SQLi zero-day (no CVE yet)** — `jsonArrayContains` SQLi reaches RCE under H2 `sa` /
  MSSQL admin configs; disclosed Aug 12 by @q1uf3ng, probed within hours. The recurring
  "widely-deployed OSS + unpatched SQLi/RCE" class.
- **SonicWall SMA1000 CVE-2026-15409 (10.0 SSRF) + CVE-2026-15410 (7.2)** — wsproxy "Work Place"
  SSRF + command injection chained to zero-click unauth root; INC Ransomware affiliate vector;
  exploited since Jun 22 (pre-disclosure), ~380 exposed.
- **Metabase CVE-2026-72898** (10.0) — unauth SQLi in `POST /api/session/reset_password`, active
  exploitation, KEV deadline (08-14). Holds standing credentials to every connected warehouse.
- **JetBrains TeamCity CVE-2026-63077** (9.8) — unauth RCE via XStream deserialization in the agent
  polling protocol, KEV, ~4,500 exposed / ~450 patched.
- **Apache Allura CVE-2026-73240** (9.8) — git argument injection, pre-1.19.1.
- **Cl0p / PTC Windchill CVE-2026-12569** (9.8) — unauth RCE (unsafe deserialization + WSDL
  info-disclosure → JSP webshells); ~50 firms extorted (Shell, Philips, GE, Fiserv); MOVEit playbook
  against PLM.
- **WPMU DEV Dashboard CVE-2026-16051** (9.8) — no package-integrity check + no replay protection on
  signed management requests → RCE through the update channel (5.0.1 fixes).
- **Microsoft UFO CVE-2026-73296** (9.4) — Streamable HTTP MCP on TCP 8020/8021 with no auth →
  RCE-equivalent control of an ADB-connected Android; fix refuses to start without
  `UFO_MCP_API_KEY`.
- **Fosowl AgenticSeek CVE-2026-72776** (9.8) — `/query` on `0.0.0.0:7777` → `subprocess.Popen
  (shell=True)`; fixed PR #534.
- **Langflow CVE-2026-9198** (9.8, KEV) — a chain: `/api/v1/auto_login` (CVE-2026-9103, SUPERUSER
  JWT to any unauth caller) → `/api/v1/validate/code` (CVE-2026-8481, unsandboxed `exec()`), exploited
  via the default-argument trick. MCP-adjacent agent tool reaching `exec()` = RCE, no SSRF needed.
- **mcp-grafana CVE-2026-19516** (9.1 SSRF) — caller-controlled `X-Grafana-URL` header sets the
  outbound destination; predecessor CVE-2026-15583 patched the token leak but not the destination.
- **Earlier enterprise edge:** VMware vCenter CVE-2026-59310 (9.8 unauth RCE); Progress Kemp
  LoadMaster CVE-2026-8037 (9.6 command injection, KEV); Adobe Commerce/Magento CVE-2026-71362 (9.1
  unauth account takeover); Cisco ASA/FTD CVE-2026-20349 (8.6 unauth VPN DoS, KEV); SAP NetWeaver
  SB2026081203 (9.3 RCE); Semantica v0.6.5 (5 externally-reported vulns); Chrome 5 UAFs.

## Defensive mirror + the audit checklist

- **Vercel deepsec** (`vercel-labs/deepsec`, Apache 2.0) and **OpenAI Codex Security** turn the same
  agentic pattern back on the problem: candidate scan → agent dataflow tracing → revalidation
  (~10–20% FP rate) with source staying on your infra. See [[agent-stack]].
- **The MCP SSRF audit checklist** (7 steps, template CVE-2026-19516) and the unauth MCP/tool-exec fix
  checklist (bind loopback, gate the endpoint, drop `shell=True`, require a token) live in
  [[agent-stack]].

## Watch for

- ~~Does "patch-then-reverse-engineer" compress the patch window?~~ **Answered (08-16 04:36): yes —
  the window went negative (−7d MTE).** New question: what replaces patch velocity as the measured
  defense metric — dwell/MTTR, runtime-detection coverage, or segmentation? And does
  "disclose-and-race" push vendors toward silent/delayed disclosure?
- The AI-assisted *offensive* exploit cadence (Rapid7 24 days) vs the defensive fan-out — who wins the
  compression race?
- Default-exposed surfaces beyond VNC and MCP: what other "on by default, network-reachable" services
  ship in agent runtimes and desktop OSes?
