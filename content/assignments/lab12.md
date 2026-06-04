---
title: 'Von Neumann vs. Neuromorphic Architectures'
scheduled_day: 20
num: '12'
type: 'lab'
draft: 0
---

How computer architecture shapes speed, energy use, learning, and governance.

## Overview

Most computers today are based on a general architecture in which memory and processing are separated. Data is stored in memory, moved to a processor, processed, and then written back to memory. This design is flexible and powerful, but moving data back and forth can take time and energy.

Neuromorphic computing takes inspiration from biological nervous systems. In many neuromorphic systems, memory and processing are more closely connected. Instead of moving all data through a central processor, computation may happen through many distributed units that communicate through events, spikes, or changes in connection strength.

This technical difference matters for governance. Architecture shapes what systems can do, how fast they respond, how much energy they use, where data flows, what can be logged, who can inspect behavior, and how easy it is to update or challenge a decision.

In this lab, you will compare conventional and neuromorphic architectures through a role-play simulation, analyze the tradeoffs of each approach, and connect architecture to social and ethical questions about edge AI, surveillance, explainability, energy use, and accountability.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain the basic difference between Von Neumann and neuromorphic architectures.
- Describe why moving data between memory and processing can create bottlenecks.
- Explain why neuromorphic systems may be more energy-efficient for some tasks.
- Analyze how architecture affects data flows, speed, auditability, and oversight.
- Connect hardware architecture to governance questions about privacy, explainability, accountability, and environmental impact.
- Explain why “where computation happens” matters socially and ethically.

## Key Terms

| Term                     | Working Definition                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Architecture             | The organization of a computing system, including how memory, processing, communication, and control are arranged.  |
| Von Neumann architecture | A common computing design that separates memory and processing.                                                     |
| Processor                | The part of a computer that performs operations on data.                                                            |
| Memory                   | The part of a computer that stores data and instructions.                                                           |
| Bottleneck               | A point where system performance is limited by slow movement, limited capacity, or congestion.                      |
| Neuromorphic computing   | Computing inspired by biological nervous systems, often using distributed, event-driven, or spike-based processing. |
| Event-driven computation | Computation that happens when events occur, rather than running all components continuously.                        |
| Parallelism              | Many operations happening at the same time.                                                                         |
| Edge computing           | Processing that happens on or near the device where data is collected.                                              |
| Auditability             | The ability to inspect, evaluate, or reconstruct system behavior.                                                   |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Where do you think “thinking” happens in a computer? In one central place, across many parts, in memory, in software, in hardware, or somewhere else?

Write 4–6 sentences.

Then consider:

- Where does data live?
- Where does computation happen?
- What has to move?
- Who can inspect what happened?
- What might change if memory and processing are combined?

## Part 2: Two Architecture Models

Review the two simplified models below.

### Model A: Conventional Von Neumann-Style System

1. Data is stored in memory.
2. Instructions are stored in memory.
3. The processor fetches instructions and data.
4. The processor performs operations.
5. The processor writes results back to memory.
6. The cycle repeats.

### Model B: Neuromorphic-Style System

1. Many small units store state locally.
2. Units communicate through events, spikes, or signals.
3. Computation happens through the pattern and timing of activity.
4. Memory and processing may be closely connected.
5. Only active parts of the system may need to communicate.
6. The system may adapt as connection strengths or device states change.

Complete the comparison table.

| Question                                  | Von Neumann-Style System | Neuromorphic-Style System |
| ----------------------------------------- | ------------------------ | ------------------------- |
| Where is memory?                          |                          |                           |
| Where is processing?                      |                          |                           |
| What has to move?                         |                          |                           |
| What happens when there is a lot of data? |                          |                           |
| What parts are active during computation? |                          |                           |
| How might the system use energy?          |                          |                           |
| How easy is it to inspect instructions?   |                          |                           |
| How easy is it to inspect learned state?  |                          |                           |

## Part 3: Role-Play Simulation

Your class will simulate two kinds of computing systems.

### Roles

Assign students to the following roles:

| Role                 | Function                                    |
| -------------------- | ------------------------------------------- |
| Memory               | Stores numbers, labels, or instructions.    |
| Processor            | Performs calculations or decisions.         |
| Bus / Messenger      | Carries data between memory and processor.  |
| Controller           | Tells the system what step happens next.    |
| Sensor               | Provides new input data.                    |
| Output               | Records or announces the result.            |
| Neuron / Node        | Stores local state and responds to signals. |
| Synapse / Connection | Carries or modifies signals between nodes.  |

Your instructor may assign only some roles depending on class size.

## Part 4: Simulation A — Von Neumann Bottleneck

In this simulation, the system must classify incoming messages as either:

- Routine
- Needs follow-up

### Instructions

1. The **Sensor** receives an input message.
2. The **Controller** asks **Memory** for the classification rule.
3. The **Bus / Messenger** carries the rule to the **Processor**.
4. The **Controller** asks **Memory** for the input data.
5. The **Bus / Messenger** carries the input data to the **Processor**.
6. The **Processor** applies the rule.
7. The **Bus / Messenger** carries the result back to **Memory**.
8. The **Output** announces the classification.

### Observation Questions

| Question                                        | Group Response |
| ----------------------------------------------- | -------------- |
| What had to move through the system?            |                |
| Which role became the bottleneck?               |                |
| What happened when many inputs arrived quickly? |                |
| What parts of the system were easy to inspect?  |                |
| What logs or records could this system keep?    |                |

## Part 5: Simulation B — Neuromorphic-Style Event Processing

In this simulation, the system responds only when certain patterns occur.

### Instructions

1. Each **Node** represents a simple pattern.
2. Each **Connection** passes a signal when a node becomes active.
3. Nodes respond only when they receive enough input.
4. Some nodes may become specialized for certain kinds of input.
5. The **Output** activates only when a particular pattern of signals occurs.
6. Only active nodes communicate.

Example input patterns:

| Input                         | Possible Active Nodes    |
| ----------------------------- | ------------------------ |
| Repeated failed logins        | login node, anomaly node |
| New location                  | location node            |
| New device                    | device node              |
| Large data transfer           | traffic node             |
| Normal login                  | routine node             |
| Many unusual signals together | alert node               |

### Observation Questions

| Question                                            | Group Response |
| --------------------------------------------------- | -------------- |
| What had to move through the system?                |                |
| Which parts were active?                            |                |
| Which parts stayed quiet?                           |                |
| What seemed efficient about this system?            |                |
| What seemed harder to inspect?                      |                |
| What would need to be logged to explain the output? |                |

## Part 6: Compare the Two Simulations

Complete the table.

| Question                         | Von Neumann Simulation | Neuromorphic Simulation |
| -------------------------------- | ---------------------- | ----------------------- |
| What moved through the system?   |                        |                         |
| Where did the decision happen?   |                        |                         |
| What slowed the system down?     |                        |                         |
| What used effort or energy?      |                        |                         |
| What was easiest to observe?     |                        |                         |
| What was hardest to explain?     |                        |                         |
| What would be easiest to update? |                        |                         |
| What would be hardest to audit?  |                        |                         |

Discuss:

- Which system seemed easier to understand?
- Which system seemed more efficient?
- Which system seemed more flexible?
- Which system seemed harder to govern?
- What tradeoff matters most?

## Part 7: Data Movement and Energy

Moving data takes energy.

In many AI systems, large amounts of data must move between memory, processors, sensors, storage systems, and networks.

Consider the following systems.

| System                        | What Data Moves? | Where Does It Move? | Why Might This Use Energy? |
| ----------------------------- | ---------------- | ------------------- | -------------------------- |
| Cloud image recognition       |                  |                     |                            |
| Smart home camera             |                  |                     |                            |
| Wearable health monitor       |                  |                     |                            |
| Autonomous vehicle            |                  |                     |                            |
| Cybersecurity monitor         |                  |                     |                            |
| Factory sensor network        |                  |                     |                            |
| Neuromorphic anomaly detector |                  |                     |                            |

Discuss:

- When is moving data necessary?
- When could local processing reduce data movement?
- When might local processing create new risks?
- What environmental claims would you want evidence for?

## Part 8: Architecture and Privacy

Architecture shapes privacy because it determines where data goes.

Complete the table.

| Architecture Choice               | Possible Privacy Benefit | Possible Privacy Risk |
| --------------------------------- | ------------------------ | --------------------- |
| Send raw data to cloud            |                          |                       |
| Process raw data locally          |                          |                       |
| Send only alerts                  |                          |                       |
| Store learned baselines on-device |                          |                       |
| Store logs centrally              |                          |                       |
| Store no logs                     |                          |                       |
| Update model from cloud           |                          |                       |
| Allow device to adapt locally     |                          |                       |

Discuss:

- Is local processing always more private?
- Are alerts and summaries still sensitive?
- Are learned baselines personal data?
- What should users know about where computation happens?

## Part 9: Architecture and Accountability

Architecture also shapes accountability because it affects what can be inspected.

Complete the table.

| Accountability Question                       | Why Architecture Matters | Group Response |
| --------------------------------------------- | ------------------------ | -------------- |
| Who can inspect the system?                   |                          |                |
| What can be logged?                           |                          |                |
| Can the decision be reconstructed?            |                          |                |
| Can the model be updated?                     |                          |                |
| Can the system be patched?                    |                          |                |
| Can the system be reset?                      |                          |                |
| Can users challenge outputs?                  |                          |                |
| Who is responsible if local behavior changes? |                          |                |

Discuss:

- What makes a system auditable?
- What makes a system explainable?
- What makes a system governable?
- When should efficiency be sacrificed for accountability?

## Part 10: Architecture and Power

Different architectures can shift power.

For each design choice, identify who gains power and who may lose power.

| Design Choice                   | Who Gains Power? | Who May Lose Power? | Why? |
| ------------------------------- | ---------------- | ------------------- | ---- |
| Processing in centralized cloud |                  |                     |      |
| Processing on user device       |                  |                     |      |
| Proprietary hardware            |                  |                     |      |
| Open documentation              |                  |                     |      |
| No user-accessible logs         |                  |                     |      |
| Automatic updates               |                  |                     |      |
| Local learning after deployment |                  |                     |      |
| Vendor-controlled diagnostics   |                  |                     |      |

Discuss:

- Does architecture affect who can understand the system?
- Does architecture affect who can challenge the system?
- Does architecture affect who can profit from the system?
- Does architecture affect who is dependent on whom?

## Part 11: Social and Ethical Questions

Discuss:

- Should people know whether AI decisions happen locally or in the cloud?
- Should users be able to choose where their data is processed?
- Should high-stakes systems be required to keep logs?
- Should there be limits on hardware systems that learn after deployment?
- Should efficient systems be allowed if they are hard to audit?
- Should some applications require centralized oversight?
- Should some applications require local-only processing?
- Who should decide which architecture is appropriate for a given use?

## Part 12: Technical Translation

This lab illustrates several architecture and governance ideas.

| Lab Activity                      | Technical or Governance Analogue         |
| --------------------------------- | ---------------------------------------- |
| Moving information between roles  | Data movement                            |
| Memory sending data to processor  | Von Neumann memory-processing separation |
| Messenger becoming overloaded     | Bottleneck                               |
| Nodes activating only when needed | Event-driven computation                 |
| Local node state                  | Distributed memory                       |
| Comparing logs                    | Auditability                             |
| Asking where data goes            | Data flow governance                     |
| Asking who can inspect behavior   | Accountability and oversight             |
| Asking who gains power            | Political economy of infrastructure      |

Key takeaway:

> Architecture is not just an engineering detail. It shapes energy use, data flows, privacy, auditability, control, and the kinds of governance that are possible.

## Part 13: Connection to BRAID

The BRAID project focuses on neuromorphic systems that may support fast, low-power, on-chip anomaly detection.

This makes architecture central.

A neuromorphic architecture may offer:

- lower energy use
- faster local response
- less movement of raw data
- better fit for event-driven sensor data
- hardware-level adaptation
- scalability for edge systems

But it may also raise governance concerns:

- harder-to-interpret behavior
- less centralized logging
- difficulty reconstructing decisions
- uncertainty about learned hardware state
- challenges with patching or updating
- possible expansion of low-cost surveillance
- concentration of power among hardware developers

In later labs, we will examine spiking, timing, hardware governance, and environmental impact in more detail.

## Part 14: Governance Review

Your group has been asked to advise an organization choosing between a cloud-based AI system and a neuromorphic edge system for anomaly detection.

Choose one context:

- cybersecurity
- hospital monitoring
- autonomous vehicles
- factory safety
- elder-care monitoring
- smart home safety
- campus safety
- public space monitoring

Complete the table.

| Governance Question                           | Group Response |
| --------------------------------------------- | -------------- |
| What is the system supposed to detect?        |                |
| Which architecture is being considered?       |                |
| What data would move through the system?      |                |
| What data would stay local?                   |                |
| What should be logged?                        |                |
| Who should be able to inspect the system?     |                |
| What efficiency benefits are expected?        |                |
| What accountability risks are created?        |                |
| What privacy risks are created?               |                |
| What safeguards should be required?           |                |
| Which architecture do you recommend, and why? |                |

## Deliverable: Architecture Governance Memo

Submit a short memo comparing a cloud-based AI system and a neuromorphic edge system for one anomaly detection use case.

Your memo should include:

1. The use case.
2. The system’s purpose.
3. What data moves in each architecture.
4. One potential benefit of the neuromorphic edge design.
5. One privacy concern.
6. One accountability or auditability concern.
7. One power or control concern.
8. A final architecture recommendation.

## Suggested Memo Format

```markdown
# Architecture Governance Memo

## Use Case

Which anomaly detection use case did your group analyze?

## System Purpose

What is the system supposed to detect or support?

## Architecture Comparison

How would a cloud-based system work?
How would a neuromorphic edge system work?

## Data Movement

What data moves?
What data stays local?
What gets stored or logged?

## Potential Benefit

What is one technical or social benefit of the neuromorphic edge design?

## Privacy Concern

What sensitive data or inference could be exposed or misused?

## Accountability Concern

What would make this system difficult to audit, explain, update, or challenge?

## Power and Control Concern

Who gains control through this architecture?
Who may lose control?

## Final Recommendation

Which architecture do you recommend, under what safeguards, and why?
```

## Exit Ticket

Individually, answer:

1. What is one difference between a Von Neumann-style architecture and a neuromorphic-style architecture?
2. Why does data movement matter for energy, privacy, or accountability?
3. What is one governance question you would ask before deploying a neuromorphic edge system?
