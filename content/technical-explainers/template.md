---
id: template
slug: template
title: 'Technical Explainer Template'
subtitle: 'What every technical explainer should include so students can move from mechanism to consequences without getting lost in jargon.'
card_type: technical-explainer
field_guide_section: 'technical-explainers'
num: '99'
order: 99
related_recognition_cards: []
related_concept_cards: []
related_labs: []
hide_from_list: 1
status: in-progress
status_reviewer: svanwart
status_date: 2026-07-01
status_notes: 'Canonical drafting template for technical explainers.'
priority: medium
heading_max_level: 2
---

Use this page as the simple template for new technical explainers.

## 1. Title + One-Line Hook <span class="badge required">Required</span>

**Description:** Use a short title and a subtitle in this pattern: "How X does Y - and why Z matters."

**Example:** For instance, in the [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) example
"How machines learn from labeled examples - and why what the system learns depends entirely on what people decided to label," the page explains the mechanism and immediately signals the governance issue.

## 2. The Basic Idea <span class="badge required">Required</span>

**Description:** Open with one concrete scenario: a patient, sensor, chip, dataset, or device. Do not start with a dictionary definition.

**Example:** For instance, in the [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) example, by beginning with diabetic retinopathy screening from eye images, students can picture one real system before the technical explanation starts.

## 3. How It Works <span class="badge required">Required</span>

**Description:** Explain the mechanism step by step using the same scenario from **The Basic Idea**. Keep the main explanation in plain language.

**Example:** The [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) example walks through labeling examples, training the system, and classifying new photographs. The explanation stays concrete, sequential, and tied to the same example.

> ### 3.1. Concept-Specific Middle Section <span class="badge optional">Optional</span>
>
> **Description:** Add one focused middle section only when the topic has one especially important nuance.
>
> **Example:**
>
> - In the [Anomaly Detection](/fall2026/field-guide/technical-explainers/anomaly-detection) example, there's an additional "Why Thresholds Matter."
> - Similarly, in the [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) example, there's a section on "What Labels Are - and Why They Matter."
>
> Both of these pull out an important technical detail that has an important governance-relevant aspect.

## 4. What Can Go Wrong <span class="badge required">Required</span>

**Description:** Explain the main failure modes in plain language and connect them to accountability, harm, or governance.

**Example:** In the [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) example, specific failure modes are explained, such as: training-context mismatch, biased labels, and hidden unequal performance. Here, the risks come directly from the mechanism rather than from a generic ethics list.

## 5. Key Takeaways <span class="badge required">Required</span>

**Description:** End with a plain-language summary of the main things students should remember. A good pattern is: one short framing sentence, then 3 to 5 numbered takeaways.

**Example:** In the [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) example, the section begins with "Supervised learning finds patterns, not truth," then uses numbered points to summarize the most important lessons from the explainer.

## 6. Related Course Concepts <span class="badge required">Required</span>

**Description:** Immediately after `Key Takeaways`, include a short `Related Course Concepts` section that points students to 3 to 5 strong course connections. Use flip cards rather than a table. Each card should connect one technical feature of the system to one broader STS, governance, or pattern idea.

**Example:** In the [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) example, the flip cards connect labels to [Data is produced, not found](/fall2026/field-guide/sts-concepts/data-is-produced-not-found), training context to [Prediction imports the past](/fall2026/field-guide/deployment-patterns/prediction-imports-the-past), and aggregate accuracy to [Concentrated harm is hidden by aggregate benefit](/fall2026/field-guide/deployment-patterns/concentrated-harm-is-hidden-by-aggregate-benefit).

> ### 5.1. Going Deeper <span class="badge conditional">Skip for Now</span>
>
> **Description:** Explanation of algorithms, simulations, and extra technical depth here. This section should be optional for the reader.
>
> **Example:** [Supervised Learning](/fall2026/field-guide/technical-explainers/supervised-learning) uses "Going Deeper: How the Training Process Works."
>
> **Interpretation:** This meets the template because the technical detail is preserved without making the main explanation harder to follow.

## 7. Connected Labs <span class="badge required">Required</span>

**Description:** Always include this section, even if no labs are mapped yet.

**Example:**  
[Reinforcement Learning](/fall2026/field-guide/technical-explainers/reinforcement-learning) says that no labs are currently mapped.

**Interpretation:** This meets the template because it is clear and honest about the current gap instead of silently leaving the section out.
