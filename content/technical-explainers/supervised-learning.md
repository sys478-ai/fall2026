---
card_type: technical-explainer
id: te-supervised-learning
slug: supervised-learning
title: 'Supervised Learning'
subtitle: 'How machines learn from labeled examples — and why what the system learns depends entirely on what people decided to label.'
num: '1'
order: 1
related_recognition_cards: ['8', '23', '25', '7']
related_concept_cards: []
related_labs: ['1a', '2', '3', '4', '5', '6']
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

## The Basic Idea

People with diabetes can lose their vision to a disease called diabetic retinopathy. It develops slowly, and catching it early matters. But there are not enough eye specialists in many parts of the world to screen every patient who needs it.

Researchers had an idea: could a computer learn to look at photographs of the eye and detect early signs of the disease?

To teach it, they collected thousands of eye photographs that specialist doctors had already reviewed and labeled — each image marked with a category: **no disease**, **mild**, **moderate**, **severe**, or **proliferative** (the most serious stage).

The system studied those labeled photographs. It found patterns connecting what the image looks like to what category doctors assigned. Now, when it sees a new photograph it has never encountered before, it can predict which category it belongs to.

That is supervised learning: **show the system many examples that have already been labeled by humans, let it find patterns, and use those patterns to classify new examples.**

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised1.png" />

## How It Works

**Step 1: Label thousands of examples.**
Specialist doctors reviewed thousands of eye photographs and assigned each one a category. This is called the **training data** — a large collection of examples where the correct answer is already known.

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised2.png" />

**Step 2: Train the system.**
The system looks at all the labeled photographs and tries to find patterns — combinations of visual features that tend to appear in each category. It adjusts its internal settings based on those patterns until it can predict labels accurately on the examples it has seen.

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised3.png" />

**Step 3: Classify new photographs.**
When a new, unlabeled photograph comes in, the system assigns it a category — and a confidence score showing how certain it is.

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised4.png" />

Once trained, the classifier can be used on many new unlabeled eye images, sorting each one into one of the five categories it learned from the labeled examples.

<img class="mt-8" src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised5.png" />

Notably, a very similar technique can be applied to other kinds of classification tasks - whether a system is sorting emails into folders, identifying species of plants from photographs, or estimating how likely a patient is to be readmitted to a hospital. What changes is the number of categories, the meaning of each one, and the stakes involved.

## What Labels Are — and Why They Matter

Before the system could learn anything, doctors had to label thousands of photographs. That labeling process looks straightforward — but it involves real judgment calls.

Two specialists looking at the same photograph sometimes disagree. Mild and moderate can be genuinely hard to distinguish. The criteria for each category had to be defined, agreed upon, and applied consistently — by people, with all the variability that involves.

**The system learns to reproduce the labels it was given — not some objective truth about the photographs.** If the labeling criteria change, or if different specialists labeled different parts of the dataset, the system inherits that inconsistency.

## What Can Go Wrong

**Training data carries the context it came from.** The diabetic retinopathy system was trained largely on photographs from specific populations and camera equipment. When researchers tested it on photographs from other contexts — different cameras, different populations, different lighting conditions — performance dropped. The system had learned patterns from one setting and was being asked to generalize to another.

**Labels encode the judgment of the people who assigned them.** In medicine, labeling requires expertise and careful protocols. In other contexts — hiring, criminal justice, credit — labels come from historical decisions that may have been discriminatory, inconsistent, or shaped by institutional pressures. The system cannot tell the difference between a carefully considered label and a biased one. It treats them all as ground truth.

**A single accuracy number can hide unequal performance.** A system that performs well on average may perform worse for patients whose photographs look different from the majority of the training data — different skin tones affecting how blood vessels appear, for example. That variation may not appear in overall accuracy statistics.

**The same approach applied elsewhere raises harder questions.** Supervised learning trained on historical hiring decisions will learn to reproduce those decisions — including any biases they contained. The same mechanism that helps detect disease can sort job applicants, score loan applications, or predict recidivism. The technique is the same. What changes is what was labeled, by whom, and with what consequences when the system gets it wrong.

## Key Takeaways

1. Supervised learning finds patterns in labeled examples. It does not reason about the world — it finds what tends to go with what in the data it was trained on.
2. Labels are human decisions. The system learns to reproduce what people decided, not what is objectively true.
3. Training data carries the context it came from. A system trained in one setting may not generalize well to another.
4. Aggregate accuracy can hide unequal performance across groups.
5. The same technique applies across many domains. The stakes depend on what is being classified, and what happens when the system is wrong.

{% collapsible closed %}

## Going Deeper: How the Training Process Works

During training, the system repeatedly compares its predictions to the correct labels, measures how wrong it was, and adjusts its internal settings slightly in the direction that would have reduced that error. After many thousands of repetitions, the settings stabilize.

Two important limits of this process:

- The system can only minimize errors on its training data. It has no guarantee of performing well on examples that look different from what it was trained on.
- Minimizing errors does not mean the system has learned something meaningful about the world. It means it has gotten better at predicting the labels in its training set — whatever those labels encode.

{% endcollapsible %}

## Critical Bridge

| What the system does                      | What that creates                                          | Field guide resource                                                                                                                           |
| ----------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Learns from historically labeled data     | Training context shapes what the system can and cannot see | [Prediction imports the past](/fall2026/field-guide/deployment-patterns/prediction-imports-the-past)                                           |
| Labels encode human judgment              | System reproduces decisions, not ground truth              | [Data is produced, not found](/fall2026/field-guide/sts-concepts/data-is-produced-not-found)                                                   |
| Optimizes for the metric it is given      | Measurable target can replace real goal                    | [Changing what gets measured changes what exists](/fall2026/field-guide/deployment-patterns/changing-what-gets-measured-changes-what-exists)   |
| Reports accuracy in aggregate             | Group-level failures become invisible                      | [Concentrated harm is hidden by aggregate benefit](/fall2026/field-guide/deployment-patterns/concentrated-harm-is-hidden-by-aggregate-benefit) |
| Requires a threshold to produce decisions | Threshold choice determines who is harmed by errors        | [Thresholds make uncertainty consequential](/fall2026/field-guide/deployment-patterns/thresholds-make-uncertainty-consequential)               |
