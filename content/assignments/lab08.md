---
title: 'Anomaly Detection and Normal'
scheduled_day: 16
num: '8'
type: 'lab'
draft: 0
---

How systems define “normal,” flag difference, and decide what deserves attention.

## Overview

Many AI systems are designed to detect anomalies. An anomaly is something that differs from what a system expects: an unusual login, an unexpected heart rhythm, a strange network request, a sudden machine vibration, an unfamiliar driving pattern, or a rare behavior in a public space.

Anomaly detection can be useful. It can help identify cyberattacks, equipment failures, medical emergencies, fraud, or safety risks.

But anomaly detection also raises difficult social and ethical questions. What counts as normal? Who gets to define normal? Is rare behavior necessarily risky? What happens when legitimate difference is treated as suspicious? What should happen after an anomaly is detected?

In this lab, you will examine how anomaly detection systems are built around assumptions about normality, risk, thresholds, and action. You will analyze several scenarios and decide when anomaly detection may be useful, when it may be harmful, and what safeguards should be required.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain what anomaly detection is.
- Distinguish between unusual, harmful, risky, unfamiliar, and meaningful behavior.
- Analyze how “normal” is defined by data, sensors, context, and institutional goals.
- Identify false positive and false negative harms in anomaly detection systems.
- Evaluate when anomaly detection should require human review, appeal, or prohibition.
- Connect anomaly detection to bias, surveillance, explainability, accountability, and governance.

## Key Terms

| Term              | Working Definition                                                                   |
| ----------------- | ------------------------------------------------------------------------------------ |
| Anomaly           | Something that differs from an expected, learned, or usual pattern.                  |
| Anomaly detection | A method for identifying examples that appear unusual compared to a baseline.        |
| Baseline          | The pattern or range of behavior treated as normal or expected.                      |
| Normality         | A constructed idea of what counts as ordinary, expected, acceptable, or typical.     |
| Outlier           | A data point that differs significantly from others.                                 |
| False positive    | A harmless or legitimate case incorrectly flagged as anomalous or risky.             |
| False negative    | A harmful or important case that the system fails to flag.                           |
| Threshold         | The cutoff point at which difference becomes significant enough to trigger an alert. |
| Context           | Additional information needed to interpret whether an anomaly matters.               |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Think of a time when something unusual was not actually a problem. Then think of a time when something unusual was an important warning sign.

Write 4–6 sentences.

Consider examples such as:

- a strange sound from a car
- an unusual bank charge
- a sudden change in mood
- a late-night email
- a fire alarm
- a login from a new location
- a medical symptom
- a person behaving differently than expected

## Part 2: What Does “Normal” Mean?

In groups, brainstorm different meanings of the word “normal.”

Complete the table.

| Meaning of Normal               | Example | Possible Problem |
| ------------------------------- | ------- | ---------------- |
| Statistically common            |         |                  |
| Socially expected               |         |                  |
| Healthy or safe                 |         |                  |
| Legally permitted               |         |                  |
| Institutionally preferred       |         |                  |
| Familiar to the system          |         |                  |
| Familiar to the people in power |         |                  |

Discuss:

- Which meanings of normal are descriptive?
- Which meanings of normal are judgmental?
- Which meanings of normal could be harmful if built into an AI system?

## Part 3: Scenario Set

For each scenario below, decide whether the behavior should be treated as:

- **Normal**
- **Unusual but harmless**
- **Potentially concerning**
- **Anomalous and urgent**
- **Need more context**
- **Should not be evaluated by an automated system**

| #   | Scenario                                                   | Classification | What Context Is Needed? |
| --- | ---------------------------------------------------------- | -------------- | ----------------------- |
| 1   | A student logs into an account from a different country.   |                |                         |
| 2   | A patient’s heart rate rises suddenly during the night.    |                |                         |
| 3   | A server receives thousands of requests in one minute.     |                |                         |
| 4   | A factory machine begins vibrating more than usual.        |                |                         |
| 5   | A car brakes suddenly on a sunny day.                      |                |                         |
| 6   | A shopper walks through a store without buying anything.   |                |                         |
| 7   | A student stops submitting assignments for two weeks.      |                |                         |
| 8   | A person circles a public building several times.          |                |                         |
| 9   | A child avoids eye contact during a classroom activity.    |                |                         |
| 10  | A person’s sleep pattern changes after starting a new job. |                |                         |
| 11  | A network device sends data to an unfamiliar address.      |                |                         |
| 12  | A worker’s productivity drops suddenly.                    |                |                         |

## Part 4: Normal, Unusual, Risky, Harmful

Choose four scenarios from Part 3.

For each scenario, distinguish between unusual, risky, and harmful.

| Scenario # | What Is Unusual? | Is It Necessarily Harmful? | What Would Make It Risky? | What Could Make It Harmless? |
| ---------- | ---------------- | -------------------------- | ------------------------- | ---------------------------- |
|            |                  |                            |                           |                              |
|            |                  |                            |                           |                              |
|            |                  |                            |                           |                              |
|            |                  |                            |                           |                              |

Key question:

> Is “different from normal” the same thing as “dangerous”?

## Part 5: Define the Baseline

Anomaly detection depends on a baseline: the pattern that counts as expected.

Imagine you are designing an anomaly detection system for one of the following contexts:

- cybersecurity
- student support
- health monitoring
- workplace safety
- autonomous driving
- public space monitoring
- elder-care support
- manufacturing equipment

Choose one context and complete the table.

| Design Question                                               | Group Response |
| ------------------------------------------------------------- | -------------- |
| What is the system supposed to detect?                        |                |
| What data or signals does it observe?                         |                |
| What counts as normal?                                        |                |
| Who defines normal?                                           |                |
| Whose behavior or conditions are represented in the baseline? |                |
| Whose behavior or conditions might be missing?                |                |
| How often should the baseline be updated?                     |                |
| What could go wrong if the baseline is wrong?                 |                |

## Part 6: Thresholds and Sensitivity

An anomaly detection system needs a threshold.

If the threshold is too sensitive, it may flag many harmless cases.

If the threshold is not sensitive enough, it may miss serious problems.

Complete the table.

| Context                             | Harm If Too Sensitive | Harm If Not Sensitive Enough |
| ----------------------------------- | --------------------- | ---------------------------- |
| Cybersecurity intrusion detection   |                       |                              |
| Health monitoring                   |                       |                              |
| Fraud detection                     |                       |                              |
| Student support                     |                       |                              |
| Workplace productivity monitoring   |                       |                              |
| Public surveillance                 |                       |                              |
| Autonomous vehicle hazard detection |                       |                              |
| Factory equipment monitoring        |                       |                              |

Discuss:

- In which contexts are false positives more harmful?
- In which contexts are false negatives more harmful?
- In which contexts are both extremely consequential?
- In which contexts should anomaly detection not be used?

## Part 7: False Positive and False Negative Analysis

Choose one context from Part 6.

Complete the table.

| Question                                       | Response |
| ---------------------------------------------- | -------- |
| What would count as a false positive?          |          |
| Who could be harmed by a false positive?       |          |
| What would count as a false negative?          |          |
| Who could be harmed by a false negative?       |          |
| Which error is more serious in this context?   |          |
| Who should decide how to balance these errors? |          |

## Part 8: Context Collapse

Anomaly detection systems often operate with limited context.

For each case, identify what the system might see and what it might miss.

| Case                                       | What the System Sees | What the System Might Miss |
| ------------------------------------------ | -------------------- | -------------------------- |
| A student logs in at 3:00 a.m.             |                      |                            |
| A person walks repeatedly past a building. |                      |                            |
| A patient’s heart rate increases.          |                      |                            |
| A worker’s keystrokes decrease.            |                      |                            |
| A child avoids eye contact.                |                      |                            |
| A car swerves suddenly.                    |                      |                            |
| A network sends unusual traffic.           |                      |                            |
| A person’s movement pattern changes.       |                      |                            |

Discuss:

- Which cases need human interpretation?
- Which cases might be safely automated?
- Which cases could produce surveillance or discrimination?
- Which cases require immediate action?

## Part 9: Social and Ethical Questions

Discuss:

- Who defines normal?
- Who is most likely to be treated as anomalous?
- When does anomaly detection become surveillance?
- Who benefits from detecting anomalies quickly?
- Who is harmed when difference is treated as risk?
- What kinds of people or behaviors might be misread by the system?
- Should people be told they are being monitored for anomalies?
- Should people be able to challenge anomaly labels?
- What should happen before an anomaly triggers action?
- Are there contexts where anomaly detection should be prohibited?

## Part 10: Technical Translation

This lab illustrates several AI and machine learning ideas.

| Lab Activity                           | Technical Analogue               |
| -------------------------------------- | -------------------------------- |
| Defining normal                        | Establishing a baseline          |
| Identifying unusual cases              | Detecting outliers               |
| Choosing what signals matter           | Feature and sensor selection     |
| Deciding how unusual is unusual enough | Setting an anomaly threshold     |
| Updating what counts as normal         | Model adaptation or retraining   |
| Asking what context is missing         | Evaluating data limitations      |
| Analyzing false alarms                 | False positive analysis          |
| Analyzing missed problems              | False negative analysis          |
| Asking what action follows             | Deployment and governance review |

Key takeaway:

> Anomaly detection is not just the detection of difference. It is a system for deciding which differences matter, which differences are risky, and what should happen next.

## Part 11: Connection to BRAID

The BRAID project focuses on neuromorphic systems inspired by the cerebellum’s ability to detect unexpected input, respond quickly, and learn from new patterns.

This makes anomaly detection a central concept.

In a low-stakes context, an anomaly might mean a color does not fit a cluster or a machine makes an unusual sound.

In a high-stakes context, an anomaly might mean a cybersecurity threat, a medical emergency, a vehicle hazard, or a person classified as suspicious.

The ethical stakes depend on:

- what is being sensed
- what counts as normal
- what counts as anomalous
- whether the system learns after deployment
- whether the system can explain why something was flagged
- who is notified
- what action follows
- whether affected people can challenge the result

In later work, we will ask how these questions change when anomaly detection happens on-device, in hardware, or through neuromorphic systems.

## Part 12: Governance Review

Your group has been asked to advise an organization considering an anomaly detection system.

Choose one context:

- campus safety
- student support
- hospital monitoring
- elder-care monitoring
- cybersecurity
- autonomous vehicles
- factory safety
- workplace productivity
- public surveillance

Complete the table.

| Governance Question                                           | Group Response |
| ------------------------------------------------------------- | -------------- |
| What problem is the system supposed to solve?                 |                |
| What data or signals does the system use?                     |                |
| What counts as normal?                                        |                |
| What counts as anomalous?                                     |                |
| What happens when an anomaly is detected?                     |                |
| Who could benefit?                                            |                |
| Who could be harmed?                                          |                |
| What false positives are likely?                              |                |
| What false negatives are likely?                              |                |
| What human review is required?                                |                |
| What should be logged or documented?                          |                |
| Who can challenge or appeal the result?                       |                |
| Should this system be used, limited, redesigned, or rejected? |                |

## Deliverable: Anomaly Detection Governance Memo

Submit a short memo evaluating an anomaly detection system in one context.

Your memo should include:

1. The system’s purpose.
2. The baseline definition of normal.
3. The data or signals used.
4. A false positive harm.
5. A false negative harm.
6. A context or population likely to be misread.
7. A recommendation for human oversight.
8. A final recommendation: use, limit, redesign, or reject.

## Suggested Memo Format

```markdown
# Anomaly Detection Governance Memo

## System Purpose

What is the system supposed to detect, and why?

## Baseline

What counts as normal?
Who defines normal?

## Data and Signals

What does the system observe?
What context might be missing?

## Error Harms

What would count as a false positive?
Who could be harmed?

What would count as a false negative?
Who could be harmed?

## Social Risk

Who or what might be misread as anomalous?

## Oversight and Contestability

What human review should be required?
Who should be able to challenge or appeal the result?

## Final Recommendation

Should the system be used, limited, redesigned, or rejected?
Explain your reasoning.
```

## Exit Ticket

Individually, answer:

1. What is one way “normal” can be a social or institutional judgment rather than a neutral fact?
2. What is one question you would ask before trusting an anomaly detection system?
3. Are there any contexts where anomaly detection should not be used? Why?
