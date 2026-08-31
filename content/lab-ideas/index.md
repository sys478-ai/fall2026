---
title: Lab Ideas
status: draft
hide_from_list: 1
---

# Lab Ideas

Scratch space for **interactive demos and class activities** before they become full assignments in `content/assignments/`. These are instructor-facing plans – not student-facing labs until promoted.

## Why this folder exists

SYS 478 students are mostly non-specialists. Labs and demos should make **supervised learning, labels, and representation** tangible without turning the course into ML coursework. This folder captures ideas that:

- Start from **experience** (watch something change), then name the concept
- Use **relatable data** students can interpret
- Connect to the course spine: labels, features, power, opacity, deployment

Published labs live in `content/assignments/`. Ideas here are allowed to be incomplete.

---

## Design principles

### 1. Lead with a human-readable success metric

Students should not need to know what a loss function is to see learning happen.

**Preferred headline:**

> Epoch 12 · **94 of 150** classified correctly

Train longer → the count rises. Wrong examples flip to correct. That *is* supervised learning in plain language. Loss and accuracy can sit underneath for instructors.

### 2. Use real records, not ML toy shapes

Avoid XOR, spirals, and unlabeled “input neurons” as the **primary** activity. They optimize for visualization, not motivation. Students in this course cannot relate to them.

**Prefer:**

- Named measurements (petal length, sepal width)
- Named categories (setosa, versicolor, virginica)
- Countable mistakes on **labeled examples**

Toy geometry demos (e.g. [Expecto](https://expecto-eight.vercel.app/)) are optional 30-second asides: “same loop, fake 2D stand-in” – not the main dataset.

### 3. Treat features and labels as human choices

Every demo should make visible:

- **Labels** were assigned by people (botanists, clinicians, institutions)
- **Features** are a compression of the world (four numbers, not the flower)
- **Correct** means matches the label – not “true in nature”

Say this aloud even when the UI is silent about it.

### 4. Network graphs are secondary

A 3Blue1Brown-style node/edge diagram is useful for:

- Showing weights change during training
- Cranking up layer size until the graph is unreadable (opacity lesson)

The **hero** is still: how many labeled examples the system gets right this epoch. Do not let the graph become the whole activity.

### 5. Motivate representation changes as deployment, not “leveling up”

A natural two-phase arc for technical mechanism:

| Phase | Inputs | Student takeaway |
| --- | --- | --- |
| **A – Tabular** | 4 botanist measurements | Legible, human-chosen features; weights almost readable |
| **B – Pixels** | Small image grid + layers (ReLU) | Same labels, same counter UI; inputs chosen by camera pipeline; weights not readable |

Pivot line:

> “What if you don’t have a ruler – only a photograph?”

Bridge to [supervised-learning](/fall2026/field-guide/technical-explainers/supervised-learning) (retinopathy): same loop, pixels instead of four floats, higher stakes.

**Honesty:** There is no public dataset pairing Fisher’s 150 rows with photos of those same flowers. Phase B uses photos or pixelized images as the *same kind of task*, not the same specimens.

### 6. Fit class time deliberately

| Format | Approx. time |
| --- | --- |
| Instructor demo + brief discussion | 15–25 min |
| Students interact + pair share | 30–45 min |
| Tabular → pixels + Closing Reflection | 50–60 min (center of one session) |

Do not autoplay hundreds of epochs in silence. Pause at epoch 0, mid-training, and near convergence. Use **+1 epoch** or **+10 epochs** for live classes.

---

## What belongs in each idea doc

When adding a new file in this folder, include:

1. **Purpose** – one paragraph, course connection
2. **Core interaction** – what students see and do (not implementation first)
3. **Learning goals** – mechanism + governance hook
4. **Scope** – v1 in / out; optional phase 2
5. **Pedagogical script** – minutes + instructor lines
6. **Closing Reflection** – 1–2 questions
7. **Success criteria** – checklist for build and classroom use
8. **References** – datasets, contrast tools

See [Iris Feature Training Demo](iris-feature-training-demo.md) as the reference plan.

---

## What to avoid

| Avoid | Why |
| --- | --- |
| Spiral / XOR as the main task | Students can’t connect to real deployment |
| “Correct = ground truth” framing | Hides that labels are human judgments |
| Photos implied to match UCI rows | Misleading; say when data are unlinked |
| Full MNIST-scale pixels in v1 | Too many inputs; demo becomes waiting |
| ReLU / backprop lecture inside the activity | Name the loop first; jargon after |
| Anthropomorphism (“neurons see”) | Course pushes against brain metaphors |

---

## Current ideas

| Idea | Status | Notes |
| --- | --- | --- |
| [Iris Feature Training Demo](iris-feature-training-demo.md) | draft | Epoch counter + 150-row grid; optional weights graph; phase 2 pixels |

---

## Promoting to a real lab

When an idea is ready for students:

1. Move or copy into `content/assignments/` with full lab frontmatter (`type: lab`, learning goals, key terms, deliverables)
2. Build the demo under `public/demos/` or embed as a React component
3. Link from the relevant topic or [technical explainer](/fall2026/field-guide/technical-explainers/supervised-learning)
4. Archive or mark the lab-ideas doc `status: promoted`
