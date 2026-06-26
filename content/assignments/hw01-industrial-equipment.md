---
title: 'HW01 Scenario Set: Industrial Equipment Monitoring'
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

This page contains four possible industrial equipment monitoring scenarios involving a neuromorphic edge chip designed for anomaly detection.

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

Do not try to analyze the entire industrial domain. Choose one specific scenario.

## Scenario 1: Factory Machine Monitoring

A manufacturing plant installs neuromorphic edge chips on high-powered factory machines such as metal stamping presses, industrial cutters, or hydraulic presses. These machines repeat the same motions many times during a production shift. The chips monitor vibration, pressure, timing, temperature, and acoustic patterns while the machines operate.

The system is used during normal production shifts, including periods when workers are nearby and production deadlines are tight.

When the system detects a pattern that differs from what it expects, it may alert a supervisor, log the event, notify a maintenance crew, slow the machine, or shut the machine down.

## Scenario 2: Wind Turbine Monitoring

A wind farm installs neuromorphic edge chips inside turbines located in remote or difficult-to-access areas. The chips monitor vibration, temperature, rotation patterns, and other mechanical signals.

The turbines operate in changing weather conditions and may go long periods without direct human inspection.

When the system detects a pattern that differs from what it expects, it may log the event, send an alert when connectivity is available, trigger a maintenance ticket, or change how the turbine operates.

## Scenario 3: Conveyor System Monitoring

A warehouse or distribution center installs neuromorphic edge chips on conveyor systems that move packages through the facility. The chips monitor vibration, motor behavior, belt movement, temperature, and acoustic signals.

The system operates continuously during high-volume periods, and delays may affect workers, delivery schedules, and downstream operations.

When the system detects a pattern that differs from what it expects, it may alert a supervisor, notify maintenance staff, slow or stop part of the conveyor system, or reroute packages.

## Scenario 4: Industrial Robot Arm Monitoring

A factory uses robotic arms for assembly, welding, packaging, or material handling. Each robot arm contains a neuromorphic edge chip that monitors motor behavior, joint movement, vibration, torque, timing, or acoustic signals.

The robot arms may work near human workers or alongside other automated systems.

When the system detects a pattern that differs from what it expects, it may adjust movement, pause the robot, alert an operator, log the event, or trigger maintenance review.

## Choose a Scenario

Discuss the scenarios and choose one that your group thinks raises useful or difficult anticipatory analysis questions.

Before choosing, briefly compare:

- what each device monitors
- whether the model is fixed, adaptive, or hybrid
- what happens after an anomaly is flagged
- who is directly affected by the system's output

When you're done, return to [the main assignment instructions](/fall2026/assignments/hw01) to complete your analysis.
