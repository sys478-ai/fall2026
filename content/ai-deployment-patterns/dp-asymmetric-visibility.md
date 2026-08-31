---
title: "This system creates asymmetric visibility."
num: '31'
id: dp-asymmetric-visibility
slug: this-system-creates-asymmetric-visibility
excerpt: "The system can see things about people that people cannot see about the system. That asymmetry is often a design feature, not a side effect."
field_guide_section: 'deployment-patterns'
field_guide_group: 'visibility-and-surveillance'
subtheme: 'visibility-and-surveillance'
subtheme_title: 'Visibility and surveillance'
field_guide_order: 1
card_type: recognition
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What To Notice

Many AI systems can see things about people that people cannot see about the system. The system knows what it is looking for, what thresholds it uses, what data it collects, and what inferences it makes – but the person being observed typically knows none of this. That asymmetry is not incidental to how the system works. It is often a design requirement. Systems built for surveillance, anomaly detection, fraud identification, or risk scoring typically depend on subjects not knowing exactly what the system is looking for, or they simply were never designed with subject-side visibility as a goal.

Look for: systems where the people being observed cannot see the system's outputs about themselves; systems where subjects cannot contest or correct their records; systems where the effectiveness argument explicitly depends on subjects not knowing they are being watched or what signals are being collected. Look also for audit asymmetry – who can inspect the system's behavior, and who cannot. When only the institution deploying the system can audit it, the people affected by it have no independent basis for evaluating whether it is working fairly or accurately.

The BRAID neuromorphic chip is a particularly sharp case. Edge inference on a low-power chip means no cloud logging, minimal data footprint, and no external audit trail. The architectural properties that make the chip attractive for deployment – efficiency, privacy by design in the data-minimization sense – also make the system's behavior harder to observe from the outside. Someone flagged by such a system may have no way to know they were flagged, no record of what the system observed, and no mechanism for appeal.

## Questions To Ask

- Can the people being observed see what the system sees about them?
- Can they see how they have been classified or scored?
- Does the system's effectiveness depend on subjects not knowing what it looks for?
- Who can audit the system's behavior, and who cannot?
- What recourse exists for someone flagged or misclassified by this system?
- What would the system look like if subjects had the same visibility as operators?

## Why This Matters

Asymmetric visibility is not just a fairness problem – it is an accountability problem. When the people most affected by a system have the least ability to see how it works, errors are harder to detect, contestation is harder to mount, and the system's authority becomes very difficult to challenge. This card pairs with "Opacity shifts authority": opacity is the mechanism, asymmetric visibility is the lived consequence.

Use this card when analyzing any system that monitors, classifies, or acts on people without giving them meaningful access to the system's view of them. It applies to surveillance systems, anomaly detection, risk scoring, content moderation, and any other context where institutional visibility and subject visibility are structurally mismatched.
