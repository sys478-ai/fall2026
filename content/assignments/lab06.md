---
title: 'Neural Networks & Opacity'
scheduled_day: 13
num: '6'
type: 'lab'
draft: 0
---

## Neural Networks and Opacity

How layered models transform inputs into outputs, and why explanation is harder than “showing the numbers.”

## Overview

Neural networks are a major family of AI systems. They are inspired loosely by networks of neurons, but they are not brains. In most machine learning systems, a neural network takes input values, passes them through layers of mathematical transformations, and produces an output such as a classification, prediction, score, or recommendation.

Some neural networks are small enough to inspect. Others are so large and complex that even developers may not be able to explain exactly why a particular output was produced.

This raises important social and ethical questions. If an AI system makes or informs a decision about someone, what kind of explanation are they owed? Is it enough to know the input data? Is it enough to see the model’s weights? Is it enough to know that the system is usually accurate? Who needs what kind of explanation?

In this lab, you will trace a very small neural network by hand, then compare that experience to larger systems where explanation becomes more difficult.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain, at a high level, how a neural network transforms inputs into outputs.
- Identify why layered models can become difficult to interpret.
- Distinguish between seeing a model’s internal numbers and understanding a decision.
- Explain why different stakeholders may need different kinds of explanations.
- Connect opacity to accountability, trust, contestability, and governance.

## Key Terms

| Term | Working Definition |
| --- | --- |
| Neural network | A machine learning model made of connected layers that transform inputs into outputs. |
| Input | Data given to a model. |
| Weight | A number that changes the importance or influence of an input or connection. |
| Hidden layer | A layer between the input and output that transforms information. |
| Output | The result produced by a model, such as a score or classification. |
| Opacity | Difficulty understanding how or why a system produced a result. |
| Interpretability | The ability to understand how a model works internally. |
| Explainability | The ability to give a meaningful explanation of a model’s behavior or decision. |
| Contestability | The ability to question, challenge, appeal, or correct a system’s decision. |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> Think of a time when someone gave you an answer but did not explain how they got it. When was that acceptable? When would it not be acceptable?

Write 4–6 sentences.

Consider examples such as:

- a teacher grading an assignment
- a doctor giving a diagnosis
- a bank denying a loan
- a professor accusing a student of plagiarism
- an employer rejecting an applicant
- a platform removing a post
- a security system flagging someone as suspicious

## Part 2: Tiny Neural Network Scenario

A university is testing a tiny model that predicts whether a student may need additional advising support.

The model uses two input features:

| Input | Meaning |
| --- | --- |
| `x1` | Number of missing assignments |
| `x2` | Number of weeks since last advising contact |

The model produces one output:

| Output | Meaning |
| --- | --- |
| Support score | Higher score means the student may need additional support |

This is a simplified example. Real systems may use many more inputs, layers, and outputs.

## Part 3: The Model

This tiny neural network has:

- 2 input values
- 2 hidden nodes
- 1 output node

The model uses the following formulas.

### Hidden Node 1

```
h1 = (2 × x1) + (1 × x2)
```

### Hidden Node 2

```
h2 = (1 × x1) + (3 × x2)
```

### Output Score

```
score = (1 × h1) + (1 × h2)
```

A student is flagged for additional advising support if:

```
score >= 20
```

## Part 4: Trace the Model by Hand

Complete the table.

| Student | Missing Assignments (`x1`) | Weeks Since Advising (`x2`) | `h1 = (2×x1)+(1×x2)` | `h2 = (1×x1)+(3×x2)` | Score = `h1+h2` | Flagged? |
| --- | ---: | ---: | --- | --- | --- | --- |
| A | 1 | 2 | | | | |
| B | 3 | 1 | | | | |
| C | 4 | 3 | | | | |
| D | 0 | 6 | | | | |
| E | 5 | 0 | | | | |
| F | 2 | 5 | | | | |

## Part 5: First Interpretation

Discuss with your group:

- Which students were flagged?
- Which input seemed to matter more: missing assignments or weeks since advising?
- Did the model treat different reasons for concern differently?
- Were any results surprising?
- Was this model easy or hard to understand? Why?

Write your group’s response:

## Part 6: Change the Weights

Now imagine the university changes the model.

The new model gives more importance to missing assignments.

### New Hidden Node 1

```
h1 = (4 × x1) + (1 × x2)
```

### New Hidden Node 2

```
h2 = (3 × x1) + (1 × x2)
```

### Output Score

```
score = h1 + h2
```

A student is still flagged if:

```
score >= 20
```

Complete the table.

| Student | Missing Assignments (`x1`) | Weeks Since Advising (`x2`) | New `h1` | New `h2` | New Score | Flagged? |
| --- | ---: | ---: | --- | --- | --- | --- |
| A | 1 | 2 | | | | |
| B | 3 | 1 | | | | |
| C | 4 | 3 | | | | |
| D | 0 | 6 | | | | |
| E | 5 | 0 | | | | |
| F | 2 | 5 | | | | |

## Part 7: Compare the Two Models

Complete the comparison table.

| Student | Flagged by Original Model? | Flagged by New Model? | What Changed? |
| --- | --- | --- | --- |
| A | | | |
| B | | | |
| C | | | |
| D | | | |
| E | | | |
| F | | | |

Discuss:

- Which students changed classification?
- What value judgment might be reflected in the new weights?
- What kinds of students might be more visible to the new model?
- What kinds of students might be less visible?
- Who should decide which model is better?

## Part 8: From Tiny Models to Large Models

The model above was easy to inspect because it had only:

- 2 inputs
- 2 hidden nodes
- 1 output
- simple arithmetic

Now imagine a model with:

- 200 input features
- 50 hidden layers
- millions or billions of weights
- messy training data
- complex interactions between variables
- outputs that affect real people

Discuss:

- What becomes harder to understand?
- Would showing all the weights be enough?
- Would knowing the training data be enough?
- Would knowing the model’s overall accuracy be enough?
- What else would you want to know?

Write your group’s response:

## Part 9: Explanation for Whom?

Different people may need different explanations.

Complete the table.

| Stakeholder | What They Might Need to Know | Why It Matters |
| --- | --- | --- |
| Student who was flagged | | |
| Academic advisor | | |
| Professor | | |
| University administrator | | |
| Software developer | | |
| Auditor or regulator | | |
| Parent or family member | | |
| Student advocacy group | | |

## Part 10: Types of Explanation

Match each explanation type to what it can and cannot provide.

| Explanation Type | What It Can Help Explain | What It May Not Explain |
| --- | --- | --- |
| Input explanation: “These data were used.” | | |
| Score explanation: “The student received a score of 22.” | | |
| Feature importance: “Missing assignments mattered most.” | | |
| Model explanation: “Here is how the model transforms inputs.” | | |
| Data explanation: “Here is what data the model was trained on.” | | |
| Policy explanation: “Here is what happens after someone is flagged.” | | |
| Appeal explanation: “Here is how to challenge or correct the decision.” | | |

## Part 11: Social and Ethical Questions

Discuss:

- When is a system too opaque to use in a high-stakes setting?
- Is it acceptable to use a system if it is accurate but difficult to explain?
- Who should bear the burden of understanding the system?
- What should happen if a person is harmed by a decision no one can explain?
- Should affected people have a right to know when AI was used?
- Should affected people have a right to appeal or challenge AI-assisted decisions?
- What kinds of documentation should institutions be required to keep?
- How should human reviewers use AI outputs without simply rubber-stamping them?

## Part 12: Technical Translation

This lab illustrates several machine learning ideas.

| Lab Activity | Machine Learning Analogue |
| --- | --- |
| Entering `x1` and `x2` | Providing input features |
| Multiplying by weights | Weighting inputs |
| Calculating hidden nodes | Transforming data in hidden layers |
| Calculating the support score | Producing a model output |
| Applying `score >= 20` | Setting a decision threshold |
| Changing the weights | Changing what the model pays attention to |
| Asking who needs explanation | Explainability and governance review |
| Asking how to appeal | Contestability and accountability |

Key takeaway:

> Seeing the numbers inside a model is not the same as understanding the decision, and understanding the decision is not the same as knowing whether it should be used.

## Part 13: Connection to Brain-Inspired and Neuromorphic Systems

Neural networks are often described using brain-inspired language: neurons, connections, weights, learning, activation, and memory.

These metaphors can be useful, but they can also be misleading.

In later labs, we will examine neuromorphic systems, spiking neural networks, and hardware-level anomaly detection. These systems may raise additional explanation challenges because their behavior may depend on spike timing, changing internal states, hardware constraints, or on-device learning.

Discuss:

- What does the “neural” metaphor help explain?
- What does it hide?
- Does calling a system “brain-inspired” make it seem more trustworthy?
- What kinds of explanations would be needed for a system that learns or changes after deployment?

## Deliverable: Explanation Needs Memo

Submit a short memo that analyzes explanation needs for the advising model.

Your memo should include:

- A brief description of what the model does.
- One example of a student whose classification changed when the weights changed.
- An explanation of what changed and why.
- Two stakeholder groups and what each would need to know.
- One risk of using an opaque model in this setting.
- One recommendation for transparency, documentation, or appeal.

### Suggested Memo Format

```markdown
# Explanation Needs Memo

## System Purpose

What is the model supposed to do?

## Model Behavior

Describe one student whose classification changed when the weights changed.

## What Changed?

What did the new model pay more attention to?
What value judgment might this reflect?

## Stakeholder Explanation Needs

Choose two stakeholder groups.
What would each group need to know?

## Opacity Risk

What could go wrong if the system is hard to explain?

## Recommendation

What transparency, documentation, human review, or appeal process should be required?
```

## Exit Ticket

Individually, answer:

1. What is one way a neural network can be understandable in theory but still difficult to explain in practice?
2. What is one kind of explanation an affected person should receive?
3. What is one question you would ask before allowing an opaque AI system to influence a high-stakes decision?
