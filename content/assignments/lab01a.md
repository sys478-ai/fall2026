---
title: 'Classification Is Not Neutral'
scheduled_day: 3
num: '1a'
type: 'lab'
draft: 0
---

> Note. This is a lot like the anomaly detection lab in terms of substance. it would be good to think of some examples of categories (like 5 per set).
>
> Classification sorts examples into predefined categories. Anomaly detection compares examples to an expected pattern and flags those that differ enough from that pattern. In practice, anomaly detection often produces a classification-like label — normal or anomalous — but the underlying question is different: not “Which category is this?” but “Does this depart from what the system has learned to expect?”

How categories become technical, social, and moral decisions.

## Overview

AI systems often classify things: spam or not spam, safe or unsafe, suspicious or ordinary, eligible or ineligible, high risk or low risk. These classifications can seem objective because they are produced by software, statistics, or machine learning models. But before an AI system can classify anything, someone has to decide what the categories are, what they mean, what examples belong in each category, and what should happen after something is classified.

In this lab, you will examine classification as a human and social process. You will sort ambiguous examples into categories, compare your decisions with other groups, and reflect on what happens when classification systems are automated.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain that classification systems depend on human-made categories.
- Identify ambiguity, disagreement, and value judgments in classification tasks.
- Distinguish between “accuracy within a category system” and “whether the category system should exist.”
- Analyze how classification can produce social consequences when used in AI systems.
- Connect classification to later questions about anomaly detection, bias, surveillance, and governance.

## Key Terms

| Term           | Working Definition                                                      |
| -------------- | ----------------------------------------------------------------------- |
| Classification | Sorting examples into predefined categories.                            |
| Category       | A named group used to organize examples, people, objects, or behaviors. |
| Label          | The category assigned to a specific example.                            |
| Ambiguous case | An example that could reasonably fit more than one category.            |
| False positive | A case incorrectly classified as belonging to a category.               |
| False negative | A case incorrectly classified as not belonging to a category.           |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> **TODO: Need a better discussion prompt.** Think of a category that seems obvious until you have to define it. What makes it hard to define? Examples:
>
> <!-- .compact -->
>
> - safe / unsafe
> - normal / abnormal
> - professional / unprofessional
> - suspicious / harmless
> - healthy / unhealthy
> - human-written / AI-written
> - public / private
>
> Write 3–5 sentences.

## Part 2: Group Classification Task

Your group will receive a set of scenario cards. For each card, classify the scenario into one of the following categories:

- **Normal**
- **Suspicious / anomalous**
- **Need more context**
- **Should not be classified by an automated system**

For each card, also record:

- your group’s level of agreement: high / medium / low
- what context you wish you had
- what harm could occur if the scenario were misclassified

### Scenario Cards

| Card | Scenario                                                         |
| ---- | ---------------------------------------------------------------- |
| 1    | A person walks back and forth outside a building for 15 minutes. |
| 2    | A student logs into an account from a new city.                  |
| 3    | A worker enters the office at 2:00 a.m.                          |
| 4    | A shopper leaves a store without buying anything.                |
| 5    | A patient’s heart rate rises suddenly.                           |
| 6    | A car slows down abruptly on a highway.                          |
| 7    | A person wears a mask and sunglasses indoors.                    |
| 8    | A teenager spends an hour near a public library entrance.        |
| 9    | A server receives 10,000 requests in one minute.                 |
| 10   | A child does not make eye contact during a classroom activity.   |
| 11   | A user deletes many files quickly.                               |
| 12   | A person takes photos of a government building.                  |
| 13   | A package is left unattended near a bench.                       |
| 14   | A student submits an essay with unusually polished writing.      |
| 15   | A person speaks loudly to themselves in public.                  |
| 16   | A phone moves rapidly between locations.                         |
| 17   | A factory machine vibrates more than usual.                      |
| 18   | A person refuses to answer a security guard’s question.          |
| 19   | A car circles a block three times.                               |
| 20   | A network device sends data to an unfamiliar address.            |

## Part 3: Classification Table

Complete the table for at least 8 cards.

| Card # | Classification | Agreement Level | What Context Is Missing? | Possible Harm If Wrong |
| ------ | -------------- | --------------- | ------------------------ | ---------------------- |
|        |                |                 |                          |                        |
|        |                |                 |                          |                        |
|        |                |                 |                          |                        |
|        |                |                 |                          |                        |
|        |                |                 |                          |                        |
|        |                |                 |                          |                        |
|        |                |                 |                          |                        |
|        |                |                 |                          |                        |

## Part 4: Compare Across Groups

As a class, compare how different groups classified the same scenarios.

Discuss:

- Which examples produced the most disagreement?
- What assumptions shaped your group’s decisions?
- Did your group interpret “suspicious” as rare, harmful, rule-breaking, unexpected, or socially uncomfortable?
- Which examples could reflect disability, poverty, cultural difference, neurodivergence, caregiving, work schedules, or harmless behavior?
- What would happen if an automated system had to make a binary decision?

## Part 5: Technical Translation

Classification in AI systems often follows a similar process.

| Human Activity                | AI Analogue                  |
| ----------------------------- | ---------------------------- |
| Choose categories             | Define labels or classes     |
| Sort examples                 | Label training data          |
| Write category rules          | Create annotation guidelines |
| Handle ambiguous cases        | Decide edge-case policy      |
| Decide what counts as unusual | Define anomaly threshold     |
| Act on classification         | Make a deployment decision   |

Key takeaway:

> AI systems do not escape classification problems. They often scale them.

## Part 6: Social and Ethical Analysis

Choose one scenario from the lab and answer the following questions.

| Question                                                         | Response |
| ---------------------------------------------------------------- | -------- |
| What is being classified?                                        |          |
| Who might benefit from automating this classification?           |          |
| Who could be harmed?                                             |          |
| What context would be missing?                                   |          |
| What would count as a false positive?                            |          |
| What would count as a false negative?                            |          |
| Who should be allowed to challenge or appeal the classification? |          |
| Should this classification be automated at all? Why or why not?  |          |

## Deliverable: Classification Audit Memo

Submit a short memo that includes:

1. The scenario your group analyzed.
2. The category system your group used.
3. Two ambiguous cases.
4. The assumptions behind your classification decisions.
5. A false positive harm and a false negative harm.
6. A governance recommendation:
   - automate
   - automate only with human review
   - do not automate

## Suggested Memo Format

```markdown
# Classification Audit Memo

## Scenario

What are we classifying, and why?

## Category System

What categories did your group use?

## Ambiguous Cases

Describe two examples that were difficult to classify.

## Error Analysis

What would count as a false positive?
Who could be harmed by a false positive?

What would count as a false negative?
Who could be harmed by a false negative?

## Governance Recommendation

Should this classification be automated?
Explain your reasoning.
```

> ## What to Turn In
>
> Individually, answer:
>
> 1. What is one thing that changed in how you think about classification?
> 1. What is one question you would ask before trusting an AI classification system?
