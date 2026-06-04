---
title: 'Thresholds and the Cost of Error'
scheduled_day: 9
num: '4'
type: 'lab'
draft: 0
---

How decision boundaries shape false positives, false negatives, and real-world harm.

## Overview

Many AI systems do not simply say “yes” or “no.” Instead, they produce a score: a probability, confidence level, risk score, similarity score, anomaly score, or likelihood estimate.

But a score does not become a decision until someone chooses a **threshold**.

For example:

- If a spam score is above 80%, send the email to spam.
- If a fraud score is above 70%, freeze the transaction.
- If a medical risk score is above 60%, recommend follow-up.
- If an anomaly score is above 90%, trigger an alert.
- If an academic risk score is above 50%, flag a student for outreach.

Thresholds are technical, but they are also ethical. Moving a threshold changes who is flagged, who is missed, who receives help, who is surveilled, and who bears the cost of mistakes.

In this lab, you will adjust decision thresholds, count false positives and false negatives, and analyze how different thresholds distribute risk and harm.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain what a decision threshold is.
- Distinguish between a model score and a system decision.
- Define false positives and false negatives in a specific context.
- Analyze how changing a threshold changes the distribution of errors.
- Evaluate who benefits and who is harmed by different threshold choices.
- Connect threshold decisions to accountability, oversight, bias, surveillance, and governance.

## Key Terms

| Term              | Working Definition                                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Score             | A numerical output from a system, such as a probability, confidence score, risk score, or anomaly score.                                  |
| Threshold         | The cutoff point at which a score becomes an action or decision.                                                                          |
| False positive    | A case incorrectly flagged as positive, risky, suspicious, urgent, or anomalous.                                                          |
| False negative    | A case incorrectly not flagged, even though it should have been.                                                                          |
| True positive     | A case correctly flagged.                                                                                                                 |
| True negative     | A case correctly not flagged.                                                                                                             |
| Sensitivity       | How likely a system is to catch positive cases. Higher sensitivity usually means fewer false negatives but more false positives.          |
| Specificity       | How likely a system is to avoid flagging negative cases. Higher specificity usually means fewer false positives but more false negatives. |
| Decision boundary | The line or cutoff that separates one decision from another.                                                                              |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Think of a situation where it might be worse to falsely accuse someone than to miss a real problem. Then think of a situation where it might be worse to miss a real problem than to falsely raise an alarm.

Write 4–6 sentences.

Consider examples such as:

- airport security
- medical screening
- fraud detection
- plagiarism detection
- content moderation
- school threat assessment
- spam filtering
- cybersecurity alerts
- student support systems

## Part 2: Scenario

A university is testing an AI advising tool that flags students who may need urgent outreach from an academic advisor.

The system gives each student a **support risk score** from 0 to 100.

A higher score means the system believes the student is more likely to need urgent support.

The university must decide what score is high enough to trigger an alert.

The possible action is:

> Send the student’s name to an advisor for urgent outreach.

This may help students who need support. But it may also create risks: unnecessary monitoring, stigma, privacy concerns, or overburdening advisors.

## Part 3: Dataset

The table below shows fictional students, their model scores, and whether they actually needed urgent support based on later human review.

| Student | Model Score | Actually Needed Urgent Support? |
| ------- | ----------: | ------------------------------- |
| A       |          95 | Yes                             |
| B       |          91 | No                              |
| C       |          88 | Yes                             |
| D       |          84 | Yes                             |
| E       |          81 | No                              |
| F       |          78 | No                              |
| G       |          75 | Yes                             |
| H       |          72 | No                              |
| I       |          69 | Yes                             |
| J       |          66 | No                              |
| K       |          63 | No                              |
| L       |          60 | Yes                             |
| M       |          57 | No                              |
| N       |          54 | No                              |
| O       |          51 | Yes                             |
| P       |          48 | No                              |
| Q       |          45 | Yes                             |
| R       |          42 | No                              |
| S       |          39 | No                              |
| T       |          36 | Yes                             |

## Part 4: Choose a Threshold

Your group will test three possible thresholds:

- **Threshold 1:** Flag students with scores of 80 or above.
- **Threshold 2:** Flag students with scores of 60 or above.
- **Threshold 3:** Flag students with scores of 40 or above.

For each threshold, classify each student as:

- **Flagged**
- **Not flagged**

Then determine whether the result is:

- **True positive:** flagged and actually needed urgent support
- **False positive:** flagged but did not need urgent support
- **True negative:** not flagged and did not need urgent support
- **False negative:** not flagged but actually needed urgent support

## Part 5: Threshold 1 — Flag Scores 80 and Above

| Student | Score | Actually Needed Support? | Flagged? | Result Type |
| ------- | ----: | ------------------------ | -------- | ----------- |
| A       |    95 | Yes                      |          |             |
| B       |    91 | No                       |          |             |
| C       |    88 | Yes                      |          |             |
| D       |    84 | Yes                      |          |             |
| E       |    81 | No                       |          |             |
| F       |    78 | No                       |          |             |
| G       |    75 | Yes                      |          |             |
| H       |    72 | No                       |          |             |
| I       |    69 | Yes                      |          |             |
| J       |    66 | No                       |          |             |
| K       |    63 | No                       |          |             |
| L       |    60 | Yes                      |          |             |
| M       |    57 | No                       |          |             |
| N       |    54 | No                       |          |             |
| O       |    51 | Yes                      |          |             |
| P       |    48 | No                       |          |             |
| Q       |    45 | Yes                      |          |             |
| R       |    42 | No                       |          |             |
| S       |    39 | No                       |          |             |
| T       |    36 | Yes                      |          |             |

### Count the Results

| Result Type     | Count |
| --------------- | ----: |
| True positives  |       |
| False positives |       |
| True negatives  |       |
| False negatives |       |

## Part 6: Threshold 2 — Flag Scores 60 and Above

| Student | Score | Actually Needed Support? | Flagged? | Result Type |
| ------- | ----: | ------------------------ | -------- | ----------- |
| A       |    95 | Yes                      |          |             |
| B       |    91 | No                       |          |             |
| C       |    88 | Yes                      |          |             |
| D       |    84 | Yes                      |          |             |
| E       |    81 | No                       |          |             |
| F       |    78 | No                       |          |             |
| G       |    75 | Yes                      |          |             |
| H       |    72 | No                       |          |             |
| I       |    69 | Yes                      |          |             |
| J       |    66 | No                       |          |             |
| K       |    63 | No                       |          |             |
| L       |    60 | Yes                      |          |             |
| M       |    57 | No                       |          |             |
| N       |    54 | No                       |          |             |
| O       |    51 | Yes                      |          |             |
| P       |    48 | No                       |          |             |
| Q       |    45 | Yes                      |          |             |
| R       |    42 | No                       |          |             |
| S       |    39 | No                       |          |             |
| T       |    36 | Yes                      |          |             |

### Count the Results

| Result Type     | Count |
| --------------- | ----: |
| True positives  |       |
| False positives |       |
| True negatives  |       |
| False negatives |       |

## Part 7: Threshold 3 — Flag Scores 40 and Above

| Student | Score | Actually Needed Support? | Flagged? | Result Type |
| ------- | ----: | ------------------------ | -------- | ----------- |
| A       |    95 | Yes                      |          |             |
| B       |    91 | No                       |          |             |
| C       |    88 | Yes                      |          |             |
| D       |    84 | Yes                      |          |             |
| E       |    81 | No                       |          |             |
| F       |    78 | No                       |          |             |
| G       |    75 | Yes                      |          |             |
| H       |    72 | No                       |          |             |
| I       |    69 | Yes                      |          |             |
| J       |    66 | No                       |          |             |
| K       |    63 | No                       |          |             |
| L       |    60 | Yes                      |          |             |
| M       |    57 | No                       |          |             |
| N       |    54 | No                       |          |             |
| O       |    51 | Yes                      |          |             |
| P       |    48 | No                       |          |             |
| Q       |    45 | Yes                      |          |             |
| R       |    42 | No                       |          |             |
| S       |    39 | No                       |          |             |
| T       |    36 | Yes                      |          |             |

### Count the Results

| Result Type     | Count |
| --------------- | ----: |
| True positives  |       |
| False positives |       |
| True negatives  |       |
| False negatives |       |

## Part 8: Compare the Thresholds

Complete the summary table.

| Threshold | Students Flagged | True Positives | False Positives | True Negatives | False Negatives |
| --------- | ---------------: | -------------: | --------------: | -------------: | --------------: |
| 80+       |                  |                |                 |                |                 |
| 60+       |                  |                |                 |                |                 |
| 40+       |                  |                |                 |                |                 |

Discuss:

1. Which threshold catches the most students who need urgent support?
2. Which threshold creates the most false positives?
3. Which threshold creates the most false negatives?
4. Which threshold seems most cautious?
5. Which threshold seems most aggressive?
6. Which threshold would your group choose, and why?

## Part 9: Error Harms

In this scenario, both false positives and false negatives can cause harm.

### False Positive Harms

A false positive happens when a student is flagged for urgent outreach but did not actually need urgent support.

Possible harms might include:

- unnecessary monitoring
- stigma
- privacy invasion
- advisor time spent on lower-need cases
- students feeling watched or mistrusted
- students avoiding future communication

Write your own analysis:

| False Positive Harm | Who Is Affected? | How Serious Is It? |
| ------------------- | ---------------- | ------------------ |
|                     |                  |                    |
|                     |                  |                    |
|                     |                  |                    |

### False Negative Harms

A false negative happens when a student actually needs urgent support but is not flagged.

Possible harms might include:

- student does not receive help
- crisis worsens
- academic failure or withdrawal
- financial, housing, health, or safety needs remain hidden
- university assumes the system is working when it is missing cases

Write your own analysis:

| False Negative Harm | Who Is Affected? | How Serious Is It? |
| ------------------- | ---------------- | ------------------ |
|                     |                  |                    |
|                     |                  |                    |
|                     |                  |                    |

## Part 10: Context Shift

Now imagine the same threshold problem in different domains.

For each context, decide whether you would prefer a lower threshold, a higher threshold, or no automated threshold at all.

| Context                           | Lower Threshold | Higher Threshold | No Automated Threshold | Why? |
| --------------------------------- | --------------- | ---------------- | ---------------------- | ---- |
| Spam filtering                    |                 |                  |                        |      |
| Medical cancer screening          |                 |                  |                        |      |
| Credit card fraud detection       |                 |                  |                        |      |
| Plagiarism detection              |                 |                  |                        |      |
| Public surveillance alert         |                 |                  |                        |      |
| Cybersecurity intrusion detection |                 |                  |                        |      |
| Child welfare risk scoring        |                 |                  |                        |      |
| Student support outreach          |                 |                  |                        |      |

## Part 11: Social and Ethical Questions

Discuss:

- Who chooses the threshold?
- Who is affected by the threshold?
- Who benefits from a more sensitive system?
- Who is harmed by a more sensitive system?
- Who benefits from a stricter system?
- Who is harmed by a stricter system?
- Should the same threshold be used for every group, context, or institution?
- Should affected people know they were scored?
- Should affected people be able to challenge or appeal the decision?
- What kind of human review should happen before action is taken?

## Part 12: Technical Translation

This lab illustrates several machine learning ideas.

| Lab Activity             | Machine Learning Analogue     |
| ------------------------ | ----------------------------- |
| Reviewing scores         | Interpreting model outputs    |
| Choosing a cutoff        | Setting a decision threshold  |
| Counting correct flags   | Measuring true positives      |
| Counting incorrect flags | Measuring false positives     |
| Counting missed cases    | Measuring false negatives     |
| Comparing thresholds     | Evaluating tradeoffs          |
| Asking who is harmed     | Performing impact assessment  |
| Asking who chooses       | Governance and accountability |

Key takeaway:

> A model score is not the same thing as a decision. Decisions require thresholds, and thresholds distribute benefits, burdens, and harms.

## Part 13: Connection to Anomaly Detection

Thresholds are especially important in anomaly detection.

An anomaly detection system often asks:

> How unusual does something need to be before the system treats it as a problem?

If the threshold is too sensitive, the system may flag harmless behavior as suspicious.

If the threshold is not sensitive enough, the system may miss real threats or urgent problems.

This matters for systems such as:

- network intrusion detection
- fraud detection
- health monitoring
- autonomous vehicles
- workplace safety sensors
- public surveillance
- neuromorphic edge devices

In later labs, we will return to this question:

> Who gets to decide what counts as anomalous, and what should happen after an anomaly is detected?

## Deliverable: Threshold Policy Memo

Submit a short memo that recommends a threshold policy for the student support system.

Your memo should include:

1. The threshold your group recommends.
2. The number of true positives, false positives, true negatives, and false negatives at that threshold.
3. A discussion of false positive harms.
4. A discussion of false negative harms.
5. A recommendation for human review.
6. A recommendation for student notice, consent, or appeal.

## Suggested Memo Format

```markdown
# Threshold Policy Memo

## System Purpose

What is the system supposed to do?

## Recommended Threshold

Which threshold do you recommend?
Why?

## Error Counts

At this threshold:

- True positives:
- False positives:
- True negatives:
- False negatives:

## False Positive Harms

Who could be harmed if the system flags students unnecessarily?

## False Negative Harms

Who could be harmed if the system misses students who need support?

## Human Review

What should a human advisor do before any action is taken?

## Notice and Appeal

Should students know they are being scored or flagged?
Should they be able to challenge or correct the decision?

## Final Recommendation

Should this system be used as proposed, redesigned, limited, or rejected?
```

## Exit Ticket

Individually, answer:

1. What is one thing that changed in how you think about AI “accuracy”?
1. Who should be responsible for choosing a threshold in a high-stakes system?
1. What is one question you would ask before trusting an AI system that flags people as risky, suspicious, urgent, or anomalous?
