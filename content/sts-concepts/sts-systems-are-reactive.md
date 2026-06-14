---
title: "Systems are reactive: they change what they measure."
num: '27'
id: sts-systems-are-reactive
slug: systems-are-reactive-they-change-what-they-measure
excerpt: "When a system measures, classifies, or monitors people, it can change the behavior it was designed to observe."
field_guide_section: 'sts-concepts'
field_guide_order: 7
order: 7
card_type: concept
field_guide_group: 'sociotechnical-systems'
subtheme: 'sociotechnical-systems'
subtheme_title: 'AI systems are socio-technical systems'
status: verified
status_reviewer: Maxwell Chalmers
status_date: 2026-06-14
status_notes: "Reviewed for conceptual accuracy, accessibility, observational usefulness, and practical application. This card strongly overlaps with 'Classification systems don't just describe the world — they produce it,' especially around looping effects and feedback between classification and behavior; merging or more clearly differentiating the two may improve the field guide."
priority: high
---

## What To Notice

Some measurements are treated as if they simply record a stable reality. But when systems measure, classify, or monitor people, the act of measurement can change the behavior being observed.

When people know they are being assessed, ranked, or watched, they often adapt. That response is not necessarily deception; it is a normal feature of social life. The system may therefore end up measuring behavior that has already been reshaped by the system’s presence.

Donald MacKenzie's study of financial models showed that models are "engines, not cameras." A financial model that predicts where prices will go does not just describe the market — it shapes what traders do, which shapes the market, which shapes what the model sees. The model and the market co-evolve. Ian Hacking described a related process in human classification as "looping effects": being labeled changes how people understand and present themselves, which changes the data the classification system sees, which can change the classification. In anomaly detection systems, this dynamic is particularly consequential. Once people learn what counts as anomalous, "normal" shifts — either because people consciously conform to baseline expectations, or because the system's interventions reshape the population it monitors.

For example, workers monitored by productivity software may focus on whatever activity the system counts, even when that activity is only a rough proxy for useful work. The measurement does not merely observe productivity; it helps redefine what workers do to appear productive.

## Questions To Ask

- Does the existence of this system change the behavior it was designed to measure?
- Who knows they are being measured, and how does that knowledge affect what they do?
- What feedback loops exist between the system's outputs and its future inputs?
- Is the baseline this system compares against stable, or is it being reshaped by the system's own interventions?
- When the system acts on a mistaken classification, can that intervention create new data that makes the original mistake look correct?

## Why This Matters

This card connects directly to the BRAID case. An anomaly detection system deployed in a real environment does not just observe that environment — it changes it. Understanding that systems are reactive matters for anticipating what a system will actually do over time, and for designing governance frameworks that account for feedback effects rather than assuming the system's measurements are independent of its interventions.

