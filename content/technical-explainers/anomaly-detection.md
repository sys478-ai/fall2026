---
card_type: technical-explainer
id: te-anomaly-detection
slug: anomaly-detection
title: 'Anomaly Detection'
subtitle: 'How AI systems learn what usually happens - and why “unusual” does not always mean “wrong.”'
num: '5'
order: 5
related_recognition_cards: ['22', '7', '25', '8']
related_concept_cards: []
related_labs: ['8', '9']
field_guide_section: 'technical-explainers'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

<style>
    table, tr {
        width: auto !important;
        height: auto !important;
        min-width: 300px;
    }
    table td, table th {
        padding: 4px 8px !important;
    }
</style>

> **Course connection:** This explainer connects directly to the course's capstone case — a neuromorphic chip designed for edge-based anomaly detection. The technical failure modes here are the same ones the capstone analysis asks you to evaluate prospectively.

# Anomaly Detection

**How AI systems learn what usually happens — and why “unusual” does not always mean “wrong.”**

## The Basic Idea

Anomaly detection is a way of teaching a system what usually happens so it can notice when something seems unusual. A system does not automatically know what is dangerous, suspicious, bad, or important. It only knows when something looks different from the examples it has seen before.

<img src="/fall2026/images/technical-explainers/anomaly-detection/img1.png" />

For example, imagine a building sensor that usually detects almost no movement at 2:00 AM. If it suddenly detects lots of movement one night, the system might flag that as an anomaly. But the anomaly could mean many things:

| Possibility                                     | What it shows               |
| ----------------------------------------------- | --------------------------- |
| A custodian is cleaning                         | Unusual, but normal         |
| A student has permission to be there            | Unusual, but allowed        |
| The sensor is broken                            | A technical problem         |
| Someone entered without permission              | A possible security concern |
| There is an event the system did not know about | A context problem           |

The system has not “understood” the situation. It has only noticed that the pattern is different.

## How It Works

Most anomaly detection systems follow three basic steps:

1. **Learn what is normal.**  
   The system looks at many examples and builds a model of what usually happens.

2. **Compare new examples to that model.**  
   When new data comes in, the system asks: “How different is this from what I usually see?”

3. **Flag examples that are different enough.**  
   A designer chooses a cutoff point, called a threshold. Anything past that threshold is marked as anomalous.

In technical terms, the system gives new inputs an **anomaly score**. A higher score means the input is more different from what the system learned as normal.

## Why Thresholds Matter

The threshold controls how sensitive the system is. If the threshold is too low, the system flags too many things. This creates **false positives**: normal things incorrectly marked as unusual. If the threshold is too high, the system misses important things. This creates **false negatives**: real anomalies that are not detected. There is no perfect threshold. Setting the threshold is partly a technical decision, but it is also a social and ethical decision because different errors harm different people.

## What Can Go Wrong

Anomaly detection systems can make serious mistakes because “normal” is not universal. A system may learn normal from one place, one group, one time period, or one set of conditions. When it is used somewhere else, it may treat unfamiliar but harmless behavior as suspicious.

This is especially important when anomaly detection is used in high-stakes settings such as policing, immigration, medical diagnosis, workplace monitoring, cybersecurity, or schools.

The key question is not only: _Did the system detect something unusual?_

It is also:

- Who decided what counts as normal?
- Who gets flagged as abnormal?
- Who has the power to challenge the result?

## Why This Matters for Edge AI

Some anomaly detection systems run **on the edge**, meaning they operate directly on devices such as sensors, cameras, phones, vehicles, or chips rather than sending all data to a central server. This can have benefits: faster response, lower energy use, and less need to transmit data. But it also creates governance challenges: if a system makes decisions locally and automatically, it may be harder to inspect, audit, update, or challenge what happened.

For this course, anomaly detection matters because the capstone case involves neuromorphic hardware designed to detect unusual patterns efficiently at the edge.

## Key Takeaway

1. **Anomaly detection does not find “weirdness” in the world. It finds difference from a learned pattern.**

1. That distinction matters because the learned pattern may reflect one group, one place, one time period, or one set of assumptions.

1. An anomaly is not automatically a threat. It is a signal that something does not fit the system’s model of normal.

{% collapsible closed %}

## Detailed Examples

{% collapsible closed %}

### Approach 1: Distance From Normal

Anomaly detection systems usually do not work with vague ideas like “normal” or “weird.” They work with **data**. To detect anomalies, a system needs examples represented as numbers. For example, imagine a building sensor records hallway activity every hour.

| Time     | Movement count | Door openings | Sound level |
| -------- | -------------: | ------------: | ----------: |
| 10:00 AM |             48 |            12 |          35 |
| 11:00 AM |             52 |            14 |          37 |
| 12:00 PM |             61 |            18 |          42 |
| 1:00 PM  |             55 |            15 |          39 |
| 2:00 AM  |              2 |             0 |          20 |
| 3:00 AM  |              1 |             0 |          19 |
| 4:00 AM  |              2 |             1 |          21 |
| 2:00 AM  |             43 |             9 |          38 |

The last row might be flagged as unusual because it looks very different from the system's usual 2:00 AM pattern.

But notice something important: the system does not know _why_ the pattern is different. It only sees the numbers.

#### Features

Each column used by the system is called a **feature**. In the example above, the features are:

- movement count
- door openings
- sound level
- time of day

A feature is a measurable part of the situation. Choosing features matters. If the system only tracks movement, it may miss important context. If it tracks too much, it may create privacy risks.

#### One Simple Method: Distance From Normal

One simple way to detect anomalies is to compare a new example to what usually happens.

Suppose the system learns that at 2:00 AM, a hallway usually looks like this:

| Feature        | Usual value |
| -------------- | ----------: |
| Movement count |           2 |
| Door openings  |           0 |
| Sound level    |          20 |

Now a new 2:00 AM example comes in:

| Feature        | New value |
| -------------- | --------: |
| Movement count |        43 |
| Door openings  |         9 |
| Sound level    |        38 |

The system can compare the new values to the usual values.

| Feature        | Usual | New | Difference |
| -------------- | ----: | --: | ---------: |
| Movement count |     2 |  43 |         41 |
| Door openings  |     0 |   9 |          9 |
| Sound level    |    20 |  38 |         18 |

The differences are large, so the system gives this example a high anomaly score.

A very simple **anomaly score** could be:

{% no-copy %}

```text
anomaly score = total difference from usual values
```

So,

{% no-copy %}

```text
Score = 41 + 9 + 18
Score = 68
```

This score tells us how different the new example is from the usual 2:00 AM pattern. But the score by itself does not decide anything. The system also needs a **threshold**, or cutoff point. For example, suppose the system has seen several normal 2:00 AM observations with scores like this:

| Observation    | Anomaly score |
| -------------- | ------------: |
| Normal night 1 |             8 |
| Normal night 2 |            12 |
| Normal night 3 |            15 |
| Normal night 4 |            18 |
| Normal night 5 |            22 |

In this simplified example, the highest normal score is 22. A designer might set the threshold a little higher, such as 30, to allow for some normal variation.

{% no-copy %}

```text
threshold = 30
```

Now the rule is:

{% no-copy %}

```text
if anomaly score > 30, flag the example
if anomaly score <= 30, do not flag the example
```

<img src="/fall2026/images/technical-explainers/anomaly-detection/img2.png" />

Since the new example has a score of 68:

{% no-copy %}

```text
68 > 30 → flag as anomaly
```

A normal observation with a score of 22 would not be flagged:

{% no-copy %}

```text
22 < 30 → do not flag
```

**The threshold of 30 is not automatically correct**. It is a design choice based on how sensitive the system should be.

A lower threshold would flag more examples, including more false alarms. A higher threshold would flag fewer examples, but it might miss some real problems.

{% collapsible closed %}

### Approach 2: Statistical Detection

**The system learns what values are typical and flags values that are far away from the usual range.** For example, if most 2:00 AM movement counts are between 0 and 5, then a movement count of 43 may be treated as unusual. This approach works well when “normal” is fairly stable and measurable.

{% collapsible closed %}

### Approach 3: Clustering

**The system groups similar examples together.** Most ordinary examples fall into large clusters. Examples that do not fit well into any cluster may be treated as anomalies. For example, weekday lunch activity, nighttime activity, and weekend activity might form different clusters.

{% collapsible closed %}

### Approach 4: Reconstruction-Based Detection

**Some models learn to recreate normal examples.** An **_autoencoder_** is one example. It is a neural network trained to compress data and then reconstruct it.

If the model has learned normal patterns well, it should be able to reconstruct normal examples accurately. But when it sees an unusual example, it may reconstruct it poorly. The difference between the original input and the reconstructed output is called reconstruction error. A high reconstruction error can be used as an anomaly score.

{% collapsible closed %}

### Approach 5: Time-Series Anomaly Detection

<img src="/fall2026/images/technical-explainers/anomaly-detection/img3.png" />

**Some systems look for unusual changes over time.** For example, a system might learn that network traffic rises gradually during the workday and falls at night. A sudden spike at 3:00 AM might be flagged as unusual. This is especially important for cybersecurity, health monitoring, industrial sensors, and environmental monitoring.

## Critical Bridge

| Technical failure mode                                                         | Type    | Resource                                                                                                                                               |
| ------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Normal defined by training distribution                                        | STS     | [Normal is constructed](/fall2026/field-guide/sts-concepts/normal-is-constructed)                                                                      |
| Threshold setting trades off asymmetric costs                                  | Pattern | [Thresholds make uncertainty consequential](/fall2026/field-guide/deployment-patterns/thresholds-make-uncertainty-consequential)                       |
| Underrepresented populations flagged as anomalous                              | Pattern | [This system treats one group as the default](/fall2026/field-guide/deployment-patterns/this-system-treats-one-group-as-the-default)                   |
| Training and deployment context mismatch                                       | Pattern | [Prediction imports the past](/fall2026/field-guide/deployment-patterns/prediction-imports-the-past)                                                   |
| False positive costs fall disproportionately                                   | Pattern | [Concentrated harm is hidden by aggregate benefit](/fall2026/field-guide/deployment-patterns/concentrated-harm-is-hidden-by-aggregate-benefit)         |
| The system can see things about people that people cannot see about the system | Pattern | [This system creates asymmetric visibility](/fall2026/field-guide/deployment-patterns/this-system-creates-asymmetric-visibility)                       |
| Being watched changes what counts as normal behavior                           | Pattern | [Being watched changes what counts as normal behavior](/fall2026/field-guide/deployment-patterns/being-watched-changes-what-counts-as-normal-behavior) |
| Defining normal and flagging difference                                        | Lab     | [Lab 8: Anomaly Detection and Normal](/fall2026/assignments/lab08)                                                                                     |
| On-device processing, privacy, and accountability                              | Lab     | [Lab 9: Edge AI, Privacy, and Accountability](/fall2026/assignments/lab09)                                                                             |
