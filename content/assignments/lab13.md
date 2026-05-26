---
title: 'Spikes, Timing, and Event-Driven Computation'
num: '13'
date: '2026-12-02'
type: 'lab'
due_date: '2026-12-09'
draft: 0
---

How timing, events, and silence can carry information in neuromorphic systems.

## Overview

Many conventional AI systems represent information as numerical values that are processed through layers of computation. Spiking and neuromorphic systems can work differently. They may represent information through **events**: brief pulses, spikes, or signals that happen at particular times.

In these systems, **when** something happens can matter as much as **what** happens. A spike may communicate that a threshold has been reached. A burst of spikes may communicate intensity. A pattern of timing may communicate change, novelty, or coordination. Silence may also matter: a system that does not fire may be conserving energy, suppressing noise, or signaling that nothing important has changed.

This matters for BRAID because cerebellum-inspired neuromorphic systems are interested in rapid, efficient anomaly detection. Such systems may rely on spike timing, synchrony, and event-driven behavior to respond quickly to unexpected input.

This lab introduces the basic idea of spikes and event-driven computation through a paper-and-movement simulation. You will compare continuous monitoring with event-driven signaling, analyze how timing changes interpretation, and consider what these systems make easier or harder to explain, audit, and govern.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain what a spike or event represents in a simplified neuromorphic system.
- Describe why timing can carry information.
- Distinguish between continuous processing and event-driven processing.
- Explain how event-driven systems may reduce energy use by staying quiet until something changes.
- Analyze how spike timing and synchrony can support anomaly detection.
- Identify explainability, logging, and accountability challenges in event-driven systems.
- Connect spiking behavior to governance questions about rapid automated response.

## Key Terms

| Term                     | Working Definition                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| Spike                    | A brief signal or event used to communicate activity in a spiking system.                     |
| Event                    | A discrete occurrence that triggers communication or computation.                             |
| Event-driven computation | Computation that happens when relevant events occur rather than continuously at every moment. |
| Timing                   | When a spike or event occurs.                                                                 |
| Spike train              | A sequence of spikes over time.                                                               |
| Firing rate              | How often spikes occur over a period of time.                                                 |
| Synchrony                | Multiple units firing or changing state at the same time or in a coordinated way.             |
| Burst                    | A rapid cluster of spikes.                                                                    |
| Latency                  | The delay between an input and a response.                                                    |
| Silence                  | Absence of spikes or events; in some systems, silence can be meaningful.                      |
| Trace                    | A record of events, timing, state changes, or outputs that can be inspected later.            |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Think of a situation where timing changes the meaning of a signal. What changes if the signal happens earlier, later, repeatedly, or all at once?

Write 4–6 sentences.

Consider examples such as:

- a fire alarm
- a heartbeat
- a text message at 3:00 a.m.
- repeated failed login attempts
- a car braking suddenly
- a machine making a strange sound
- a person pausing before answering
- many people leaving a building at once

## Part 2: Continuous Signals vs. Event Signals

Compare two ways of monitoring a room for possible problems.

### System A: Continuous Monitoring

The system records everything constantly: video, audio, movement, temperature, and activity.

### System B: Event-Driven Monitoring

The system stays mostly quiet and sends a signal only when something changes enough to matter: sudden motion, loud sound, rapid temperature increase, or unusual pattern.

Complete the table.

| Question                             | Continuous Monitoring | Event-Driven Monitoring |
| ------------------------------------ | --------------------- | ----------------------- |
| What data is collected?              |                       |                         |
| How much data is produced?           |                       |                         |
| What might use more energy?          |                       |                         |
| What might preserve more privacy?    |                       |                         |
| What might be easier to audit later? |                       |                         |
| What might miss important context?   |                       |                         |
| What might produce faster alerts?    |                       |                         |

Discuss:

- Which system seems more privacy-preserving?
- Which system seems easier to explain after something goes wrong?
- Which system might create more data than necessary?
- Which system might fail because it did not record enough?

## Part 3: Paper Simulation Setup

Your group will simulate a small event-driven anomaly detector.

### Roles

Assign roles within your group.

| Role        | Description                                   |
| ----------- | --------------------------------------------- |
| Sensor      | Reads the input cards and announces signals.  |
| Node A      | Responds to one kind of event.                |
| Node B      | Responds to another kind of event.            |
| Node C      | Responds to repeated events.                  |
| Output Node | Decides whether to issue an alert.            |
| Recorder    | Writes down all spikes, timing, and alerts.   |
| Auditor     | Later tries to explain why an alert happened. |

If your group is small, one person can hold more than one role.

### Signals

The sensor will read a sequence of events over time.

Each event can produce a spike.

| Event Type | Meaning                 | Which Node Spikes? |
| ---------- | ----------------------- | ------------------ |
| L          | Login from new location | Node A             |
| D          | Login from new device   | Node B             |
| F          | Failed login attempt    | Node C             |
| T          | Large data transfer     | Node B             |
| N          | Normal login            | No spike           |
| R          | Routine activity        | No spike           |

## Part 4: Simulation Round 1 — Single Events

Read the following timeline.

| Time | Event | Node A Spike? | Node B Spike? | Node C Spike? | Output Alert? |
| ---- | ----- | ------------- | ------------- | ------------- | ------------- |
| 1    | N     |               |               |               |               |
| 2    | L     |               |               |               |               |
| 3    | R     |               |               |               |               |
| 4    | D     |               |               |               |               |
| 5    | N     |               |               |               |               |
| 6    | F     |               |               |               |               |
| 7    | R     |               |               |               |               |
| 8    | T     |               |               |               |               |

### Rule for Round 1

The output node sends an alert if **two or more different nodes spike at the same time**.

Discuss:

- Were there any alerts?
- Did any single event seem concerning?
- What does this rule ignore?
- What does this rule capture?

Write your group’s response:

## Part 5: Simulation Round 2 — Timing Window

Now use a timing window.

### Rule for Round 2

The output node sends an alert if **two or more different nodes spike within a three-step window**.

For example, spikes at times 2 and 4 count as close enough. Spikes at times 2 and 7 do not.

Read the timeline.

| Time | Event | Node A Spike? | Node B Spike? | Node C Spike? | Alert? | Why? |
| ---- | ----- | ------------- | ------------- | ------------- | ------ | ---- |
| 1    | N     |               |               |               |        |      |
| 2    | L     |               |               |               |        |      |
| 3    | R     |               |               |               |        |      |
| 4    | D     |               |               |               |        |      |
| 5    | R     |               |               |               |        |      |
| 6    | N     |               |               |               |        |      |
| 7    | F     |               |               |               |        |      |
| 8    | T     |               |               |               |        |      |

Discuss:

- Did the same events produce a different result?
- How did timing change the meaning of the pattern?
- What does this rule capture that Round 1 missed?
- What false positives could this rule create?

## Part 6: Simulation Round 3 — Repetition and Bursts

Now consider repeated events.

### Rule for Round 3

The output node sends an alert if either:

1. two or more different nodes spike within a three-step window, or
2. the same node spikes three times within five time steps.

Read the timeline.

| Time | Event | Node A Spike? | Node B Spike? | Node C Spike? | Alert? | Why? |
| ---- | ----- | ------------- | ------------- | ------------- | ------ | ---- |
| 1    | N     |               |               |               |        |      |
| 2    | F     |               |               |               |        |      |
| 3    | R     |               |               |               |        |      |
| 4    | F     |               |               |               |        |      |
| 5    | N     |               |               |               |        |      |
| 6    | F     |               |               |               |        |      |
| 7    | R     |               |               |               |        |      |
| 8    | N     |               |               |               |        |      |

Discuss:

- Why might repetition matter?
- When is a burst of events meaningful?
- When might repeated events be harmless?
- What context would you need to interpret this alert?

## Part 7: Silence as Information

In event-driven systems, silence can matter.

A system may stay quiet because:

- nothing important is happening
- the sensor is broken
- the threshold is too high
- the relevant event is not measurable
- the system has learned to ignore certain patterns
- the system is suppressing noise
- power is unavailable
- communication failed

Discuss each case.

| Silent System Explanation            | Why It Matters |
| ------------------------------------ | -------------- |
| Nothing important is happening       |                |
| Sensor is broken                     |                |
| Threshold is too high                |                |
| Relevant event is not measurable     |                |
| System learned to ignore the pattern |                |
| Communication failed                 |                |

Key question:

> Does no alert mean no problem?

Write your group’s response:

## Part 8: Synchrony

Synchrony means that multiple units act at the same time or in a coordinated way.

In some systems, synchrony can indicate that a pattern is important.

Consider these two timelines.

### Timeline A: Spread-Out Events

| Time | Event |
| ---- | ----- |
| 1    | L     |
| 4    | D     |
| 7    | F     |
| 10   | T     |

### Timeline B: Coordinated Events

| Time | Event |
| ---- | ----- |
| 1    | R     |
| 2    | L     |
| 3    | D     |
| 4    | F     |
| 5    | T     |

Discuss:

- Which timeline seems more concerning?
- Why might events close together matter?
- What could be a harmless explanation for coordinated events?
- What could be a harmful explanation?
- How would a system explain the difference?

## Part 9: Logging and Reconstruction

The recorder should now review the event logs from Rounds 1–3.

Imagine that an alert was sent and someone challenges it.

Complete the table.

| Question                         | What Would Need to Be Logged? |
| -------------------------------- | ----------------------------- |
| What input events occurred?      |                               |
| Which nodes spiked?              |                               |
| When did each node spike?        |                               |
| What rule or threshold was used? |                               |
| What timing window was used?     |                               |
| What state was the system in?    |                               |
| What alert was sent?             |                               |
| Who received the alert?          |                               |
| What action followed?            |                               |

Discuss:

- What information is necessary for accountability?
- What information might be sensitive?
- What information might be difficult to log in a fast, low-power system?
- What happens if the system cannot reconstruct why it alerted?

## Part 10: Social and Ethical Questions

Discuss:

- When should an event-driven system be allowed to act automatically?
- When should it only alert a human?
- When should it stay silent unless a human asks for information?
- Who should decide which events matter?
- Who should decide the timing window?
- Who should decide whether silence means safety?
- What should happen when an event-driven system creates a false alarm?
- What should happen when it misses a serious event?
- How should affected people be able to challenge an event-based decision?

## Part 11: Technical Translation

This lab illustrates several neuromorphic and event-driven computing ideas.

| Lab Activity                   | Technical Analogue                                  |
| ------------------------------ | --------------------------------------------------- |
| Event cards                    | Sensor inputs or signal events                      |
| Node spikes                    | Artificial neuron activation                        |
| Spike timing                   | Temporal coding                                     |
| Multiple spikes close together | Coincidence detection or temporal pattern detection |
| Repeated spikes                | Burst or high firing rate                           |
| Coordinated events             | Synchrony                                           |
| Silence                        | No event, suppression, ignored signal, or failure   |
| Alert threshold                | Decision rule or anomaly threshold                  |
| Recorder log                   | Traceability and audit record                       |
| Auditor explanation            | Explainability and contestability                   |

Key takeaway:

> In event-driven systems, information may be carried not only by values, but by when events happen, how often they happen, which units respond, and which parts of the system remain silent.

## Part 12: Connection to BRAID

The BRAID project focuses on cerebellum-inspired neuromorphic systems for fast, efficient anomaly detection.

This makes spikes and timing especially important.

A BRAID-like system may rely on:

- event-driven sensing
- spike timing
- bursts
- synchrony
- learned baselines
- rapid response
- low-power local processing
- hardware-level state changes

These features may create technical benefits:

- faster response
- less wasted energy
- less continuous data movement
- better detection of temporal patterns
- efficient anomaly detection at the edge

They also raise governance questions:

- Can the system explain why an event mattered?
- What spike patterns should be logged?
- Can logs preserve enough information without undermining efficiency?
- Who can inspect timing-based decisions?
- Who decides what timing patterns are risky?
- What happens if the system acts before human review?
- What if silence hides failure?

## Part 13: Governance Review

Your group has been asked to evaluate an event-driven anomaly detection system for one of the following contexts:

- cybersecurity
- health monitoring
- autonomous vehicles
- factory safety
- elder-care monitoring
- smart home safety
- campus safety
- public space monitoring

Choose one context and complete the table.

| Governance Question                           | Group Response |
| --------------------------------------------- | -------------- |
| What events does the system sense?            |                |
| What spike or event patterns trigger concern? |                |
| What timing window matters?                   |                |
| What counts as a burst or repeated signal?    |                |
| What counts as synchrony?                     |                |
| What does silence mean?                       |                |
| What false positives are possible?            |                |
| What false negatives are possible?            |                |
| What should be logged?                        |                |
| Who should receive alerts?                    |                |
| What actions should be automated?             |                |
| What actions require human review?            |                |
| Who can challenge an alert?                   |                |

## Deliverable: Event-Driven Governance Memo

Submit a short memo evaluating an event-driven anomaly detection system.

Your memo should include:

1. The use case.
2. What events the system senses.
3. What timing patterns matter.
4. What might trigger an alert.
5. One false positive harm.
6. One false negative harm.
7. One logging or explainability concern.
8. One recommendation for human oversight.
9. A final governance recommendation.

## Suggested Memo Format

```markdown
# Event-Driven Governance Memo

## Use Case

Which event-driven anomaly detection context did your group analyze?

## System Purpose

What is the system supposed to detect or support?

## Events and Timing

What events does the system sense?
What timing patterns matter?

## Alert Logic

What causes the system to send an alert?

## Error Harms

What would count as a false positive?
Who could be harmed?

What would count as a false negative?
Who could be harmed?

## Logging and Explainability

What should be logged so the system can be audited or challenged?

## Human Oversight

Which actions, if any, can be automated?
Which actions require human review?

## Final Recommendation

Should the system be used as proposed, redesigned, limited, or rejected?
Explain your reasoning.
```

## Exit Ticket

Individually, answer:

1. What is one way timing can carry information in an event-driven system?
2. Why might event-driven systems be more energy-efficient than continuous monitoring systems?
3. What is one governance question you would ask before allowing a fast event-driven system to trigger action?
