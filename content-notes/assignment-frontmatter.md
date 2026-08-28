# Assignment Frontmatter Context

## Two deadlines on one assignment: prep vs. reflection

### Split career modules (preferred)

When a career module has distinct before-class prep, in-class work, and a post-class submission, split it into three artifacts instead of one combined assignment:

1. **Before class** — add prep to the meeting's topic `readings` (or optional readings).
2. **Class work** — `content/activities/` file with `scheduled_day` set to the meeting.
3. **Submit** — slim `content/assignments/` file with `due_days_after`, `due_time`, and `## What To Submit` only.

Career module assignments are not auto-linked as in-class activities; the activity file handles class work.

See `content/activities/career-module01-in-class.md`, `content/assignments/career-module01.md`, and topic `04_what-makes-human-intelligence-distinctive.md` for this pattern.

### Combined assignment (legacy)

Some assignments still combine prep and reflection in one file. Use these fields together — don't hardcode either deadline in prose.

### Before class

- `scheduled_day` — the class meeting this assignment is tied to.
- `reminder_notes` — a short, imperative sentence describing what to do before that class (e.g. PathwayU assessments). Automatically surfaced as a "Reminders" item on that day's topic page (and on the prior class's "For next time" panel) — no date of its own, since it's implicitly due by the start of `scheduled_day`'s meeting.

### After class (reflection / submission)

Pick **one** of:

- `due_days_after: <N>` — computes the due date as N days after the `scheduled_day` meeting date. Omit it and the default is 6 days (unchanged from before this field existed).
- `due_date: 'YYYY-MM-DD'` (+ optional `due_time: '3:00PM'`) — an absolute deadline, for cases where the reflection isn't a fixed number of days after class (e.g. "Big Interview due in 2 weeks"). **Always quote `due_date`** — an unquoted date gets parsed by YAML as a `Date` object instead of a string and breaks downstream date handling.

If both are set, `due_date` wins outright. If neither is set, the 6-day default applies. `due_time` defaults to 11:59 PM when unset.

- `submission_notes` (optional) — a short note describing *what's* due (e.g. "PathwayU reflection"), shown next to the due date/time in the topic page's "Due" section. Mirrors `reminder_notes` on the before-class side.

The resolved due date/time is what shows up everywhere a due date is displayed: the assignment's own page, the `/assignments` listing, the course schedule, and the "Due" section of whichever topic page falls on that date. If a due date does not land on a class meeting, the course schedule adds a separate **Deadline** row on that date.

### Body heading convention

Match frontmatter to the matching body section so students see the same story in both places:

- `## Before Class` ↔ `reminder_notes`
- `## What To Submit` ↔ `due_date`/`due_days_after`/`due_time`

Keep the `## What To Submit` prose generic ("submit your reflection by the due date shown above") rather than restating a specific date or offset — the frontmatter is the source of truth, and prose that repeats it just invites drift.

### Example

```yaml
scheduled_day: 4
reminder_notes: 'Before you come to class, complete the PathwayU assessments...'
submission_notes: 'PathwayU reflection'
due_days_after: 7
due_time: '11:59PM'
```

See `content/assignments/career-module02.md` for the combined-assignment pattern.
