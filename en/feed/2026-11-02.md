---
date: 2026-11-02
updated: 2026-11-02T12:19:50Z
schedule: 04:03, 12:03, 20:03 UTC+8
sources: 24
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
- **Source:** VulnCheck CNA (cveawg) · reserved 2026-10-31T11:44Z · published 2026-10-31T17:25Z
- **Tags:** `cve` `hardcoded-secret` `jwt` `rce` `groovy`

`CVE-2026-120209` says AJ-Report **through 1.7.1** signs share tokens with a **hard-coded JWT secret**, so an attacker can forge a valid `Share-Token` offline. Mint a token with `reportCode` set to `dataSet`, reach the `testTransform` endpoint, and the request's script reaches a **`GroovyClassLoader`** — unauthenticated remote code execution, with the forgery step requiring no interaction with the server at all. The project's own repository is on Gitee (`anji-plus/report`), and the record cites the `JwtUtil.java` source that hard-codes the key.

The scoring is a free illustration of the provenance rule in this feed: one record carries **CVSS 4.0 9.3** and **CVSS 3.1 9.8** from the same CNA, and the gap is the framework's, not a disagreement between two parties. Affected is `version: "0"` through `≤ 1.7.1` with `defaultStatus: unaffected` — an open-ended lower bound, which is a null minimum rather than "all history".

**Why it matters:** a signature that anyone can produce is authentication theatre, and the endpoint behind it turns forged identity into code execution — the same shape as three of this week's other records. The two scores are the habit to unlearn: quote the version with the number, because a 9.3 and a 9.8 on one page are one assessment written twice.

[`🔗 CVE-2026-120209 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120209) · [`🔗 VulnCheck advisory`](https://www.vulncheck.com/advisories/aj-report-through-1.7.1-authentication-bypass-leading-to-rce-via-share-token) · [`🔗 JwtUtil.java (Gitee)`](https://gitee.com/belief-team/report/blob/V1.7.1/report-core/src/main/java/com/anjiplus/template/gaea/business/util/JwtUtil.java)

---

---

## 19. HackerBooks indexes 270,334 book mentions from 19 years of HN comments — and prints the 85% its own labels agree

- **Velocity:** ▮▮▮ trending
- **Source:** Hacker News (Show HN) · 1,054 pts · ~12h ago (~23:58 UTC+8)
- **Tags:** `hacker-news` `dataset` `llm-labeling` `books` `affiliate`

Hacker Books is a searchable index of books recommended in Hacker News comments, and its own `data/meta.json` — generated **2026-11-02** — states the corpus rather than gesturing at it: at this batch's reading, **15,362 books, 270,334 mentions, 217,954 comments, 56,456 commenters**, covering **2007 to 2026**, with book metadata and covers from Open Library and every book page linking back to the original thread. The file is rebuilt under a new content hash, so the current build reads **15,766 books and 281,363 mentions** — the totals are a snapshot, not a constant. The pre-built top list carries **600** books; the whole book-level dataset is downloadable as CSV.

The part worth reading is how it decided what "recommended" means. Counting mentions alone makes a book people *warn about* rank like a favourite, so **every mention was labelled by Claude Sonnet 5.5** as *recommend*, *neutral*, *critical* or *not about the book*, and mentions of a same-named film or game are dropped. The About page then states the check: the labels were compared against Claude Opus 5.5 on 400 mentions and agreed **85%** of the time, and the page's own note is that you should expect some noise. Keyword rules, sentiment scoring and a TF-IDF classifier were tried first and were less accurate. Ranking weights **distinct commenters** above raw mentions, so one enthusiast cannot carry a title.

It is also a business, and the bundle says so in code: the affiliate map is `{ bookshop: '130774', amazon: 'roansh-20' }`, and the About text says a commission from those links "pays for hosting". The site credits Andrej Karpathy's HackerTube as the inspiration and states it is "not affiliated with Y Combinator or Hacker News."

**Why it matters:** an LLM-built corpus that publishes its own inter-model agreement is a better artifact than most "AI search" products — and the 85% is the number to carry, because it is the ceiling on every claim of the form "recommended by N people". The second HN-archive consumer product in two days is also the trend: a 19-year comment corpus is now raw material, and the third-party mirror, not HN's API, is what gets indexed.

[`🔗 hackerbooks.org`](https://hackerbooks.org) · [`🔗 hackerbooks data/meta.json`](https://hackerbooks.org/data/meta.99d6a8ef.json) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50326821)

---

## 20. Postgres 19 is late because LLMs made its 40 years of bugs findable — back-patches up 74%

- **Velocity:** ▮▮▮ trending
- **Source:** Robert Haas (blog) · 154 pts on HN · ~27h ago (~09:38 UTC+8) · originally at neon.com
- **Tags:** `postgresql` `maintenance` `llm-bug-hunting` `release-engineering`

Robert Haas — PostgreSQL committer, Sr. Staff engineer at Databricks — writes that **PostgreSQL 19 will most likely not ship until November**, the first time in a decade the project misses its mid-September-to-mid-October window, and that three large features were pulled late in the beta: `UPDATE/DELETE FOR PORTION OF`, SQL/PGQ, and `ALTER TABLE … MERGE/SPLIT PARTITION`, all reverted between **August 27 and September 15**. His answer to "what happened" is not a process change but a measurement.

Between April 8 and September 25, commits to `master` in 2026 were **1,443** against **1,037** in 2025 — and Haas notes that is a *slight decline* once you account for the window. The jump is downstream: commits to `REL_19_STABLE` went **724 → 1,169** (more than +60%), and commits back-patched to at least one *prior* release went **248 → 433** (+74%). His reading is that committers were about as conservative as last year, but "a lot more of the mistakes they made were quickly found by LLMs."

The delay comes from the two places an LLM cannot help with: review, because drafted fixes "aren't always correct or compliant with PostgreSQL standards", and triage time diverted from the release to the back-branches — which is what left the reverts so late. Haas is explicit that the delay itself is not the worrying part; the open question is "given that we have forty years of bugs that humans were unable to find but LLMs are quite capable of discovering, how are we ever going to catch up".

**Why it matters:** this is the first mainstream database putting a release date on the LLM-bug-hunting era, and the number to carry is the **+74%** on back-branches, not the headline delay — it is a proxy for how much latent defect an auditor with no release calendar can now surface in mature code. Every long-lived codebase should expect the same bill, and it arrives as review load, not as patch volume.

[`🔗 Postgres 19 is late, and it's AI's fault`](https://rhaas.blogspot.com/2026/10/postgres-19-is-late-and-its-ais-fault.html) · [`🔗 Original at neon.com`](https://neon.com/blog/postgres-19-is-late-and-its-ais-fault) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50312408)

---

## 21. OmniDiff v0.3.0 diffs PDFs, fonts and pictures instead of printing "Binary files differ" — and shows where its test set is thin

- **Velocity:** ▮▮ rising
- **Source:** Show HN · 185 pts · v0.3.0 released 2026-11-01T10:58Z · 421★
- **Tags:** `rust` `diff` `dev-tools` `tree-sitter` `terminal`

`ivankovic/omnidiff` is an AGPL-3.0 diff tool that decides what it is looking at before it diffs: code goes through tree-sitter grammars (compiled from C at build time), and pictures, cursors, fonts, archives, message catalogs and PDFs each get a content-specific comparison instead of the `git diff` line that says the bytes differ. **v0.3.0**, published **2026-11-01T10:58Z**, extends that inside strings — TSX in a JSON `"content"` beside a `"path"` naming a `.tsx`, shell in a YAML `run:` block, CSS/HTML in template literals — so an edit inside a held string is highlighted where it happened rather than as one span from first to last change. Pictures compare perceptually, so a re-encode is not a change, and the TUI draws real pixels over kitty/sixel/iTerm2 or half blocks otherwise.

The README's own table is the interesting part, because it separates the claims: **99.95%** of code changes diffs robustly and **98.8%** gets a content-specific algorithm; on code, 98% of changes diff in under 100 ms, **70%** are *perfect* and 92% near-perfect; PDFs are 100% perfect but only **57%** under 100 ms — and the README says PDFs "have fewer than ten judged test cases". Speed is measured on one machine (i7-1370P, 32 GB). Install via `cargo install`, Homebrew, a signed apt repo, or Nix.

**Why it matters:** line diff is a 1970s model applied to artifacts that are not lines, and the interesting engineering here is the *asymmetry* — a heavier, type-aware comparison on one side that still has to run as `git`'s external diff. Read the percentages as judged-sample numbers, not as coverage: the perfect-on-PDF row rests on fewer than ten cases.

[`🔗 ivankovic/omnidiff`](https://github.com/ivankovic/omnidiff) · [`🔗 v0.3.0 release`](https://github.com/ivankovic/omnidiff/releases/tag/v0.3.0) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50325253)

---

## 22. Gitea published 20 CVE records in 111 seconds — and not one carries a score from anybody

- **Velocity:** ▮▮ rising
- **Source:** Gitea CNA (cveawg) · 2026-11-01T09:47:07–09:48:58Z · fixed in 28.3.0
- **Tags:** `cve` `gitea` `token-scope` `ci` `supply-chain`

The Gitea CNA published **20 records** in **111 seconds** on 2026-11-01, all with `affected: {version: "0", lessThan: "28.3.0"}` (four start at 1.19.0 / 1.23.0 / 1.27.0 instead of 0), and **none of the twenty carries a CVSS metric in any container** — not Gitea's, not CISA-ADP's. NVD lists all twenty as `Deferred` and its own `published` stamps run **10:18:33–10:18:37Z**, thirty minutes after the CNA's clock, which is the two-timestamp split this feed keeps running into.

The content is not thin, though: the batch is mostly **token scope** failing to apply. `CWE-863` (incorrect authorization) appears 6 times, `CWE-200` 4, `CWE-862` 4. The standouts: **`CVE-2026-118386`** — a PR review whose `commit_id` named the reviewer's own commit made `pull_request_review` workflows run from that commit, unapproved, "with the repository's secrets and a token that can write to it"; Gitea credits **Anthropic** for the report. **`CVE-2026-117635`** — a `public-only` personal access token was not restricted on `/api/v1/admin`, so a site admin's restricted token could list every user's email, create private organizations and create new administrators. **`CVE-2026-119441`** — `DELETE /api/v1/orgs/{org}/repos` accepted a public-only token and deleted private repositories. **`CVE-2026-120263`** — `ACCOUNT_LINKING = auto` let an OAuth2 sign-in claim an existing account by name or email. The release notes list **21** CVEs across **60** merged PRs; the 21st, `CVE-2026-111943`, is the Go 1.27.3 rebuild that drops a set of intermediate certificates, and it is not Gitea's.

On the score question, the project's own history is the correction to the obvious reading: of the **128** Gitea-assigned records NVD already holds, **120** carry a CVSS metric, but **101** carry only **CISA-ADP**'s enrichment and just **15** carry one Gitea wrote itself. So the number that will appear on these twenty is most likely CISA's, arriving later — "no score" here is a snapshot of two containers that have not been filled, not a policy.

**Why it matters:** a forge is the one place where an under-scoped token is a supply-chain primitive — a job token that could enumerate every private repo, a review workflow that runs attacker-chosen code with repo secrets. And the provenance rule cuts the other way from usual: this CNA *does* score, so the absence is latency. Quote it as *no metric published yet*, never as unscored by design.

[`🔗 CVE-2026-112887 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-112887) · [`🔗 Gitea 28.3.0 release notes`](https://blog.gitea.com/release-of-28.3.0/) · [`🔗 GHSA-8r36-6j2c-3gmv`](https://github.com/go-gitea/gitea/security/advisories/GHSA-8r36-6j2c-3gmv)

---

## 23. Apache Wicket published 19 records in 46 minutes — max 8.3, and the fixes live in two final EOL releases

- **Velocity:** ▮▮ rising
- **Source:** Apache CNA (cveawg) · 2026-11-01T21:42–22:28Z · NVD status `Received`
- **Tags:** `cve` `java` `wicket` `xss` `missing-authorization`

Nineteen Apache Wicket records landed between **21:42:45Z and 22:28:35Z** on 2026-11-01, every one scored **CVSS 4.0 only**, assigned by `security@apache.org`, and every one still `Received` in NVD with **no `nvd@nist.gov` metric** — so the score on every page is the CNA's, re-served. The ceiling is **8.3**, twice: `CVE-2026-83594` (`CWE-789`) lets `FileUploadToResourceField` allocate the size the client asserts in its own Ajax callback, and `CVE-2026-84170` (`CWE-770`) is the standalone upload resource not enforcing the configured limits. Then **7.6 ×3** and **7.4 ×3** are XSS and escaping — `CWE-79` appears 5 times across the batch, and one of the 7.4s is `CWE-116`, `JavaScriptUtils#escapeQuotes` escaping the quote but not the backslash, **6.9 ×2** and **6.3 ×4** are missing-authorization and package-resource leaks, and the tail runs 2.3 ×3 and 2.1.

Two details are worth more than the list. First, the project's qualitative labels and its scores do not track: the batch carries **9 "moderate", 6 "important", 1 "low"** and 3 with no label, and a **7.4** is labelled *moderate* while a **6.9** is labelled *important* — a label is a word, a score is arithmetic, and they are not the same assessment. Second, the ranges decide who can patch: they stop at **10.11.0**, **9.24.0** and **8.19.0**, so the fixed artifacts are **10.12.0** (2026-10-31) and — for the records that list a 9.x or 8.x branch — **9.25.0** and **8.20.0**, both published 2026-10-29 as the **final** releases of their lines. Wicket 9's own announcement says "there will be no further 9.x releases, not even for security fixes."

**Why it matters:** for anyone on Wicket 8 or 9, the patched version is the last one that will ever exist, and the upgrade is therefore to 10 LTS rather than to 9.25.0. It is also a release-notes problem: 10.12.0's post carries thirteen changelog entries and names exactly one of these fixes (`WICKET-7205`, the CSP case) — a reader who diffs release notes to decide whether to upgrade sees a routine bugfix release.

[`🔗 CVE-2026-83594 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-83594) · [`🔗 Wicket 10.12.0 release`](https://wicket.apache.org/news/2026/10/31/wicket-10.12.0-released.html) · [`🔗 Wicket 9.25.0 — end of line`](https://wicket.apache.org/news/2026/10/29/wicket-9.25.0-released.html)

---

## 24. OccupySaaS wants to rebuild SaaS without its vendors — one repo is OpenID-certified, the other has passed no milestone

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 124 pts · ~4h ago (~08:17 UTC+8)
- **Tags:** `open-source` `clean-room` `auth0` `salesforce` `licensing`

"OccupySaaS" is a protest movement with a repository: laid-off engineers, Apache-2.0, "clean-room, open-source, drop-in replacements for the platforms that rent our own industry back to us." The slogan is a million engineers. The artifacts, today, are **two repos**.

`occupysaas/zeroauthy` (24★, created 2026-10-14) is the real one: an identity server that speaks **Auth0's Authentication API and Management API**, so an existing Auth0 SDK points at a zeroauthy tenant and works unchanged — multi-tenant discovery, JWKS, `client_credentials`, authorization code + PKCE, rotating refresh tokens, PAR, device flow, `/v2/logout`, and a Management API for applications, APIs, client grants and database connections. It is **certified by the OpenID Foundation** as an OpenID Connect Provider for the Basic OP, Config OP and Form Post OP profiles at **commit `38b4229`, 18-Oct-2026** — and that is checkable: openid.net's certified-providers table lists "zeroauthy (commit 38b4229)".

`occupysaas/salescompel` (21★, last push 2026-10-21) is the other half of the pitch, a Salesforce replacement in Go/PostgreSQL, and its README is unusually honest about where it is: eleven milestones from M0 to M10, an early Vue prototype that "preview edits stay in memory and do not call the backend", and the sentence "no full program milestone has a recorded exit-gate pass yet". Its draft budget — "roughly 185–350 additional plan equivalents through M9" — with production certification (M9) at "Not reached" is the scale of the promise set beside a 24-star repo.

**Why it matters:** the OpenID certification is what separates this from a manifesto — an identity server that passes conformance suites is a testable claim, and a drop-in Auth0 replacement is the kind of thing that survives a company's pricing page. The Salesforce half shows the actual unit of this movement: one module at a time, with a clean-room document governing what may be read from the original, not a wholesale replacement.

[`🔗 occupysaas.com`](https://occupysaas.com/) · [`🔗 occupysaas/zeroauthy`](https://github.com/occupysaas/zeroauthy) · [`🔗 OpenID certified providers`](https://openid.net/certification/certified-openid-providers-profiles/) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50331402)

---

## 25. nibnib is an image format built to decode in six cycles a pixel — the encoder is orders of magnitude slower, and nothing is benchmarked yet

- **Velocity:** ▮▮ rising
- **Source:** Hacker News · 111 pts · ~3d ago (~12:17 UTC+8) · 79★
- **Tags:** `image-codec` `rust` `embedded` `rp2350` `format-design`

`raphlinus/nibnib` came out of a question about DVI output on an **RP2350** microcontroller, where the budget is roughly **six cycles per pixel** — enough for a fetch, a palette lookup and a store, and nothing else. The format that came out is a palette of **deltas** rather than colours: the last decoded pixel is doubled (`(pix >> 16) * 0x10001`), a byte indexes a 32-bit palette entry, and that entry is added to it — producing **two RGB565 pixels per input byte**, i.e. **4bpp**, with the low 16 bits as the left pixel. The whole inner loop is five lines of Rust.

Being delta-based is why it beats ordinary palette images: flat regions stay smooth because the palette stores small changes, not absolute colours, and the encoder chooses each entry to minimise error across *both* pixels using Floyd–Steinberg weights. The encoder is "orders of magnitude slower" than the decoder, which the README treats as the normal shape of an asymmetric format. It also lists what is not done: the palette is a fixed cube of small deltas plus random Gaussian entries and is **not chosen adaptively from the image**; the greedy search trails artifacts to the right of sharp edges; boustrophedon encoding and better searches are named as future work that would not change the decoder; and the container is two bytes of width, two of height, 256 palette entries, then rows — no metadata. Repo created **2026-10-30**, no commits since, MIT/Apache-2.0.

**Why it matters:** at ~6 cycles/pixel a general-purpose codec does not fit, and the only way to hit that budget is to make decoding trivial and push all the cost into a search nobody runs on the device. Read this one as a design note, not a product — there are no encode/decode benchmarks in the README and no release, so the number to hold is the cycle budget it was designed against.

[`🔗 raphlinus/nibnib`](https://github.com/raphlinus/nibnib) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50299811)

---

## 26. A2UI stops asking the model to emit JSON — Express is "up to 3x" faster, measured on one model and 51 tasks

- **Velocity:** ▮ steady
- **Source:** Google Developers Blog · 2026-10-27 · a2ui-agent-sdk 0.9.0
- **Tags:** `generative-ui` `agents` `a2ui` `sdk` `inference-format`

A2UI is Google's protocol for generative UI: a client advertises a component catalog as a contract, an agent sends messages describing a screen built from it, and the client renders. The original binding had models write that JSON directly, each brace and nested element — which the team now says "coupled A2UI to LLMs". The release makes the **inference format swappable** and ships **A2UI Express** as the new default: one statement per line in a Python-like syntax, positional arguments mapped by the catalog's schema order, `_` to skip a slot, `$/title` binding to the data model, `Event("accept")` for a server action — compiled back into validated A2UI messages by deterministic SDK code.

The claims are ceilings and the post says so: **up to 3x** lower latency and **up to 3x fewer tokens** than Direct JSON, from four formats (Direct JSON, Express, Atom, Elemental) run through the **same 51-task eval on gemini-3.5-flash**, with thinking on and off. Express is available in Python (`a2ui-agent-sdk` 0.9.0), TypeScript (`@a2ui/agent` 0.0.1) and Dart (`a2ui_agent` 0.0.1-wip004). The second path swaps in a **System One decision model**: TypeSafe's Jev answers typed questions with calibrated probabilities in ~100–300 ms, code builds the tree, and a small model writes only text — in one run of 11 prompts the tree was on screen in **92–298 ms** with screens complete in 0.8–1.7 s, valid on 11 of 11, and the post labels it "a first look, since the sample is small".

Two constraints are stated rather than hidden: controlled generation "can only produce the layouts its grammar describes" (Apparite's grammar covers nine archetypes and twelve blocks), and the Python/TypeScript SDKs **stream Direct JSON chunk by chunk but compile Express from the complete reply** — so the token win costs you first-paint.

**Why it matters:** the layer between a model and a renderer is where generative UI latency actually lives, and moving it from having the model write a tree to having it write a small program that SDK code compiles into that tree is the same trick that made tool calls reliable. Read "up to 3x" as one eval on one model, and check the streaming asymmetry before adopting it.

[`🔗 Fast, reliable A2UI, with swappable inference formats`](https://developers.googleblog.com/fast-reliable-a2ui/) · [`🔗 a2ui-agent-sdk on PyPI`](https://pypi.org/project/a2ui-agent-sdk/)

---

## 27. Trigger.dev tells customers their environment variables were taken — three sentences, no scope, no CVE

- **Velocity:** ▮ steady
- **Source:** Trigger.dev blog + status page · 24 pts on HN · ~3h ago (~09:09 UTC+8)
- **Tags:** `security-incident` `secrets` `background-jobs` `agent-infra`

Trigger.dev's CTO posted an incident notice on **2026-11-01**: "There has been a security incident at Trigger.dev. We've blocked the exploit used in this attack, but our investigation has identified exposure across a subset of organizations. The attacker gained unauthorized access to environment variables for these organizations." The status page entry was marked **Resolved at 22:50 UTC** the same evening, and says the team "will follow up with more details." As of this batch there is no CVE, no count of affected organizations, no description of the exploit, and no third-party report; mitigation steps went to account owners by email.

What the public record does show is a second, earlier event on the same component: the status page's Deployments history carries a **2h49m "Degraded"** entry on **2026-10-06** whose title renders as "Some sensitive environment variables synced fro…" — truncated in the component view, and not linked to this incident by Trigger.dev. For a platform that sells itself as a place to build and deploy AI agents, environment variables are the model API keys and the database URLs of every customer's agent.

**Why it matters:** this is the second disclosure in three days saying a platform's environment variables were read, after Northflank on 2026-10-31, and both notices are shaped the same way — exploit blocked, subset named, details later. The operational advice does not depend on the missing details: rotate the keys the platform held, and treat a job runner's env store as a credential store, because that is what an attacker treated it as.

[`🔗 Security Disclosure: Sunday November 1st`](https://trigger.dev/blog/security-incident-nov-2026) · [`🔗 Trigger.dev status`](https://status.trigger.dev/) · [`🔗 HN thread`](https://news.ycombinator.com/item?id=50331784)

---

## 28. VulDB scores each record four times — and the 4.0 score NVD re-serves is lower than the record's own in 38 of 41

- **Velocity:** ▮ steady
- **Source:** VulDB CNA (NVD, published 2026-10-31T23:17 → 2026-11-02T01:17)
- **Tags:** `cve` `iot` `firmware` `scoring` `vuldb`

Over the 26-hour window ending at this batch, NVD carries **41** records assigned by `cna@vuldb.com`, every one of them still `Received`, and every one of them scored **four times in its own container** — CVSS 4.0, 3.1, 3.0 and 2.0, all from the same CNA. What NVD re-serves from those records is not the same set: **all 41** containers carry a 3.0 metric that NVD's copy does not carry at all, and in **38 of 41** the 4.0 score on NVD is **lower** than the 4.0 in the record — by 0.7 to 3.2 points, and never higher (3 are identical). The 3.1 score matches in **41 of 41**. The concrete case: `CVE-2026-120189` reads **10.0** in all four frameworks inside the CNA container, and NVD's page for it reads **9.3** for 4.0 beside 10.0 for 3.1 and 2.0. The vectors carry `E:P` (and `RC:R` under 3.1), and the arithmetic, not a field, settles which number is which: with `E:P` that 4.0 vector yields a **base of 10.0 and a threat score of 9.3**, so the container's 10.0 is the base and NVD's 9.3 is the threat. Both fields are labelled `baseScore`. Measured over NVD's 2026-10-26→11-01 window: **136** records carry a 4.0 vector with a Threat metric, NVD stores the **threat** score in **136 of 136** and the base in none, while the same records' own containers store the **base** in **123 of 136** — and NVD keeps carrying `E` on 4.0 while it **strips** the temporal metrics from 3.1 (**123 of 123**), which is why that column agrees.

The subjects are consumer and SMB firmware — **WAVLINK WN536AX6-A** takes 7 records, **WN553X1-B** 6, **Oray Pugongying X5 Pro** 3, WAVLINK WN701AE and **Ruijie RG-ES205GC** 2 each, plus **D-Link DIR-505** (firmware 1.10B02) and a **Linksys E8450**. The descriptions have the shape of firmware fuzzing output: a `strcpy` or an unnamed `sub_416760` in `/bin/ioos`, `/protocol.csp` or `/cgi-bin/wapi.cgi`, with no stated preconditions beyond network reachability. And the scores are a template rather than twenty assessments: **20 of the 41** reach 9.9 or 10.0 in the 3.1 column, and they are two vectors — **9** at `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` (10.0) and **11** at the same string with `PR:N` swapped for `PR:L` (9.9, and 8.6 for 4.0 on NVD, 9.4 in the container).

**Why it matters:** a 10.0 is supposed to mean the worst case is reachable, and here it is one template applied across a product family — defensible if each handler really is unauthenticated remote code execution, misleading if it is not, because these are the rows that populate critical-CVE counts in dashboards. But the sharper finding is upstream of the vector: the same record is 10.0 in its container and 9.3 on NVD, with no field naming the difference, so a scanner reading NVD and a reviewer reading the CVE both quote a number the other cannot reproduce. Quote the assigner, quote the framework, and say which copy you read.

[`🔗 CVE-2026-120189 (D-Link DIR-505, 10.0)`](https://cveawg.mitre.org/api/cve/CVE-2026-120189) · [`🔗 CVE-2026-120276 (WAVLINK, 10.0)`](https://cveawg.mitre.org/api/cve/CVE-2026-120276)

---

## 29. HyperFrames turns HTML into a deterministic MP4 — and shipped three releases in three and a half hours

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending (weekly) · 77,426★ · +5,153 this week · v0.9.2 published 2026-11-02T09:10Z
- **Tags:** `video` `agents` `renderer` `htmx` `open-source`

`heygen-com/hyperframes` (77,426★, created 2026-03-10, Apache-2.0) is an open-source framework for turning HTML, CSS, media and seekable animations into **deterministic MP4** video — run locally through the CLI, driven by an agent through published skills, or used as the rendering core behind a hosted authoring workflow. The agent path is the pitch: `npx hyperframes skills update` once, then ask Claude Code, Codex or Cursor to make a video, and the skills teach the loop — plan, write valid HTML, wire seekable animations, add media, lint, preview, render.

What it shipped today is the more useful story. **v0.9.0** (2026-11-02T05:41:28Z) is breaking: distributed rendering on **AWS Lambda and Google Cloud Run** now runs only on **Plan v2**, and the Plan v1 transport, the `planProtocol` option and the v1 event and result types are removed — an old v1 payload is answered with `PLAN_PROTOCOL_UNSUPPORTED` "before doing any render work". **v0.9.1** (07:41:18Z) then fixed the edge that breaking change created: a Lambda state machine with no `PlanProtocol` now defaults to v2 instead of failing with `States.Runtime`. **v0.9.2** (09:10:24Z) makes an ended scene give up its WebGL context so the next scene is not slowed. npm `hyperframes` `latest` is **0.9.2**, published 09:16:42Z — six minutes after the tag.

**Why it matters:** video is the one output agents still cannot produce deterministically, and the design answer here is to make the artifact a document with a seekable timeline so a render is a function of the file rather than of a sampling loop. The breaking change points at where that stops being a toy — distributed render farms — and the SDK/deployment must move together: passing `"v1"` now throws.

[`🔗 heygen-com/hyperframes`](https://github.com/heygen-com/hyperframes) · [`🔗 v0.9.0 (breaking)`](https://github.com/heygen-com/hyperframes/releases/tag/v0.9.0) · [`🔗 npm hyperframes`](https://www.npmjs.com/package/hyperframes)

---

## 30. Colibri streams a 744B MoE from disk into 9.9 GB of RAM — at 0.05 tok/s on a laptop

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +655★ today · 46,157★ · v2.1.0 published 2026-10-31T12:50Z
- **Tags:** `moe` `local-inference` `c` `gguf` `quantization`

`JustVugg/colibri` (46,157★, created 2026-07-01, Apache-2.0, pure C) runs very large Mixture-of-Experts models on hardware people own by exploiting the one thing that makes them large: a 744B model uses about **40B parameters per token**, so only about **11 GB** of them change from token to token. The dense part — attention, shared experts, embeddings — stays in RAM; the routed experts live on disk and are read when the router asks for them, through a cache that learns which experts your work uses. There are **thirteen engines**: ten chat families (GLM-5.2/5.3, GLM-5.3-Flash, Inkling, Kimi K3, DeepSeek V4 and V4.1 Flash, MiMo-V2.6, Qwen3.8-Flash-Next, Qwen3.6, OLMoE), one image model, and three decision models that answer with a probability rather than chatting.

The README's own table is what separates this from a demo. **GLM-5.2** (429 GB download) runs at **0.05–0.1 tok/s cold on a 25 GB laptop**, **1.83** on a 128 GB Ryzen AI Max+ 395, and **9.0–9.2** on six RTX 5090s. **Kimi K3** (2.8T, 1.56 TB) produces about **9.4 seconds per token** with experts read at 6.3 GB/s. **DeepSeek V4 Flash** (284B) does **0.93 tok/s** with 32 GB. The startup banner in the README reads `GLM-5.2 · 744B MoE · int4 · streaming CPU · ready in 32s · resident 9.9 GB`. **v2.1.0**, published 2026-10-31, carries **387 pull requests since v2.0.0, 208 of them from 35 contributors**, GGUF files read as published on every engine, and Mistral-Large-4 (1T) as a new family.

**Why it matters:** quote the tokens per second beside the star count — the claim is about *placement*, not speed, and one NVMe read per expert is the bill. The design rule the README states is the part worth copying: "Less fast memory may cost speed; it must not quietly redefine the model."

[`🔗 JustVugg/colibri`](https://github.com/JustVugg/colibri) · [`🔗 v2.1.0 release`](https://github.com/JustVugg/colibri/releases/tag/v2.1.0) · [`🔗 GGUF support notes`](https://github.com/JustVugg/colibri/blob/main/docs/gguf.md)

---

## 31. Paperclip is an org chart for agents at 110k stars — a stable release on October 23 and nightlies since

- **Velocity:** ▮▮▮ trending
- **Source:** GitHub Trending · +507★ today · 110,094★ · stable v2026.1023.0 tagged 2026-10-24
- **Tags:** `agents` `orchestration` `governance` `budget` `typescript`

`paperclipai/paperclip` (110,094★, 18,243 forks, MIT, created 2026-03-02) is a Node.js server and React UI that orchestrates a **team** of agents rather than one: an org chart of humans and agents, goals linked to tasks, per-company/agent/project budgets, scoped secrets, permissions, and **heartbeats** that wake an agent for assigned work, a follow-up message or a schedule. Its one-line positioning is "If OpenClaw is an employee, Paperclip is the company." The roster is the list of harnesses this feed has been tracking: OpenClaw, Claude Code, Codex, Cursor + Cloud, Gemini CLI, OpenCode, Pi, Hermes + Gateway, Grok Build and Kimi Code — and the README's own escape hatch for anything else is "If it can receive a heartbeat, it's hired."

The artifact state is the interesting part, because the star count is not the release. The **stable** line is `v2026.1023.0`, tagged **2026-10-24T00:03:59Z** and labelled "Released: 2026-10-23" — 200 commits promoted from a beta, headlined by private tasks and projects that others cannot open, find in search, read run transcripts for, or reach through a plugin. Everything since then is **canary** and **nightly** (latest: `nightly/v2026.1102.0-nightly.0`, 2026-11-01T16:08:51Z). The tracker carries **3,469 open issues and 3,159 open pull requests**.

**Why it matters:** the unit of competition has moved from the agent to the org chart — who may spend what, who may see which transcript — and this is the clearest statement of that shift at scale. Read the release channel as the state: ten days since the last stable, with a daily-tagged nightly train standing in for one.

[`🔗 paperclipai/paperclip`](https://github.com/paperclipai/paperclip) · [`🔗 v2026.1023.0`](https://github.com/paperclipai/paperclip/releases/tag/v2026.1023.0) · [`🔗 paperclip.ing`](https://paperclip.ing)

---

## 32. Heretic 2.0 breaks its own configs, ships a plugin system, and drops its research features to Lophius

- **Velocity:** ▮▮ rising
- **Source:** GitHub · +404★ today · 37,777★ · v2.0.0 tagged 2026-11-01T13:03Z
- **Tags:** `abliteration` `model-modification` `plugins` `pypi` `agpl`

`p-e-w/heretic` (37,777★, AGPL-3.0) does what it says on the tin — "Training-free language model modification" — by optimizing against contrasting example prompts and matching **scorers** instead of training. The default action is refusal suppression; other shipped configs reduce slop, humor and sycophancy or shift emotional alignment, and the README notes the community has published **thousands** of Heretic-processed models on Hugging Face. On an RTX 3090 the default configuration processes `Qwen3-4B-Instruct-2507` in about **30–40 minutes**.

**v2.0.0** was tagged **2026-11-01T13:03:19Z** and uploaded to PyPI as `heretic-llm` 2.0.0 at **12:21:39Z** — eight months after 1.4.0 (2026-06-14). It is a breaking release in both directions. Configuration files written for 1.x **do not work** (there is a migration guide), and the release notes say plainly: "Research features have been removed. The intended replacement is Lophius." What arrives instead is infrastructure: a **generic plugin system** with scorer *and* modifier plugins (plus ARA), a `reproducible` property on plugins, **headless operation with end-to-end tests**, a benchmark scorer, dataset config/subset selection, and a fix so the optimizer can disable MLP ablation via a `0` max-weight floor.

**Why it matters:** abliteration stopped being one recipe when the scorers became pluggable — the tool now steers *any* measurable behaviour, which is a broader capability than the licence page suggests. For anyone with a tuned 1.x config, the migration is the risk: a stale config is not rejected, it is wrong.

[`🔗 p-e-w/heretic`](https://github.com/p-e-w/heretic) · [`🔗 v2.0.0 release`](https://github.com/p-e-w/heretic/releases/tag/v2.0.0) · [`🔗 PyPI heretic-llm`](https://pypi.org/project/heretic-llm/)

---

## 33. LobeHub's path traversal was fixed in April — the CVE arrived in November, and npm has no 2.1.49 to install

- **Velocity:** ▮▮▮ trending
- **Source:** VulnCheck CNA (cveawg) · reserved 2026-11-01T12:48Z · published 2026-11-02T02:01Z
- **Tags:** `cve` `path-traversal` `rce` `npm` `ai-chat`

`CVE-2026-120315` is a path traversal in LobeHub Chat's document parsing that ends in code execution, and its mechanism is four lines. `TempFileManager.writeTempFile(data, name)` built its path as `join(this.tempDir, name)`; `name` comes from the `files.name` column, which `file.createFile` sets straight from user input. Create a file record named `../../../../../../app/startServer.js` with a `child_process.execSync` payload as its content, then trigger document parsing, and the payload lands where the server starts from. The advisory's precondition is a **server-database deployment** plus an authenticated session — `PR:L`, not pre-auth.

The dates are the finding. The GHSA (`GHSA-2g9j-v25c-4j97`) names **2.1.49** as patched, and that tag's own release page is dated **2026-04-10T09:51:47Z** — **190 days before the advisory was published on October 17** and **206 days before the CVE record**. The fix is verifiable at that tag: `writeTempFile` now runs `basename(name)` through `resolve()` under a comment that already cites the GHSA id.

Then there is the artifact the record points at. Its `packageURL` is `pkg:npm/@lobehub/chat`, whose newest published version is **1.143.3 (2026-01-25)**; the project's current package is `@lobehub/lobehub`, which the repository declares at **2.3.0** while npm's `latest` for that name is **2.1.26 (2026-02-10)**. **2.1.49 exists as a GitHub tag and on neither npm name.** Scores are VulnCheck's own: **8.8** CVSS 3.1 and **8.7** CVSS 4.0; NVD lists the record `Received` with **0 NVD-scored metrics**, and the 3.1 score reproduces exactly from its vector. The project's own latest release, v2.3.0, shipped 2026-11-01.

**Why it matters:** nine months from fix to CVE is the disclosure lag that lets a self-hosted app sit unpatched, but the second layer is worse for defenders — a scanner keyed on that packageURL sees every npm version as `< 2.1.49` and no fixed version to upgrade to. The range is right and the artifact it names is a different object, so the remediation has to be read off the tag, not the registry.

[`🔗 CVE-2026-120315 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120315) · [`🔗 GHSA-2g9j-v25c-4j97`](https://github.com/lobehub/lobehub/security/advisories/GHSA-2g9j-v25c-4j97) · [`🔗 v2.1.49 tag (2026-04-10)`](https://github.com/lobehub/lobehub/releases/tag/v2.1.49)

---

## 34. Network-AI's own path sanitizer was the bug — an unanchored `startsWith` let a sibling directory out

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA (cveawg) · 3 records 2026-11-02T02:01:10–12Z · fixed in 5.15.5
- **Tags:** `cve` `path-traversal` `agent-framework` `npm` `sandbox`

VulnCheck published three path-traversal records against **Network-AI**, a TypeScript multi-agent orchestrator on npm (`pkg:npm/network-ai`) that advertises adapters for 32 frameworks, and the third is the one to read. `CVE-2026-120313` is in **`InputSanitizer.sanitizePath()`** — the guard itself — which used an **unanchored `startsWith`** comparison against the base directory, so a path whose directory name merely *shares the base's string prefix* is a sibling of it, not a child. Read, list and write outside the sandbox follow, and this one needs no privileges: **7.5** on CVSS 3.1 (`PR:N`) and **8.7** on 4.0. `CVE-2026-120311` puts a traversal sequence in a **job id** (`FileJobStore.get()`, `.delete()`, `JobQueue.getJob()`) to read or delete arbitrary `.json` — including the `AuthGuardian` trust-level configuration and grant tokens, which is an authorization bypass assembled from file deletion — and scores **8.8** on CVSS 3.1 and **8.7** on 4.0 with `PR:L`. `CVE-2026-120312` is the same trick through an **AgentVCR cassette name** in `load()`/`save()`, at the same **8.8** and **8.7**.

All three are fixed in **5.15.5**; the npm release published **2026-10-17T18:14:17Z** is **16 days older than the records**, and npm `latest` is now 5.17.1. NVD lists all three `Deferred` with **0 NVD-scored metrics**, so every score here is the CNA's arithmetic (the 3.1 values reproduce exactly). The repository is **80 stars**, MIT, last pushed 2026-10-27.

**Why it matters:** an agent framework's three "sandboxes" were one string comparison each, and the sanitizer is the component to audit first because it is the thing everything else trusts. The size is the other half: an 80-star dependency with four CVEs in one batch is not a smaller risk surface — it is a smaller review surface, and the fix still predates the record by two weeks.

[`🔗 CVE-2026-120313 (InputSanitizer)`](https://cveawg.mitre.org/api/cve/CVE-2026-120313) · [`🔗 CVE-2026-120311 (FileJobStore)`](https://cveawg.mitre.org/api/cve/CVE-2026-120311) · [`🔗 CVE-2026-120312 (AgentVCR)`](https://cveawg.mitre.org/api/cve/CVE-2026-120312)

---

## 35. Termix's 9.9 needs one `destPath`, the exploit is public, and the record says the vendor never replied

- **Velocity:** ▮▮ rising
- **Source:** VulDB CNA (cveawg) · reserved 2026-11-01T13:17Z · published 2026-11-02T01:45Z
- **Tags:** `cve` `path-traversal` `self-hosted` `ssh` `vuldb`

`CVE-2026-120322` is a path traversal in **Termix-SSH/Termix** — a self-hosted web SSH/file manager at 15,780 stars — through `/plugin-api/file-manager/transferToHost`, where the `destPath` argument is not confined to the transfer root. Arbitrary file write, remotely initiated, **9.9** on CVSS 3.1 (`AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H`, which reproduces exactly) — the base score, with `E:P` taking the full temporal value to 9.4 — and **9.0** on 2.0. The 4.0 column is the split this feed keeps documenting: the CNA's container stores **9.4** and NVD's copy of the same string stores **8.6**, with `E:P` present in both — one vector at two stopping points, not two assessments.

Two sentences in the record carry more weight than the score. "The exploit is publicly available and might be used." And: "The vendor was contacted early about this disclosure but did not respond in any way." A public PoC lives in a GitHub repository (`0xGenesi/CVE`) rather than in the record. The remediation is stated in the record too, and it is not a validation fix: the shortcut was **removed** in the standalone File Manager plugin **v1.0.0** — the transfer engine now always writes over SFTP — and in core **v26.10.0**. Termix shipped **v26.11.0 at 2026-11-02T00:20:19Z**, roughly **85 minutes before** the record was published.

**Why it matters:** a web terminal that holds SSH credentials for a fleet is a file manager with reach, so one unvalidated `destPath` is a write onto every host it can touch. The fix shape is the takeaway — the vendor's answer was to delete the alternate transport rather than sanitise a path, which is the durable option when the shortcut was the bug.

[`🔗 CVE-2026-120322 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120322) · [`🔗 Public PoC write-up`](https://github.com/0xGenesi/CVE/blob/main/Termix_FileManager_transferToHost_Arbitrary_File_Write.md) · [`🔗 Termix v26.11.0`](https://github.com/Termix-SSH/Termix/releases/tag/v26.11.0)

---

## 36. http4k's auth-int digest never hashed the body — and the other fix exists only in an `-ee` build

- **Velocity:** ▮▮ rising
- **Source:** VulnCheck CNA (cveawg) · 2 records 2026-11-02T02:01:14–15Z · NVD `Deferred`
- **Tags:** `cve` `authentication` `http4k` `maven` `enterprise`

Two http4k records landed in the same second, and the first is a textbook one. **`CVE-2026-120317`** (`CWE-345`) says `DigestEncoder` computes the **auth-int** digest **without hashing the request entity body** — the one thing auth-int exists to bind. An on-path attacker on a non-TLS channel rewrites the body, keeps the `Authorization` header, and executes state-changing actions as the victim. **`CVE-2026-120316`** (`CWE-22`) is a traversal in `ThymeleafTemplates` Caching/HotReload: `../` segments in a `ViewModel.template()` value are resolved without a containment check, so request-driven template selection discloses any file the server process can read — unauthenticated.

Both score **5.9 on CVSS 3.1 and 8.2 on CVSS 4.0**, and the gap is the frameworks' own: `AC:H` and `AT:P` on the 4.0 side. The artifact split is the part to act on. `http4k-security-digest` has **6.60.0.0** on Maven Central, dated **2026-09-16** — 47 days before the record. The Thymeleaf fix is **6.62.0.0-ee**, and Maven Central's `http4k-template-thymeleaf` listing tops out at **6.61.0.0 (2026-09-29)**: no `6.62.0.0-ee` artifact exists there, so the newest publicly installable template module still sits inside its own affected range (`< 6.62.0.0-ee`). NVD lists both records `Deferred` with **0 NVD-scored metrics**.

**Why it matters:** digest auth is chosen when you cannot afford TLS termination everywhere, and body-integrity is precisely the property it was extended to provide — a digest computed over everything but the body authenticates the request line and nothing that matters. The other half is operational: the upgrade instruction is a one-line sentence for one of these CVEs and not for the other.

[`🔗 CVE-2026-120317 (auth-int)`](https://cveawg.mitre.org/api/cve/CVE-2026-120317) · [`🔗 CVE-2026-120316 (Thymeleaf)`](https://cveawg.mitre.org/api/cve/CVE-2026-120316) · [`🔗 http4k-security-digest on Maven Central`](https://repo1.maven.org/maven2/org/http4k/http4k-security-digest/)

---

## 37. `@fastify/http-proxy` bypassed its own rewrite prefix without a single `..` — by decoding twice

- **Velocity:** ▮ steady
- **Source:** OpenJS CNA (cveawg) · reserved 2026-10-31T13:33Z · published 2026-11-02T10:15Z
- **Tags:** `cve` `encoding-confusion` `fastify` `proxy` `npm`

`CVE-2026-120213` affects `@fastify/http-proxy` **9.0.0 through 11.6.5**, and the bug is an encoding round-trip rather than a traversal. When an application uses parameterized **`prefix`** and **`rewritePrefix`** options to pin clients to a fixed upstream path, the plugin substitutes **URL-decoded route parameters** into `rewritePrefix` **without re-encoding them**. A parameter value that encodes a path separator together with a fragment or query delimiter therefore decodes into real separators and delimiters, which injects extra upstream path segments and **strips the mandatory suffix** the `rewritePrefix` was there to enforce. The record is explicit that this happens "without using any dot-dot traversal" — so a `..` filter, or a WAF rule looking for one, sees nothing. The two CWEs it carries are the diagnosis: `CWE-22` and `CWE-436`, interpretation conflict.

The score is **9.1** on CVSS 3.1 (`AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`, which reproduces exactly), and pre-auth. Fixed in **11.6.6**, npm-published **2026-11-02T08:55:53Z** — **80 minutes before** the record — and the advisory closes the alternatives: "There is no workaround other than upgrading." One provenance note worth the space: NVD's table lists that 9.1 with source `ce714d77-…`, which is **openjs's own orgId**, so the number is the CNA's and not an enrichment — the record is `Received` with 0 NVD-scored metrics.

**Why it matters:** decode-then-substitute is the canonical double-parse bug and the reason `CWE-436` exists — two components disagreeing about when a string stops being encoded. If you use `rewritePrefix` to enforce a suffix rather than merely to build a URL, this is an unauthenticated bypass of the restriction the option was configured for.

[`🔗 CVE-2026-120213 (cveawg)`](https://cveawg.mitre.org/api/cve/CVE-2026-120213) · [`🔗 GHSA-h3vp-4jfr-v364`](https://github.com/fastify/fastify-http-proxy/security/advisories/GHSA-h3vp-4jfr-v364) · [`🔗 npm @fastify/http-proxy`](https://www.npmjs.com/package/@fastify/http-proxy)

---

## 38. Eleven agent-hijack evaluations put attacks at 16–86% of samples — at a 2% rate, AUROC 0.879 is 7.6% precision

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41803 · submitted 2026-10-30 · 11 evaluations audited
- **Tags:** `research` `agents` `detection` `evaluation` `base-rate`

Detectors for **hijacked LLM agents** read tool-call traces for anomalies, and this paper opens with a census of how they are evaluated: across the **eleven evaluations audited**, attacks or anomalies make up **16% to 86%** of test samples, **no evaluation varies that share**, and **six report no test on data from a second benchmark or source**. The rest is what that hides. On **AgentDrift** and **AgentDojo**, at a **2% attack rate**, a detector with **AUROC 0.879** reaches **precision 0.076** — and the composition of the negatives alone moves that precision between **0.039 and 0.117**. Second, as **tool coverage** (the share of test tool calls whose tool was seen in training) falls, detector rankings **cross near 50% coverage and reverse below it**; dropout on tool inputs largely removes the reversal. Third, **no detector trained on AgentDrift ranks AgentDojo better than chance** — AUROC 0.47 to 0.52 — including one that reaches **0.996 within AgentDrift**. A released LLM action monitor trained on neither reaches **0.930**, but at a 2% attack rate its released decision rule would still mostly raise false alerts (precision **0.096**).

The paper's own limitations section is unusually candid and worth carrying: only the monitor's plan was fully prospective, several readings were added after related results were seen, AgentDrift is synthetic from one generator with disjoint tool sets, and **on AgentDojo a leave-one-suite-out analogue of the reversal did not reproduce consistently**.

**Why it matters:** the base rate is the whole argument — an AUROC reads like a capability, and a 2% attack share turns it into one false alarm per thirteen. Put the attack share in the eval report, and read the reversal as a headline the authors themselves demoted on the second benchmark.

[`🔗 arXiv 2610.41803`](https://arxiv.org/abs/2610.41803) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.41803v1)

---

## 39. MCP tool-call traces identify the user without the conversation — 26.25% vs 17.97% for guessing

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.41885 · submitted 2026-10-30 · 1,000 profiles, 4,000 trajectories
- **Tags:** `research` `mcp` `privacy` `agents` `benchmark`

Agents leave **tool-call traces**, and this paper asks what those traces alone reveal about the person driving them — no conversation, only protocol-valid interactions. **PrivacyTrace** supplies the measurement: **1,000 synthetic user profiles** and **4,000 agent trajectories** across four domains, generated with real MCP tools from **25 servers**, attacked by four mainstream LLMs. Single-domain trace access raises profile-inference attack success from **17.97%** under prior-based guessing to **26.25%**. The channel analysis is the actionable half: **tool arguments and returned results** provide the largest trace-grounded evidence, **cross-session linkage** amplifies the risk further, and **exact identifiers stay hard to recover**. A two-stage attack nearly matches one-shot accuracy, and conditioning on a trace-supported partial profile adds **3.30 points** over matched prior-based guessing — with Stage 2 still leaning on the model's priors.

The limitations matter for how far to carry it: the user behaviour is **synthetic** (population calibration matches demographic margins, not behaviour), and the candidate defenses it sketches — query obfuscation, exposing less tool-call content, isolating sessions across services — are named as **untested**.

**Why it matters:** the trace is the artifact that outlives your chat log, and it is the one most likely to be sent to a third-party observability service. The eight-point gap is not a catastrophe, but the deltas point somewhere specific: the leak is in the **arguments and results**, so stripping tool names buys almost nothing while scoping what an argument may contain buys the most.

[`🔗 arXiv 2610.41885 — PrivacyTrace`](https://arxiv.org/abs/2610.41885) · [`🔗 Code: AI45Lab/PrivacyTrace`](https://github.com/AI45Lab/PrivacyTrace)

---

## 40. Latent Sparse Attention speeds *one attention layer* 22.7× at 10M tokens — and says which layer

- **Velocity:** ▮▮ rising
- **Source:** arXiv 2610.42147 · submitted 2026-10-30 · GLM-5.3-FLASH (Qwen-3.8-27B)
- **Tags:** `research` `attention` `long-context` `inference` `indexer`

Above a million tokens, sparse attention stops helping if the **indexer that chooses the keys** is itself quadratic — which is where most of this line of work has been stuck. **Latent Sparse Attention** moves the scoring into a learned **64-dimensional latent space**: keys are hierarchically clustered there, and a query scores the hierarchy of clusters instead of every key. Two variants are trained differently — **D-LSA**, distilled into a pretrained model by training only small per-layer projections, and **N-LSA**, trained natively on next-token loss alone. A single-level (flat) search is available; the tree makes prefill subquadratic.

The numbers, with their denominator attached: on **GLM-5.3-FLASH (Qwen-3.8-27B) at 10M tokens**, D-LSA speeds **one attention layer** by **22.7×** in prefill and **4.6×** in decode over its **original sparse attention**, and by **72.4×** and **42.5×** over **full attention**, "while keeping similar accuracy across a variety of tasks". N-LSA matches full-attention accuracy with a **1.6×** per-layer training speedup at 128k tokens. The paper states two limits plainly: it does **not** follow distillation with a full sparse-training pass (which D-LSA supports but omits "due to its cost"), and per-layer or per-request budget tuning is "left to future work".

**Why it matters:** the honest unit is the story — 22.7× is one layer's prefill, not end-to-end latency, and at 10M tokens the layer is where the cost actually accumulates. A same-day paper (**2610.42112**, Zyphra Hierarchical Attention) makes the stronger asymptotic claim — total cost including routing growing sublinearly — and also lands on a tree of compressed key summaries, which is a sign the idea has converged before either ships.

[`🔗 arXiv 2610.42147 — Latent Sparse Attention`](https://arxiv.org/abs/2610.42147) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.42147v1) · [`🔗 arXiv 2610.42112 — ZHA`](https://arxiv.org/abs/2610.42112)

---

## 41. Prompt-injection defense: adversarial training plus a better loss takes AgentDojo from 78.8% to 8.8%

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41998 · submitted 2026-10-30 · code, data and model released
- **Tags:** `research` `prompt-injection` `adversarial-training` `agents` `dpo`

The best-defended published model at the start of this work, **Meta-SecAlign**, is trained with a DPO loss and still reaches attack success rates **approaching 100%** under adaptive prompt injection. The paper gives two reasons and fixes both. The first is the anchor: DPO keeps the model near an **undefended reference model**, and an insecure reference is the wrong gravity well. Their observation is that the output distribution of an idealized **injection-invariant, utility-preserving oracle** is nonetheless accessible during training, which yields a principled **SecPO** loss. The second is the attack set: Meta-SecAlign trains on weak simulated attacks, so they build an adversarial-training pipeline that synthesizes stronger injected inputs (**best@240**) and train on those.

Results are reported as two stacked multipliers: AT alone reduces attack success **1.5–14.5×** against three state-of-the-art adaptive attacks compared with Meta-SecAlign, and the **SecPO loss takes a further 2.4–4.6×** off compared with DPO. In agentic workflows the end-to-end number is the quotable one: **8.8% vs 78.8% AgentDojo ASR@800** under the `AttackerMovesSecond` attack, on a Qwen3.6-27B. Benign utility is checked across **nine benchmarks** — agentic tool calling, instruction following, science and math — with no noticeable reduction. Code, the training set with optimized injections, and the model are all released.

**Why it matters:** the transferable part is the diagnosis, not the score — a defense trained against a reference that is itself insecure inherits that anchor, which is a critique of a whole family of recipes that align a model to safe responses. Read the result as one attack setting on one model size; the nine-benchmark utility check is what makes it adoptable rather than another refusal-rate trade.

[`🔗 arXiv 2610.41998 — SecPO`](https://arxiv.org/abs/2610.41998) · [`🔗 Code: Sizhe-Chen/SecPO`](https://github.com/Sizhe-Chen/SecPO) · [`🔗 Model on Hugging Face`](https://huggingface.co/Sizhe-Chen/Qwen3.6-27B-Instruct-SecPO)

---

## 42. A pre-registered audit of test-time search: the learned selector was worse than random, and 82% of states had nothing to choose

- **Velocity:** ▮ steady
- **Source:** arXiv 2610.41970 · submitted 2026-10-30 · Cosmos Policy + RoboCasa
- **Tags:** `research` `world-models` `test-time-scaling` `evaluation` `robotics`

Test-time scaling for **world-action models** — spend more inference on candidate selection and adaptive allocation — is usually justified by a success-rate delta. This paper audits the three premises that delta needs, on **Cosmos Policy** and **RoboCasa**, with the analysis plan pre-registered. **Decision signal:** on clean data a learned **value selector is 1.66 percentage points worse than random**, a hindsight oracle gains only **1.40 pp** with an episode-level interval spanning zero, and **82% of states show identical candidate outcomes** — there is little selection headroom to find. **Realized efficiency:** token pruning cuts per-forward FLOPs by up to **47%** but yields at most a measured **1.15×** end-to-end speedup on the deployed path (1.25× on a decode-excluded path), short of its own **1.5×** target. **Evaluation integrity:** the adaptive-allocation experiment is declared **inconclusive** under a power gate.

The integrity finding is the one that should worry anyone running world-model evals: the audit identifies and fixes a **silent rendering corruption whose rate rises sharply along compute-heavy planning paths** while leaving the official direct-policy result unaffected — a simulator that degrades specifically on the trajectories you are testing. A detector, the fix and the scripts are released, and the conclusions are explicitly "scoped to the tested configuration".

**Why it matters:** the claim that sampling more candidates and scoring them higher improves control is a chain of three premises, and this audit finds the first two missing on a named model — the selector had no usable signal and the FLOP reduction did not become wall-clock. The rendering bug is the reusable lesson: if the environment silently degrades on the paths under test, the benchmark is measuring its own renderer.

[`🔗 arXiv 2610.41970`](https://arxiv.org/abs/2610.41970) · [`🔗 Full text (HTML)`](https://arxiv.org/html/2610.41970v1)

---

## Metadata

| Field | Value |
|-------|-------|
| Generated | 2026-11-02T12:19:50Z |
| Items | 42 |
| Sources tracked | 27 (GitHub Trending, Hacker News, arXiv, NVD/CVE records, cveawg CNAs, JFrog, VulnCheck, Go security team, Apache/ASF, Gitea, Trigger.dev, Google Developers Blog, openid.net, Xinhua, China Daily, Terry Tao's blog, Robert Haas, neon.com, GitHub releases, npm, PyPI, Hugging Face, JetBrains, DeepSeek Harness, hackerbooks.org, Maven Central, OpenJS CNA, VulDB) |
| Update schedule | 04:03, 12:03, 20:03 UTC+8 (3x daily) |
| Ranking | Velocity-weighted (recency × engagement acceleration × source authority) |
| License | [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

[Previous day](2026-11-01.md) · [Raw .md](https://trending.md/en/feed/latest.md) · [Archive](../archive/)
