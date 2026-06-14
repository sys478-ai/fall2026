---
title: "Features are value choices."
num: '3'
id: sts-features-as-values
slug: features-are-value-choices
excerpt: "Feature selection reflects judgments about what matters, what can stand in for it, and what the system is allowed to ignore."
field_guide_section: 'sts-concepts'
field_guide_order: 4
order: 3
card_type: concept
field_guide_group: 'constructed-not-natural'
subtheme: 'constructed-not-natural'
subtheme_title: 'Constructed, not natural'
status: verified
status_reviewer: Maxwell Chalmers
status_date: 2026-06-14
status_notes: "Reviewed for conceptual accuracy, accessibility, observational usefulness, and practical application."
priority: high
---

## What To Notice

Systems do not take in everything. They work from selected inputs, features, and proxies. That means someone decided what would count as relevant evidence and what could be ignored.

For example, a hiring system might use employment gaps as a feature intended to predict reliability, even though gaps can also reflect caregiving, illness, disability, or unequal access to work. The feature does not simply capture a fact; it embeds a judgment about which facts should count and what they are assumed to mean.

When a system uses a proxy, ask what the proxy is supposed to represent and why that stand-in was chosen. A measurable feature may be easier to use than the quality designers actually care about, but it can also introduce assumptions and exclusions that can be obscured by technical language.

## Questions To Ask

- What inputs does the system treat as meaningful?
- What is being used as a proxy for something harder to measure?
- What important qualities are left out because they are inconvenient?
- How do feature choices advantage some interpretations over others?
- Why were these features chosen instead of other possible indicators?

## Why This Matters

You may first encounter machine learning as a technical pipeline whose steps appear clean and neutral. This concept helps you notice that feature selection is also an act of interpretation. Choosing what the system can see shapes what it can recognize, what it will miss, and which institutional priorities become encoded in its outputs.
