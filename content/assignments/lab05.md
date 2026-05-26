---
title: 'Prediction & Historical Data'
num: '5'
date: '2026-10-07'
type: 'lab'
due_date: '2026-10-14'
draft: 0
---

## Prediction and Historical Data

How AI systems can reproduce the past while appearing to predict the future.

## Overview

Many AI systems are used to make predictions: who is likely to default on a loan, which neighborhoods may experience crime, which patients may need care, which students may struggle, which workers may quit, or which online posts may violate a policy.

These systems often learn from historical data. But historical data does not simply describe the world as it is. It reflects past decisions, institutions, inequalities, measurement practices, and patterns of attention.

If the past was unequal, incomplete, or biased, then a system trained on historical data may reproduce those patterns while appearing objective or forward-looking.

In this lab, you will examine a fictional predictive system. You will analyze what the data appears to show, what it hides, and how using historical data for prediction can reinforce existing inequalities.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain how predictive systems use historical data.
- Distinguish between a pattern in data and an explanation for that pattern.
- Identify how historical data may reflect unequal institutions or unequal measurement.
- Analyze how predictive systems can reproduce past harms.
- Evaluate whether a prediction target is appropriate, fair, and useful.
- Connect prediction to governance questions about accountability, bias, oversight, and justice.

## Key Terms

| Term             | Working Definition                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Prediction       | An estimate about what may happen in the future based on patterns in data.                                  |
| Historical data  | Data collected from past events, decisions, measurements, or records.                                       |
| Target variable  | The thing a model is trying to predict.                                                                     |
| Feedback loop    | A cycle where predictions shape actions, and those actions create new data that reinforces the predictions. |
| Measurement bias | A pattern where data reflects unequal observation or recording rather than underlying reality.              |
| Historical bias  | Bias that reflects past social inequalities, even if the data was recorded accurately.                      |
| Proxy            | A variable that indirectly stands in for something else.                                                    |
| Intervention     | An action taken in response to a prediction.                                                                |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> When is it useful to use the past to predict the future? When might it be dangerous?

Write 4–6 sentences.

Consider examples such as:

- weather forecasting
- credit scoring
- school performance prediction
- predictive policing
- medical diagnosis
- hiring algorithms
- fraud detection
- college advising
- neighborhood risk maps

## Part 2: Scenario

A city is considering a predictive system to help decide where to send extra public safety patrols.

The stated goal is to prevent harm and respond more quickly to incidents.

The system is trained on historical incident reports from four neighborhoods. The city wants to use these reports to predict which neighborhoods are “higher risk.”

The system does **not** directly measure all harmful events. It only uses events that were reported, recorded, or acted upon.

Your task is to analyze whether the historical data is a fair basis for prediction.

## Part 3: Historical Dataset

Review the fictional dataset below.

| Neighborhood | Population | Reported Incidents Last Year | Patrol Hours Last Year | Median Household Income | Community Complaints About Over-Policing |
| ------------ | ---------: | ---------------------------: | ---------------------: | ----------------------: | ---------------------------------------: |
| A            |     10,000 |                          420 |                  8,000 |                 $38,000 |                                       95 |
| B            |     10,000 |                          260 |                  4,000 |                 $52,000 |                                       42 |
| C            |     10,000 |                          180 |                  2,000 |                 $73,000 |                                       12 |
| D            |     10,000 |                           90 |                  1,000 |                $110,000 |                                        3 |

## Part 4: First Interpretation

Based only on reported incidents, answer the following questions.

### 1. Which neighborhood appears to have the highest risk?

Write your response:

### 2. Which neighborhood appears to have the lowest risk?

Write your response:

### 3. If the city used only reported incidents, where would it send the most patrols?

Write your response:

### 4. What story does the reported incident data seem to tell?

Write your response:

## Part 5: Look Again

Now consider the full dataset, including patrol hours and complaints about over-policing.

Discuss the following questions.

### 1. Which neighborhoods were watched most heavily in the past?

Write your response:

### 2. How might patrol hours affect the number of reported incidents?

Write your response:

### 3. Does a higher number of reports necessarily mean more harmful behavior occurred?

Write your response:

### 4. What else might explain the pattern?

Write your response:

### 5. What might the dataset be measuring besides “risk”?

Write your response:

## Part 6: Calculate Reports Per Patrol Hour

Reported incidents can look different when compared to patrol hours.

Complete the table.

| Neighborhood | Reported Incidents | Patrol Hours | Reports Per 100 Patrol Hours |
| ------------ | -----------------: | -----------: | ---------------------------: |
| A            |                420 |        8,000 |                              |
| B            |                260 |        4,000 |                              |
| C            |                180 |        2,000 |                              |
| D            |                 90 |        1,000 |                              |

To calculate:

```
Reports per 100 patrol hours = (Reported Incidents / Patrol Hours) × 100
```

## Part 7: Compare Interpretations

Answer the following questions.

### 1. Does the ranking of neighborhoods change when you consider patrol hours?

Write your response:

### 2. What does “reported incidents” measure?

Write your response:

### 3. What does it fail to measure?

Write your response:

### 4. What would be dangerous about treating reported incidents as a neutral measure of neighborhood risk?

Write your response:

## Part 8: Feedback Loops

Suppose the city uses the model to send more patrols to Neighborhood A.

Then, because more officers are present, more incidents are observed, recorded, or enforced.

The next year, the dataset shows even more reported incidents in Neighborhood A.

Discuss:

- How could this create a feedback loop?
- How could the system make the original pattern stronger?
- How could the model appear accurate while reinforcing unequal surveillance?
- Who would be affected by this loop?
- How might residents experience the prediction system?

Write your group’s response:

## Part 9: Prediction Target Analysis

A predictive system depends on the thing it is trying to predict. This is called the target variable.

In this scenario, the system is trying to predict “risk,” but it is actually trained on reported incidents.

Discuss whether each possible target would be appropriate.

| Possible Prediction Target     | What It Measures | What It Might Miss | Should It Be Used? |
| ------------------------------ | ---------------- | ------------------ | ------------------ |
| Reported incidents             |                  |                    |                    |
| Arrests                        |                  |                    |                    |
| 911 calls                      |                  |                    |                    |
| Community requests for help    |                  |                    |                    |
| Verified harm reports          |                  |                    |                    |
| Resident safety survey results |                  |                    |                    |
| Hospital injury data           |                  |                    |                    |
| Social service needs           |                  |                    |                    |

## Part 10: Context Shift

Predictive systems are used in many domains.

For each context, identify what historical data might hide or reproduce.

| Context              | Historical Data Used                | What Might Be Hidden or Reproduced? |
| -------------------- | ----------------------------------- | ----------------------------------- |
| Hiring               | Past employee performance reviews   |                                     |
| Lending              | Past loan repayment data            |                                     |
| Healthcare           | Past medical records                |                                     |
| College advising     | Past grades and withdrawals         |                                     |
| Child welfare        | Prior reports to agencies           |                                     |
| Predictive policing  | Past incident reports               |                                     |
| Workplace monitoring | Past productivity metrics           |                                     |
| Fraud detection      | Past transactions marked suspicious |                                     |

## Part 11: Social and Ethical Questions

Discuss:

- Who collected the historical data?
- Why was the data collected?
- Who was most visible in the data?
- Who was missing?
- What institutional decisions shaped the data?
- What inequalities might the data reflect?
- What would happen if the prediction is treated as objective?
- Who can challenge the prediction?
- Who is accountable if the prediction causes harm?
- When should historical data not be used for prediction?

## Part 12: Technical Translation

This lab illustrates several machine learning ideas.

| Lab Activity             | Machine Learning Analogue           |
| ------------------------ | ----------------------------------- |
| Reviewing past incidents | Inspecting historical training data |
| Choosing what to predict | Defining the target variable        |
| Comparing neighborhoods  | Looking for patterns in data        |
| Considering patrol hours | Identifying measurement bias        |
| Asking what is missing   | Auditing data representation        |
| Examining feedback loops | Studying deployment effects         |
| Questioning the target   | Evaluating construct validity       |
| Asking who is harmed     | Performing impact assessment        |

Key takeaway:

> Historical data does not simply predict the future. It can carry forward the assumptions, inequalities, and institutional practices of the past.

## Part 13: Design a Better Approach

Your group has been asked to advise the city.

You may recommend that the city:

- use the predictive system as proposed
- redesign the system
- limit the system to specific uses
- use non-predictive alternatives
- reject the system entirely

Complete the table.

| Governance Question                                    | Group Response |
| ------------------------------------------------------ | -------------- |
| What should the city be trying to improve?             |                |
| What data should be used?                              |                |
| What data should not be used?                          |                |
| Who should be consulted before deployment?             |                |
| What harms should be monitored?                        |                |
| How should residents be able to challenge the system?  |                |
| What should happen if the system increases inequality? |                |

## Deliverable: Historical Data Audit Memo

Submit a short memo that evaluates whether the city should use the predictive system.

Your memo should include:

- The system’s stated purpose.
- The prediction target.
- What the historical data appears to show.
- What the historical data may hide or reproduce.
- One possible feedback loop.
- A governance recommendation.

### Suggested Memo Format

```markdown
# Historical Data Audit Memo

## System Purpose

What is the system supposed to do?

## Prediction Target

What is the system trying to predict?
What data is being used as a stand-in for that target?

## What the Data Appears to Show

What conclusion might someone draw from the dataset?

## What the Data May Hide

What social, institutional, or historical factors might shape the data?

## Feedback Loop

How could the prediction system reinforce the pattern it claims to predict?

## Harms and Stakeholders

Who could benefit?
Who could be harmed?

## Governance Recommendation

Should the system be used as proposed, redesigned, limited, or rejected?
Explain your reasoning.
```

## Exit Ticket

Individually, answer:

1. What is one way historical data can make an AI system seem objective when it is not?
2. What is one question you would ask before trusting a predictive system trained on past records?
3. When, if ever, should institutions refuse to use historical data for prediction?
