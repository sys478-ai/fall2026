---
title: 'BRAID Anticipatory Governance Lab'
num: '10'
type: 'lab'
draft: 0
status: unverified
status_reviewer:
status_date:
status_notes:
priority: medium
---

How to analyze an emerging AI technology before its impacts are fully known.

## Overview

Most of the labs in this course have focused on specific technical and social concepts: classification, training data, features, thresholds, historical data, opacity, measurement, anomaly detection, and edge AI.

In this lab, you will bring those ideas together through a case study based on the BRAID project: cerebellum-inspired neuromorphic computing for efficient, hardware-level anomaly detection.

This technology is still emerging. That means we cannot simply wait and study its impacts after it is widely deployed. Instead, we need forms of **anticipatory governance**: structured ways of asking what the technology might do, where it might be used, who might benefit, who might be harmed, what safeguards might be needed, and whether some uses should be limited or rejected.

The goal of this lab is not to predict the future perfectly. The goal is to practice asking better questions before a technology becomes entrenched.

## Core Learning Goals

By the end of this lab, you should be able to:

- Identify how technical features of an emerging AI system create governance questions.
- Analyze how a proposed system might affect different stakeholders.
- Explain how anomaly detection raises questions about normality, error, and accountability.
- Evaluate possible safeguards, limits, redesigns, or alternatives.
- Develop a governance recommendation for one possible use case.

## Key Terms

| Term                    | Working Definition                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Anticipatory governance | A way of analyzing emerging technologies before their impacts are fully known, with attention to possible futures, risks, benefits, and public values. |
| Neuromorphic computing  | Computing systems inspired by structures or processes found in biological nervous systems.                                                             |
| Spiking neural network  | A neural network that communicates through spike-like events over time.                                                                                |
| Anomaly detection       | Identifying patterns that differ from what a system has learned to expect.                                                                             |
| Edge AI                 | AI that runs on or near the device where data is collected.                                                                                            |
| On-chip learning        | Learning or adaptation that happens directly in hardware rather than only in cloud software.                                                           |
| Explainability          | The ability to understand why a system produced a particular output or recommendation.                                                                 |
| Auditability            | The ability to inspect, trace, verify, or reconstruct what a system did, including how it changed over time.                                           |
| Stakeholder             | A person, group, institution, or community affected by a technology or involved in its design, deployment, governance, or use.                         |
| Misuse                  | A harmful, coercive, deceptive, or unintended use of a technology.                                                                                     |
| Governance              | The rules, practices, institutions, and accountability structures that shape how technology is designed, deployed, limited, or refused.                |

---

## Part 1: Case Study Background

The BRAID project explores neuromorphic computing systems inspired by the cerebellum.

For the purposes of this lab, focus on the following simplified description:

> Researchers are developing a low-power, brain-inspired hardware system that can detect anomalies quickly and efficiently. The system may be able to process signals locally, detect unexpected patterns, and adapt over time.

Possible applications include:

- cybersecurity
- health monitoring
- autonomous vehicles
- robotics
- manufacturing safety
- smart homes
- elder-care monitoring
- infrastructure monitoring
- defense or security systems

Possible concerns include:

- false positives
- false negatives
- surveillance
- explainability
- auditability
- accountability
- bias
- privacy
- misuse
- environmental impact
- power concentration
- difficulty auditing hardware-level learning

---


Complete the required core first. Use the optional extensions only if they help your group deepen the analysis.


## [Requied] Part 2: What Technical Features Matter?

Review the technical features below. For each feature, identify one possible benefit and one governance concern.

| Technical Feature                     | Possible Benefit | Governance Concern |
| ------------------------------------- | ---------------- | ------------------ |
| Low-power operation                   |                  |                    |
| Fast anomaly detection                |                  |                    |
| On-device or edge processing          |                  |                    |
| On-chip learning or adaptation        |                  |                    |
| Spiking/event-driven behavior         |                  |                    |
| Hardware-level implementation         |                  |                    |
| Ability to detect unfamiliar patterns |                  |                    |
| Potential use in high-stakes settings |                  |                    |

After completing the table, choose **two technical features** that seem especially important for governance.

For each one, answer:

- Why does this feature matter?
- What new capability does it create?
- What concern does it raise?
- Who might benefit?
- Who might be affected or put at risk?

---

## [Requied] Part 3: Choose a Use Case

Your group will choose one use case for deeper analysis.

Select one:

- **Cybersecurity:** A neuromorphic chip detects unusual network traffic and blocks suspected attacks.
- **Health monitoring:** A wearable device detects unusual physiological patterns and alerts caregivers.
- **Autonomous vehicles:** A vehicle system detects unexpected road hazards and triggers rapid action.
- **Factory safety:** A sensor detects unusual machine vibration and shuts down equipment.
- **Elder-care monitoring:** A home system detects unusual movement patterns and alerts family or care staff.
- **Public space monitoring:** A system detects unusual behavior in public areas and alerts security.
- **Classroom analytics:** A system detects unusual student behavior or disengagement.
- **Military or defense:** A system detects unusual movement, signals, or targets in a conflict zone.

Write your chosen use case:

---

## [Requied] Part 4: What Is Being Proposed?

Complete the table for your chosen use case.

| Question                                                    | Group Response |
| ----------------------------------------------------------- | -------------- |
| What problem is the system supposed to solve?               |                |
| Who wants this system?                                      |                |
| Who would use it?                                           |                |
| Who would be monitored, measured, assisted, or affected?    |                |
| What counts as normal?                                      |                |
| What counts as anomalous?                                   |                |
| What happens when an anomaly is detected?                   |                |
| Is the system advisory, semi-automated, or fully automated? |                |

Then answer:

> What is the most important decision that would need to be made before this system is deployed?

---

## [Requied] Part 5: Who Is Involved?

Identify stakeholders affected by the system.

| Stakeholder                       | Role or Relationship to System | Possible Benefit | Possible Harm or Concern | Power Level |
| --------------------------------- | ------------------------------ | ---------------- | ------------------------ | ----------- |
| System developers                 |                                |                  |                          |             |
| Deploying institution             |                                |                  |                          |             |
| Direct users                      |                                |                  |                          |             |
| People being monitored            |                                |                  |                          |             |
| Regulators or auditors            |                                |                  |                          |             |
| Community members                 |                                |                  |                          |             |
| Vulnerable or marginalized groups |                                |                  |                          |             |
| Future users or affected people   |                                |                  |                          |             |

Use the following power levels:

- High
- Medium
- Low
- Unclear

Discuss:

- Who has the most control over the system?
- Who has the least control?
- Who is most likely to be harmed if the system fails?
- Who may be excluded from design or governance decisions?
- Who should be involved before deployment?

---

## [Requied] Part 6: What Could Go Right?

Identify two plausible benefits of this system in your chosen use case.

Try to describe the benefits in their strongest reasonable form. Do not assume the technology is bad. Ask what problem it might genuinely help address.

| Possible Benefit | Who Benefits? | What Technical Feature Enables This Benefit? | What Would Need to Be True for This Benefit to Happen? |
| ---------------- | ------------- | -------------------------------------------- | ----------------------------------------------------- |
|                  |               |                                              |                                                       |
|                  |               |                                              |                                                       |

---

## [Requied] Part 7: What Could Go Wrong — Even If It Works?

Some harms happen because systems fail. Other harms happen even when systems function as designed.

Identify two possible harms or concerns.

| Possible Harm or Concern | Who Could Be Harmed? | What Technical Feature Contributes to the Concern? | Why Could This Happen Even If the System Works? |
| ------------------------ | -------------------- | -------------------------------------------------- | ---------------------------------------------- |
|                          |                      |                                                    |                                                |
|                          |                      |                                                    |                                                |

As you answer, consider:

- Could normal behavior be misread as anomalous?
- Could rare but legitimate behavior be flagged?
- Could the system make surveillance easier to justify?
- Could the system be difficult to audit?
- Could low-power operation make the system easier to deploy at scale?
- Could some groups bear more risk than others?

---

## [Requied] Part 8: What Governance Questions Emerge?

Look back at your answers so far. Which concerns appeared more than once?

You may use the following BRAID governance lenses to organize your thinking.

### 1. Normality

If the system detects anomalies, who defines what counts as normal, unusual, or dangerous?

Consider:

- Who sets the baseline?
- Who sets the threshold for “anomalous enough”?
- Are rare but legitimate behaviors likely to be flagged?
- What happens if the system is too sensitive?
- What happens if it misses something important?

### 2. Auditability

If learning happens in hardware or on-device, can the system’s behavior be traced, reviewed, or challenged?

Consider:

- What should be logged?
- Who can inspect the system?
- Can someone reconstruct why something was flagged?
- Can learning be paused, reset, or reviewed?
- Can affected people challenge the result?

### 3. Privacy and Surveillance

If processing happens at the edge, does that protect people or make monitoring easier to justify?

Consider:

- What data stays on the device?
- What data, alerts, summaries, or learned patterns leave the device?
- What sensitive behavior could still be inferred?
- Does “on-device” processing make the system easier to deploy in sensitive spaces?
- Who receives alerts or summaries?

### 4. Efficiency and Scale

If the system is faster and more energy-efficient, where might it spread, who benefits, and who bears the costs?

Consider:

- Who benefits from lower power use?
- Does energy efficiency make this use socially valuable?
- Could efficiency make harmful monitoring cheaper or easier to scale?
- What material, manufacturing, or e-waste costs still matter?
- Does specialized hardware concentrate power among particular institutions or vendors?

Choose **two governance questions** that seem most important for your use case.

| Governance Question | Why It Matters | Who Is Most Affected? | What Safeguard, Limit, Redesign, or Alternative Should Be Considered? |
| ------------------- | -------------- | --------------------- | -------------------------------------------------------------------- |
|                     |                |                       |                                                                      |
|                     |                |                       |                                                                      |

---

## [Requied] Part 9: What Else Could Address the Problem?

Anticipatory governance is not only about asking whether a proposed system should be regulated. It also asks whether the same problem could be addressed differently.

For your use case, answer:

| Question | Group Response |
| -------- | -------------- |
| What problem is the system supposed to solve? | |
| Could the problem be addressed with a non-AI, lower-tech, policy-based, or human-centered alternative? | |
| What would be gained by choosing that alternative? | |
| What would be lost? | |
| Would the alternative reduce any of the risks you identified? | |

---

## [Requied] Part 10: Final Recommendation

Your group must recommend one of the following:

- **Use as proposed**
- **Use only with safeguards**
- **Redesign before use**
- **Limit to low-stakes contexts**
- **Prohibit in this context**
- **Do not deploy until more evidence is available**

Complete the table.

| Recommendation Question                     | Group Response |
| ------------------------------------------- | -------------- |
| What is your recommendation?                |                |
| What is your strongest reason?              |                |
| What is the biggest unresolved uncertainty? |                |
| What safeguards are required?               |                |
| Who must be involved before deployment?     |                |
| What evidence would change your mind?       |                |

---

Use these only if time allows or if they help your group deepen your final recommendation.

---

## Optional Extension A: Earlier Course Concepts

Use concepts from earlier labs to analyze your chosen system.

| Course Concept    | Question                                                    | Group Response |
| ----------------- | ----------------------------------------------------------- | -------------- |
| Classification    | What labels or categories does the system produce?          |                |
| Training data     | What examples or baselines teach the system what to expect? |                |
| Features          | What signals or variables does the system use?              |                |
| Thresholds        | How different is different enough to trigger an alert?      |                |
| Historical data   | Could past patterns reproduce existing inequalities?        |                |
| Opacity           | Can people understand why an anomaly was flagged?           |                |
| Sensors           | What can the system measure, and what does it miss?         |                |
| Edge AI           | What happens locally, and what leaves the device?           |                |
| Anomaly detection | Who defines normal and anomalous?                           |                |

---

## Optional Extension B: False Positives and False Negatives

Anomaly detection systems can make different kinds of mistakes.

Complete the table for your use case.

| Error Type     | Example in This Use Case | Who Could Be Harmed? | How Serious Is the Harm? |
| -------------- | ------------------------ | -------------------- | ------------------------ |
| False positive |                          |                      |                          |
| False negative |                          |                      |                          |

Discuss:

- Which error is more serious in this context?
- Could the seriousness vary across groups?
- Who decides how to balance these errors?
- What happens if the system is too sensitive?
- What happens if the system is not sensitive enough?

---

## Optional Extension C: Auditability and Contestability

A person or institution may need to understand why the system flagged an anomaly or verify what happened after the fact.

Complete the table.

| Question                                               | Group Response |
| ------------------------------------------------------ | -------------- |
| What explanation would an affected person need?        |                |
| What trace or evidence would a technical auditor need? |                |
| What documentation would a regulator need?             |                |
| What record would the deploying institution need?      |                |
| What should be logged?                                 |                |
| Who can inspect the logs?                              |                |
| Who can challenge or appeal an anomaly label?          |                |
| What happens if the system cannot explain or reconstruct its output? | |

---

## Optional Extension D: Misuse and Dual Use

Emerging technologies can be used in ways different from their original purpose.

Discuss possible misuse scenarios.

| Misuse Question                                                       | Group Response |
| --------------------------------------------------------------------- | -------------- |
| How could this system be used for surveillance?                       |                |
| How could it be used to control or discipline people?                 |                |
| How could it be used in policing, military, or border contexts?       |                |
| How could it be used by employers, insurers, landlords, or platforms? |                |
| Could it make harmful monitoring cheaper or easier to scale?          |                |
| Could it be hacked, spoofed, or manipulated?                          |                |
| What safeguards would reduce misuse?                                  |                |
| Are there uses that should be prohibited?                             |                |

---

## Optional Extension E: Governance Options

Not every technology should be governed the same way.

For your use case, evaluate the following options.

| Governance Option                     | Would This Help? | Limits or Concerns |
| ------------------------------------- | ---------------- | ------------------ |
| Clear documentation                   |                  |                    |
| Human review before action            |                  |                    |
| User notice and consent               |                  |                    |
| Right to appeal or challenge          |                  |                    |
| Independent audit                     |                  |                    |
| Bias and error testing across groups  |                  |                    |
| Data minimization                     |                  |                    |
| Logging requirements                  |                  |                    |
| Ability to update or patch the system |                  |                    |
| Environmental lifecycle assessment    |                  |                    |
| Use restrictions                      |                  |                    |
| Prohibition in certain contexts       |                  |                    |

---

## Optional Extension F: Anticipatory Scenarios

Create three possible futures for your use case.

### Scenario 1: Beneficial Use

Describe a future where the system works well and provides real social benefit.

### Scenario 2: Harmful Use

Describe a future where the system causes harm, reinforces inequality, or is misused.

### Scenario 3: Mixed or Ambiguous Use

Describe a future where the system creates both benefits and harms, or where the consequences are difficult to evaluate.

Now answer:

| Question                                                        | Group Response |
| --------------------------------------------------------------- | -------------- |
| What choices lead to the beneficial scenario?                   |                |
| What choices lead to the harmful scenario?                      |                |
| What early warning signs should be monitored?                   |                |
| What safeguards would make the beneficial scenario more likely? |                |

---

## Connection to Anticipatory Governance

Anticipatory governance does not ask only:

> What can this technology do?

It also asks:

- Who is shaping it?
- What futures does it make more likely?
- What harms can be anticipated?
- Who might be excluded from decision-making?
- What should be built, limited, redesigned, or refused?
- What governance structures are needed before deployment?

Key takeaway:

> Emerging technologies should not be evaluated only after they are already widespread. Anticipatory governance creates space to ask what futures we are building, who gets a voice, and what limits should guide technical development.

---

## Deliverable: BRAID Anticipatory Governance Memo

Submit a short memo evaluating your chosen use case.

Your memo should include:

1. The chosen use case.
2. The system’s purpose.
3. The technical features that matter most.
4. The main stakeholders.
5. One plausible benefit.
6. One plausible harm, misuse, or failure mode.
7. Two important governance questions.
8. Required safeguards, limits, redesigns, or alternatives.
9. A final governance recommendation.

## Suggested Memo Format

```markdown
# BRAID Anticipatory Governance Memo

## Use Case

Which use case did your group analyze?

## System Purpose

What is the system supposed to detect or support?

## Technical Features

Which technical features matter most for governance?

Consider edge processing, anomaly detection, on-chip learning, hardware implementation, speed, energy efficiency, and opacity.

## Stakeholders

Who benefits?
Who could be harmed?
Who has power?
Who has little control?
Who should be involved before deployment?

## What Could Go Right?

Describe one plausible benefit.

Who benefits?
What would need to be true for this benefit to happen?

## What Could Go Wrong — Even If It Works?

Describe one plausible harm, misuse, or failure mode.

Who could be harmed?
Which technical feature contributes to the concern?

## Governance Questions

Choose two governance questions that matter most for your use case.

You may use these lenses:

- Normality
- Auditability
- Privacy and surveillance
- Efficiency and scale

For each question, explain why it matters and who is affected.

## Safeguards, Limits, Redesigns, or Alternatives

What should be required before deployment?
What should be limited?
What should be redesigned?
What alternative should be considered?

## Final Recommendation

Should the system be used as proposed, used only with safeguards, redesigned, limited, prohibited in this context, or delayed until more evidence is available?

Explain your reasoning.
```