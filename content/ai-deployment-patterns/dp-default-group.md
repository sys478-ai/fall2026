---
title: 'This system treats one group as the default.'
num: '22'
id: dp-default-group
slug: this-system-treats-one-group-as-the-default
excerpt: 'When one group is treated as the normal baseline, everyone else becomes an edge case — and bears the cost of the gap.'
field_guide_section: 'deployment-patterns'
field_guide_group: 'how-systems-draw-boundaries'
field_guide_order: 1
order: 5
card_type: recognition
related_concept_cards: ['pattern-04', 'pattern-05']
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What To Notice

When a system is built around one group's experience, body, behavior, or data as the normal baseline, everyone else is treated as a variation, an edge case, or a problem to be corrected. The default group becomes invisible as a group — their characteristics appear as the neutral standard rather than as a particular choice about who matters.

This is not always intentional. Training data reflects who was measured. Benchmarks reflect who was tested. Interface assumptions reflect who the designers imagined. But the effect is the same: systems that work well for some people and poorly for others, with the gap falling predictably along lines of race, gender, disability, age, or language.

Watch for this when you see uneven error rates, performance caveats buried in documentation, or the phrase "works for most users" without specifying who the exceptions are.

## Questions To Ask

- Whose experience, body, or behavior did the training data reflect most fully?
- Who were the designers imagining when they built this?
- Where does performance degrade — and for whom?
- Is worse performance treated as a flaw to fix, or accepted as a natural limit?
- Who gets to define what counts as normal performance?

## Why This Matters

This pattern helps you ask whose experience was treated as representative when a system was built — and who bears the cost of that assumption. It connects to broader questions about who is included in design processes, who is excluded from training data, and who is harmed when systems fail at the margins that were never really treated as margins.
