---
title: "Being watched changes what counts as normal behavior."
num: '32'
id: dp-surveillance-changes-normal
slug: being-watched-changes-what-counts-as-normal-behavior
excerpt: "When people know they are being observed, they change their behavior. That shift can reshape what the system treats as normal – and what it flags as suspicious."
field_guide_section: 'deployment-patterns'
field_guide_group: 'visibility-and-surveillance'
subtheme: 'visibility-and-surveillance'
subtheme_title: 'Visibility and surveillance'
field_guide_order: 2
card_type: recognition
status: unverified
status_reviewer:
status_date:
status_notes:
priority: medium
---

## What To Notice

When people know they are being observed, they behave differently. This is not unique to AI monitoring systems, but AI systems that detect anomalies create a specific version of the problem: surveillance reshapes what "normal" looks like, which changes what the system flags as anomalous. The system was built to detect deviation from a baseline, but the baseline shifts once people become aware the system is present.

Look for gaps between the conditions under which the baseline was established and the conditions under which the system is deployed. A baseline built from pre-deployment behavior measures how people act when they are not being monitored. After deployment, when people know (or suspect) they are watched, they may suppress behaviors the system would otherwise flag – not because those behaviors were harmful, but because they attract attention. The system then reads that suppression as normal, while any deviation from the suppressed baseline becomes anomalous. This can produce a situation where ordinary behavior looks suspicious and compliant behavior looks normal, even when compliance reflects strategic self-presentation rather than the underlying pattern the system was designed to detect.

Watch also for: environments where awareness of monitoring is uneven. People with more institutional experience or legal counsel may understand what the system is looking for; people with less may not. That asymmetry affects who gets flagged.

## Questions To Ask

- Do the people being observed know they are being observed?
- Was the baseline established under the same monitoring conditions as the current deployment?
- How has behavior changed since the system was deployed?
- What legitimate behaviors might now look anomalous because people are self-censoring or self-presenting?
- Does the system account for the chilling effects its own presence creates?
- Who knows what the system is looking for – and does that knowledge affect who gets flagged?

## Why This Matters

This card describes the observational pattern corresponding to the STS concept "Systems are reactive: they change what they measure." That card explains why this happens structurally. This card tells you what to look for in a deployed system.

It is especially important for anomaly detection and behavioral monitoring systems, which depend entirely on a stable baseline of normal behavior – a baseline the system itself disrupts by existing. Use this card when a system is described as detecting deviations from normal, and ask whether "normal" is the same thing it was before the system arrived.
