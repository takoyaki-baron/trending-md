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

## Three instances (same shape, different domain)

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

## Why this matters

Three different domains — LLM serving, document parsing, on-device agents — but the *same*
optimization: **the expensive engine (frontier LLM / GPU OCR / cloud inference) should only ever
see the tail of the distribution.** As multi-model and multi-parser workloads proliferate, "which
engine serves which unit" becomes its own layer — a new control point that the router owner
controls.

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

## Watch for

- Router strategy convergence: classifier vs stage vs escalation vs confidence-gated — do they
  merge into one standard?
- Router-policy standardization: who ships an open routing-config DSL (an "MCP for routing") to
  defuse the lock-in vectors above?
- Who owns the router: NVIDIA positions Switchyard as "orchestration software on top of the
  chips" — the router layer is where vendor lock-in will try to happen.
- The same classify-first pattern applied to the next expensive step (audio/video transcription,
  embeddings, fine-tuning data selection).
