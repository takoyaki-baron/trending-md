---
title: Datacenter silicon & the AI factory rack
topic: datacenter-silicon
created: 2026-10-14
---

# Datacenter silicon & the AI factory rack

The compute-supply layer: hyperscaler in-house accelerators built for internal token demand, and the
rack / tray / fabric / power standards those systems get published into. Adjacent files:
[[edge-inference]] (local + commodity-hardware inference), [[model-hardware-standard]] (the
memory-controller and physical-MCP question), [[frontier-models]] (training economics and
vendor-run benchmarks).

## 2026-10-14 — an inference-first accelerator with no rental channel; the rack design goes open

**Microsoft Maia 300 (Open Compute Project Summit, announced Oct 12; The Next Platform architecture
read, Oct 13):** the third generation of Microsoft's in-house XPU. Microsoft's own claims: Maia 200
is now serving production workloads; a full **96-accelerator** Maia 300 configuration will deliver
**up to 7× Maia 200's rack-scale token throughput**; and it offers "**40 percent more tokens per
megawatt than leading GPU-based systems**" — with the comparison system **not named**. What The Next
Platform fills in that Microsoft did not: **288 GB of HBM4** across eight stacks at ~18 TB/s, a
package that is really **seven chips plus eight HBM stacks on an interposer** (compute chiplets on
TSMC N2P, I/O and HBM controllers broken out), four tile clusters of twelve tiles each, and a
reworked ATL Ethernet fabric that packs more XPUs into one coherent domain for larger agentic
workloads — **96 XPUs in a rack drawing about 167 kW**. Production is slated for **2027**, with Azure
Maia scaling to multi-gigawatt deployments; GitHub Copilot and Microsoft Foundry move onto Maia 200
by the end of this year. Unlike Google's TPUs or AWS's Trainium, Microsoft **does not rent Maia
capacity to external cloud customers**, and still buys NVIDIA and AMD silicon for training. Read: an
inference-first accelerator whose business case is Microsoft's own token demand (Copilot, Foundry,
OpenAI), shipped with two multipliers measured against an unnamed baseline.

**NVIDIA contributes the Vera Rubin rack and compute tray to OCP through MGX (Oct 12, San Jose):**
an updated **MGX 1.2** specification extending the open architecture for AI factories; open standards
for AI factory design and **grid resilience** published with hyperscalers; new open-source software
components for **DSX AI Factory**; **Meta and NVIDIA** advancing open AI networking around Spectrum-X
Ethernet SuperNIC and Spectrum-6; **Visionbay** introducing an 800V DC AI factory design for the Vera
Rubin era; **NVIDIA and Cisco** announcing the Ultra-Dense Small Form Factor Pluggable (USFP)
standard, described as the industry's first module for 400Gb/s-based networking fabrics; **NVIDIA and
Google** announcing Falcon Transport support on future ConnectX-10 SuperNICs and BlueField DPUs; and
open liquid-cooling work (MQD, MQDB) folded into the same push.

**The claim this file exists to track — the enclosure commoditizes while the silicon does not.**
Publishing rack and compute-tray designs (the same move as MGX for Hopper and Blackwell) creates a
second-source market for the *chassis* while the accelerator stays single-source; the vendor with the
most to gain from a proprietary rack-scale design is the one standardizing it. The counter-example
sits in the same week: Maia 300's silicon is both proprietary **and** not for sale, so the only
buyers are Microsoft's own services. Two open checks: whether the 7× / 40%-per-megawatt figures
survive an independent rack measurement after 2027 production, and whether the grid-resilience
standards get adopted by anyone who is not a hyperscaler — utilities are the party that will
actually have to read them.

Sources: [The Register / The Next Platform — Maia 300](https://www.theregister.com/compute/2026/10/13/microsofts-clea-maia-300-inference-xpu-is-a-bandwidth-beast/5302874) · [Microsoft Maia](https://news.microsoft.com/maia-2026/) · [Azure Maia 300 architecture deep dive](https://azure.microsoft.com/en-us/blog/deep-dive-into-azure-maia-300-architecture/) · [NVIDIA at OCP Global Summit](https://blogs.nvidia.com/blog/ocp-global-summit-vera-rubin-scale-ai-factories/) · [NVIDIA MGX](https://www.nvidia.com/en-us/data-center/mgx/)

## 2026-10-21 12:03 — Prometheus publishes goodput and MTBI, the metrics that decide whether a run finishes

Meta opened up **Prometheus** (New Albany, Ohio; first phase complete): hundreds of thousands of GPUs across multiple buildings wired as "a single machine," with a stated target of roughly **1 million** at full scale — the cluster that trained the Muse family including Muse Wonder. The numbers worth keeping are reliability, not FLOPS: **>85% goodput** on pretraining, **>90%** on Muse Wonder RL runs, and a mean time between interruptions of **~47,000 GPU-hours — raised past 54,000 after fleet-wide firmware fixes**. Platforms: **Catalina** (GB200 NVL72 in a two-rack "Ariel" configuration that buys 800G scale-out per GPU instead of the standard 400G) and **Clemente** (GB300 NVL72, 288 GB HBM per GPU, 2:1 GPU-to-CPU, a whole 72-GPU domain in one rack), with Vera Rubin NVL72 next, plus closed-loop liquid cooling. The arithmetic to carry: at ~47k GPU-hours MTBI, a job burning 5,000 GPUs expects an interruption roughly **every nine hours** — which is why goodput, not peak throughput, is the number that decides whether a frontier training run finishes. All figures are Meta's own instrumentation on its own fleet, including the pre/post firmware comparison; there is no external audit, and the goodput definition is Meta's. (→ thesis 19)

Sources: [Engineering at Meta: Inside Prometheus](https://engineering.fb.com/2026/10/19/data-center-engineering/inside-prometheus-meta-gigawatt-scale-supercluster/) · [HN](https://news.ycombinator.com/item?id=50152886)

## 2026-10-24 — the same request is 0.38 g in Sweden and 3.2 g in Texas, and in the clean grid the hardware is the emission

Berget AI, with the Stockholm Environment Institute, WattTime and Klimatkollen, published per-request CO₂e for a
typical Kimi K3 request: **Sweden 0.38 g, Ireland 1.6 g, Germany 2.5 g, Texas 3.2 g** — "8.5 times more in Texas
than in Sweden". The energy is nearly identical, "about **4 Wh**"; what differs is its composition. In Sweden
**89%** of the footprint is **hardware manufacturing**; in Texas **90%** is electricity, "plus about 6 mL of
cooling water". Method follows the Green Software Foundation's SCI for AI, MIT-licensed on GitHub, with a public
calculator.

**The post's own correction is the useful part.** Earlier figures — 1.2 g Ireland, 2.1 g Germany, 3.9 g Texas,
and a **tenfold** Texas–Sweden gap — were replaced after corrected grid intensities (Ireland ~224, Germany ~337,
ERCOT ~333 g CO₂e/kWh), which moved the headline from tenfold to **8.5×**. A vendor publishing the revision that
shrinks its own headline is the [[fact-check]] genre operating on a sustainability claim, where it is rarer than
in benchmarks.

**The caveats bound it hard, and the structural conclusion survives them:** it uses **average** grid intensity
while marginal rates "may significantly change the measured greenhouse gas intensity of data centres in Sweden"
(being added next month); chip-manufacturing water and energy are excluded; training is excluded because
"self-reported figures vary ±50%". What remains is not a number but a decision rule: **on a low-carbon grid the
embodied hardware becomes the dominant term**, so "run it where the electricity is clean" stops being the whole
answer — siting competes with refresh cadence and utilisation, and a lightly used accelerator in a clean grid can
lose to a well-utilised one on a dirtier one. The measurable follow-up is whether any operator publishes
embodied-per-token rather than energy-per-token.

Sources: [Berget AI — per-request CO₂ press release](https://berget.ai/en/blog/per-request-co2-press-release) · [berget-ai/co2-calculator (MIT)](https://github.com/berget-ai/co2-calculator)

## 2026-10-25 12:16 — the wafer-scale budget is arithmetic, and the metric it names is the one it does not publish

Cerebras published a deployment *design* for **Kimi K3** — the open ~**3T**-parameter model — across **59
WSE-3T wafers**. The arithmetic, which is the whole value of the post:

- each wafer holds **44 GB** of on-chip SRAM; weights stay on-chip, and only activations cross wafers, over
  RDMA at "roughly **2 microseconds per hop**", with pipeline stages working on different requests;
- **69 linear-attention layers** fit two per wafer (**35** wafers, 2 × 16 GB = 32 GB of a 44 GB budget,
  because a linear layer keeps a small fixed-size state per request regardless of context length);
- **24 dense layers** take one wafer each (**24**), the remainder reserved for the **KV cache** — and
  concurrency is therefore capped by KV space on those wafers, not by compute;
- assumptions stated plainly: a **256k** average request, **4-bit** weights, **8-bit** KV.

The headline is "**1000–2000+ tokens per second**" for multi-trillion-parameter models.

**What the post does not contain, checked first-hand:** the string **`end-to-end` appears 0 times** in the
page's 184 KB RSC payload, there is no measured end-to-end latency, and there is **no tokens-per-second-per-
megawatt figure** — while the post itself says the more meaningful metric is "total token throughput per
unit of power (e.g. tokens per second per megawatt), when measured at the same output generation speed."
The footer carries the standard variance clause ("may vary depending on workload, configuration, date and
models being tested"). The words actually used are "as an **illustrative** example" and "For this
illustrative example, we use:", which is the weaker claim, honestly made.

**The pattern worth naming to vendors generally:** this is the second document in three days to *name the
metric that would settle its own claim and then not publish it* (after Prime Intellect's equal-budget
column, which at least printed the number). A memory-bound argument for wafer-scale inference is a real
argument — 3T parameters at 4-bit is ~1.5 TB of weights against 44 GB per wafer, so the wafer count is
forced — but a capacity plan is not a benchmark, and the missing row is the one the post itself nominated.
The measurable follow-up: whether anyone publishes tokens/s/MW for a multi-trillion model at a stated
output speed, from any vendor.

→ [[frontier-models]] [[fact-check]]

Sources: [Cerebras — how we deploy trillion-parameter frontier models](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras) · [HN 50227356](https://news.ycombinator.com/item?id=50227356)
