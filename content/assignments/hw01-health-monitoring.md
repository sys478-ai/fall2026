---
title: 'HW01 Scenario Set: Health Monitoring'
scheduled_day:
num:
type: 'homework'
draft: 0
assignment_series: hw01
series_role: resource
series_order: 1
series_card_id: health-monitoring
excerpt: 'Health-monitoring and assistive-device scenarios involving neuromorphic edge chips for anomaly detection.'
hide_from_list: 1
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## Overview

This page contains four possible health-monitoring or assistive-device scenarios involving a neuromorphic edge chip designed for anomaly detection.

Your group should choose **one** scenario for your deeper analysis.

For your chosen scenario, pay attention to:

- what the chip is monitoring
- whether the model appears to be fixed, adaptive, or hybrid
- what happens after an anomaly is flagged
- who is affected by the system's output

For any scenario, the model might be:

- **Fixed:** calibrated before deployment and not substantially changed unless manually updated.
- **Adaptive:** updated over time based on what the device encounters in use.
- **Hybrid:** allowed to adapt within preset limits or only after review.

Do not try to analyze the entire health domain. Choose one specific scenario.

## Scenario 1: Adaptive Hearing Aid

A person uses a hearing aid that contains a neuromorphic edge chip. The device processes sound locally and adjusts how it amplifies or filters sound in different environments.

The device may be used at home, at work, in classrooms, in traffic, in restaurants, and in other noisy spaces.

When the system encounters sound patterns that differ from what it expects, it may adjust sound processing automatically. The device may also store a limited on-device record of major setting changes or adaptation events for later review.

## Scenario 2: Seizure Detection Wearable

A person with epilepsy wears a device that contains a neuromorphic edge chip. The device continuously monitors physiological signals and looks for patterns that may indicate an increased risk of seizure.

When the system flags an anomaly, it may notify the wearer, a caregiver, a family member, or an emergency contact.

The device is intended to operate during everyday life, including at home, school, work, sleep, and travel.

## Scenario 3: Implanted Cardiac Device

A patient has an implanted cardiac device that contains a neuromorphic edge chip. The device monitors physiological signals and looks for patterns that may indicate a dangerous cardiac event.

The device operates inside the patient's body for long periods of time. It may not always have reliable connectivity, and it cannot be easily removed for inspection.

When the system flags an anomaly, it may log the event, notify a clinician, or trigger a device response depending on how the system is designed.

## Scenario 4: Adaptive Prosthetic Limb

A person uses a prosthetic limb that contains a neuromorphic edge chip. The device monitors movement patterns, pressure, gait, muscle signals, or other sensorimotor signals and uses them to detect unusual movement or adjust control in real time.

The device is intended to operate during everyday activities such as walking, climbing stairs, carrying objects, exercising, or moving through unfamiliar environments.

When the system detects a pattern that differs from what it expects, it may adjust movement support automatically, change resistance or responsiveness, alert the user, or log the event for later review.

## Choose a Scenario

Discuss the scenarios and choose one that your group thinks raises useful or difficult anticipatory analysis questions.

Before choosing, briefly compare:

- what each device monitors
- whether the model is fixed, adaptive, or hybrid
- what happens after an anomaly is flagged
- who is directly affected by the system's output

When you're done, return to [the main assignment instructions](/fall2026/assignments/hw01) to complete your analysis.
