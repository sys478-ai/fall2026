---
title: "Categories in this system are contested or unstable."
num: '34'
id: dp-categories-contested
slug: categories-in-this-system-are-contested-or-unstable
excerpt: "Some categories AI systems use look settled but are actively disputed among researchers, experts, or the communities being classified. Encoding a contested category makes a political choice look like a technical one."
field_guide_section: 'deployment-patterns'
field_guide_group: 'how-systems-classify-and-sort'
subtheme: 'how-systems-classify-and-sort'
subtheme_title: 'How systems classify and sort'
field_guide_order: 3
card_type: recognition
status: unverified
status_reviewer:
status_date:
status_notes:
priority: low
---

## What To Notice

AI systems classify people, behaviors, and events into categories. Some of those categories look stable and scientific – as if the right way to divide up the world had been discovered and simply implemented in code. But many of the categories used in high-stakes AI systems are contested: experts disagree about how to define them, communities disagree about whether they are valid, and their meaning has changed (and continues to change) over time.

Race, gender, risk, creditworthiness, dangerousness, and anomaly are all examples. Each has active debates about what it means, how to measure it, and whether it should be used in a given context at all. A system that encodes one position in those debates treats the controversy as settled. The political choice to use a particular definition gets laundered through the technical process of implementation – the category appears in the code, and therefore appears to be a fact.

Look for: categories that have changed legal or scientific definition in recent years; categories that the affected communities dispute or define differently than the institutions using them; categories where the academic literature contains significant disagreement; categories that carry moral or social valence (risk, deviance, abnormality) that may not match their statistical definition.

## Questions To Ask

- Is there active disagreement among researchers or practitioners about what this category means?
- Do the people being classified recognize themselves in the categories being used?
- Has this category's definition changed over time, and which version of it is encoded in this system?
- Who has the authority to define this category – and who does not?
- What would happen if a different, equally defensible definition were used instead?
- Is the instability of this category acknowledged in the system's documentation, or treated as resolved?

## Why This Matters

This card is a complement to "This system's baseline and categories were chosen, not given" – where that card focuses on the process of construction, this card focuses on the ongoing contestation. Together they help you ask not just who made the categories but whether those categories are regarded as legitimate by the people most affected.

Use it when a system's categories carry moral weight or legal consequences – risk scores, dangerousness assessments, identity classifications – and when the populations being classified might not accept the categories being applied to them.
