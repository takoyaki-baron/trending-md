---
title: Model Hardware Standard (MHS) — the "physical MCP" question
topic: model-hardware-standard
created: 2026-08-28
---

# Model Hardware Standard (MHS) — the "physical MCP" question

Anthropic's Model Hardware Standard (research preview, Aug 27 2026, with HHMI Janelia) exposes
lab/manufacturing instruments to AI agents through **standardized drivers**. The open question it
raised: does this become the "MCP of hardware" — a shared driver-tag contract that standardizes like
MCP's tool contract — or do driver formats fragment per vendor? Answer (verified first-hand at the
Anthropic page + The Register, 08-28): **shape yes, contract no — and the safety semantics land on
the driver author, with a regulatory owner (EU Machinery Regulation) waiting.**

## The driver model

- **Primitives:** a standard command set — `read` (e.g. "get temperature") / `write` (e.g. "set
  temperature") — any programmable device can act on.
- **Natural-language tags:** drivers carry tags for characteristics not visible in code (robot-arm
  weight, flow-rate limits, safety limits) — entered by the user or by an agent interviewing the user.
- **Auto-generated reference file:** tags compile into a reference file the agent reads: what the
  device measures, what's adjustable, "what safety limits will be enforced". CMU's writeup frames each
  instrument as "one manifest of states and procedures".
- **Three control paths:** MCP, a CLI, and API code files — MCP is *one channel under* MHS, not a
  rival. Long-running/high-speed tasks chain driver commands into code files so devices run without
  per-step agent reasoning.

## Verified first-hand: the contract does NOT standardize

The Anthropic page specifies the functional shape but has **no driver versioning, no schema
formalization, no backward-compatibility language, and no contractual guarantee for tags**. MCP's tool
contract (name/title/description/inputSchema/outputSchema/annotations) has a parallel here only in
name: MHS tags are free-form prose. The Register's framing is the sharpest: the "durable safety
boundary" is "the layer written in prose by a busy postdoc" — a wrong operating range in a tag is the
most plausible first-incident path.

## Safety semantics: who owns them

- **Now:** Anthropic (gated preview — partners apply via waitlist; safety evals come before
  open-sourcing).
- **After open-sourcing:** whoever writes the driver. Enforcement is two-layer and device-side
  (driver hard-caps + MHS refuses unsafe-state requests); because MHS is model-agnostic and will be
  open, model-level guardrails are opt-in — the durable boundary is the driver's enforced limits.
- **Regulatory twist (first for the agent-stack safety layer):** the EU **Machinery Regulation
  2023/1230** (replaces the Machinery Directive on **2027-01-20**, covering AI-based safety functions)
  can make an MHS constraint file a **"regulated safety component"** — high-risk categories may need a
  notified-body review, not just self-declaration. So "whoever writes the MHS file" may be authoring a
  legally-regulated safety component, which would be the first *regulatory* owner in the otherwise
  "enforced by nobody" agent-stack pattern (cf. thesis 2 in [[agent-stack]]/[[security]]).

## Quantified results (vendor + preview, not independent)

- **QuEra** laser stabilization: bespoke script 58% at ~150 s/attempt → Claude-via-MHS decision-tree
  loop ~6 s, **99.3% on a 700-trial blind test**; PID tuning 15.7 mV → 1.55 mV residual; over 19 h
  Claude's PIDs never lost lock vs expert ~1.6×/hour.
- **CMU** dose-response: ~3× faster; 6 induced fault conditions all blocked before a device moved;
  end-to-end 8 h (including an autonomous rerun after the agent rejected R²<0.9) vs "several weeks" for
  a vendor setup.
- **Genentech** BCA assay: optimized fluid-dynamics params matching expert values; self-recovered from
  tip-pickup/fluid errors — but Claude's bubble-error instinct (retry the same well, aggravating foam)
  had to be corrected by humans, the poster-child caveat.
- **UW (Baker/Pinglay):** six instruments under MHS in <1 week; AI-supervised qPCR halts at the right
  amplification curve.
- **HHMI Janelia:** a rig needing "seven different vendor programs" unified; adding a camera dropped
  from multi-day to minutes.

## Partner/backer ecosystem

AWS (Strands Robots, private pre-release), Automata, Danaher, Doosan Robotics, MBF Bioscience
(ScanImage driver), QIAGEN (QIAsymphony Connect PoC), Tecan (Fluent), Universal Robots, Hugging Face
(LeRobot), Raspberry Pi (Camera driver). No standards body has adopted it.

## Caveats (read past the headline)

- "Claude learns about the physical world through text and images, meaning its spatial and physical
  reasoning have limitations that still require expert oversight." (Anthropic, verbatim)
- "MHS also doesn't yet work with hardware that lacks a programming interface." (Anthropic, verbatim)
- Genentech: models "still struggle with physical, chemical, and biological constraints."
- QuEra: Claude "couldn't troubleshoot physical hardware failures" and "often stopped to wait for
  human confirmation before performing an action it deemed even slightly risky."

## ICS/OT extension: unclaimed

Manufacturing control (robotic arms, liquid handlers, factory machinery) is explicitly in-scope, but
the preview has **no OT threat model, no authentication/segmentation language, no fail-safe/stop
semantics beyond driver limits** — the [[security]] OT-attack-surface concern (cf. Xiiaozet LK100W)
is not addressed. Whether the preview's "safety evaluations with launch partners" cover control-system
attack models is the watch item.

## The verdict

- **"MCP of hardware"?** At the *shape* level yes — standardized driver + discovery + safety tags is
  the physical analog of MCP's tool contract. At the *contract* level no — no versioned schema, tags
  are prose, and every vendor listed is building its own driver.
- **Fragment risk:** real and unmitigated. The open-source release is the fork in the road: if the
  spec ships a formal versioned driver schema + a validation/conformance story, MHS has a chance at
  becoming the MCP of hardware; if it ships as "here is the concept, write your own tags", driver
  formats fragment per vendor (robot SDKs vs microscope drivers), like the agent-memory field did.
- **Safety semantics:** Anthropic now, the driver author after open-source — unless the EU Machinery
  Regulation classifies the constraint file, making the first regulatory owner.
