---
title: 'Features Are Value Choices'
num: '3'
date: '2026-09-23'
type: 'lab'
due_date: '2026-09-30'
draft: 0
---

## Features Are Value Choices

How variables, proxies, and measurement choices shape AI decisions.

## Overview

AI systems do not see the world directly. They use data fields, variables, measurements, or features. A feature is a piece of information used by a model to make a prediction or classification.

Choosing features can seem like a technical step, but it is also a social and ethical decision. Features determine what the system pays attention to, what it ignores, and what kinds of patterns it can learn. Some features may also act as proxies for sensitive characteristics such as race, gender, disability, income, neighborhood, age, or immigration status.

In this lab, you will decide which features should and should not be used in a fictional AI system. You will analyze how those choices affect fairness, privacy, accountability, and harm.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain what a feature is in a machine learning system.
- Identify how feature selection shapes model behavior.
- Recognize that features can encode assumptions and institutional values.
- Identify proxy variables that may reproduce discrimination.
- Evaluate whether certain features should be allowed, restricted, or prohibited.

## Key Terms

| Term                | Working Definition                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Feature             | A variable or input used by a model to make a decision.                                                                  |
| Proxy variable      | A feature that indirectly stands in for another characteristic.                                                          |
| Sensitive attribute | A characteristic that may require special protection, such as race, gender, disability, age, religion, or health status. |
| Prediction target   | The thing a model is trying to predict.                                                                                  |
| Relevance           | Whether a feature appears connected to the prediction target.                                                            |
| Legitimacy          | Whether a feature should be used, even if it is predictive.                                                              |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Is it always fair to use information just because it helps make a prediction? Why or why not?

Write 3–5 sentences.

## Part 2: Scenario

A university is considering an AI advising tool that predicts which students may need extra academic support during the semester.

The stated goal is to help advisors reach out earlier, connect students to resources, and reduce the number of students who fail or withdraw from courses.

The system will classify students as:

- **Standard advising**
- **May need additional support**
- **High priority for outreach**

Your task is to decide which features the system should be allowed to use.

## Part 3: Candidate Features

Review the possible features below.

For each feature, decide whether it should be:

- **Allowed**
- **Allowed with caution**
- **Not allowed**
- **Need more information**

| #   | Candidate Feature                                          | Decision | Why? |
| --- | ---------------------------------------------------------- | -------- | ---- |
| 1   | Current course grade                                       |          |      |
| 2   | Number of missing assignments                              |          |      |
| 3   | Attendance record                                          |          |      |
| 4   | Number of logins to the learning management system         |          |      |
| 5   | Time of day when assignments are submitted                 |          |      |
| 6   | Financial aid status                                       |          |      |
| 7   | First-generation college student status                    |          |      |
| 8   | Disability accommodation status                            |          |      |
| 9   | Home zip code                                              |          |      |
| 10  | High school GPA                                            |          |      |
| 11  | Major                                                      |          |      |
| 12  | Age                                                        |          |      |
| 13  | Whether the student works more than 20 hours per week      |          |      |
| 14  | Number of advising appointments attended                   |          |      |
| 15  | Prior course withdrawals                                   |          |      |
| 16  | Notes from faculty about participation                     |          |      |
| 17  | Student’s writing style in emails                          |          |      |
| 18  | Use of campus food pantry                                  |          |      |
| 19  | Housing status                                             |          |      |
| 20  | Whether the student has previously requested emergency aid |          |      |

## Part 4: Feature Analysis

Choose five features that produced disagreement or uncertainty in your group.

| Feature | Why Might It Be Predictive? | Why Might It Be Unfair, Invasive, or Risky? | Decision |
| ------- | --------------------------- | ------------------------------------------- | -------- |
|         |                             |                                             |          |
|         |                             |                                             |          |
|         |                             |                                             |          |
|         |                             |                                             |          |
|         |                             |                                             |          |

## Part 5: Proxy Variables

Some features may seem neutral but indirectly reveal sensitive information.

For example:

- zip code can act as a proxy for race, class, school quality, or neighborhood resources
- assignment submission time can act as a proxy for work schedule, caregiving responsibilities, or housing stability
- learning management system logins can act as a proxy for internet access or disability-related learning patterns

Complete the table below.

| Feature                               | What Could It Be a Proxy For? | Why Does That Matter? |
| ------------------------------------- | ----------------------------- | --------------------- |
| Home zip code                         |                               |                       |
| Time of day assignments are submitted |                               |                       |
| LMS login frequency                   |                               |                       |
| Food pantry use                       |                               |                       |
| Faculty notes about participation     |                               |                       |

## Part 6: Relevance vs. Legitimacy

Discuss the difference between these two questions:

1. **Is this feature predictive?**
2. **Should this feature be used?**

Choose one feature that might be predictive but should possibly not be used.

Write your response:

## Part 7: Social and Ethical Questions

Discuss:

- Who benefits if this system works well?
- Who could be harmed if the system misclassifies students?
- Could the system increase surveillance of students who are already vulnerable?
- Could students be punished or stigmatized for needing support?
- Should students be able to see, correct, or challenge the data used about them?
- Should some features be prohibited even if they improve prediction?
- What would meaningful human oversight look like?

## Part 8: Technical Translation

This lab illustrates several machine learning ideas.

| Lab Activity                               | Machine Learning Analogue         |
| ------------------------------------------ | --------------------------------- |
| Choosing candidate variables               | Feature selection                 |
| Asking whether variables are relevant      | Evaluating predictive signal      |
| Asking whether variables should be used    | Ethical and policy review         |
| Identifying proxy variables                | Bias and fairness analysis        |
| Deciding what data is off limits           | Governance and data minimization  |
| Asking whether students can challenge data | Contestability and accountability |

Key takeaway:

> Feature selection is not just a technical decision. It is a decision about what the system is allowed to notice.

## Part 9: Governance Recommendation

As a group, propose a feature policy for this advising system.

Your policy should include:

1. Features that are allowed.
2. Features that are allowed only with caution.
3. Features that should not be used.
4. What students should be told.
5. How students could challenge or correct the data.
6. What role human advisors should play.

## Deliverable: Feature Selection Memo

Submit a short memo that explains your group’s feature policy.

Your memo should include:

1. The purpose of the AI advising system.
2. Three features your group would allow.
3. Three features your group would prohibit or restrict.
4. One proxy variable concern.
5. One privacy concern.
6. One recommendation for human oversight.

## Suggested Memo Format

```markdown
# Feature Selection Memo

## System Purpose

What is the system supposed to do?

## Allowed Features

Which features should the system be allowed to use? Why?

## Restricted or Prohibited Features

Which features should be restricted or prohibited? Why?

## Proxy Variable Concern

Which feature could act as a proxy for something sensitive?

## Privacy Concern

What data might students reasonably object to being used?

## Human Oversight Recommendation

What should human advisors do before any action is taken?

## Final Recommendation

Should the system be used as proposed, redesigned, or rejected?
```

> ## What to Turn In
>
> Individually, answer:
>
> 1. What is one feature that seemed useful at first but became more complicated after discussion?
> 1. What is one question you would ask before allowing an AI system to use personal data about students?
