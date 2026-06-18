---
title: 'Anomaly Detection and Normal'
scheduled_day: 16
num: '8'
type: 'lab'
draft: 0
status: unverified
status_reviewer:
status_date:
status_notes:
priority: medium
---

How systems define “normal,” flag difference, and decide what deserves attention.

## Overview

Many AI systems are designed to detect anomalies. An anomaly is something that differs from what a system expects: an unusual login, an unexpected heart rhythm, a strange network request, a sudden machine vibration, an unfamiliar driving pattern, or a rare behavior in a public space.

Anomaly detection can be useful. It can help identify cyberattacks, equipment failures, medical emergencies, fraud, or safety risks.

But anomaly detection also raises difficult social and ethical questions. What counts as normal? Who gets to define normal? Is rare behavior necessarily risky? What happens when legitimate difference is treated as suspicious? What should happen after an anomaly is detected?

In this lab, you will examine how anomaly detection systems are built around assumptions about normality, risk, context, and action.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain what anomaly detection is.
- Distinguish between unusual, risky, harmful, and meaningful behavior.
- Analyze how “normal” is defined by data, sensors, context, and institutional goals.
- Identify false positive and false negative harms in anomaly detection systems.
- Connect anomaly detection to surveillance, bias, explainability, accountability, and governance.

## Key Terms

| Term              | Working Definition                                                                   |
| ----------------- | ------------------------------------------------------------------------------------ |
| Anomaly           | Something that differs from an expected, learned, or usual pattern.                  |
| Anomaly detection | A method for identifying examples that appear unusual compared to a baseline.        |
| Baseline          | The pattern or range of behavior treated as normal or expected.                      |
| Normality         | A constructed idea of what counts as ordinary, expected, acceptable, or typical.     |
| Threshold         | The cutoff point at which difference becomes significant enough to trigger an alert. |
| False positive    | A harmless or legitimate case incorrectly flagged as anomalous or risky.             |
| False negative    | A harmful or important case that the system fails to flag.                           |
| Context           | Additional information needed to interpret whether an anomaly matters.               |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Think of a time when something unusual was not actually a problem. Then think of a time when something unusual was an important warning sign.

Write 4–6 sentences.

Examples might include:

- a strange sound from a car
- an unusual bank charge
- a late-night email
- a login from a new location
- a medical symptom
- a person behaving differently than expected

## Part 2: What Does “Normal” Mean?

In groups, brainstorm different meanings of the word “normal.” Complete the table.

| Meaning of Normal         | Example | Possible Problem |
| ------------------------- | ------- | ---------------- |
| Statistically common      |         |                  |
| Socially expected         |         |                  |
| Healthy or safe           |         |                  |
| Legally permitted         |         |                  |
| Institutionally preferred |         |                  |
| Familiar to the system    |         |                  |

Discuss:

- Which meanings of normal are descriptive?
- Which meanings of normal are judgmental?
- Which meanings of normal could be harmful if built into an AI system?

## Part 3: Scenario Sorting

For each scenario, decide whether the behavior should be treated as:

- Normal
- Unusual but harmless
- Potentially concerning
- Anomalous and urgent
- Need more context
- Should not be evaluated by an automated system

|   # | Scenario                                                 | Classification | What Context Is Needed? |
| --: | -------------------------------------------------------- | -------------- | ----------------------- |
|   1 | A student logs into an account from a different country. |                |                         |
|   2 | A patient’s heart rate rises suddenly during the night.  |                |                         |
|   3 | A server receives thousands of requests in one minute.   |                |                         |
|   4 | A factory machine begins vibrating more than usual.      |                |                         |
|   5 | A car brakes suddenly on a sunny day.                    |                |                         |
|   6 | A shopper walks through a store without buying anything. |                |                         |
|   7 | A student stops submitting assignments for two weeks.    |                |                         |
|   8 | A person circles a public building several times.        |                |                         |
|   9 | A child avoids eye contact during a classroom activity.  |                |                         |
|  10 | A network device sends data to an unfamiliar address.    |                |                         |

After sorting, choose two scenarios and answer:

| Scenario # | What is unusual? | Is it necessarily harmful? | What would make it risky? | What could make it harmless? |
| ---------- | ---------------- | -------------------------- | ------------------------- | ---------------------------- |
|            |                  |                            |                           |                              |
|            |                  |                            |                           |                              |

Key question: **Is “different from normal” the same thing as “dangerous”?**

## Part 4: Define the Baseline

Anomaly detection depends on a baseline: the pattern that counts as expected.

Choose one context:

- cybersecurity
- student support
- health monitoring
- workplace safety
- autonomous driving
- public space monitoring
- elder-care support
- manufacturing equipment

Complete the table.

| Design Question                                               | Group Response |
| ------------------------------------------------------------- | -------------- |
| What is the system supposed to detect?                        |                |
| What data or signals does it observe?                         |                |
| What counts as normal?                                        |                |
| Who defines normal?                                           |                |
| Whose behavior or conditions are represented in the baseline? |                |
| Whose behavior or conditions might be missing?                |                |
| What could go wrong if the baseline is wrong?                 |                |

## Part 5: Thresholds, Errors, and Context

An anomaly detection system needs a threshold.

If the threshold is too sensitive, it may flag many harmless cases. If the threshold is not sensitive enough, it may miss serious problems.

Choose one context from Part 4 and complete the table.

| Question                                       | Response |
| ---------------------------------------------- | -------- |
| What would count as a false positive?          |          |
| Who could be harmed by a false positive?       |          |
| What would count as a false negative?          |          |
| Who could be harmed by a false negative?       |          |
| Which error is more serious in this context?   |          |
| Who should decide how to balance these errors? |          |

Now consider context.

| What the System Sees | What the System Might Miss |
| -------------------- | -------------------------- |
|                      |                            |
|                      |                            |
|                      |                            |

Discuss:

- Which cases need human interpretation?
- Which cases might be safely automated?
- Which cases could produce surveillance or discrimination?
- Which cases require immediate action?

## Part 6: When Does Anomaly Detection Become Surveillance?

Anomaly detection often depends on ongoing monitoring. To decide whether something is unusual, a system first needs examples of what usually happens.

Discuss:

- Who is being monitored?
- Who defines normal?
- Who is most likely to be treated as anomalous?
- When does anomaly detection become surveillance?
- Who benefits from detecting anomalies quickly?
- Who is harmed when difference is treated as risk?
- Should people be told they are being monitored for anomalies?
- Should people be able to challenge anomaly labels?
- Are there contexts where anomaly detection should be prohibited?

## Connection to BRAID

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

## Technical Translation

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

**Key takeaway:** Anomaly detection is not just the detection of difference. It is a system for deciding which differences matter, which differences are risky, and what should happen next.

## Deliverable: Anomaly Detection Governance Memo

Submit a short memo evaluating an anomaly detection system in one context. Your memo should include:

> ## Memo Format
>
> ### 1. System Purpose
>
> What is the system supposed to detect, and why?
>
> ### 2. Baseline
>
> What counts as normal?  
> Who defines normal?
>
> ### 3. Data and Signals
>
> What does the system observe?  
> What context might be missing?
>
> ### 4. Error Harms
>
> What would count as a false positive?  
> Who could be harmed?
>
> What would count as a false negative?  
> Who could be harmed?
>
> ### 5. Social Risk
>
> Who or what might be misread as anomalous?
>
> ### 6. Oversight and Contestability
>
> What human review should be required?  
> Who should be able to challenge or appeal the result?
>
> ### 7. Final Recommendation
>
> Should the system be used, limited, redesigned, or rejected?  
> Explain your reasoning.
