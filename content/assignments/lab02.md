---
title: 'Training Data Shapes Learning'
scheduled_day: 5
num: '2'
type: 'lab'
draft: 0
---

## Training Data Shapes Learning

How examples, labels, and missing cases shape what AI systems learn.

## Overview

Machine learning systems learn from examples. Those examples are often called training data. If the training data is narrow, incomplete, mislabeled, or shaped by unequal social conditions, the system may learn patterns that work well for some people or situations but fail for others.

In this lab, you will work with a small fictional dataset. You will use the dataset to create a simple classification rule, test that rule on new examples, and analyze how the training data shaped the system’s behavior.

The goal is not to build a sophisticated model. The goal is to see how “learning from data” depends on what data is available, how it is labeled, and whose examples are missing.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain what training data is and why it matters.
- Describe how biased or incomplete training data can shape model behavior.
- Identify who or what is missing from a dataset.
- Explain why a model may perform differently across groups or contexts.
- Connect training data problems to bias, fairness, accountability, and governance.

## Key Terms

| Term           | Working Definition                                          |
| -------------- | ----------------------------------------------------------- |
| Training data  | Examples used to teach a machine learning system a pattern. |
| Label          | The target category assigned to an example.                 |
| Test data      | New examples used to evaluate how well a system learned.    |
| Bias           | A systematic pattern of error or unfairness.                |
| Representation | Who or what is included in the data.                        |
| Generalization | How well a system applies what it learned to new examples.  |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Think of a time when someone made an assumption based on too few examples. What went wrong?

Write 3–5 sentences.

## Part 2: Scenario

Imagine that a university is developing a simple AI system to flag student messages that may require urgent support. The system will classify messages as either:

- **Routine**
- **Needs urgent follow-up**

The university wants the system to help staff identify students who may need academic, emotional, financial, or safety-related support.

Your group has been given a small training dataset.

## Part 3: Training Dataset

Review the following examples.

| ID  | Message                                                | Label                  |
| --- | ------------------------------------------------------ | ---------------------- |
| 1   | “I am confused about the homework deadline.”           | Routine                |
| 2   | “Can I meet with my advisor next week?”                | Routine                |
| 3   | “I need help finding the reading for class.”           | Routine                |
| 4   | “I missed class because I was sick. What did I miss?”  | Routine                |
| 5   | “I am worried about my grade in this course.”          | Routine                |
| 6   | “I can’t afford the textbook and I’m falling behind.”  | Needs urgent follow-up |
| 7   | “I don’t have a safe place to stay tonight.”           | Needs urgent follow-up |
| 8   | “I have not eaten today and I don’t know where to go.” | Needs urgent follow-up |
| 9   | “I am having a panic attack and cannot calm down.”     | Needs urgent follow-up |
| 10  | “I feel like I might hurt myself.”                     | Needs urgent follow-up |

## Part 4: Build a Simple Rule

Based only on the training data, write a simple rule for classifying future messages.

Your rule might use:

- specific words
- tone
- topic
- urgency
- severity
- references to safety, housing, food, money, or self-harm

Write your group’s rule here:

> If a message includes **\_\_\_**, then classify it as **\_\_\_**.

Now write a more complete version:

**Our classification rule:**

## Part 5: Test Your Rule

Apply your rule to the following new messages.

| ID  | New Message                                                                | Your Classification | Why? |
| --- | -------------------------------------------------------------------------- | ------------------- | ---- |
| A   | “I’m so overwhelmed I can’t think straight.”                               |                     |      |
| B   | “I lost my job and may need to drop out.”                                  |                     |      |
| C   | “Sorry I disappeared. Things have been really bad.”                        |                     |      |
| D   | “Can you explain the assignment again?”                                    |                     |      |
| E   | “I am scared to go back to my dorm.”                                       |                     |      |
| F   | “I keep sleeping through class and I don’t know why.”                      |                     |      |
| G   | “This class is killing me lol.”                                            |                     |      |
| H   | “I need to talk to someone but I don’t want to make a big deal out of it.” |                     |      |
| I   | “I don’t have internet at home and can’t submit my work.”                  |                     |      |
| J   | “Everything is fine.”                                                      |                     |      |

## Part 6: Analyze the Dataset

Discuss the following questions with your group.

### 1. What did the training data make easy to learn?

Write your response:

### 2. What did the training data make hard to learn?

Write your response:

### 3. What types of student needs were included?

Write your response:

### 4. What types of student needs were missing or underrepresented?

Write your response:

### 5. Which test messages were hardest to classify?

Write your response:

## Part 7: Error Analysis

Choose two test messages where your group was uncertain.

| Message ID | Why Was It Ambiguous? | Possible False Positive Harm | Possible False Negative Harm |
| ---------- | --------------------- | ---------------------------- | ---------------------------- |
|            |                       |                              |                              |
|            |                       |                              |                              |

**Definitions:**

- A **false positive** happens when the system flags a message as urgent when it is not.
- A **false negative** happens when the system fails to flag a message that really does need urgent follow-up.

## Part 8: Social and Ethical Questions

Discuss:

- What kinds of students might be helped by this system?
- What kinds of students might be misunderstood by this system?
- What if students use humor, sarcasm, slang, indirect language, or culturally specific expressions?
- What if some students avoid direct language because they fear punishment, stigma, or surveillance?
- Should the system automatically alert someone?
- Should students be told that their messages are being classified?
- What safeguards should be required?

## Part 9: Technical Translation

This lab illustrates several machine learning ideas.

| Lab Activity                                  | Machine Learning Analogue         |
| --------------------------------------------- | --------------------------------- |
| Reviewing examples                            | Inspecting training data          |
| Looking at labels                             | Understanding the target variable |
| Writing a rule                                | Learning a pattern                |
| Testing new messages                          | Evaluating generalization         |
| Finding difficult examples                    | Identifying edge cases            |
| Comparing false positives and false negatives | Evaluating model errors           |
| Asking who is missing                         | Auditing dataset representation   |

Key takeaway:

> A model can only learn from the examples, labels, and assumptions it is given.

## Deliverable: Training Data Audit

Submit a short audit of the training dataset.

Your audit should include:

- A description of what the system is supposed to classify.
- Your group’s classification rule.
- Two examples the rule handled well.
- Two examples the rule handled poorly or uncertainly.
- A discussion of what was missing from the training data.
- A recommendation for improving the dataset or limiting the system.

### Suggested Audit Format

```markdown
# Training Data Audit

## System Purpose

What is the system supposed to classify?

## Rule Learned from Training Data

What pattern did your group infer?

## What Worked

Which examples were easy to classify, and why?

## What Did Not Work

Which examples were difficult, and why?

## Missing Data

Who or what was missing from the training dataset?

## Risks

What harms could result from false positives?
What harms could result from false negatives?

## Recommendation

What should change before this system is used?
```

## Exit Ticket

Individually, answer:

> What is one way training data can shape what a system learns?
