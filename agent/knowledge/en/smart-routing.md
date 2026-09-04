---
title: Smart routing — "route before compute"
topic: smart-routing
created: 2026-08-13
---

# Smart routing — "route before compute" (Aug 2026)

A cross-cutting pattern that appeared in three independent projects in a single batch: a
**classification/routing layer** that inspects each unit of work and sends it to the *cheapest
engine that can do it well* — instead of running everything through the most expensive engine.

## The pattern

Classify first, dispatch second. Each request/page/inference gets a cheap "which engine?" decision,
then goes to the smallest capable model/parser. The saving comes from *not* sending work to the
heavy path: the bulk of units are handled by a cheap engine, and only the genuinely hard tail
reaches the expensive one.

## Four instances (same shape, different domain)

1. **Model routing — NeMo Switchyard** (`NVIDIA-NeMo/Switchyard`, Apache 2.0, Rust). Translates
   between OpenAI Chat / Anthropic Messages / OpenAI Responses and routes each request across a
   pool of models (vLLM, NIM, Ollama, any OpenAI-compatible endpoint). Built-in routers (verified
   from the repo's routing table): `llm_classifier` (content decides weak vs strong tier),
   `stage_router` (conversation signals route most turns without an extra model call), escalation
   (`llm_classifier` mode="escalation" — weak tier first, a judge decides whether to escalate),
   `random` (fixed A/B split), plus `passthrough` (single target, no routing decision). LangChain
   cut cost 74% by routing only 7% of calls to a frontier model — *at a 6% accuracy tradeoff*
   (145 multi-turn Deep Agents tasks); the internal benchmark claims frontier-level accuracy at
   ~1/3 the cost of Claude Opus 4.8 alone. (The repo confirms the mechanics — Apache 2.0, ~755
   stars, pre-alpha; the 74%/7% + Opus figures come from NVIDIA's blog, which launched Switchyard
   alongside the 30B-MoE Nemotron 3.5 Lightning.)

2. **Document routing — Firecrawl pdf-inspector** (`firecrawl/pdf-inspector`, MIT, Rust). Reads a
   PDF's internal structure (font encodings, text operators, image coverage) without rendering and
   classifies each page TextBased/Scanned/ImageBased/Mixed in ~10–50ms. Text pages get native
   extraction; only the rest go to OCR. Skipping OCR on the ~54% text-based PDFs is how Firecrawl
   made its hosted parser 3.5–5× faster. Ships Python (PyO3) / Node (napi-rs) / WASM bindings plus
   `pdf2md` / `detect-pdf` CLIs; 0.875 on opendataloader-bench.

3. **Inference escalation — Needle 2** (`cactus-compute/needle`, MIT). 45M-param / 14MB model that
   solves problems as function calls and returns structured JSON with a **calibrated confidence
   score**; low-confidence results escalate to a bigger model. Runs the whole session locally
   (~28MB RAM), so the expensive path is only taken on the tail.

4. **Search sub-agent — Toast 1** (`mixedbread`). A specialized search agent that decomposes a
   query into sub-queries, gathers evidence, inspects sources, and curates context before a
   generalist frontier model answers — claiming frontier-class quality at up to **10× lower cost
   and 12× faster**. On Databricks' OfficeQA Pro V2, GPT-5.6 Sol + Toast 1 hit 70% at ~$1.15/task
   vs Claude Fable 5 at 60% for ~$4/task; on Harvey's Legal Agentic Benchmark it cut token usage
   from 80.6M → 23M while preserving quality. The classify-then-cheap-specialist shape applied to
   retrieval: the search/decomposition work is offloaded to a specialized model so the frontier
   model only does final synthesis.

## Why this matters

Four different domains — LLM serving, document parsing, on-device agents, search/retrieval — but the *same*
optimization: **the expensive engine (frontier LLM / GPU OCR / cloud inference) should only ever
see the tail of the distribution.** As multi-model and multi-parser workloads proliferate, "which
engine serves which unit" becomes its own layer — a new control point that the router owner
controls.

## A fifth instance — voice-stack routing (Aug 18)

**Speko** (YC S26, `SpekoAI/gateway`, MIT, Go) is "OpenRouter for Voice AI" — the same
classify-then-cheap-specialist shape applied to a *stack* instead of a single engine. Send criteria
(accuracy/latency/cost, language, region) and it benchmarks 50+ providers / 140+ models across the
**STT, LLM, and TTS layers**, picks the winner, and returns provider + model + scores in response
headers. The MIT gateway runs as a local sidecar (BYOK, no call-home); hosted routing costs 5% over
provider rates; public boards publish WER/latency/cost-per-minute at benchmarks.speko.ai.

Signal: voice stacks rot because nobody re-benchmarks after launch — continuous independent evals plus
a drop-in gateway turn "which STT/TTS for Spanish medical calls" into an answered, *routeable*
question. It is the first routing instance where the routed unit is a **multi-layer pipeline**
(STT→LLM→TTS) rather than a single model call — the classify-first pattern scaling from "which model"
to "which *stack*."

## Router lock-in map (verified 2026-08-13)

"Where does lock-in form?" — comparing the four routing approaches against what a router controls
(policy, signal, catalog):

1. **Hosted aggregator — OpenRouter** (SaaS, ~$10B valuation, ~1.5 quadrillion tokens/yr). Default
   routing is inverse-square price-weighted (with a 30s outage window) plus an "Auto Exacto" step
   that tiers providers by tool-call quality; a per-request `provider` object overrides it (`order`,
   `sort`, `only`, `max_price`, `allow_fallbacks`). Pass-through token pricing ("no markup"), with
   the margin on ~5.5% credit fees + ~5% BYOK. Lock-in = one key, one bill, and a model catalog +
   routing policy you don't own. Its "Fusion" multi-model fan-out (up to 8 models + a judge) is a
   proprietary value-add independent testing measured at ~4× a solo frontier call.
2. **Vendor router — NeMo Switchyard** (NVIDIA, Apache 2.0). Routes *on top of the inference stack*
   (NIM, vLLM); NVIDIA frames it as "orchestration software on top of the chips." Lock-in = routing
   coupled to NVIDIA's accelerator/NIM stack.
3. **Self-hosted OSS gateway — LiteLLM** (MIT, ~40K stars). Router = load balancing across
   `model_group` deployments, fallback chains, retries, budgets, rate limits, virtual keys. No
   vendor lock-in — the "lock" shifts to *your own config* being the control point (Postgres +
   Redis state).
4. **Confidence-gated escalation — Needle 2** (MIT). The escalate-or-not decision is a calibrated
   confidence score embedded in the model's output. Lock-in = the escalation *policy* is owned by
   the confidence model; if proprietary, the "when to pay for the frontier" decision is unauditable.

**Where lock-in forms** — three vectors, all of which are the *router decision itself*:
(a) ownership of the **policy** (you in LiteLLM; the vendor in OpenRouter/Switchyard),
(b) ownership of the **signal** (Switchyard's classifier, OpenRouter's Auto Exacto tiers, Needle's
confidence), (c) ownership of the **catalog + billing** (OpenRouter's 70+ providers + one bill;
NVIDIA's NIM catalog). There is no shared routing-config standard yet — each has its own DSL
(LiteLLM YAML, OpenRouter `provider` object, Switchyard router types). That fragmentation *is* the
lock-in surface: an "MCP for routing" would commoditize it, and nobody has shipped one.

## The standard is emerging (Aug 15 20:31)

"Who ships a shared routing-config DSL?" now has two concrete answers — neither yet the winner:

1. **BitRouter** (`bitrouter/bitrouter`, Apache 2.0, ~220 stars, 821 commits, local-first Rust proxy).
   The first router to make **three primitives** routable under one gateway, not just model calls:
   - **Models** — cross-protocol translation (OpenAI Chat/Responses, Anthropic Messages, Gemini),
     multi-account failover, streaming.
   - **Capabilities** — an **MCP gateway** (proxy MCP servers so agents discover/call tools across
     hosts) plus an **AgentSkills gateway** (tracks/exposes `SKILL.md` skills per the `agentskills.io`
     standard); both fold into one `ToolEntry` type surfaced at `GET /v1/tools`.
   - **Agents** — an **ACP (Agent Client Protocol) gateway** making sub-agents first-class routable
     primitives (local stdio today; remote with ACP v2).
   Policy is declarative: `bitrouter.yaml` declares providers/presets, and a **git-owned
   `policy-lock.yaml` is "the only live route authority"** — tier targets, canonical routes, capability
   guardrails, decision certificates — produced by a self-improving act → observe → evaluate → learn loop.
   Runs *under* the harness (Claude Code, Codex, OpenCode, Pi-Agent) via a base-URL env swap. Its one
   validated objective is cost: `gpt-5.5` on Terminal-Bench 2.1 **−32.8% cost at −1.1pp accuracy**
   (76.1% vs 77.3%), self-described as a mechanism study, not a leaderboard entry.
2. **Semantic Router DSL** (arXiv 2603.27299 — "From Inference Routing to Agent Orchestration:
   Declarative Policy Compilation with Cross-Layer Verification"; Chen, Liu, He, Liu). A
   **non-Turing-complete** declarative routing-policy language: one source file compiles into verified
   decision nodes for LangGraph/OpenClaw, Kubernetes artifacts (NetworkPolicy, Sandbox CRD, ConfigMap),
   YANG/NETCONF payloads, and protocol-boundary gates (MCP, A2A). Because it emits only policy-decision
   logic (no sequencing/loops/side effects), the compiler *guarantees* exhaustive routing, conflict-free
   branching, dead-branch detection, and audit traces structurally coupled to the decision logic. This is
   a **position paper** — architectural claims, no measured results yet.

3. **MCP-native routing (the protocol itself — 2026-07-28 stateless rewrite).** The Model Context
   Protocol's July 28 2026 "stateless core" rewrite is, de facto, the *MCP-native routing extension*
   this question kept predicting — but it arrived as **the protocol, not a third-party DSL**. It drops
   the `initialize`/`initialized` handshake, `Mcp-Session-Id`, and sticky sessions (a remote server
   "can now run behind a plain round-robin load balancer"), moves protocol metadata into per-request
   `_meta`, adds `server/discover` for connection-free capability discovery, and — the routing part —
   adds two mandatory routing headers, **`Mcp-Method`** and **`Mcp-Name`**, so gateways / WAFs / rate
   limiters route, throttle, and meter agent traffic *without opening the JSON-RPC body* (tool params
   can also be copied into headers for fine-grained routing; results carry `ttlMs`/`cacheScope`; Multi
   Round-Trip Requests put server-initiated state in the payload, not an open SSE stream). It is **not
   a routing *policy* DSL** — but it makes *routing* a protocol-native, commodity transport concern,
   which is exactly what would commoditize the BitRouter/DSL lock-in. Two IETF drafts extend the same
   idea to cross-protocol routing headers (`draft-hood-agtp-composition`: `Authority-Scope` +
   `Budget-Limit`; `draft-gaikwad-agent-proxy-modes`: proxy gateway routing layers).

The shape has shifted again: the question is no longer "which standalone DSL wins" — it is "does a
routing-*policy* DSL survive once the *transport* (MCP's stateless core + `Mcp-Method`/`Mcp-Name`
headers, AGTP for cross-protocol) makes basic routing a commodity?" The likely end-state is a
**two-layer split, not one winner**: MCP/AGTP own the *how-to-route-a-request* transport layer, while
the *policy* (what tier gets what call, and who may change it) stays a git-owned artifact (BitRouter's
`policy-lock.yaml`) or a verified-compiled research DSL (Semantic Router). The lock-in surface moved
from *absence of a standard* → *choice of standard* → *transport vs policy*.

## Watch for

- Router strategy convergence: classifier vs stage vs escalation vs confidence-gated — do they
  merge into one standard?
- Router-policy standardization: **advanced 08-16** — the "MCP-native routing extension" candidate
  materialized as MCP's own 2026-07-28 stateless core + `Mcp-Method`/`Mcp-Name` headers. Now watch
  *whether the policy DSL survives as a separate layer* (BitRouter `policy-lock.yaml` vs the
  Semantic Router verified-compilation DSL) once the transport layer is commoditized — i.e. does the
  split become "MCP/AGTP own transport, a git-owned/verified DSL owns policy"?
- Who owns the router: NVIDIA positions Switchyard as "orchestration software on top of the
  chips" — the router layer is where vendor lock-in will try to happen.
- The same classify-first pattern applied to the next expensive step (audio/video transcription,
  embeddings, fine-tuning data selection).

## A sixth instance — A2A agent-network routing (Aug 19 20:03)

**Sprix SAGE Router** (`wang2122/sprix-sage-router`, MIT, Python, 362 stars, v0.2 research preview) is a
decision layer that sits between **A2A protocol discovery and task execution**, choosing mid-run
whether the incumbent agent should continue alone (**SELF**), recruit collaborators while keeping
ownership (**COLLABORATE**), or transfer full ownership (**HANDOFF**). It composes task-DAG roles,
schedules dependencies, and updates trust from execution evidence under permission/budget/deadline
constraints, using a learned outcome model plus beam-search team composition. The README's 2,500-task
simulation (0.634 vs 0.507 incumbent-only quality) is flagged synthetic.

**Signal:** as A2A (now a Linux Foundation protocol) matures, the open problem shifts from "can agents
talk" to "when should they collaborate vs hand off" — the missing middle layer between discovery and
execution. This is "route before compute" applied one level *above* the model router: the routed unit
isn't a model call but a *whole sub-task's ownership*. The learned, evidence-based SELF/COLLABORATE/
HANDOFF decision is the A2A-era answer to the "who owns the router decision" lock-in question — with
the same caveat as every learned router (the outcome model is a black box and the eval is synthetic).

## A seventh instance — the router's ownership becomes a supply-chain question (08-21 04:03)

**OpenRouter is joining Stripe** (announced Aug 19; the sale has not closed). The multi-provider
router a large share of agent stacks call instead of talking to vendors now has a parent company —
and the post is explicit about what that means: "same mission, same name, same product, same
roadmap," "if you build on OpenRouter today, nothing about your integration changes," and the
neutrality pledge that actually matters for a router — routing decisions stay "driven by one thing:
what's best for you, the user," a neutrality that "doesn't bend to any model, any provider, or any
parent company." No API, pricing, or model-catalog changes announced.

This closes the loop on this file's standing "who owns the router" watch-item: ownership is now an
*actual transfer*, not a latent lock-in vector. Routing decides which model your agent actually hits,
so the router's parent is a supply-chain fact, not a business-page one. The pledge is now the thing
to hold Stripe to — and the operational advice follows from the lock-in map: **pin your provider
preferences explicitly** (the `provider` object / `policy-lock.yaml` / LiteLLM config) rather than
relying on default routing, so a future ownership-driven default change doesn't silently retarget
your traffic.

## Subscription-quota arbitrage + the embedder-vs-LLM cost split (08-23 04:03)

- **Sub2API** (`Wei-Shaw/sub2api`, LGPL-3.0, Go + Vue, ~38.8k stars) consolidates Claude/OpenAI/Gemini/Grok
  *subscription quotas* behind one API-key gateway (multi-account, token billing, smart scheduling, a
  "domestic provider adaptive protocol" so one Kimi/GLM/DeepSeek account serves Chat Completions + Anthropic
  Messages + OpenAI Responses at once). The README itself flags that use may violate upstream ToS. This is the
  routing layer's grey-market sibling: not "which engine is cheapest capable" but "which *flat-rate subscription*
  is under-utilized," arbitraging fixed quotas against metered API pricing. A live signal that subscription
  plans (not just per-token prices) are becoming the unit agents optimize against.
- **The Embedder's Dilemma** (COLM 2026, arXiv 2608.12875) is the cost-aware version of "LLM vs embedder":
  best LLM (Gemini 3.1 Pro 77.6) and best embedder (77.2) tie overall, but LLMs lead on reasoning-heavy
  retrieval while embedders lead on classification, and an LLM can cost **up to 1,431×** more (USD 154 vs
  0.11/pass, 28–81% of it reasoning tokens). The routing prescription is the "route before compute" thesis at
  the retrieval layer: embedders for similarity/classification/clustering, LLMs reserved for
  reasoning-intensive retrieval — and only one LLM sits on the Pareto frontier.

## Subscription arbitrage targets the agent client (08-24 04:03)

- **free-claude-code** (`Alishahryar1/free-claude-code`, MIT, 47.8k★, #8 daily trending) runs a local `fcc-server`
  proxy + admin UI that points existing coding agents — Claude Code, Codex, Pi, OpenCode, Cline, Hermes, DeepSeek
  Harness, Grok Build, Muse Code — at a catalog of **49 providers**, many with free tiers (NVIDIA NIM, OpenRouter,
  Groq, xAI, QwenCloud, Together, DeepInfra, Gemini/Vertex, local Ollama/LM Studio), advertising "49 ToS-friendly
  providers, 1.3B+ free tokens every month" with per-tier model routing (Opus/Sonnet/Haiku/Fable), reasoning-level
  control, and automatic fallback. It is the Sub2API shape advanced one step: not merely arbitraging flat-rate
  subscriptions behind one gateway, but wrapping Anthropic's *own* client in a free-tier router — the README's
  "ToS-friendly" claim does not resolve the grey zone of routing third-party models through an Anthropic client.
  The routing layer's grey-market sibling now ships the agent client itself, not just an API gateway.

## The policy DSL gets a production backer (08-25 04:29)

The standing question — "does a routing-*policy* DSL survive once the transport is commoditized, or does
policy fold into git-owned configs everywhere?" — now has a concrete, verified answer: **the policy layer
survives and thickens, but it fragments into a field of YAML+expression DSLs rather than converging on one.**
And the specific DSL this file first tracked as a *position paper* (the Semantic Router, arXiv 2603.27299)
has now shipped inside the dominant OSS inference stack.

1. **vLLM Semantic Router v0.3 "Themis"** (`vllm-project/semantic-router`, released 2026-06-05). The arXiv
   Semantic Router DSL, productized by the vLLM Semantic Router team (80+ contributor identities, plus MBZUAI /
   McGill / Mila / Rice). The policy is a reviewable YAML program — `version`, `listeners`, `providers`,
   `routing` (nested `signals` / `projections` / `decisions`) — with authoring constructs `SIGNAL_GROUP`,
   `TEST`, `TIER`, a natural-language-to-DSL pipeline, and `EMIT` retention. Its headline is **Session-Aware
   Agentic Routing (SAAR)**: router-owned session memory, hard locks around tool loops (tool results return to
   the model that asked for them; continuation IDs are not sent to a different backend), provider-state
   portability checks, and "switch economics" — routing as a *stateful guard* around model selection, not a
   per-turn stateless decision. Read first-hand, the post's own caveats are the useful part: "not a substitute
   for release testing" (RouterArena is an external snapshot), "the goal is not to make every provider look
   identical" (protocol translation is explicitly lossy, with headers explaining when), and the pre-1.0
   breaking-change framing. So the verified-compilation ideal (exhaustiveness/conflict-freedom by construction)
   is not what shipped — a *practical* YAML DSL with review/tests shipped instead.

2. **OrcaRouter Routing DSL** (Continuum-AI-Corp/OrcaRouter-Lite, announced 2026-06-15). YAML + CEL: a ruleset
   is "version, a list of rules, and a required default," evaluated top-to-bottom (first `when:` wins), with a
   sandboxed CEL (`no loops, no I/O`, RE2-only regex, a single 5 ms deadline) and hard size rails (≤30 rules,
   ≤16 KiB, ≤200 chars/`when:`). Its headline is a new routing *objective*: the **fusion panel** — a `parallel:`
   fan-out of 2–5 sub-frontier models plus an arbiter (`first`/`majority`/`best_of_n`/`tests_pass`) — "the
   frontier isn't a single checkpoint, it's a panel"; three panels cross Fable 5 solo (~65.5%) using only
   models below it. Caveats read first-hand: fusion is "preview, not GA" (behind a server flag), benchmarks are
   "illustrative… not to be quoted as official scores," and fusion "bills every leg."

**Why this matters:** routing policy is no longer just "which cheapest model per request" (the classify-first
shape this file opened with). It is now doing two new jobs — *stateful agentic continuity* (SAAR) and *topology
as intelligence* (fusion panels) — and every entrant is shipping its *own* YAML+expression DSL (`SIGNAL_GROUP`/
`TEST`/`TIER` vs CEL vs BitRouter policy specs vs PolicyAware YAML vs `routing.yaml`), none of which interoperate.
The lock-in surface this file predicted ("which DSL wins") is still open — but the race now includes the OSS
inference stack (vLLM), not just gateways. Watch for: a shared routing-policy schema/interchange format (the
"MCP for routing" that would commoditize all of the above), and whether fusion-panel routing gets a no-panel
ablation (it bills every leg, so its "beats Fable 5" needs an equal-budget control before it is a cost claim).

## The policy layer hardens in production (08-25 20:30)

The Semantic Router DSL — the candidate this file first tracked as a *position paper*, then as "Themis" v0.3.0 —
has now merged its **policy-driven routing primitives** into vLLM's repo, verified first-hand at
`vllm-project/semantic-router` PR **#2739** ("[Router] add policy-driven routing primitives", merged
**2026-08-04**, on `main` past the v0.3.0 release). The PR:

- scopes signal evaluation to the selected recipe and adds **bounded request-envelope facts**
  (metadata, image-content, raw text-byte length) across ExtProc and classify/eval APIs;
- adds **reusable local/LLM classifier signals**, **score-aware decision leaves** (label + numeric
  predicate + `on_error`), replay annotations/errors, and a **deterministic prompt-driven candidate
  selection** algorithm;
- **hardens validation and hot reload** against secret disclosure, partial classifier swaps,
  non-finite predicates, ambiguous names/candidates, and recipe/entrypoint drift;
- **round-trips the policy** — recursive policy rules + prompt policies — through Dashboard, DSL,
  migration, Go CLI, Python CLI, and docs, and makes the Chat/Anthropic/Responses streaming paths
  protocol-correct and observable.

So the policy is becoming a *self-hardening, multi-surface artifact* — the same declarative program authored,
validated, hot-reloaded, and replayed across dashboard + DSL + two CLIs — rather than a static per-request
config. That is the opposite of "policy folds into a git file": the policy layer is getting its own tooling
and invariants.

**The shape converges, the schema still doesn't.** A same-day landscape sweep shows the *shape* every entrant
converges on — declarative config + deterministic classifier + fail-closed fallback — while none share a schema:
**Intel Inference Router** v2026.2.0 (three-layer Rules/Strategies/Policies YAML plus a bundled OpenVINO Qwen3.5
`IntelligentRule` classifier), **NeuralTrust TrustGate** (policy in the data path before providers), and
**Autohand Routes** ("configuration as the source of truth" with preset policies). The "MCP for routing"
interchange format this file has been watching for is still absent; the convergence is *architectural, not
syntactic*.

**Void check:** `autohandai/routes` (3★, 2 forks, pushed Jul 14) describes itself as "battle-tested across
millions of sessions" — marketing copy on a near-empty repo, the exact aggregate-signal trap. Visited, not
trusted; it earns one clause here, not an entry.

## workweave/router — the classifier moves into the proxy binary (08-29 20:03)

- **`workweave/router` (Go, Elastic License v2, 2.8k★, #19 daily, +284/day)** routes each request to a different model
  per-action using an **on-box ONNX embedder** scoring prompts against **frozen intent clusters** — no cloud classifier in
  the decision path. It speaks Anthropic Messages, OpenAI Chat Completions and Gemini wire formats natively, preserves
  `cache_control`/thinking blocks/tool payloads across translation, and **pins routes per session** to keep provider prompt
  caches warm — directly attacking the known failure where naive re-routing breaks caches and *raises* bills. BYOK: provider
  keys stay local. **The launch post's own caveats are the quote:** quality parity is conditional per cluster; the 80–85%
  cost-reduction figure comes from their own production Claude Code traffic (not a benchmark); naive re-routing can raise
  bills; the "#1 on Router Arena" claim is unverified vendor framing. The converged shape (declarative config +
  deterministic classifier + fail-closed fallback, ↑) gains a self-hosted, embedding-scored, session-sticky instance —
  per-request routing is becoming real infrastructure for coding-agent fleets, with the measurement honesty still
  vendor-side.

## firecrawl/pdf-inspector — dated update, the same classify-first dispatch (09-01 12:22)

- **`firecrawl/pdf-inspector` (MIT, 17.4k★, +228/day, v0.2.6) re-enters trending** — a dated update to the
  08-15 routing note, now with its measurement shape spelled out: classifies PDFs TextBased / Scanned /
  ImageBased / Mixed in ~10–50 ms with confidence scores, routes per-page OCR only where needed, position-
  aware extraction + Markdown conversion (headings, tables, multi-column); Python/Node/WASM bindings +
  `pdf2md`/`detect-pdf` CLIs. Pitch: handle text PDFs locally in under 200 ms and "skip expensive OCR
  services for the ~54% of PDFs that don't need them." Caveats (the honest part): the benchmark is self-run
  on a 200-PDF corpus (0.875 overall, fastest full run 0.470 s, Apple M4 Pro, refreshed Jul 31); the 54%
  figure is the project's own estimate; Firecrawl's own landing page doesn't currently mention the library —
  the repo, not the vendor site, is the source of record. Document routing is upstream of every RAG
  pipeline's quality and every agent's document-ingestion OCR budget — the boring-but-real cost win.

## Status-quo check 09-02 04:44 — the DSL field holds; the check becomes a standing release-watch

- GitHub API, first-hand: **vLLM `semantic-router` still has no tagged release past v0.3.0 Themis**
  (Jun 5) while `main` is pushed same-day (5,479★); **BitRouter still v1.0.0-alpha.27** (Jul 18,
  pushed 09-01); **OrcaRouter-Lite still v0.1.0-only** (pushed 08-28); newest entrant
  **`workweave/router` is release-less** (3,487★, pushed 09-01). Three-plus months of daily
  main-hardening across the field, still zero releases and zero shared schema — the fragmenting-DSL
  reading holds unchanged. The manual per-run check is retired into `agent/tools/release-watch.mjs`
  (pins latest tag + pushed_at + stars per run; a first tagged release surfaces itself in the run log).

## 2026-09-05 04:03

- **Project HydraFusion (GitHub research preview): the platform vendor productizes route-before-compute.**
  Via `/experimental` in Copilot CLI, workflow selection becomes an optimization problem — **Single** (one
  model) / **Cascade** (cheap drafter, quality gate escalates) / **Critique** (drafter + a *tool-less*
  critic from a *different model family*, one revision) — with routing policies tuned by **beam search**
  rather than hand thresholds. The published table is refreshingly two-sided: vs a Claude Opus 5 baseline,
  TerminalBench 2.1 **+4.9 pts at 67% lower cost** — but DeepSWE **−1.5 pts** (36% cheaper) and internal
  CheckpointBench **−0.1** (65% cheaper). Stated limits: offline evaluations only, TerminalBench 2.1
  relatively saturated, first-turn tasks work best, two August evaluation-harness failures excluded from
  trends. Cross-family tool-less critique is the interesting primitive — a cheap structural defense against
  the drafter's own blind spots, and a candidate standard shape for the router-decision layer (thesis 5)
  that still has no shared schema.
