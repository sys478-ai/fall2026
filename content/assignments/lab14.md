---
title: 'Hardware Governance Lab'
num: '14'
type: 'lab'
draft: 0
---

How to govern AI systems when learning, sensing, and decision-making are built into devices.

## Overview

Many AI governance discussions focus on software: datasets, models, platforms, interfaces, and cloud systems. But some AI systems are also deeply shaped by hardware. They may run on specialized chips, sensors, embedded devices, wearables, vehicles, cameras, robots, or edge systems.

Hardware changes governance.

If a system learns or adapts on-device, it may be harder to inspect. If a system makes decisions locally, it may be harder to know what happened after the fact. If a system is energy-efficient and cheap to deploy, it may become easier to install in many places. If a system is built into physical infrastructure, replacing, updating, repairing, or disabling it may be difficult.

In this lab, you will analyze governance questions for hardware-level AI systems. You will focus on patching, logging, auditing, lifecycle management, user control, and accountability.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain why hardware-level AI systems raise governance questions beyond software alone.
- Analyze how hardware affects auditability, repairability, updateability, and accountability.
- Identify risks related to logging, patching, failure, transfer, and end-of-life disposal.
- Evaluate who has power over hardware systems after deployment.
- Develop governance recommendations for a hardware-level anomaly detection system.
- Connect hardware governance to neuromorphic computing, edge AI, and anticipatory governance.

## Key Terms

| Term                | Working Definition                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Hardware governance | Rules, practices, and accountability structures for physical computing systems, devices, chips, sensors, and infrastructure. |
| Embedded system     | A computing system built into a device or environment for a specific function.                                               |
| Patch               | A software or firmware update that fixes a problem, improves performance, or changes behavior.                               |
| Firmware            | Low-level software that controls hardware behavior.                                                                          |
| Audit               | A structured review of system behavior, design, records, or outcomes.                                                        |
| Log                 | A record of system events, decisions, alerts, updates, or errors.                                                            |
| Lifecycle           | The full life of a device, including design, manufacturing, deployment, maintenance, repair, transfer, and disposal.         |
| Repairability       | The ability to diagnose, fix, update, or replace parts of a system.                                                          |
| Immutability        | Difficulty changing a system after it is built or deployed.                                                                  |
| Kill switch         | A mechanism for disabling a system or function in an emergency.                                                              |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Think of a device you own that makes decisions automatically. Who controls it after you buy it? You, the manufacturer, the software provider, the institution that requires it, or someone else?

Write 4–6 sentences.

Consider examples such as:

- a smartphone
- a car
- a smart thermostat
- a smartwatch
- a medical device
- a home security camera
- a router
- a smart speaker
- a fitness tracker
- a school-issued laptop

## Part 2: Why Hardware Governance?

Review the following claim:

> When AI is built into hardware, governance must address not only what the system decides, but also where it runs, how it is updated, what it logs, who can inspect it, who can repair it, and what happens when it fails.

Discuss:

- What governance questions are mostly about software?
- What governance questions are mostly about hardware?
- What questions involve both?
- Why might hardware be harder to change than software?
- Why might hardware be harder to inspect than software?

Write your group’s response:

## Part 3: Scenario

A hospital is considering a neuromorphic edge device for patient monitoring.

The device is placed in patient rooms and uses local sensors to detect unusual physiological or movement patterns. It is designed to identify possible falls, distress, abnormal sleep patterns, or other health anomalies.

The company claims the device:

- runs locally
- uses very little power
- detects anomalies quickly
- learns each patient’s baseline over time
- sends alerts to nurses only when needed
- does not stream continuous video or audio to the cloud

The hospital is interested because the device may reduce staff workload and improve patient safety.

Your task is to evaluate what governance safeguards would be needed before deployment.

## Part 4: System Inventory

Complete the table.

| System Question                       | Group Response |
| ------------------------------------- | -------------- |
| What does the device sense?           |                |
| What does the device store?           |                |
| What does the device learn over time? |                |
| What data stays on the device?        |                |
| What data leaves the device?          |                |
| Who receives alerts?                  |                |
| What action follows an alert?         |                |
| Who maintains the device?             |                |
| Who can update or patch it?           |                |
| Who can turn it off?                  |                |

## Part 5: Logs and Evidence

If the device sends an alert, the hospital may need to understand why.

Complete the table.

| Event or Decision            | Should It Be Logged? | Why or Why Not? | Who Should Access the Log? |
| ---------------------------- | -------------------- | --------------- | -------------------------- |
| Sensor readings before alert |                      |                 |                            |
| Learned patient baseline     |                      |                 |                            |
| Anomaly score                |                      |                 |                            |
| Threshold used               |                      |                 |                            |
| Alert time                   |                      |                 |                            |
| Who received the alert       |                      |                 |                            |
| What action was taken        |                      |                 |                            |
| Whether alert was confirmed  |                      |                 |                            |
| Device updates or patches    |                      |                 |                            |
| Device errors or failures    |                      |                 |                            |

Discuss:

- What logs are necessary for accountability?
- What logs create privacy risks?
- What logs should be temporary?
- What logs should be protected?
- What happens if the system is too energy-constrained to log everything?

## Part 6: Patching and Updating

Hardware-level AI systems may need updates.

Updates might:

- fix bugs
- improve accuracy
- change thresholds
- change what is sensed
- change how alerts are generated
- reset learned baselines
- add new features
- address security vulnerabilities

Complete the table.

| Update Question                                         | Group Response |
| ------------------------------------------------------- | -------------- |
| Who is allowed to update the device?                    |                |
| Should updates happen automatically?                    |                |
| Should the hospital approve updates?                    |                |
| Should patients be notified of updates?                 |                |
| Should old versions be preserved for audit?             |                |
| Can updates be rolled back?                             |                |
| What happens if an update changes false positive rates? |                |
| What happens if an update introduces new risk?          |                |

Discuss:

- When are automatic updates helpful?
- When are automatic updates risky?
- Who should be responsible if an update causes harm?
- What should be tested before deployment?

## Part 7: Failure Modes

Physical devices can fail in ways that software-only systems may not.

Choose at least four failure modes and analyze them.

| Failure Mode                     | Possible Consequence | Who Could Be Harmed? | Safeguard |
| -------------------------------- | -------------------- | -------------------- | --------- |
| Sensor drift                     |                      |                      |           |
| Battery or power failure         |                      |                      |           |
| Network outage                   |                      |                      |           |
| Hardware damage                  |                      |                      |           |
| Overheating                      |                      |                      |           |
| Model update error               |                      |                      |           |
| Learned baseline corruption      |                      |                      |           |
| Device assigned to wrong patient |                      |                      |           |
| Alert system disconnected        |                      |                      |           |
| Malicious tampering              |                      |                      |           |

## Part 8: Repair, Replacement, and Transfer

A hardware system has a lifecycle.

Discuss what should happen in each situation.

| Situation                               | Governance Question                                  | Group Response |
| --------------------------------------- | ---------------------------------------------------- | -------------- |
| Device is repaired                      | Should learned data remain on the device?            |                |
| Device is replaced                      | Should the baseline transfer to the new device?      |                |
| Device is reassigned to another patient | How should prior state be erased?                    |                |
| Device is returned to vendor            | What data or learned state could leave the hospital? |                |
| Device is sold or discarded             | How should memory be wiped or destroyed?             |                |
| Device stops receiving updates          | Should it remain in use?                             |                |
| Manufacturer goes out of business       | Who maintains the system?                            |                |
| Device is found to be unsafe            | Who can disable it?                                  |                |

Discuss:

- Who owns the learned state?
- Is the learned baseline part of the patient record?
- Is it part of the device?
- Is it the manufacturer’s data?
- What should happen when care ends?

## Part 9: Human Oversight and Kill Switches

Some hardware-level AI systems may act quickly.

In the hospital scenario, the device might:

- send a nurse alert
- notify a physician
- activate a room alarm
- log an event in the patient record
- contact a caregiver
- escalate to emergency response

Complete the table.

| Possible Action            | Fully Automated? | Requires Human Review? | Should Be Prohibited? | Why? |
| -------------------------- | ---------------- | ---------------------- | --------------------- | ---- |
| Log anomaly locally        |                  |                        |                       |      |
| Alert nurse                |                  |                        |                       |      |
| Alert family caregiver     |                  |                        |                       |      |
| Update patient record      |                  |                        |                       |      |
| Trigger room alarm         |                  |                        |                       |      |
| Contact emergency services |                  |                        |                       |      |
| Adjust patient risk score  |                  |                        |                       |      |
| Share data with insurer    |                  |                        |                       |      |

Discuss:

- Which actions are low-stakes?
- Which actions are high-stakes?
- Which actions require human review?
- Who can override the device?
- Who can disable the system in an emergency?

## Part 10: Security and Misuse

Hardware-level systems can be misused or attacked.

Discuss the following questions.

| Security or Misuse Question                                        | Group Response |
| ------------------------------------------------------------------ | -------------- |
| Could the device be hacked?                                        |                |
| Could someone spoof normal behavior?                               |                |
| Could someone trigger false alerts?                                |                |
| Could the device be repurposed for surveillance?                   |                |
| Could learned baselines reveal sensitive health patterns?          |                |
| Could the vendor use device data for product development?          |                |
| Could hospitals use the device to reduce staffing in harmful ways? |                |
| Could insurers or employers seek access to device outputs?         |                |

## Part 11: Power and Procurement

Hardware systems often create long-term dependencies.

Complete the table.

| Procurement Question                           | Why It Matters                  | Group Response |
| ---------------------------------------------- | ------------------------------- | -------------- |
| Who owns the hardware?                         | Control and responsibility      |                |
| Who owns the software or firmware?             | Update and access rights        |                |
| Who owns the learned data or baseline?         | Privacy and reuse               |                |
| Can the hospital switch vendors?               | Dependency and lock-in          |                |
| Can independent auditors inspect the system?   | Accountability                  |                |
| Are repair tools available?                    | Maintenance and right to repair |                |
| Are technical specifications public?           | Transparency                    |                |
| Are there environmental disposal requirements? | Sustainability                  |                |

Discuss:

- Who gains power through this system?
- Who becomes dependent?
- What should be required before a hospital purchases the system?
- What contractual terms should be non-negotiable?

## Part 12: Social and Ethical Questions

Discuss:

- Should patients be told that hardware-level AI is monitoring them?
- Should patients be able to opt out?
- Should patients be able to see what the device learned about them?
- Should the system be allowed to adapt to each patient?
- Should learned state be deleted after discharge?
- Should hospitals be allowed to deploy systems they cannot fully audit?
- Should vendors be required to provide repair and audit access?
- Should low-power systems face special scrutiny if they make monitoring easier to scale?

## Part 13: Technical Translation

This lab illustrates several hardware governance ideas.

| Lab Activity                       | Technical or Governance Analogue     |
| ---------------------------------- | ------------------------------------ |
| Identifying what the device senses | Sensor governance                    |
| Asking what the device stores      | Hardware memory governance           |
| Asking what gets logged            | Traceability and auditability        |
| Asking who can patch               | Lifecycle accountability             |
| Asking what happens after failure  | Reliability and safety governance    |
| Asking who can disable the system  | Human control and emergency override |
| Asking what happens during repair  | Right to repair and data protection  |
| Asking who owns the learned state  | Data ownership and model governance  |
| Asking about vendor lock-in        | Procurement governance               |

Key takeaway:

> Hardware governance asks not only whether an AI system works, but whether it can be inspected, repaired, updated, disabled, audited, transferred, and responsibly retired.

## Part 14: Connection to BRAID

BRAID raises hardware governance questions because the technology involves neuromorphic systems for efficient, on-chip anomaly detection.

This means:

- sensing may happen locally
- learning may happen in hardware
- anomaly detection may happen quickly
- decision traces may be difficult to reconstruct
- updates may not work like ordinary software updates
- energy efficiency may enable wider deployment
- edge devices may collect or infer sensitive patterns
- hardware state may encode learned information
- post-deployment behavior may change over time

These features make governance questions urgent:

- What should be logged?
- Who can audit the chip?
- Can the system be safely patched?
- Can learned state be reset?
- Can a decision be challenged?
- Can the device be disabled?
- Who is accountable for harm?
- What uses should be prohibited?

## Part 15: Governance Review

Your group has been asked to write a governance checklist for the hospital before it purchases the neuromorphic monitoring device.

Complete the table.

| Governance Requirement                 | Required? | Why? |
| -------------------------------------- | --------- | ---- |
| Patient notice                         |           |      |
| Patient opt-out                        |           |      |
| Data minimization                      |           |      |
| Local-only processing by default       |           |      |
| Protected audit logs                   |           |      |
| Human review before high-stakes action |           |      |
| Vendor documentation                   |           |      |
| Independent audit access               |           |      |
| Patch and rollback plan                |           |      |
| Device reset process                   |           |      |
| Repair and replacement protocol        |           |      |
| End-of-life disposal plan              |           |      |
| Security testing                       |           |      |
| Bias and error monitoring              |           |      |
| Emergency kill switch                  |           |      |
| Prohibition on insurer/employer access |           |      |

## Deliverable: Hardware Governance Checklist and Memo

Submit a short memo with a governance checklist for the hospital.

Your memo should include:

1. The system’s purpose.
2. The most important hardware governance risks.
3. Five required safeguards.
4. One logging requirement.
5. One patching or update requirement.
6. One repair, transfer, or disposal requirement.
7. One accountability requirement.
8. A final recommendation.

## Suggested Memo Format

```markdown
# Hardware Governance Checklist and Memo

## System Purpose

What is the device supposed to detect or support?

## Hardware Governance Risks

What risks arise because this system is embedded in hardware?

## Required Safeguards

List at least five safeguards the hospital should require before deployment.

## Logging Requirement

What must be logged for accountability?
Who may access the logs?

## Patch and Update Requirement

How should updates be approved, tested, documented, and rolled back?

## Repair, Transfer, or Disposal Requirement

What should happen when the device is repaired, reassigned, returned, or discarded?

## Accountability Requirement

Who is responsible if the system fails, cannot be audited, or causes harm?

## Final Recommendation

Should the hospital purchase and deploy the system as proposed, require redesign, run a limited pilot, or reject it?
Explain your reasoning.
```

## Exit Ticket

Individually, answer:

1. What is one governance question that becomes more important when AI is built into hardware?
2. Why might logging be both necessary and risky?
3. What is one safeguard you would require before deploying a hardware-level anomaly detection system?
