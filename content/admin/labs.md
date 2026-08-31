---
title: Verification Guide – Labs
---

## What to check

**Frontmatter**
- `title`, `type`, `draft`, `status`, `priority` all set
- `draft` is `0` if the lab is ready to publish; `1` if still in progress
- `scheduled_day` is set if this lab is tied to a specific class meeting

**Required sections**
- **Overview** – one paragraph explaining what the lab is and what students will do; should be readable as a standalone description
- **Core Learning Goals** – bulleted list of 3–6 specific, measurable outcomes (students will be able to...)
- **Key Terms** – table of terms with working definitions; definitions should be usable, not just dictionary entries

**Activity / instruction quality**
- Read through the full lab as if you are a student doing it for the first time
- Instructions are complete: a student could follow them without asking clarifying questions
- Any external tools or datasets linked are accessible (not behind a paywall, not a broken link)
- Group activities specify group size or structure if that matters
- If there is a submission component, the deliverable is clearly described

**Content quality**
- Learning goals connect to the course themes (AI, ethics, governance)
- No placeholder text, draft notes, or bracketed TODOs left in
- Draft instructor notes (`## Instructor Notes` sections) do not appear to students – these are hidden by the rendering pipeline, but confirm the public-facing content is complete

## How to mark verified

```
status: verified
status_reviewer: [your name]
status_date: [YYYY-MM-DD]
status_notes: [optional – note any broken links, missing activities, or delivery questions]
```
