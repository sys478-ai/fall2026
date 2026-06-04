---
title: 'Clustering Lab'
num: '1c'
type: 'lab'
draft: 0
---

## Clustering Is Not Neutral

How categories become technical, social, and moral decisions.

### Core Learning Goals

By the end of the lab, students should be able to:

- Explain that classification systems depend on human-made categories.
- Identify ambiguity, disagreement, and value judgments in classification tasks.
- Distinguish between “accuracy within a category system” and “whether the category system should exist.”
- Analyze how classification can produce social consequences when used in AI systems.
- Connect classification to later questions about anomaly detection, bias, surveillance, and governance.

This connects well to BRAID because anomaly detection depends on distinguishing “normal” from “anomalous,” and your existing ELSI prompts already ask what happens when a system classifies activity as normal or suspicious, when anomaly detection is too sensitive or not sensitive enough, and who is responsible when an unexplained spiking event triggers action.

### Basic Lab Structure

I'd run it in four rounds.

| Phase                       | Time     | Purpose                                                       |
| --------------------------- | -------- | ------------------------------------------------------------- |
| 1. Warm-up classification   | 10 min   | Show that categorization feels easy until cases get ambiguous |
| 2. Group sorting task       | 20 min   | Make students create/argue over categories                    |
| 3. Compare category systems | 20 min   | Reveal disagreement and hidden assumptions                    |
| 4. AI/social translation    | 25 min   | Connect classification to real systems and governance         |
| 5. Exit reflection          | 5–10 min | Individual synthesis                                          |

**Total:** 75–85 minutes, easy to adapt to 50 minutes.

## Version C: Classification Versus Clustering

This version is especially useful for BRAID later.

### Activity

Give students colored dots, short text snippets, or behavior examples.

- **Round 1: You provide labels.** Students classify items into predefined categories.
- **Round 2: No labels.** Students cluster items by similarity.
- **Round 3: Introduce a new item.** Students decide whether it belongs to an existing group or is anomalous.

### What This Teaches

- Classification uses predefined categories.
- Clustering groups examples by similarity.
- Anomaly detection identifies things that do not fit learned patterns.
- All three depend on decisions about similarity, difference, distance, and context.

This directly prepares students for your SNN color-clustering / anomaly-detection activity, where stakeholders train a system to cluster similar colors and detect anomalous inputs.

### Simple Version With Colors

Give students 30 color swatches.

**Round 1:** Sort these into red, blue, green, yellow.

**Round 2:** Now sort them into whatever groups make sense to you.

**Round 3:** Now decide which new color is anomalous.

Then ask:

- Is purple anomalous if your categories are red/blue/green/yellow?
- Is purple anomalous if you have a “cool colors” cluster?
- Is a rare color automatically a problem?
- What happens when “rare” becomes “risky”?

This is elegant because it starts harmless and then becomes conceptually serious.

## Recommended Lab Design

I would combine Version A + Version C.

Use everyday “normal/suspicious” cards first, then end with a short technical bridge to classification/clustering/anomaly detection.

## Full Lab Plan

### Part 1: Opening Prompt (5 minutes)

Ask students to write privately:

> Think of a category that seems obvious until you have to define it. What makes it hard to define?

**Examples:**

- adult / child
- safe / unsafe
- normal / abnormal
- spam / not spam
- healthy / unhealthy
- suspicious / harmless
- human-written / AI-written

Then briefly discuss.

### Part 2: Group Classification (20 minutes)

Give groups the 20 scenario cards.

**Instructions:** Sort each card into one of four categories:

- Normal
- Suspicious/anomalous
- Need more context
- Should not be classified by an automated system

For each card, students mark:

- level of agreement: high / medium / low
- what context they wanted
- possible harm if misclassified

### Part 3: Compare Results (15 minutes)

Create a board with a few high-disagreement cards.

Ask:

- Which examples did groups classify differently?
- What assumptions led to different decisions?
- Did any group change its mind after hearing another group?

### Part 4: Technical Translation (15 minutes)

Introduce a mini-framework:

| Human activity                | AI analogue                  |
| ----------------------------- | ---------------------------- |
| Choose categories             | Define labels/classes        |
| Sort examples                 | Label training data          |
| Write category rules          | Create annotation guidelines |
| Handle ambiguous cases        | Decide edge-case policy      |
| Decide what counts as unusual | Define anomaly threshold     |
| Act on classification         | Deployment decision          |

Then make the key point:

> AI systems do not escape classification problems. They often scale them.

### Part 5: Social and Ethical Analysis (15 minutes)

Ask groups to choose one scenario and answer:

| Question                                               | Response |
| ------------------------------------------------------ | -------- |
| Who might benefit from automating this classification? |          |
| Who could be harmed?                                   |          |
| What context would be missing?                         |          |
| What errors are likely?                                |          |
| Who should be allowed to challenge the classification? |          |
| Should this be automated at all?                       |          |

### Part 6: Exit Ticket (5 minutes)

Students respond individually:

1. What is one thing that changed in how you think about classification?
2. What is one question you would ask before trusting an AI classification system?

## Worksheet Skeleton

You could make the worksheet very simple.

```markdown
# Lab: Classification Is Not Neutral

## Part 1: Warm-up

Name a category that seems obvious but is hard to define:

Why is it hard?

## Part 2: Classification Task

For each card, choose:

- Normal
- Suspicious / anomalous
- Need more context
- Should not be classified by an automated system

| Card # | Classification | Agreement level | What context is missing? | Possible harm if wrong |
| ------ | -------------- | --------------- | ------------------------ | ---------------------- |
| 1      |                |                 |                          |                        |
| 2      |                |                 |                          |                        |
| 3      |                |                 |                          |                        |
| 4      |                |                 |                          |                        |
| 5      |                |                 |                          |                        |

## Part 3: Reflection

1. Which cards were hardest to classify?

2. What assumptions did your group make?

3. What might happen if this classification were automated?

4. Who should be able to challenge or appeal the classification?

5. Are there any categories that should not be automated? Why?
```

## How to Connect It to Course Themes

After the lab, you can introduce a short conceptual takeaway:

> Classification is not simply the act of putting things into correct boxes. It involves deciding what boxes exist, what they mean, who defines them, what evidence matters, what happens to ambiguous cases, and what consequences follow.

That sentence could become a recurring course principle.

### Connection to Later Labs

| Later lab         | How this lab prepares students                                               |
| ----------------- | ---------------------------------------------------------------------------- |
| Training data     | Labels come from classification decisions                                    |
| Features          | Features are chosen to support category judgments                            |
| Thresholds        | Classification often depends on where a line is drawn                        |
| Bias              | Categories can encode social histories                                       |
| Anomaly detection | “Normal” and “anomalous” are classification decisions                        |
| Explainability    | Explanations depend on how categories are defined                            |
| BRAID             | Hardware-level anomaly detection still depends on classification assumptions |

## Lab Deliverable

To make it feel like a real lab, ask students to produce a small artifact.

Each group submits a **classification audit memo**:

- The category system they used
- Three ambiguous cases
- The assumptions behind their classifications
- The likely false positive and false negative harms
- A recommendation: automate, automate with human review, or do not automate

**Short version:** one page.

### Example Memo Structure

```markdown
# Classification Audit Memo

## Classification context

What are we classifying, and why?

## Category definitions

Define each category.

## Ambiguous cases

Describe 2–3 examples that were difficult to classify.

## Error analysis

What would count as a false positive?
What would count as a false negative?
Who would be harmed by each?

## Governance recommendation

Should this classification be automated?

- Yes
- Yes, but only with human review
- No

Explain why.
```

That gives you something assessable.

## The Main Caution

Avoid making the lab accidentally reinforce harmful stereotypes.

For example, if you use “suspicious behavior” examples, make sure the debrief explicitly surfaces how such categories can encode racism, ableism, class bias, xenophobia, gender norms, and assumptions about public space.

You can also use fictional or institutionally neutral examples first, then move into more sensitive examples carefully.

### Safer Opening Domains

- spam / not spam
- recyclable / not recyclable
- school email triage
- campus incident routing
- library noise complaints
- health-monitor alerts
- network traffic
