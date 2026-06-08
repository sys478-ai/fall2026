---
title: "Systems are reactive: they change what they measure."
num: '27'
id: sts-systems-are-reactive
slug: systems-are-reactive-they-change-what-they-measure
excerpt: "When a system measures, classifies, or monitors people, it changes the behavior it was designed to observe."
field_guide_section: 'sts-concepts'
field_guide_order: 7
order: 7
card_type: concept
field_guide_group: 'sociotechnical-systems'
subtheme: 'sociotechnical-systems'
subtheme_title: 'AI systems are socio-technical systems'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: 2
---

## What This Means

A speedometer describes how fast a car is moving. It does not change how fast the car moves. Most measurement works this way — we assume the act of measuring is separate from the thing being measured.

AI systems that measure, classify, or monitor people do not work this way. When people know they are being observed, assessed, or scored, they change their behavior in response. This is not deception — it is a normal feature of how people operate in social environments. The problem is that a system designed to measure some stable underlying phenomenon is now measuring a phenomenon that has already been reshaped by the existence of the system.

Donald MacKenzie's study of financial models showed that models are "engines, not cameras." A financial model that predicts where prices will go does not just describe the market — it shapes what traders do, which shapes the market, which shapes what the model sees. The model and the market co-evolve. Ian Hacking called the analogous phenomenon in human classification "looping effects": being labeled changes how people understand and present themselves, which changes the data the classification system sees, which can change the classification. In anomaly detection systems, this dynamic is particularly consequential. Once people learn what counts as anomalous, "normal" shifts — either because people consciously conform to baseline expectations, or because the system's interventions reshape the population it monitors.

## Questions To Ask

- Does the existence of this system change the behavior it was designed to measure?
- Who knows they are being measured, and how does that knowledge affect what they do?
- What feedback loops exist between the system's outputs and its future inputs?
- Is the baseline this system compares against stable, or is it being reshaped by the system's own interventions?
- When the system makes an error, does its error change the world in ways that make the error harder to detect later?

## Why This Matters

This card connects directly to the BRAID case. An anomaly detection system deployed in a real environment does not just observe that environment — it changes it. Understanding that systems are reactive matters for anticipating what a system will actually do over time, and for designing governance frameworks that account for feedback effects rather than assuming the system's measurements are independent of its interventions.
