---
title: 'HW01 Scenario Set: Worker Monitoring'
scheduled_day:
num:
type: 'homework'
draft: 0
hide_from_list: 1
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

Scenario handout for the [BRAID Group Anticipatory Analysis](/fall2026/assignments/hw01).

## Overview

This page contains four possible worker-monitoring scenarios involving a neuromorphic edge chip designed for anomaly detection.

Your group should choose **one** scenario for your deeper analysis.

For your chosen scenario, pay attention to:

- what the chip is monitoring
- whether the model appears to be fixed, adaptive, or hybrid
- what kinds of changes the system treats as unusual
- what happens after an anomaly is flagged
- who is affected by the system's output

For any scenario, the model might be:

- **Fixed:** calibrated before deployment and not substantially changed unless manually updated.
- **Adaptive:** updated over time based on what the device encounters in use.
- **Hybrid:** allowed to adapt within preset limits or only after review.

Do not try to analyze the entire worker-monitoring domain. Choose one specific scenario.

## Scenario 1: Long-Haul Driver Fatigue Monitoring

A trucking company gives long-haul drivers wearable devices or in-cab systems that contain neuromorphic edge chips. The devices monitor signals such as heart rate, movement patterns, eye closure, steering behavior, reaction timing, or other indicators related to alertness.

The system is used during long shifts, overnight driving, changing weather, traffic delays, and periods with limited connectivity.

The system looks for changes such as slower reaction timing, repeated lane corrections, unusual stillness, abnormal heart-rate patterns, extended eye closure, or movement patterns associated with drowsiness. If the system treats a change as unusual, it may alert the driver, notify dispatch, recommend a rest break, log the event, or trigger a company safety review.

## Scenario 2: Warehouse Worker Monitoring

A warehouse or distribution center gives workers wearable devices that contain neuromorphic edge chips. The devices monitor movement, posture, lifting patterns, location changes, pace, temperature, or other signals during physically demanding work.

The system is used during normal shifts, peak shipping periods, overnight work, and high-volume fulfillment windows.

The system looks for changes such as unusual lifting posture, repeated sudden stops, slower movement, signs of heat stress, irregular motion, unexpected time away from assigned areas, or location patterns that differ from the worker's scheduled task. If the system treats a change as unusual, it may alert the worker, notify a supervisor, recommend reassignment, log the event, change task assignments, or trigger a productivity or safety review.

## Scenario 3: Surgical Team Fatigue Monitoring

A hospital gives surgeons or surgical staff wearable devices that contain neuromorphic edge chips. The devices monitor physiological or behavioral signals such as heart rate, hand tremor, movement steadiness, posture, temperature, or other indicators of fatigue or stress during long procedures.

The system is used during surgeries that may last many hours, emergency procedures, overnight shifts, or periods of high workload.

The system looks for changes such as increased tremor, unusual movement patterns, elevated stress indicators, slowed response timing, or signs of physical fatigue. If the system treats a change as unusual, it may alert the clinician, notify another member of the surgical team, log the event, or recommend a pause, handoff, or additional support.

## Scenario 4: Airline Pilot Monitoring

An airline or aviation safety agency uses wearable or cockpit-integrated systems containing neuromorphic edge chips to monitor pilots during flights. The system tracks signals such as eye movement, posture, heart rate, reaction timing, voice patterns, control inputs, or other indicators of alertness and workload.

The system is used during long flights, overnight flights, turbulent conditions, emergency situations, and periods of high cognitive demand.

The system looks for changes such as delayed responses, unusual control inputs, signs of drowsiness, irregular voice patterns, elevated stress indicators, or reduced movement during critical phases of flight. If the system treats a change as unusual, it may alert the pilot, notify another crew member, log the event, or trigger a cockpit or airline safety procedure.

## Choose a Scenario

Discuss the scenarios and choose one that your group thinks raises useful or difficult anticipatory analysis questions.

Before choosing, briefly compare:

- what each system monitors
- whether the model is fixed, adaptive, or hybrid
- what kinds of changes the system treats as unusual
- what happens after an anomaly is flagged
- who is directly affected by the system's output

When you're done, return to [the main assignment instructions](/fall2026/assignments/hw01) to complete your analysis.
