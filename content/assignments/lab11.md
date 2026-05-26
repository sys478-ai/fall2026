---
title: 'Memory as Physical State'
num: '11'
date: '2026-11-18'
type: 'lab'
due_date: '2026-11-25'
draft: 0
---

How information persists in material systems, and why storage is never purely abstract.

## Overview

When we talk about computers, we often describe memory as if it were abstract: a file is “saved,” a model “stores” patterns, a device “remembers” behavior, or an AI system “learns” from experience.

But memory is physical.

In conventional computers, information is stored through physical states in hardware: charges, magnetic orientations, transistor states, or other material arrangements. In neuromorphic systems, memory may be even more closely tied to computation itself. A device may store information through changes in connection strength, resistance, timing behavior, or other physical properties.

This matters for ethics and governance. If memory is physical, then questions about storage, deletion, auditability, repair, updateability, and environmental impact are not only software questions. They are also hardware questions.

In this lab, you will examine memory as physical state. You will compare different forms of storage, analyze what it means for a system to “remember,” and consider how hardware-level learning complicates privacy, accountability, and governance.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain that digital memory depends on physical states.
- Distinguish between abstract information and the material systems that store it.
- Describe why memory and processing are often separated in conventional computing.
- Explain why neuromorphic systems may blur the boundary between memory and computation.
- Analyze governance questions related to storage, deletion, traceability, repair, and audit.
- Connect hardware-level memory to privacy, accountability, and anticipatory governance.

## Key Terms

| Term                    | Working Definition                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| Memory                  | The ability of a system to preserve information or state over time.                                          |
| Storage                 | A system or process for keeping information available for later use.                                         |
| Physical state          | A material condition that can represent information, such as charge, magnetization, resistance, or position. |
| Volatile memory         | Memory that requires power to maintain its state.                                                            |
| Non-volatile memory     | Memory that can preserve state even when power is removed.                                                   |
| State                   | The current condition of a system that can affect what it does next.                                         |
| Persistence             | The ability of information or state to remain over time.                                                     |
| Deletion                | The process of removing or making information inaccessible, though physical traces may remain.               |
| Traceability            | The ability to reconstruct what happened in a system.                                                        |
| Hardware-level learning | Learning or adaptation that occurs through changes in physical hardware state.                               |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> When you delete a file, what do you think has physically happened? What do you think has socially or legally happened?

Write 4–6 sentences.

Consider:

- Is the file gone?
- Is it hidden?
- Is it recoverable?
- Who might still have access?
- What would “forgetting” mean for a computer?
- What would “forgetting” mean for an AI system?

## Part 2: Memory Is Physical

Review the following examples of memory.

| Example               | What Is Being Remembered?  | What Physical or Material State Might Preserve It? |
| --------------------- | -------------------------- | -------------------------------------------------- |
| A handwritten note    | Words or ideas             | Ink marks on paper                                 |
| A light switch        | On or off                  | Mechanical position                                |
| A book                | Text                       | Printed marks on pages                             |
| A flash drive         | Files                      | Electrical states in memory cells                  |
| A hard drive          | Files                      | Magnetic patterns                                  |
| A phone               | Photos, messages, settings | Electronic storage                                 |
| A neural connection   | Past activity or learning  | Changed synaptic strength                          |
| A neuromorphic device | Learned pattern or weight  | Changed resistance, charge, or device state        |

Discuss:

- Which examples feel like “memory”?
- Which examples feel like “storage”?
- Which examples can change through use?
- Which examples are easy to inspect?
- Which examples are hard to inspect?

## Part 3: What Does It Mean to Store Something?

Choose three examples from Part 2.

Complete the table.

| Example | What Is Stored? | Who Can Access It? | How Could It Be Changed? | How Could It Be Deleted or Forgotten? |
| ------- | --------------- | ------------------ | ------------------------ | ------------------------------------- |
|         |                 |                    |                          |                                       |
|         |                 |                    |                          |                                       |
|         |                 |                    |                          |                                       |

Discuss:

- Is storing information the same as understanding it?
- Is deleting information the same as erasing all traces?
- Who should control whether information is kept or forgotten?

## Part 4: State and Behavior

A system’s current state affects what it does next.

Consider a simple thermostat.

- It senses temperature.
- It stores a target temperature.
- It compares the current temperature to the target.
- It turns heating or cooling on or off.

Complete the table.

| System                        | What Does It Sense? | What State Does It Store? | How Does That State Affect Future Action? |
| ----------------------------- | ------------------- | ------------------------- | ----------------------------------------- |
| Thermostat                    |                     |                           |                                           |
| Phone autocorrect             |                     |                           |                                           |
| Spam filter                   |                     |                           |                                           |
| Fitness tracker               |                     |                           |                                           |
| Smart speaker                 |                     |                           |                                           |
| AI recommendation system      |                     |                           |                                           |
| Cybersecurity monitor         |                     |                           |                                           |
| Neuromorphic anomaly detector |                     |                           |                                           |

Key question:

> When a system changes based on past input, what should we call that change: memory, learning, personalization, adaptation, or surveillance?

## Part 5: Conventional Computing and Stored Data

In many conventional computing systems, memory and processing are separated.

A simplified version looks like this:

1. Data is stored in memory.
2. The processor retrieves data.
3. The processor performs operations.
4. Results are written back to memory.

This separation can make systems easier to program, inspect, update, and debug. But moving data back and forth also takes time and energy.

Complete the table.

| Question                                                                    | Group Response |
| --------------------------------------------------------------------------- | -------------- |
| What is useful about separating memory and processing?                      |                |
| What might be inefficient about separating memory and processing?           |                |
| What kinds of records or logs might be easier to keep in this architecture? |                |
| What kinds of privacy risks arise when data is stored centrally?            |                |
| What happens when many systems copy, cache, or back up the same data?       |                |

## Part 6: Neuromorphic Memory and Learning

Neuromorphic systems may store information differently.

Instead of treating memory only as files in a storage system, some neuromorphic systems store learned patterns in the changing state of the hardware itself.

For example, a system might “remember” through:

- changed connection strengths
- changed electrical resistance
- changed timing behavior
- changed thresholds
- changed device states
- changed relationships among artificial neurons or synapses

Discuss:

- What might be useful about storing learning directly in hardware?
- What might be hard to inspect?
- What might be hard to reset?
- What might be hard to explain?
- What might be hard to update or patch?
- What might be hard to delete?

Write your group’s response:

## Part 7: Memory, Privacy, and Deletion

A system that remembers can also create privacy risks.

Consider a wearable health monitor that adapts to a user’s patterns over time.

It may learn:

- normal heart rate range
- sleep schedule
- walking pattern
- stress patterns
- medication routines
- caregiving routines
- location patterns
- signs of illness or decline

Complete the table.

| Learned Pattern             | Why It Could Be Useful | Why It Could Be Sensitive |
| --------------------------- | ---------------------- | ------------------------- |
| Normal heart rate range     |                        |                           |
| Sleep schedule              |                        |                           |
| Walking pattern             |                        |                           |
| Stress patterns             |                        |                           |
| Medication routines         |                        |                           |
| Location patterns           |                        |                           |
| Signs of illness or decline |                        |                           |

Discuss:

- Should a user be able to see what the device has learned?
- Should a user be able to delete what the device has learned?
- What would deletion mean if learning is stored in hardware state?
- What should happen when the device is sold, transferred, repaired, or discarded?

## Part 8: Traceability and Audit

If a system makes a decision based on stored state, auditors may need to know what state the system was in at the time.

Consider an on-device anomaly detector.

It flags a person’s behavior as unusual and sends an alert.

Later, the person challenges the alert.

Complete the table.

| Audit Question                              | Why It Matters | What Evidence Would Be Needed? |
| ------------------------------------------- | -------------- | ------------------------------ |
| What data did the system sense?             |                |                                |
| What baseline had the system learned?       |                |                                |
| What threshold was used?                    |                |                                |
| What state was the device in?               |                |                                |
| Had the device recently updated or adapted? |                |                                |
| Was the alert logged?                       |                |                                |
| Could the result be reproduced?             |                |                                |
| Who had authority to inspect the system?    |                |                                |

Discuss:

- What should be logged?
- What should not be logged for privacy reasons?
- What happens if logging is technically difficult?
- What happens if logging changes the energy or efficiency benefits of the system?

## Part 9: Physical Memory Failure Modes

Physical systems can fail.

Memory can be affected by:

- damage
- wear
- heat
- power loss
- manufacturing variation
- software bugs
- hardware defects
- environmental conditions
- malicious tampering
- repair or replacement

Choose three possible failure modes and analyze them.

| Failure Mode | What Could Happen? | Who Could Be Harmed? | What Safeguard Could Help? |
| ------------ | ------------------ | -------------------- | -------------------------- |
|              |                    |                      |                            |
|              |                    |                      |                            |
|              |                    |                      |                            |

Discuss:

- How would users know the system’s memory had failed?
- How would developers know?
- How would regulators know?
- What should happen if the system cannot reliably preserve or explain its state?

## Part 10: Social and Ethical Questions

Discuss:

- Who owns the learned state of a device?
- Is a learned model personal data?
- Is an anomaly baseline personal data?
- Should people be able to request deletion of learned patterns?
- Should institutions be allowed to keep adaptive models after a person leaves?
- What happens when memory is distributed across many devices?
- What happens when memory is stored in hardware that cannot easily be inspected?
- How should hardware-level learning be governed differently from cloud-based software learning?
- What obligations should manufacturers have for repair, update, and end-of-life disposal?

## Part 11: Technical Translation

This lab illustrates several technical and governance ideas.

| Lab Activity                            | Technical or Governance Analogue         |
| --------------------------------------- | ---------------------------------------- |
| Comparing different forms of memory     | Physical representation of information   |
| Asking what state is stored             | State inspection and model documentation |
| Asking how state changes behavior       | Adaptive systems and learning            |
| Asking what can be deleted              | Privacy, deletion, and data rights       |
| Asking what can be audited              | Traceability and accountability          |
| Asking what happens when hardware fails | Reliability and safety analysis          |
| Asking who owns learned state           | Data governance and device governance    |
| Asking what happens at disposal         | Lifecycle governance                     |

Key takeaway:

> Memory is not only an abstract property of software. It is also a physical state that can persist, change, fail, leak, resist deletion, and shape future action.

## Part 12: Connection to BRAID

The BRAID project focuses on neuromorphic systems that may support efficient anomaly detection, adaptation, and learning in hardware.

This makes memory especially important.

In a neuromorphic anomaly detection system, memory might include:

- what patterns the system has learned
- what counts as normal
- what counts as anomalous
- how thresholds have changed
- how artificial synapses or weights have adapted
- what spike patterns led to an alert
- what state the hardware was in at deployment
- what state the hardware is in after use

These questions connect directly to governance:

- Can the system be audited?
- Can the system be patched?
- Can the system forget?
- Can users challenge what the system has learned?
- Can regulators inspect how the system changed?
- Can harm be traced after deployment?
- Can hardware-level learning be constrained to appropriate contexts?

## Part 13: Governance Review

Your group has been asked to advise on a neuromorphic health-monitoring device that learns a user’s baseline and detects anomalies over time.

Complete the table.

| Governance Question                                          | Group Response |
| ------------------------------------------------------------ | -------------- |
| What does the device learn or store?                         |                |
| Is the learned baseline personal data?                       |                |
| Who can access the learned state?                            |                |
| Can the user view what has been learned?                     |                |
| Can the user delete or reset the learned state?              |                |
| What should be logged when an alert occurs?                  |                |
| Who can audit the device?                                    |                |
| What happens if the device is transferred to another person? |                |
| What happens if the device is repaired or replaced?          |                |
| What happens at end of life or disposal?                     |                |
| What safeguards are required before deployment?              |                |

## Deliverable: Hardware Memory Governance Memo

Submit a short memo evaluating memory and learning in the neuromorphic health-monitoring device.

Your memo should include:

1. The system’s purpose.
2. What the system stores or learns.
3. Whether the learned state should count as personal or sensitive data.
4. One deletion or reset concern.
5. One auditability concern.
6. One hardware failure or lifecycle concern.
7. A governance recommendation.

## Suggested Memo Format

```markdown
# Hardware Memory Governance Memo

## System Purpose

What is the system supposed to detect or support?

## What the System Remembers

What data, patterns, baselines, weights, thresholds, or states might be stored?

## Sensitive Memory

Should the learned state count as personal or sensitive data?
Why or why not?

## Deletion or Reset Concern

What would it mean for the system to forget, reset, or delete what it has learned?

## Auditability Concern

What would need to be logged or inspected after an alert or harmful decision?

## Hardware or Lifecycle Concern

What could go wrong during failure, repair, transfer, update, or disposal?

## Governance Recommendation

What rules, safeguards, user controls, audits, or limits should be required?
```

## Exit Ticket

Individually, answer:

1. What is one way memory is physical rather than purely abstract?
2. Why might hardware-level learning make deletion or audit more difficult?
3. What is one question you would ask before trusting a device that learns and remembers your patterns over time?
