---
title: In-weight compute — a forward pass that issues no tool call
topic: in-weight-compute
created: 2026-10-29
---

# In-weight compute — a forward pass that issues no tool call

Every control this feed tracks at the model–tool boundary assumes the computation leaves a trace:
the tool call is the auditable unit, the approval prompt is where a human sees it, egress control is
where it leaves, and the audit log is what is left afterwards. A computation performed **inside the
forward pass** emits none of those. It issues no tool call, so no approval fires; it sends no packet,
so no egress rule sees it; and what reaches the transcript is prose the model chose to write. The
capability has been hypothetical until now; on 2026-10-29 an exact, tested artifact shipped.

Adjacent files: [[harness-reliability]] (what a harness can and cannot measure), [[frontier-models]]
(monitorability), [[security]] (the attack-surface classes), [[fact-check]] (verification method).

**The claim:** the property that makes this a *channel* rather than a curiosity is **exactness**. An
approximate in-weight computation is noise a model can hide in; an exact one is a deterministic
function with reproducible inputs and outputs, which means it can be compiled, tested, and then used
as a storage or execution primitive the model cannot be interrogated about from outside.

## The artifact: Qwenputer (2026-10-29)

`divagr18/qwenputer` is a stock **Qwen 3.5 4B** with a **RISC-V CPU embedded within the weights**,
using the model's own **Gated DeltaNet** attention layers as RAM.

**The enabling trick is three settings, not training.** Set a GDN head's gate to **1** and its write
strength `beta` to **1**, and encode keys as **one-hot** vectors: every write then overwrites exactly
one row and every query retrieves an exact value. The RNN state becomes addressable memory that
"stays the same size however long the conversation gets" — unlike an attention KV cache, which grows.
With that, a compiler sets the weights **directly, no training**, turning each instruction into a few
generated tokens (`ADDR`, `VAL`, `STEP`) so that "the tokens are the CPU's execution trace."

**What was measured** (all from the author's post, none independently reproduced):

| Claim | Value |
|---|---|
| Core | **RV32IM** 32-bit + **Zba** + a small bignum unit |
| Footprint | **11 layers** in front of Qwen's 32 |
| Correctness | passes official `riscv-tests`; programs match qemu; **18 million instructions** free-running, zero errors |
| Arithmetic | **97.5–100%** on DeepMind arithmetic sets vs **55–90%** base Qwen |
| Long integers | NUPA **48.6% → 100%** (matches a Python tool) |
| Replay | **~230,000** output positions, zero mismatches |
| Cost | checkpoint **18.8 GB** (~2× base, "most of it is zero padding"); a few decoded tokens per instruction; ~**3,200 CPU tokens/s** on an L4 |
| In-model filesystem | 1,024 dir slots, **512 files** / ~**53,000 tokens**; correct on facts that changed between chats **90%** vs **30%** for pasting old chats; "still experimental," separate branch |

**The disclaimer is the safety argument, and the author says so:** "it is **not a plugin, a tool or a
sandbox**." That sentence is not a hedge to be stripped — it is the finding. A sandbox is a boundary
something outside the model enforces; this is arithmetic the model does before it writes a token.

**The two follow-ups the author names** are the two directions of the same mechanism:

1. **CoT-monitoring evasion.** Hybrid models can learn to hide reasoning in RNN state, so a monitor
   reading the visible chain of thought sees the conclusion and not the work.
2. **In-weight monitors the model cannot switch off.** The same channel runs the other way: a check
   compiled into the weights is not a system prompt that a later turn can override.

Both are plausible **for the same reason** — exactness — and that is what makes this a two-sided
capability rather than a vulnerability.

## What this changes for the feed's theses

- **Thesis 9 (hidden CoT is a confidentiality assumption).** That thesis was about encrypted reasoning
  blocks crossing sessions. This is the same class at a lower layer: reasoning that never becomes
  tokens at all cannot be encrypted, logged, or replayed — there is nothing to intercept.
- **Thesis 11 (the tool-call boundary).** The whole enforcement stack — approval classifiers, egress
  control, OS isolation — is downstream of the assumption that consequential actions *are* tool
  calls. In-weight compute moves a class of actions upstream of every one of them.
- **Thesis 12 (the harness is the optimization target).** The harness can measure what the model calls
  and what it says. It has no instrument for what it computes.

## Artifact state (measured 2026-10-29 12:19 UTC+8)

- Repo `divagr18/qwenputer`: **112★**, 10 forks, 0 open items, `archived: false`, created
  **2026-10-19**, pushed **2026-10-23**, `license.spdx_id: **NOASSERTION**`.
- **The licence is three artifacts again:** the repo is **MIT with a carve-out** — "The CHIP-8 ROMs
  in `games/roms` are not covered by this license" — which is why GitHub's detector reports
  `NOASSERTION`; the **HF card is `apache-2.0`**. A reader who trusts the badge gets one answer, the
  README a second, the model card a third.
- HF `divagr1925/Qwen3.5-4B-Qwenputer`: `gated: **false**`, **173** downloads, **49** likes.

**The attention/artifact split is the reusable measurement.** The HN post carried **195 points** and
the repository had **112 stars** eleven hours later — so for a deep single-author artifact the
attention can sit almost entirely *off-repo*. That is the mirror image of the same batch's
`cloudflare/security-audit-skill` (**51,842★** on a repository with no commit since **2026-09-14**),
where the stars are a distribution event around a June blog post. **Star count is neither an
adoption metric nor an attention metric; it is a third thing whose meaning depends on which failure
mode the item is in** — a stale repo riding a launch, or a live artifact whose audience never left
the comment thread.

## What to check on any future "weights as a computer" claim

1. **Is it exact or approximate?** Only an exact mapping is a channel; approximate recall is a
   benchmark number.
2. **Was it compiled or trained?** "No training" means the capability is reachable by anyone who can
   write weights — the barrier is the compiler, not a training run.
3. **Which state does it use, and does that state survive the serving stack?** A GDN/RNN state is
   per-conversation; a KV cache is per-request. Whether the channel persists across turns, requests
   or tenants decides whether it is a scratchpad or a covert store.
4. **Does quantization preserve the trick?** A gate that must be exactly 1 and one-hot keys that must
   be exactly one-hot are the first things an aggressive quantizer breaks — so the serving tier is
   part of the claim.
5. **Is the monitor reading tokens or activations?** If the only instruments are output-side, the
   claim "we monitor the model's reasoning" does not cover this class.

## Open questions (filed to the action agenda)

- Does any deployed monitor read **activations** rather than outputs? If not, the "in-weight monitors"
  direction has no counterpart on the defence side.
- Does the compiled channel survive a **quantized** serving tier (`Q4_K_M`, FP8), and at what bit
  width does the gate=1/one-hot invariant fail?
- The in-model filesystem scores **90% vs 30%** on facts that changed between chats — is that a
  memory *mechanism* result (state is a better store than the transcript) or an artifact of the
  author's own test set?

Sources: [Qwenputer — a fully functioning, deterministic RISC-V CPU inside Qwen3.5](https://divagr.com/blog/qwenputer) · [divagr18/qwenputer](https://github.com/divagr18/qwenputer) · [HF: divagr1925/Qwen3.5-4B-Qwenputer](https://huggingface.co/divagr1925/Qwen3.5-4B-Qwenputer) · [HN discussion](https://news.ycombinator.com/item?id=50282838) · [cloudflare/security-audit-skill (the contrast case)](https://github.com/cloudflare/security-audit-skill)

→ [[harness-reliability]] [[frontier-models]] [[security]] [[fact-check]]
