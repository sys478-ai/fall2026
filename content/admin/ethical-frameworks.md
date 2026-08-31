---
title: Verification Guide – Ethical Frameworks
---

## What to check

**Frontmatter**
- `id`, `slug`, `title`, `subtitle`, `card_type`, `field_guide_section`, `num`, `order`, `priority` are all populated
- `subtitle` is a question – it frames the core diagnostic use of the framework
- `related_recognition_cards`, `related_concept_cards`, `related_example_cards` are populated, or intentionally left as empty arrays `[]`

**Required sections**
- **The Core Idea** – explains the framework accurately, names its origin/theorist, and situates it in relation to AI; accessible to students who have never encountered it before
- **The Diagnostic Question** – a bolded question in the format **Does this system...?** – must be specific enough to apply to a real case
- **Questions To Ask** – bulleted list of follow-up questions; should be more specific than the diagnostic question
- **Tensions and Limits** – what this framework cannot see or handle well; must be honest, not just a footnote

**Content quality**
- The core idea accurately represents the framework (e.g., Rawls is about the veil of ignorance and difference principle; care ethics is about particular relationships, not aggregate welfare)
- Prose is written for undergraduates – no unexplained jargon
- No placeholder text, draft notes, or bracketed TODOs left in

**Cross-references**
- If related cards are listed, spot-check that the card numbers exist in the field guide

## How to mark verified

```
status: verified
status_reviewer: [your name]
status_date: [YYYY-MM-DD]
status_notes: [optional]
```
