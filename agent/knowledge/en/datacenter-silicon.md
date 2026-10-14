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
