---
card_type: technical-explainer
id: te-supervised-learning
slug: supervised-learning
title: 'Supervised Learning'
subtitle: 'How machines learn from labeled examples – and why what the system learns depends entirely on what people decided to label.'
num: '1'
order: 1
related_recognition_cards: ['8', '23', '25', '7']
related_concept_cards: []
field_guide_section: 'technical-explainers'
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

## What Is Supervised Learning?

**Supervised learning** starts with a question like this:

<blockquote class="framing-question">
<p>Here are resumes from people who became great employees. Here are resumes from applicants we passed on. If we give you a few thousand resumes of people that we hired / passed on, can you build us a resume screening <strong>model</strong> – a way of deciding which features of a resume matter – to tell the two groups apart?</p>
</blockquote>

This involves having ***labeled data*** -- which resumes that lead to hirings and which didn't -- and a supervised learning algorithm that can figure out which aspects of a resume matter most.

That is valuable when the same sorting problem repeats at scale – screening medical images, filtering spam, scoring risk. It is limited when labels are noisy, biased, or a poor guide to the future. The hiring example shows why: "great employee" and "passed on" are not facts written in the resume. They are **past human decisions**. The system learns to reproduce them – including whatever criteria, inconsistencies, or biases those decisions carried.

## Example: Medical Diagnostics

One widely studied example of supervised learning is screening for **diabetic retinopathy** – a disease that can cause vision loss in people with diabetes. It develops slowly, and catching it early matters. But there are not enough eye specialists in many parts of the world to screen every patient who needs it (and of course training a model to do this kind of thing means that fewer people are needed to do this task). Researchers had an idea:

<blockquote class="framing-question">
Could a computer learn to look at photographs of the eye and detect early signs of the disease?
</blockquote>

To teach it, they collected thousands of eye photographs that specialist doctors had already reviewed and labeled – each image marked with a category: **no disease**, **mild**, **moderate**, **severe**, or **proliferative** (the most serious stage).[^1]

The system studied those labeled photographs. It found patterns connecting what the image looks like to what category doctors assigned. Now, when it sees a new photograph it has never encountered before, it can predict which category it belongs to.

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised1.png" />

## How It Works

{% step-strip %}

### 1. Label thousands of examples

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised2.png" />

Specialist doctors reviewed thousands of eye photographs and assigned each one a category. This is called the **training data** – a large collection of examples where the correct answer is already known.

### 2. Train the system

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised3.png" />

The system looks at all the labeled photographs and tries to find patterns – combinations of visual features that tend to appear in each category. It adjusts its internal settings based on those patterns until it can predict labels accurately on the examples it has seen.

### 3. Classify new photographs

<img src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised4.png" />

When a new, unlabeled photograph comes in, the system assigns it a category – and a confidence score showing how certain it is.

{% endstep-strip %}

Once trained, the classifier can be used on many new unlabeled eye images, sorting each one into one of the five categories it learned from the labeled examples.

<img class="mt-8" src="/fall2026/images/ethics-field-guide/technical-explainers/supervised/supervised5.png" />

Notably, a very similar technique can be applied to other kinds of classification tasks – whether a system is sorting emails into folders, identifying species of plants from photographs, or estimating how likely a patient is to be readmitted to a hospital. What changes is the number of categories, the meaning of each one, and the stakes involved.

## What Labels Are – and Why They Matter

Before the system could learn anything, doctors had to label thousands of photographs. That labeling process looks straightforward – but it involves real judgment calls.

Two specialists looking at the same photograph sometimes disagree. Mild and moderate can be genuinely hard to distinguish. The criteria for each category had to be defined, agreed upon, and applied consistently – by people, with all the variability that involves.[^2]

**The system learns to reproduce the labels it was given – not some objective truth about the photographs.** If the labeling criteria change, or if different specialists labeled different parts of the dataset, the system inherits that inconsistency.

## What Can Go Wrong

**Training data carries the context it came from.** The diabetic retinopathy system was trained largely on photographs from specific populations and camera equipment. When researchers tested it on photographs from other contexts – different cameras, different populations, different lighting conditions – performance dropped.[^3] The system had learned patterns from one setting and was being asked to generalize to another.

**Labels encode the judgment of the people who assigned them.** In medicine, labeling requires expertise and careful protocols. In other contexts – hiring, criminal justice, credit – labels come from historical decisions that may have been discriminatory, inconsistent, or shaped by institutional pressures. The system cannot tell the difference between a carefully considered label and a biased one. It treats them all as ground truth.

**A single accuracy number can hide unequal performance.** A system that performs well on average may perform worse for patients whose photographs look different from the majority of the training data – different skin tones affecting how blood vessels appear, for example. That variation may not appear in overall accuracy statistics.

**The same approach applied elsewhere raises harder questions.** Supervised learning trained on historical hiring decisions will learn to reproduce those decisions – including any biases they contained. The same mechanism that helps detect disease can sort job applicants, score loan applications, or predict recidivism. The technique is the same. What changes is what was labeled, by whom, and with what consequences when the system gets it wrong.

## Key Takeaways

1. Supervised learning finds patterns in labeled examples. It does not discover truth on its own.
2. Labels are human decisions, so the system learns to reproduce judgment, not objective reality.
3. Training data carries the context it came from, which means a system may work differently in a new setting.
4. Accuracy alone is not enough. A system can perform well on average while still harming some groups more than others.
5. The same technique can be used across many domains, but the consequences of being wrong depend on where it is used.

## Related Course Concepts

{% flip-cards %}

    {% flip-card icon="fa-tags" title="Labels Are Made by People" %}
        If supervised learning depends on labels, where did those labels come from?

        ---

        Labels do not appear naturally in the world. People define them, debate them, and apply them unevenly. That is why supervised learning connects to [Data is produced, not found](/fall2026/field-guide/sts-concepts/data-is-produced-not-found).
    {% endflip-card %}

    {% flip-card icon="fa-clock-rotate-left" title="Past Decisions Shape Future Predictions" %}
        What happens when a model learns from historical decisions?

        ---

        A supervised system trained on past choices can reproduce the assumptions and inequalities built into those choices. That is why this explainer connects to [Prediction imports the past](/fall2026/field-guide/deployment-patterns/prediction-imports-the-past).
    {% endflip-card %}

    {% flip-card icon="fa-chart-simple" title="Averages Can Hide Harm" %}
        Why isn't one accuracy score enough?

        ---

        Aggregate success can hide who is being misclassified more often and who absorbs the cost when the system is wrong. That is the broader issue in [Concentrated harm is hidden by aggregate benefit](/fall2026/field-guide/deployment-patterns/concentrated-harm-is-hidden-by-aggregate-benefit).
    {% endflip-card %}

{% endflip-cards %}

{% collapsible closed %}

## Going Deeper: How the Training Process Works

During training, the system repeatedly compares its predictions to the correct labels, measures how wrong it was, and adjusts its internal settings slightly in the direction that would have reduced that error.[^4] After many thousands of repetitions, the settings stabilize.

Two important limits of this process:

- The system can only minimize errors on its training data. It has no guarantee of performing well on examples that look different from what it was trained on.[^5]
- Minimizing errors does not mean the system has learned something meaningful about the world. It means it has gotten better at predicting the labels in its training set – whatever those labels encode.[^4]

{% endcollapsible %}

## References

[^1]: Gulshan, V., Peng, L., Coram, M., et al. Development and validation of a deep learning algorithm for detection of diabetic retinopathy in retinal fundus photographs. _JAMA._ 2016;316(22):2402–2410. [JAMA full text](https://jamanetwork.com/journals/jama/fullarticle/2588763)

[^2]: Sayres, R., et al. Grader variability and the importance of reference standards for evaluating machine learning models for diabetic retinopathy. _Ophthalmology._ 2019;126(9):1264–1272. [AAO abstract](https://www.aaojournal.org/article/S0161-6420(17)32698-2/abstract)

[^3]: Voets, M., Møllersen, K., & Bongo, L. A. Reproduction study using public data of Gulshan et al.'s diabetic retinopathy algorithm. _PLOS ONE._ 2019;14(6):e0217541. [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC6553744/); Zhou, Y., et al. Deep learning generalization for diabetic retinopathy staging from fundus images. _Physiol Meas._ 2025. [IOPscience](https://iopscience.iop.org/article/10.1088/1361-6579/ada86a)

[^4]: Mitchell, T. M. _Machine Learning._ McGraw-Hill, 1997 (Ch. 1–2 on inductive learning and error minimization); [Google Machine Learning Crash Course: supervised learning](https://developers.google.com/machine-learning/crash-course/supervised-machine-learning/introduction)

[^5]: Mitchell, T. M. _Machine Learning,_ Ch. 2; [Google Machine Learning Crash Course: gradient descent](https://developers.google.com/machine-learning/crash-course/reducing-loss/gradient-descent)
