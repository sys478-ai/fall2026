---
title: 'Edge AI, Privacy, and Accountability'
num: '9'
date: '2026-11-04'
type: 'lab'
due_date: '2026-11-11'
draft: 0
---

How on-device AI changes what is sensed, stored, shared, explained, and governed.

## Overview

Not all AI systems run in the cloud. Some AI systems run locally on a device: a phone, car, wearable, camera, smart speaker, factory sensor, medical device, drone, or security system. This is often called **edge AI** or **on-device AI**.

Edge AI can have real benefits. It can reduce latency, work without constant internet access, keep some data closer to the user, and reduce the need to send raw data to centralized servers.

> But edge AI also raises difficult social and ethical questions:
>
> 1. If a system makes decisions locally, who can audit it?
> 1. What data is stored? What data leaves the device?
> 1. Can users understand or challenge the result? What happens if the system learns or changes after deployment?
> 1. Does local processing increase privacy, or does it make surveillance easier to install everywhere?

In this lab, you will compare cloud-based and on-device AI systems, analyze data flows, and develop governance recommendations for edge AI systems.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain the difference between cloud-based AI and edge/on-device AI.
- Identify potential benefits and risks of local AI processing.
- Map what data is sensed, stored, processed, shared, and acted upon.
- Analyze privacy, accountability, security, and oversight tradeoffs.
- Evaluate whether edge AI makes a system more or less governable.
- Connect edge AI to anomaly detection, neuromorphic hardware, and anticipatory governance.

## Key Terms

| Term                 | Working Definition                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Edge AI              | AI that runs on or near the device where data is collected, rather than only in a centralized cloud system. |
| On-device processing | Processing data locally on a device such as a phone, sensor, car, camera, or wearable.                      |
| Cloud processing     | Sending data to remote servers for storage, analysis, or decision-making.                                   |
| Latency              | Delay between input and response. Lower latency means faster response.                                      |
| Data minimization    | Collecting, storing, and sharing only the data necessary for a specific purpose.                            |
| Auditability         | The ability to inspect, evaluate, or reconstruct how a system behaved.                                      |
| Accountability       | The ability to identify who is responsible for system design, deployment, oversight, and harm.              |
| Local inference      | Producing a model output directly on a device.                                                              |
| Data flow            | The path data takes through sensing, processing, storage, sharing, and action.                              |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Would you rather have a smart device process sensitive data locally on the device, or send that data to the cloud for processing? What makes the choice complicated?

Write 4–6 sentences.

Consider examples such as:

- a smart speaker
- a health wearable
- a baby monitor
- a home security camera
- a car with driver-assist features
- a classroom attention system
- a workplace productivity tracker
- a medical alert device

## Part 2: Cloud AI vs. Edge AI

Review the two simplified system designs.

### System A: Cloud-Based AI

1. A device senses data.
2. The device sends raw or partially processed data to a cloud server.
3. The cloud server runs the AI model.
4. The cloud server stores some data and logs.
5. The cloud server sends a decision or alert back to the device or institution.

### System B: Edge AI

1. A device senses data.
2. The device runs the AI model locally.
3. The device may store some data locally.
4. The device may send only alerts, summaries, or logs to the cloud.
5. The device may trigger action immediately.

Complete the comparison table.

| Question                               | Cloud-Based AI | Edge AI |
| -------------------------------------- | -------------- | ------- |
| Where is raw data processed?           |                |         |
| Where might data be stored?            |                |         |
| Who might be able to inspect logs?     |                |         |
| What happens if internet access fails? |                |         |
| Which system may respond faster?       |                |         |
| Which system may expose more raw data? |                |         |
| Which system may be easier to update?  |                |         |
| Which system may be harder to audit?   |                |         |

## Part 3: Scenario

A company is developing an edge AI health-monitoring patch for older adults living independently.

The patch can sense:

- heart rate
- skin temperature
- movement patterns
- sleep patterns
- possible falls
- unusual inactivity

The company says the device can detect possible health anomalies and notify a caregiver, doctor, or emergency service.

The company is considering two designs.

### Design A: Cloud Processing

The patch sends continuous sensor data to the company’s servers. The servers analyze the data and send alerts.

### Design B: On-Device Processing

The patch analyzes sensor data locally. It sends only alerts and short summaries unless the user or caregiver requests more detail.

Your task is to analyze the privacy and accountability tradeoffs.

## Part 4: Data Flow Map

For each design, complete the data flow map.

### Design A: Cloud Processing

| Stage             | What Happens? | Who Has Access? | Risk or Concern |
| ----------------- | ------------- | --------------- | --------------- |
| Sensing           |               |                 |                 |
| Local processing  |               |                 |                 |
| Data transmission |               |                 |                 |
| Cloud processing  |               |                 |                 |
| Storage           |               |                 |                 |
| Alert or action   |               |                 |                 |
| Review or appeal  |               |                 |                 |

### Design B: On-Device Processing

| Stage             | What Happens? | Who Has Access? | Risk or Concern |
| ----------------- | ------------- | --------------- | --------------- |
| Sensing           |               |                 |                 |
| Local processing  |               |                 |                 |
| Data transmission |               |                 |                 |
| Cloud processing  |               |                 |                 |
| Storage           |               |                 |                 |
| Alert or action   |               |                 |                 |
| Review or appeal  |               |                 |                 |

## Part 5: Privacy Tradeoffs

Edge AI is often described as more privacy-preserving because raw data may not need to leave the device. But privacy depends on the full system design.

Discuss each question.

| Privacy Question                                                                | Group Response |
| ------------------------------------------------------------------------------- | -------------- |
| What raw data does the device collect?                                          |                |
| What data stays on the device?                                                  |                |
| What data leaves the device?                                                    |                |
| Are alerts or summaries still sensitive?                                        |                |
| Could alerts reveal health status, routines, location, disability, or behavior? |                |
| Who receives alerts?                                                            |                |
| Can the user control who receives information?                                  |                |
| Can the user delete data?                                                       |                |
| Can the user opt out of some forms of sensing?                                  |                |

## Part 6: Accountability Tradeoffs

Local processing can make a system faster and potentially more private. But it may also make decisions harder to inspect.

Complete the table.

| Accountability Question                  | Why It Matters                       | Group Response |
| ---------------------------------------- | ------------------------------------ | -------------- |
| Who designed the model?                  | Responsibility for system behavior   |                |
| Who deployed the device?                 | Responsibility for context of use    |                |
| Who maintains or updates the device?     | Responsibility over time             |                |
| What gets logged?                        | Ability to reconstruct what happened |                |
| Who can inspect the logs?                | Audit and oversight                  |                |
| Can the model be updated?                | Repair and improvement               |                |
| Can the model be rolled back?            | Recovery from harmful updates        |                |
| Can users challenge an alert?            | Contestability                       |                |
| Who is responsible if an alert is wrong? | Accountability for harm              |                |

## Part 7: False Alarms and Missed Events

The device detects possible health anomalies.

Choose two possible errors and analyze their consequences.

| Error Type     | Example | Who Could Be Harmed? | How Serious Is the Harm? |
| -------------- | ------- | -------------------- | ------------------------ |
| False positive |         |                      |                          |
| False negative |         |                      |                          |

Discuss:

- What happens if the device alerts caregivers too often?
- What happens if caregivers stop trusting the alerts?
- What happens if the device misses a real emergency?
- What happens if the alert goes to the wrong person?
- What happens if emergency services are called unnecessarily?
- What happens if the user changes behavior because they feel monitored?

## Part 8: Context Shift

Edge AI appears in many domains.

For each context, identify one potential benefit and one governance concern.

| Context                     | Possible Benefit of Edge AI | Governance Concern |
| --------------------------- | --------------------------- | ------------------ |
| Smart home camera           |                             |                    |
| Classroom attention monitor |                             |                    |
| Autonomous vehicle          |                             |                    |
| Factory safety sensor       |                             |                    |
| Cybersecurity device        |                             |                    |
| Police body camera          |                             |                    |
| Wearable health tracker     |                             |                    |
| Elder-care monitor          |                             |                    |
| Drone navigation system     |                             |                    |
| Smartphone voice assistant  |                             |                    |

## Part 9: Edge AI and Surveillance

Local processing may reduce the need to transmit raw data. But cheap, fast, local AI may also make monitoring easier to deploy in more places.

Discuss:

- Does processing data locally always make a system less invasive?
- Could edge AI make surveillance cheaper or more widespread?
- Could organizations use “data stays on device” as a privacy claim while still collecting sensitive inferences?
- Are model outputs, alerts, or risk scores themselves sensitive data?
- What kinds of edge AI should require special oversight?
- Are there contexts where edge AI should not be deployed at all?

Write your group’s response:

## Part 10: Technical Translation

This lab illustrates several technical and governance ideas.

| Lab Activity                              | Technical or Governance Analogue    |
| ----------------------------------------- | ----------------------------------- |
| Comparing cloud and local processing      | System architecture analysis        |
| Mapping data flows                        | Privacy and security review         |
| Asking what leaves the device             | Data minimization                   |
| Asking what gets logged                   | Auditability                        |
| Asking who receives alerts                | Access control and governance       |
| Asking whether users can challenge alerts | Contestability                      |
| Asking who updates the model              | Lifecycle accountability            |
| Considering local alerts                  | Edge inference and automated action |
| Considering surveillance risk             | Deployment impact assessment        |

Key takeaway:

> Edge AI does not automatically solve privacy or accountability problems. It changes where data is processed, what is visible, who can inspect the system, and how quickly action can be taken.

## Part 11: Connection to Anomaly Detection

Edge AI is especially important for anomaly detection because many anomaly systems need to respond quickly.

Examples:

- a car detects a hazard
- a health monitor detects a fall
- a cybersecurity device detects unusual traffic
- a factory sensor detects machine failure
- a wearable detects an abnormal heart rhythm
- a smart home system detects unusual activity

In each case, the system may need to act before data can be sent to the cloud.

This creates tradeoffs:

| Edge Anomaly Detection Benefit | Governance Concern                       |
| ------------------------------ | ---------------------------------------- |
| Faster response                | Less time for human review               |
| Less raw data transmitted      | Sensitive inferences may still be shared |
| Works offline                  | Harder centralized oversight             |
| Lower latency                  | More automated action                    |
| Local adaptation               | Harder to know how the system changed    |
| Lower bandwidth needs          | Easier to deploy at scale                |

Discuss:

- When is fast local response necessary?
- When should fast local response be limited?
- What actions should never be fully automated?
- What logs are needed after an on-device anomaly alert?
- Who should be accountable if the device acts incorrectly?

## Part 12: Connection to BRAID

The BRAID project is concerned with neuromorphic hardware for efficient, on-chip anomaly detection.

That means some learning, sensing, classification, or anomaly detection may happen close to the device rather than only in a centralized cloud system.

This makes several governance questions especially important:

- What data is processed on-chip?
- What is stored, even temporarily?
- What leaves the device?
- Can the system explain why an anomaly was detected?
- Can the system be audited after deployment?
- Can the system be updated or patched?
- Who controls the device?
- Who is responsible if the system makes a harmful decision?
- Does low-power edge AI enable beneficial uses, harmful surveillance, or both?

## Part 13: Governance Review

Your group has been asked to advise whether the health-monitoring patch should use cloud processing, edge processing, or a hybrid design.

Complete the table.

| Governance Question                                    | Group Response |
| ------------------------------------------------------ | -------------- |
| Which design do you recommend: cloud, edge, or hybrid? |                |
| What data should stay on the device?                   |                |
| What data, if any, should leave the device?            |                |
| What should be logged?                                 |                |
| Who should receive alerts?                             |                |
| What should users be told?                             |                |
| What controls should users have?                       |                |
| What human review should be required?                  |                |
| What should happen after a false alarm?                |                |
| What should happen after a missed emergency?           |                |
| Who is accountable for harm?                           |                |

## Deliverable: Edge AI Governance Memo

Submit a short memo evaluating the health-monitoring patch.

Your memo should include:

1. The system’s purpose.
2. A recommendation: cloud, edge, or hybrid processing.
3. What data should stay on the device.
4. What data, if any, should leave the device.
5. One privacy concern.
6. One accountability concern.
7. One false positive or false negative harm.
8. A recommendation for human oversight, logging, and user control.

## Suggested Memo Format

```markdown
# Edge AI Governance Memo

## System Purpose

What is the system supposed to detect or support?

## Recommended Architecture

Do you recommend cloud processing, edge processing, or a hybrid design?
Why?

## Data Flow Recommendation

What data should stay on the device?
What data, if any, should leave the device?

## Privacy Concern

What sensitive information could be exposed, inferred, or misused?

## Accountability Concern

What would make this system difficult to audit, challenge, or govern?

## Error Harm

Describe one false positive or false negative harm.

## Oversight and User Control

What human review, logs, user controls, or appeal processes should be required?

## Final Recommendation

Should the system be used as proposed, redesigned, limited, or rejected?
Explain your reasoning.
```

## Exit Ticket

Individually, answer:

1. What is one reason edge AI might improve privacy?
2. What is one reason edge AI might make accountability harder?
3. What is one question you would ask before allowing an AI system to make decisions locally on a device?
