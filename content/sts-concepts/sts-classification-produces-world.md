---
title: "Classification systems don't just describe the world — they produce it."
num: '23'
id: sts-classification-produces-world
slug: classification-systems-dont-just-describe-the-world-they-produce-it
excerpt: "Before a system can classify anything, someone has to build the categories. Once deployed, those categories reshape the behavior and reality they were built to describe."
field_guide_section: 'sts-concepts'
field_guide_order: 2
order: 2
card_type: concept
field_guide_group: 'constructed-not-natural'
subtheme: 'constructed-not-natural'
subtheme_title: 'Constructed, not natural'
related_recognition_cards: ['pattern-22', 'pattern-07', 'pattern-08']
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What This Means

Classification looks like description. Before a system can classify anything, someone has to decide what categories exist — what counts as one kind of thing and not another. Those decisions are not neutral. They reflect what was considered important to distinguish, what kinds of similarity and difference were treated as meaningful, and what happened to things that didn't fit the available categories. Geoffrey Bowker and Susan Leigh Star, in their study of classification systems in medicine and other institutions, called this the "politics of classification": every category system reflects choices made by particular people with particular interests, and leaves visible traces of who was doing the classifying and who was being classified.

Classification systems also create residuals — things that don't fit cleanly. What happens to those residuals reveals where a system's assumptions break down. A person whose condition doesn't match any diagnostic code. A worker whose labor doesn't fit any legal employment category. A behavior that falls between threat categories in an anomaly detection system. How residuals are handled — whether they are forced into available categories, flagged for human review, or simply dropped — is a political and institutional question, not a technical one.

But categories don't just reflect choices — they produce effects. Judith Butler's work on performativity and Donald MacKenzie's work on financial models both point to the same insight: when categories are enacted by institutions, they reshape the reality they were supposed to describe. A neighborhood classified as high-risk receives more surveillance, which generates more arrests, which confirms the classification. A person diagnosed with a condition gets treated according to the category, which changes the course of their condition. Ian Hacking called this "looping effects": being classified changes how people understand and present themselves, which changes the data the classification sees. The category and the world it classifies begin reshaping each other.

## Questions To Ask

- Who defined the categories this system uses, and what were their goals?
- What kinds of people, behaviors, or situations don't fit the available categories?
- What happens to those that don't fit — are they forced into categories, dropped, or flagged?
- Is the classification being treated as a description of reality, or is it understood as producing reality?
- What feedback loops exist between the classification and the thing being classified?
- Who benefits from the current category boundaries staying where they are?

## Why This Matters

This card sits at the foundation of several other concepts in the field guide. Understanding that classification is constructed — someone built these categories, reflecting their assumptions and goals — and performative — the categories now shape the world — gives you a way to ask sharp questions about any AI system.

In the BRAID neuromorphic case, this shows up in how "anomaly" is defined. The system doesn't detect anomalies in nature — it detects departures from a baseline that was built from prior data. How that baseline was constructed, whose behavior it treats as normal, and what feedback effects the classification produces when acted upon are all classification questions with direct governance consequences.

## Related Recognition Cards

- [This system treats one group as the default](/fall2026/field-guide/deployment-patterns/this-system-treats-one-group-as-the-default)
- [Thresholds make uncertainty consequential](/fall2026/field-guide/deployment-patterns/thresholds-make-uncertainty-consequential)
- [Prediction imports the past](/fall2026/field-guide/deployment-patterns/prediction-imports-the-past)

