---
title: Verification Guide – Examples
---

## What to check

**Frontmatter**
- `id`, `slug`, `title`, `year`, `excerpt`, `domains`, `field_guide_section`, `priority` are all populated
- `year` is present – it appears in the timeline view
- `domains` is a list with at least one entry (e.g., `['criminal-justice-and-policing']`)
- `excerpt` is a single sentence summarizing what happened and why it matters

**Required sections**
- **What Happened** – factually accurate account of the case; reads like a short case study, not a summary of an argument
- A source citation at the end (book, article, or primary source)

**Optional fields – check if present and correct**
- `contested` – if the case has a genuine dispute, this field should represent both sides fairly; do not omit legitimate counterarguments
- `connected_cards` – if populated, each entry must have a `num` and an `interpretation` that is specific to this case (not a generic description of the pattern)
- `timeline_cards` – if present, verify the `href` links resolve

**Content quality**
- The "What Happened" section presents facts before analysis – do not editorialize in the opening paragraphs
- The source is a real, verifiable source (not invented)
- No placeholder text, draft notes, or bracketed TODOs left in

## How to mark verified

```
status: verified
status_reviewer: [your name]
status_date: [YYYY-MM-DD]
status_notes: [optional]
```
