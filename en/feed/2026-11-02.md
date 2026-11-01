---
date: 2026-11-02
updated: 2026-11-01T20:23:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 18
license: CC-BY-4.0
---

# Trending — 2026-11-02

## 1. A Linux TCP use-after-free had a record for 16 days — then Go's MPTCP default made it the front page

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News · 647 pts · ~25h ago (~03:16 UTC+8) · CVE record published 2026-10-15
- **Tags:** `cve` `linux-kernel` `tcp` `mptcp` `go` `use-after-free`

`CVE-2026-98432` is a use-after-free in the Linux kernel's IPv4 TCP handshake. During connection setup the kernel saves the peer's IPv4 header options on the half-open request socket so it can echo them; when the connection completes it passes those saved options to the full socket **without copying them**, then frees them at close while another CPU can still read them to build the reply. The write-up's fix description is two RCU-delayed frees plus a request-socket migration path; the related IPv6 case was left for a separate patch. Affected is 4.4 and later, below 5.10.272 / 5.15.223 / 6.1.190 / 6.6.159 / 6.12.113 / 6.18.56 / 7.2.10 / 7.3. The Linux kernel CNA (the `416baaa9-…` assigner) scored it **9.8**, and as of this batch NVD's status is `Received` with **0 NVD-scored metrics** — the 9.8 on the record is the CNA's arithmetic, not NVD's.

The reason it surfaced this week is not the record: it is that **Go 1.24 turned MPTCP on by default for listen sockets** on Linux (GODEBUG `multipathtcp=2`; dialers stay opt-in), and Anthropic's demonstrated exploit needed an MPTCP listener. Go's security team answered on **2026-10-30**: "The best fix for this vulnerability is to upgrade to a patched kernel version", calling the per-program switch "a fragile mitigation" and warning that "Accidentally leaving a single MPTCP listener exposed will still leave a system vulnerable." Setting `multipathtcp=0` is decided by the **main module's** `go` directive, not the toolchain — a module declaring `go 1.23` keeps the old behaviour.

**Why it matters:** this is a remote, unauthenticated, pre-application bug whose precondition was installed by a language runtime's default, and the runtime's own team says the switch you can flip is not the fix. Treat it as a kernel patch item, not a Go item — but inventory the Go services first, because they are the ones that put the listener there.

[`🔗 CVE-2026-98432 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-98432) · [`🔗 Write-up: atlasum`](https://atlasum.net/blog/cve-2026-98432-linux-ipv4-tcp-uaf) · [`🔗 Go security team on oss-security`](https://www.openwall.com/lists/oss-security/2026/10/30/1) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50319143)

---

## 2. Three Beta9 sandbox escapes score 9.9 each — and every one starts from "a tenant with a workspace token"

- **Velocity:** ▮▮▮ trending
- **Source:** JFrog CNA (cveawg) · records published 2026-11-01 · fixed 2026-09-15
- **Tags:** `cve` `sandbox-escape` `multi-tenant` `kubernetes` `path-traversal` `ai-infra`

JFrog's CNA published three 9.9s against **beam-cloud/beta9**, the serverless GPU/container platform, all on 2026-11-01, all `AV:N/AC:L/PR:L/S:C/C:H/I:H/A:H`, and all sharing one sentence: a tenant with a workspace token gets the host. `CVE-2026-120307` is the sandbox file API: `getHostPathFromContainerPath` joins the remainder of a container path onto a mount source with `filepath.Join`, which **cleans parent-directory segments after the prefix check**, so a long enough run of `..` names any absolute path on the worker. Upload, download, stat, list, find-in-files, replace-in-files and delete-file all call that one helper. The read-only proof downloaded the worker pod's **Kubernetes service account token**, and the shipped remote-node manifests bind that account to `cluster-admin`. `CVE-2026-120308` is volume attach: nothing checks the volume identifier names a volume the workspace owns, so parent segments collapse the path to the worker's filesystem root, which is then bind-mounted read-write. `CVE-2026-120306` is image build: the worker sets `BUILDAH_ISOLATION=chroot` and never passes `--isolation`, so a `RUN` line keeps the pod's PID, network, IPC and user namespaces as uid 0 with `CAP_DAC_OVERRIDE` — and `/proc/1/root` is the worker's own filesystem, containing `runc`, `buildah` and the service account token. Layered Clip v2 builds are the default, so one image build reaches it.

The fixes are in **worker 0.1.756 and gateway 0.1.776** — both published **2026-09-15T04:03–04:04Z**, **47 days before the records**. The remediation is structural rather than a patch: `os.OpenRoot` for sandbox file operations and workspace sync, mount validation applied to stubs saved before the check existed, and OCI isolation with private PID/IPC/network namespaces for Buildah steps.

**Why it matters:** a token that means *can deploy a function* was, on three separate paths, a token that means *can read the host*. If you run multi-tenant build or sandbox infrastructure for AI workloads, the *upgrade* is the story — the newest worker is 0.1.821, so anyone still on a September build has had 47 days to move and no CVE to tell them to.

[`🔗 CVE-2026-120307`](https://cveawg.mitre.org/api/cve/CVE-2026-120307) · [`🔗 CVE-2026-120308`](https://cveawg.mitre.org/api/cve/CVE-2026-120308) · [`🔗 CVE-2026-120306`](https://cveawg.mitre.org/api/cve/CVE-2026-120306) · [`🔗 Fix: worker-0.1.756`](https://github.com/beam-cloud/beta9/releases/tag/worker-0.1.756)

---

## 3. Prefab's "isolation for untrusted code" left Deno's permissions on — 10.0, and the untrusted code is the model's

- **Velocity:** ▮▮▮ trending
- **Source:** JFrog CNA (cveawg) · published 2026-11-01 · fixed in prefab-ui 0.21.0 (2026-10-26)
- **Tags:** `cve` `mcp` `sandbox-escape` `deno` `pyodide` `generative-ui`

`CVE-2026-120338` is the cleanest statement of the year's agent-infrastructure problem: the feature is *documented as isolation for untrusted code, including LLM-written UI*, and it ran with `--allow-read`, `--allow-write` and `--allow-net`. Prefab UI's Generative UI sandbox executes caller-supplied Python in Pyodide, inside a Deno subprocess. From **0.14.0 through 0.20.2** the launcher started Deno unrestricted and left the Deno API on the JavaScript global; Pyodide's `js` proxy exposes that global, so Python can call `Deno.readTextFileSync` and `Deno.writeTextFileSync` directly — read and write as the server OS user, and persistence by writing a `.pth` into the server virtualenv's `site-packages`. The usual remote path is FastMCP's GenerativeUI provider, which registers the `generate_prefab_ui` MCP tool and forwards that tool's `code` argument into the sandbox.

The CNA published **two scenario-labelled metrics** rather than one: **10.0** for "FastMCP server with GenerativeUI enabled, Deno installed, and no authentication configured" (`PR:N`, `S:C`) and **9.9** for an authenticated client allowed to call tools (`PR:L`, `S:C`). NVD's copy carries the 10.0 alone. Fixed in **0.21.0** (uploaded 2026-10-26T19:00:11Z, six days before the record): the runner revokes Deno read/write/network permission *before* it accepts code, starts Deno with `--no-prompt` so a permission request cannot grant them back, and limits bootstrap network access to `cdn.jsdelivr.net` — commit `030f074`, PR 538.

**Why it matters:** the threat model was written down and the enforcement was one flag away from it, which is what most generative-UI stacks look like right now. Two scenario scores on one record is also the honest shape: the severity of this class depends entirely on whether the MCP server in front of it has authentication, and most don't.

[`🔗 CVE-2026-120338 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120338) · [`🔗 Fix commit 030f074`](https://github.com/PrefectHQ/prefab/commit/030f074f85e0b1be0dd44b0283185aecb26337a2) · [`🔗 prefab-ui on PyPI`](https://pypi.org/project/prefab-ui/)

---

## 4. DeepSeek open-sources a super-agent whose whole thesis is *spending less human attention*

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub (created 2026-10-31T09:32Z) · 6,848★ · 682 forks · MIT
- **Tags:** `agent` `deepseek` `harness` `architecture` `github-bot`

`deepseek-ai/dsh-superagent-prototype` appeared on 2026-10-31 and took **6,848 stars and 682 forks in under two days** for a repo with no releases. It is a proactive coding agent for one GitHub repository (optionally Feishu), packaged as a **DeepSeek Harness** bundle: it listens to a repo, and when someone on an allowed list asks for work it opens a work item, runs it in its own session and directory, and answers in the original conversation — usually with a pull request. The README is unusually honest about what it is: "**Research prototype for reference only, not an official DeepSeek product**", "much of the engineering done by coding agents", and "Some designs discussed in the article are directions for future development and are not implemented in this prototype."

The design is where the value is. The philosophy doc states one rule — "Take as little human attention as possible, and give as much value as possible" — and derives behaviour from it: the agent acts only when asked or when a **written team rule** allows it, and work nobody asked for starts in a mode that only *records* what it would have done. The architecture doc describes a single `Engine` as the only writer of Triggers, Threads, Decisions, Tickets and Assignments, split into five parts (`Intake`, `Evals`, `Tickets`, `Assignments`, `Replies`) with one-directional dependencies, and callers receive only their role's `Pick` of the engine — `EngineForSources`, `EngineForExecutor`, `EngineForPeople`. Authorization travels with the ticket, not with the session.

**Why it matters:** most agent frameworks optimize for what one session can do; this one optimizes for how much a session is allowed to cost other people. The scale numbers circulating for it come from a design write-up that labels its own results "indicative only" — the repo, which you can read, is the part worth judging.

[`🔗 deepseek-ai/dsh-superagent-prototype`](https://github.com/deepseek-ai/dsh-superagent-prototype) · [`🔗 docs/000-philosophy.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/000-philosophy.md) · [`🔗 docs/007-architecture.md`](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/main/docs/007-architecture.md) · [`🔗 Design write-up (DeepSeek Harness)`](https://x.com/DeepSeekHarness/status/2116857257245987236)

---

## 5. t3code is an "agent harness control surface" — 37.5k stars, seven providers, and one stable release

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +3,100★ today · v0.1.6 published 2026-10-31T10:52Z
- **Tags:** `agent` `devtools` `electron` `mobile` `harness`

`pingdotgg/t3code` is at **37,509 stars** and gained **3,100 today**, for a project whose own README opens with "We are very very early in this project. Expect bugs" and "We are (mostly) not accepting contributions yet." What it is: an "agent harness control surface" — a server plus iOS, Android, web and Electron clients that drive the agents already on your machine. It supports **Claude Code, Codex, Cursor CLI, Grok Build, OpenCode, Google Antigravity and fx**, and it explicitly does not sell inference: "Works with your subscriptions." The stated inspiration list — the Codex desktop app, Conductor, Claude Desktop, Cursor Glass — is also its competitive claim.

The artifact state is worth separating from the star count. The stable release is **v0.1.6 (2026-10-31T10:52:24Z)**, npm `t3` `latest` is **0.1.6** one minute later, and everything above it — `v0.1.7-nightly.20261101.4035` — is a prerelease on the nightly channel, which is what the AUR and the GitHub releases page are mostly showing. MIT, TypeScript, created 2026-02-08.

**Why it matters:** the harness layer is consolidating faster than the models are, and the interesting bet here is *remote control of local agents* rather than another hosted IDE — your subscription, your machine, someone else's UI. The caveat is the one the maintainers wrote: at 0.1.6 with big features closed to contributions, "truly open" is a promise about the licence, not yet about the process.

[`🔗 pingdotgg/t3code`](https://github.com/pingdotgg/t3code) · [`🔗 v0.1.6 release`](https://github.com/pingdotgg/t3code/releases/tag/v0.1.6) · [`🔗 npm t3`](https://www.npmjs.com/package/t3)

---

## 6. Apple confirms Qwen inside Apple Intelligence in China — developer beta November 4, iOS 27.3 in December

- **Velocity:** ▮▮▮ trending
- **Source:** Xinhua · announced 2026-10-31 · shipped in stages
- **Tags:** `apple` `alibaba` `qwen` `apple-intelligence` `china` `siri`

Alibaba and Apple announced on **2026-10-31** that Alibaba's **Qwen** model will back Apple Intelligence for users in China: testing in the **latest iOS developer beta starting November 4**, and the official rollout with **iOS 27.3 in December**. Qwen covers text and image understanding plus generation through **Siri, Writing Tools and Visual Intelligence**. Availability is conditioned on an Apple Intelligence-capable iPhone bought in China, or a device location *and* Apple Account region both set to China — and the integration is opt-in, with users choosing whether to enable it and what to share.

The data-handling statement is the part to keep: Alibaba said it "will not use user requests or generated responses for model training." What December does *not* include, per the coverage, is the rebuilt "Siri AI" shown at WWDC 2026 or the other next-generation Apple Intelligence features.

**Why it matters:** this is the first time a top-tier global hardware vendor ships a Chinese LLM as the system-level AI backbone in that market, and the two dates are the useful part — November 4 is when the API surface becomes testable, December is when the install base moves. If you build anything that ships into iOS in China, the "Compose with Qwen" and "Ask Qwen" entry points are a new integration target with a specific reg deadline.

[`🔗 Xinhua — Alibaba/Qwen partnership`](https://english.news.cn/20261031/0642ddf499b643b1b8babd0b43adee85/c.html) · [`🔗 China Daily — December launch`](https://www.chinadaily.com.cn/a/202610/31/WS6ae54463e4b06d4aa0566359.html)

---

## 7. TextSeal2 keeps a watermark through speculative decoding — 8–22 points more detection at the same diversity

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40613 · submitted 2026-10-29 · code in `facebookresearch/textseal`
- **Tags:** `research` `watermarking` `speculative-decoding` `llm` `provenance`

Watermarking schemes have had two recurring failure modes: they cost output diversity, and they stop working when a draft model's tokens are accepted or rejected by a target model. **TextSeal2** targets both. Its predecessor routed each token to one of two keys by a coin flip, and the detector averaged both keys' scores **without knowing which key was used** — so the signal diluted. TextSeal2 merges two or more keys into a single virtual key and couples it to fresh noise through a Gaussian copula, which the authors note lets "any number of keys, including publicly shared keys" be merged without diluting detection.

Speculative decoding is handled with one extra **exponential race** run on the leftovers of the draft races; by memorylessness that race reproduces block verification, so the output "follows the target model exactly", tokens replacing rejected drafts stay watermarked with the same keys, and the acceptance rate is unchanged. Across three LLMs and at equal output diversity, it detects **8 to 22 percentage points** more 100-token answers than TextSeal at a false-positive rate of 10⁻³, and under speculative decoding **18 and 22 points** more 200-token answers than TextSeal and textGrain respectively, at the same acceptance rate.

**Why it matters:** "distortion-free" was already the claim to check, and the interesting shift here is that the watermark now has to survive an *inference optimization* rather than only a sampling scheme — which is the direction serving stacks have been moving for a year. The paper reports diversity parity rather than an audit of it, so the supplement is still the place to look before treating "free" as free.

[`🔗 arXiv 2610.40613 — TextSeal2`](https://arxiv.org/abs/2610.40613) · [`🔗 Code: facebookresearch/textseal`](https://github.com/facebookresearch/textseal)

---

## 8. VeriCUA treats task verification as evidence gathering, not as a judge's opinion

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40578 · submitted 2026-10-29 · "Work in progress"
- **Tags:** `research` `agents` `computer-use` `verification` `evaluation`

Verifying a computer-using agent is harder than scoring it, because every cheap method sees a partial view: a VLM judge is restricted to the observations it was handed, and a generated inspection program depends on state the harness can reach. **VeriCUA** reframes verification as **agentic exploration** — the verifier inspects available context, constructs a task rubric, then *selects* GUI or code checks for the requirements still unresolved, and combines their findings under explicit evidence rules. One procedure serves online and offline settings across desktop, mobile and web.

The abstract reports improved agreement with reference labels over the baselines in both settings, "with the largest offline gains on hard cases" and stronger rejection of false completion claims online — but it publishes **no numbers in the abstract**, so the direction is quotable and the magnitude is not.

**Why it matters:** rubric-plus-evidence beats a single judge for the same reason it does in human review, and the failure it targets is the one that corrupts everything downstream — a false success report becomes positive training data. Concentration on the hard cases is the shape you want from a verifier, but until the per-benchmark table is in hand, treat this as a design worth copying rather than a measured win.

[`🔗 arXiv 2610.40578 — VeriCUA`](https://arxiv.org/abs/2610.40578) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.40578v1)

---

## 9. Every token gets its own teacher: picking per-token supervision is worth +5.9 over the base model

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40574 · submitted 2026-10-29 · code on GitHub
- **Tags:** `research` `distillation` `post-training` `rl` `qwen3`

On-policy self-distillation conditions a teacher on privileged reference material; existing methods hold the teacher fixed across a whole training run, or vary reference exposure only *between* responses. This paper argues neither is right, because a teacher's preference can differ **token by token within the same response**. A pilot intervention study supports it, and the paper shows a preferred teacher per token can be identified by majority voting plus KL-based selection — the basis for **MTA-OPSD**, which keeps a pool of candidate teachers and lets every token select one during training.

On Qwen3 models for mathematical reasoning, MTA-OPSD beats existing OPSD approaches with an average gain of up to **+5.9 over the base model**. Code is at `xingzhejun/MTA-OPSD`.

**Why it matters:** the transferable idea is not the router but the measurement — that teacher preference is *non-monotonic across a single completion* undermines any method that picks one reference strength per response, which is what most self-distillation recipes do. It is a modest, single-task, single-family result; the pilot study is what makes it credible.

[`🔗 arXiv 2610.40574 — MTA-OPSD`](https://arxiv.org/abs/2610.40574) · [`🔗 Code: xingzhejun/MTA-OPSD`](https://github.com/xingzhejun/MTA-OPSD)

---

## 10. Multi-View MoE: three routers, same expert budget, +1.18 points

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.40577 · submitted 2026-10-29 · 10B-A1B, 708B tokens
- **Tags:** `research` `moe` `routing` `pretraining` `efficiency`

Sparse MoE models pick experts with one router, and the paper's starting measurement is that dense evaluation of all experts shows **weak agreement between single-router rankings and expert-utility rankings**, especially in middle and deep layers. Richer selection signals usually cost something — internal activations require preliminary computation, and running several full representations through the same expert repeats its FLOPs. **Multi-View MoE** instead aggregates sigmoid scores from independently initialized routers, and then reuses each selected expert's *relative* scores across routers to mix learned latent views into that expert's input — so routing preferences serve both selection and computation while each selected expert still executes one forward pass.

On a 24-layer 10B-A1B model trained on 708B tokens, full Multi-View MoE improves the nine-task downstream mean by **1.18 percentage points** over the baseline; Multi-Router alone gives **0.6**, and raises the rank correlation between router scores and evaluated expert utility by **8.1%** globally and **~58%** in the layer with the lowest single-router alignment. Active-expert count, expert FLOPs and all-to-all volume are unchanged.

**Why it matters:** it buys quality without buying compute, which is the rare direction on this axis, and the 58% figure is the honest one to quote — the gain concentrates exactly where the single router was most wrong. One model, one token budget, no released code at submission: a design result, not yet a recipe.

[`🔗 arXiv 2610.40577 — Multi-View MoE`](https://arxiv.org/abs/2610.40577) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.40577v1)

---

## 11. JetBrains' ThinkRail is an agentic IDE built around someone else's agent

- **Velocity:** ▮▮ rising
- **Source:** GitHub (JetBrains incubator) · 6,941★ · +5,738 this week · Apache-2.0
- **Tags:** `ide` `jetbrains` `agents` `git-worktree` `typescript`

`JetBrains/thinkrail` shipped **v0.4.0-nightly.2 on 2026-11-01**, carries **6,941 stars** with **+5,738 in the last week**, and is an incubator project rather than a product line. The design choice worth noting is that it does **not** ship a model or an agent: it wraps the `pi` coding agent in a real IDE — Monaco tabs, a files tree with live git, a splittable workbench — and puts the engineering into isolation and memory. Every repo becomes a project, and every task is cut as a **`git worktree`** with its own branch and working directory, so agents run in parallel without touching your checkout; finished or dormant workspaces settle onto a per-project "shelf" when their PR merges or closes, and return when you work in them.

Durable project knowledge comes from "living specs" and reusable skills, and the roadmap is explicit that full extension support comes next — so ThinkRail can build the tools it needs from how you actually work.

**Why it matters:** JetBrains' own IDEs are the incumbent this displaces, and it is aiming at the layer the harness projects are also fighting for. The `worktree`-per-task model is the strongest part: it makes parallel agents a git fact rather than a UI promise — though at a nightly-only release with no stable tag, this is one to watch rather than adopt.

[`🔗 JetBrains/thinkrail`](https://github.com/JetBrains/thinkrail) · [`🔗 thinkrail.ai`](https://thinkrail.ai/)

---

## 12. Mika runs an Android agent on a *hidden background screen* — no app APIs, no server, your own key

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 3,738★ · v0.1.33 published 2026-11-01 · Apache-2.0
- **Tags:** `android` `agent` `computer-use` `on-device` `privacy`

`wangzan101/Mika` (3,738★, created 2026-10-29, Apache-2.0) is an Android agent that operates apps the way a person does — "looks at the screen and finds buttons", with **no app APIs and no per-app integration** — but on a **separate background screen**, so it can tap and scroll while you keep using the phone; the pairing is done once through wireless debugging, and a floating capsule opens a live view when you want to watch. It also ships a built-in desktop-class browser, per-conversation **arm64 Linux sandboxes** for Python, Node and shell on files you send, and scheduled/conditional tasks. It runs in **Ask mode by default**, checking with you only before spending money, and hands logins, verification codes and payments back to you.

The privacy shape is the differentiator: "There is no Mika server" — API keys and memories are encrypted on the device, conversations and run records stay there, and update checks only contact GitHub; you supply an OpenAI-compatible, Anthropic or Gemini endpoint, or sign in with a ChatGPT, xAI or OpenRouter account. Requirements are Android 12+ to operate apps (14+ recommended) and Android 11+ for chat, web and files.

**Why it matters:** on-device computer-use agents are the category most likely to ship without a server, and this one states the trade-off plainly — automating third-party apps "may break their terms of service". The background-screen trick is what makes an agent usable at all on a phone you are holding; the Ask-mode default is the part that makes it defensible.

[`🔗 wangzan101/Mika`](https://github.com/wangzan101/Mika) · [`🔗 v0.1.33 release`](https://github.com/wangzan101/Mika/releases/tag/v0.1.33)

---

## 13. `unslop` is a skill that finds "AI-looking" UI by naming the slop first

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 4,711★ · created 2026-10-29 · CC-BY-4.0
- **Tags:** `skills` `claude-code` `design` `frontend` `codex`

`heydamir/unslop` (4,711 stars in four days) is a skill for Claude Code and Codex that turns "vibecoded, AI-looking UI into a designed interface with its own character." The method, per its README, is two-phase: it **names the slop** — "the purple gradients, glows, emoji labels, shouty copy and uneven spacing" — then sets a direction from the product and fixes the screen "pass by pass like a designer doing a redline review." It works in Next.js, React, Vue, Svelte, Tailwind or plain HTML/CSS, on dashboards, apps and landing pages, and can operate on a **live URL** with only a link, given Playwright and Chromium.

Rated **CC-BY-4.0** — a documentation licence on a skill — and installable by copy into `~/.claude/skills/` or `~/.agents/skills/`.

**Why it matters:** the design-skill genre has been mostly prompt packs with a style list; this one's contribution is the diagnosis step, because a model that can enumerate what makes a screen look generated can be told to stop. The licence is the detail to read before shipping it inside a product: CC-BY is attribution, not a permissive code licence.

[`🔗 heydamir/unslop`](https://github.com/heydamir/unslop) · [`🔗 skills/unslop/SKILL.md`](https://github.com/heydamir/unslop/blob/main/skills/unslop/SKILL.md)

---

## 14. hop installs Linux beside Windows from a single Windows app, with no USB stick

- **Velocity:** ▮▮ rising
- **Source:** GitHub · 1,155★ · v0.3.0 published 2026-11-01T09:41Z · MIT
- **Tags:** `linux` `installer` `windows` `dual-boot` `uefi`

`Arjun-Ingole/hop` (1,155★, created 2026-10-30, MIT) is one Windows executable that installs a Linux distribution next to Windows: pick a system, drag a bar to choose how much space it gets, click Install. It downloads the ISO from each project's own server and **verifies the checksum where the project publishes one**, or takes a file you already have. The awkward parts are addressed explicitly — "Make room" clears the unmovable files that make a drive show free space it refuses to shrink, and the app lists the exact choices to make in the distro's own installer when it hands over.

It supports elementary OS, Ubuntu and its flavours, Linux Mint, Pop!_OS, Zorin, Debian, Fedora Workstation, Ultramarine, CachyOS, Arch and Omarchy; requires Windows 10 (1803+) or 11 on a UEFI PC with a GPT disk, and Linux must go on a disk inside the PC rather than a USB device. Kubuntu is unsupported for a specific reason — "its ISO has a file too big for FAT32" — and several distros need Secure Boot off, with **Omarchy additionally requiring BitLocker fully off, not paused**, which hop refuses to do for you.

**Why it matters:** dual-boot installation is the step where people lose a Windows install, and the design here is to move every irreversible decision *after* a check that can fail safely, then undo cleanly. Worth reading even if you never run it: the per-distro caveat table is an unusually candid map of what the installers actually assume.

[`🔗 Arjun-Ingole/hop`](https://github.com/Arjun-Ingole/hop) · [`🔗 v0.3.0 release`](https://github.com/Arjun-Ingole/hop/releases/tag/v0.3.0)

---

## 15. Tears of the Kingdom, statically recompiled to native x86-64 — 3,090 stars and a build-from-your-own-files rule

- **Velocity:** ▮ steady
- **Source:** GitHub · 3,090★ · v0.3.1 published 2026-11-01 · MIT
- **Tags:** `recompilation` `nintendo` `vulkan` `reverse-engineering` `gaming`

`valentderah/totk-pc-recomp` (3,090★ since 2026-10-29, MIT, v0.3.1 on 2026-11-01) is a **static recompilation** of *Tears of the Kingdom* into a native Windows/Linux x86-64 application with a Vulkan renderer — not an emulator, and the README says so in the first feature line. It supports game updates 1.1.0, 1.2.1 and 1.4.3 with saves that carry over, 60 fps by default and up to 144 experimental, HDR10, 21:9/32:9 with the camera and interface reshaped to match, shaders prepared at install instead of during play, and emulator-format mods including RomFS, TKMM merged output and `.ips`/`.pchtxt` code patches, plus Atmosphère cheats.

The legal shape is stated up front: "**No game files are included.**" You dump your own copy and the setup builds the game on your machine — "the result contains the game. It is for your own use. Do not share it." Status is "early development. The game is playable on Windows and Linux; visual bugs and crashes are still expected."

**Why it matters:** static recompilation is quietly displacing emulation for this generation because it sidesteps per-instruction translation at run time — and it produces a native binary whose GPU path (Vulkan 1.3 + `VK_EXT_external_memory_host`) is where the real work now sits. The distribution model is the other half: a build recipe plus a legal boundary, rather than a binary nobody can share.

[`🔗 valentderah/totk-pc-recomp`](https://github.com/valentderah/totk-pc-recomp) · [`🔗 v0.3.1 release`](https://github.com/valentderah/totk-pc-recomp/releases/tag/v0.3.1)

---

## 16. Handy is on trending again with 36k stars and a release from October 3

- **Velocity:** ▮ steady
- **Source:** GitHub Trending · +383★ today · 36,402★ · v0.9.8 (2026-10-03)
- **Tags:** `speech-to-text` `offline` `whisper` `whisper-cpp` `privacy`

`cjpais/Handy` gained **383 stars today** and sits at **36,402** for a fully offline speech-to-text app: press a shortcut, speak, get text pasted into whatever field has focus, with everything local. Silence is filtered by **Silero VAD**, and transcription runs on a choice of **Whisper Small/Medium/Turbo/Large** with GPU acceleration when available, or **Parakeet V3**, a CPU-optimized model with automatic language detection. Windows, macOS and Linux; MIT.

The trigger here is attention, not a release: the newest tag is **v0.9.8 from 2026-10-03**, and the previous two were 2026-09-18 and 2026-08-24 — a roughly monthly cadence that has not moved this week. Homebrew and winget packages exist but the README notes they "are not maintained by the Handy developers."

**Why it matters:** local dictation is one of the few AI features where on-device is strictly better for most users — latency, cost and privacy all point the same way — and a 36k-star project with no cloud path is the proof that the model is good enough. Quote the star count as interest, and the release date as the state: nothing shipped this week.

[`🔗 cjpais/Handy`](https://github.com/cjpais/Handy) · [`🔗 handy.computer`](https://handy.computer)

---

## 17. Calegari, on Tao's blog: "Evaluate all work as if it is AI-assisted"

- **Velocity:** ▮ steady
- **Source:** Terry Tao's blog (guest essay by Frank Calegari) · 2026-11-01 · 72 pts on HN
- **Tags:** `mathematics` `ai-research` `incentives` `publishing` `lean`

A guest essay by **Frank Calegari** on Terence Tao's blog — not by Tao — argues that mathematics has crossed a line and the profession's incentives have not. The trigger is the October 6 OpenAI release of more than 700 papers; the essay's response is neither that mathematics is over nor that nothing changed, but that the **cost of exploratory, cross-disciplinary work has fallen**, so value should shift from proving known conjectures toward choosing worthwhile problems, building programmes and explaining connections. The named danger is a priority race: rapid AI-assisted output, less understanding, and journals that certify volume rather than insight.

He makes six concrete proposals: "Evaluate all work as if it is AI-assisted"; "Make hiring much more about personal interactions rather than a paper file"; "Demand more from journals, and abandon those that do not adapt"; "Put a greater emphasis on breadth in graduate education, but do not abandon technical skills"; "Give better seminars"; "Take more ownership of the results of AI." The sharpest line is aimed at his own seniority class: "If you, as a senior mathematician, are stressed about being scooped by AI, then you are not being ambitious enough." He also argues "a significant proportion of papers posted to the arXiv should not be published anywhere" — fewer and better, with Lean verification where appropriate.

**Why it matters:** the proposals are institutional rather than technical, which is why they are usable: "evaluate all work as if it is AI-assisted" is a policy a department can adopt today, and the historical benchmarks he sets beside it — Gorenstein's classification programme announced 1972, the classification in 1983, the quasithin case taking roughly two more decades — are the argument against measuring a field by its solved problems.

[`🔗 Mathematics has changed. Let's act like it`](https://terrytao.wordpress.com/2026/11/01/mathematics-has-changed-lets-act-like-it/) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50328251)

---

## 18. AJ-Report signs share tokens with a hard-coded JWT secret — one record, a 9.3 and a 9.8

- **Velocity:** ▮ steady
- **Source:** VulnCheck CNA (cveawg) · reserved 2026-10-31T11:44Z · published 2026-11-01
- **Tags:** `cve` `hardcoded-secret` `jwt` `rce` `groovy`

`CVE-2026-120209` says AJ-Report **through 1.7.1** signs share tokens with a **hard-coded JWT secret**, so an attacker can forge a valid `Share-Token` offline. Mint a token with `reportCode` set to `dataSet`, reach the `testTransform` endpoint, and the request's script reaches a **`GroovyClassLoader`** — unauthenticated remote code execution, with the forgery step requiring no interaction with the server at all. The project's own repository is on Gitee (`anji-plus/report`), and the record cites the `JwtUtil.java` source that hard-codes the key.

The scoring is a free illustration of the provenance rule in this feed: one record carries **CVSS 4.0 9.3** and **CVSS 3.1 9.8** from the same CNA, and the gap is the framework's, not a disagreement between two parties. Affected is `version: "0"` through `≤ 1.7.1` with `defaultStatus: unaffected` — an open-ended lower bound, which is a null minimum rather than "all history".

**Why it matters:** a signature that anyone can produce is authentication theatre, and the endpoint behind it turns forged identity into code execution — the same shape as three of this week's other records. The two scores are the habit to unlearn: quote the version with the number, because a 9.3 and a 9.8 on one page are one assessment written twice.

[`🔗 CVE-2026-120209 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120209) · [`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/aj-report-through-1.7.1-authentication-bypass-leading-to-rce-via-share-token) · [`🔗 JwtUtil.java (Gitee)`](https://gitee.com/belief-team/report/blob/V1.7.1/report-core/src/main/java/com/anjiplus/template/gaea/business/util/JwtUtil.java)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-01T20:23:50Z |
| Items | 18 |
| Sources tracked | 18 (GitHub Trending, Hacker News, arXiv, NVD/CVE records, cveawg CNAs, JFrog, VulnCheck, Go security team, Xinhua, China Daily, Terry Tao's blog, GitHub releases, npm, PyPI, Hugging Face, JetBrains, DeepSeek Harness, handy.computer) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-01.md) · [Raw .md](https://trending.md/en/feed/latest.md) · [Archive](../archive/)
