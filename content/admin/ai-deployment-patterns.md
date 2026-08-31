---
title: Verification Guide – AI Deployment Patterns
---

## What to check

**Frontmatter**
- `id`, `slug`, `title`, `excerpt`, `card_type`, `field_guide_section`, `field_guide_group`, `order`, `priority` are all populated
- `excerpt` is a single, complete sentence – it appears as the card preview on list pages
- `field_guide_group` matches one of the defined groups in the section

**Required sections**
- **What To Notice** – describes the pattern in plain language; a student should be able to recognize it in the wild after reading this
- **Questions To Ask** – bulleted list of specific diagnostic questions, not generic advice
- **Why This Matters** – explains stakes and connects to course themes; should not just restate the pattern

**Content quality**
- Prose is accurate and written at an accessible undergraduate level
- "What To Notice" does not duplicate the excerpt verbatim – it should add depth
- Questions are concrete enough that an intern could apply them to a real case study
- No placeholder text, draft notes, or bracketed TODOs left in

**Cross-references**
- If `connected_cards` is populated, verify each card number exists and the interpretation is specific to this pattern (not generic)

## How to mark verified

When the card passes all checks above, update the frontmatter:

```
status: verified
status_reviewer: [your name]
status_date: [YYYY-MM-DD]
status_notes: [optional – note anything unusual or deferred]
```
