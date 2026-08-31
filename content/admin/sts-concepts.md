---
title: Verification Guide – STS Concepts
---

## What to check

**Frontmatter**
- `id`, `slug`, `title`, `excerpt`, `card_type`, `field_guide_section`, `order`, `priority` all populated
- `excerpt` is a single sentence – it appears as the card summary in list views

**Required sections**
- **What To Notice** – explains what the concept helps you see; should give a student a concrete observational habit, not just a definition
- **Questions To Ask** – bulleted list; questions should be specific enough to apply to a real AI system or case study
- **Why This Matters** – connects the concept to the course arc; explains when students will use this concept and why it matters for understanding AI

**Content quality**
- The concept is accurately represented – STS concepts have specific theoretical origins; don't paraphrase them into vagueness
- Prose is written for undergraduates who may have no STS background
- "What To Notice" gives a concrete behavioral cue, not just an abstract claim
- No placeholder text, draft notes, or bracketed TODOs left in

**If you are unsure whether the concept is accurately described**, flag it in `status_notes` – do not mark as verified

## How to mark verified

```
status: verified
status_reviewer: [your name]
status_date: [YYYY-MM-DD]
status_notes: [optional]
```
