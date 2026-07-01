---
title: Verification Guide — Technical Explainers
---

Reference template: [Technical Explainer Template](/fall2026/field-guide/technical-explainers/template)

## What to check

**Frontmatter**

- `id`, `slug`, `title`, `subtitle`, `card_type`, `field_guide_section`, `num`, `order`, `priority` all populated
- `subtitle` frames a critical or cautionary angle on the technology — not just a description
- `related_recognition_cards` and `related_concept_cards` populated or intentionally empty

**Required sections**

- **What the System Is Trying to Do** — one clear paragraph explaining the technical goal in plain language
- **Core Mechanism** — explains the key mechanism accurately; can use technical vocabulary but each term should be briefly defined on first use
- **How It Works** — more detail on the process; a student should be able to explain it in their own words after reading
- **What Can Go Wrong** — bias, failure modes, misuse, limits; should be specific to this system, not a generic list

**Content quality**

- Technical claims are accurate — if you are unsure, flag it in `status_notes` rather than guessing
- Explanations are written for undergraduates without CS backgrounds
- "What Can Go Wrong" is honest about real limitations — does not read like a PR disclaimer
- No placeholder text, draft notes, or bracketed TODOs left in

**Spot-checks**

- If bold terms are used, they are introduced in context (not just bolded and undefined)
- If `related_labs` is populated, verify the lab numbers exist

## How to mark verified

```
status: verified
status_reviewer: [your name]
status_date: [YYYY-MM-DD]
status_notes: [optional — note any technical claims you flagged for Sarah to review]
```
