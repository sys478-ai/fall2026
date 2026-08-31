---
title: "This system's baseline and categories were chosen, not given."
num: '30'
id: dp-baseline-and-categories
slug: this-system-baseline-and-categories-were-chosen-not-given
excerpt: "Before a system can flag anything as unusual or classify anyone as risky, someone had to define what counts as normal and what categories to use. Those definitions look technical but are policy choices."
field_guide_section: 'deployment-patterns'
field_guide_group: 'how-data-is-made-and-used'
subtheme: 'how-data-is-made-and-used'
subtheme_title: 'How data is made and used'
field_guide_order: 6
card_type: recognition
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What To Notice

Before a system can flag anything as unusual, measure anything as significant, or classify anyone as risky, someone had to define what counts as normal. That definition looks technical – a baseline distribution, a reference population, a calibration dataset – but it is a policy choice. The baseline could have been drawn differently. It reflects who was measured, when, under what conditions, and what the people doing the measuring were trying to capture.

Watch for: systems where the "normal" baseline was established on a different population than the one being acted on. A medical diagnostic tool trained on data from one demographic and deployed with another. An anomaly detection system calibrated in one operating environment and run in a different one. A risk assessment built on historical records that themselves reflected prior institutional decisions about who to surveil, arrest, or deny services. In each case, the baseline carries assumptions that may not hold – and the people who are systematically misfit by those assumptions tend to be the ones least represented in the data that set the baseline in the first place.

Categories have the same structure. A system that sorts people or events into categories encodes a judgment about how to divide up the world. The category "recidivist," "creditworthy," "anomalous," or "high-risk" is not a natural kind discovered in the data. It is a human construction built from decisions about what counts, what gets grouped together, and what gets separated. Different category schemes produce different populations of people flagged, approved, denied, or treated. Look for who made those decisions and when, whether the categories remain contested among the communities being classified, and whether the people most affected had any role in defining the terms.

## Questions To Ask

- What does this system treat as normal, and who defined that baseline?
- What population was used to establish the baseline, and how does it compare to the population being acted on?
- What would change if the baseline were drawn from a different population or time period?
- What categories does this system use, and who built them?
- Who is systematically misfit by the categories in use – and is that misfitting treated as a problem to solve or a natural limit?
- Were the people most affected by this classification involved in defining the categories?

## Why This Matters

This card is the observational counterpart to two STS concepts: "Normal is constructed" and "Classification systems produce the world." Those cards explain why baselines and categories work the way they do. This card tells you what to look for in a specific deployed system.

It is particularly useful for systems that operate through anomaly detection or risk scoring, because those systems depend entirely on a definition of normal that someone chose. The BRAID neuromorphic chip case is a direct application: any anomaly detection system built on it will require a baseline. The choices embedded in that baseline – what population was measured, under what conditions, with what categories – will shape what the system flags, who it flags, and with what consequences.
