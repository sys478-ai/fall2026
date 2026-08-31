---
title: Iris Feature Training Demo
status: draft
related_explainers:
  - supervised-learning
  - neural-networks
---

# Iris Feature Training Demo – Implementation Plan

Design principles and activity timing for all lab ideas: [Lab Ideas index](index.md).

## Purpose

A browser demo where students watch **real labeled irises** get classified correctly (or not) as training runs. The headline metric is plain language:

> **Epoch 12: 94 of 150 irises classified correctly.**

Train longer → the count goes up. No XOR, no spirals, no abstract shapes.

Connects to course themes:

- Labels are human-assigned (botanists → species names)
- Features are chosen measurements, not the flower itself
- The system learns to reproduce labels – success means matching what people already decided

## Core interaction (what students see)

1. **150 iris records** (full UCI set), each with four measurements and a species label.
2. **Train** runs epoch by epoch (slow enough to watch – ~100–300ms per epoch).
3. After each epoch, every iris gets a **prediction**. The UI updates:
   - **Big counter:** `Epoch 47 · 132 / 150 correct (88%)`
   - **Per-flower status:** correct (e.g. checkmark / solid border) vs wrong (e.g. × / highlight)
4. Students see wrong irises **flip to correct** over time (especially setosa early; versicolor / virginica later).
5. Optional second panel: small **network graph** with weights changing – supports opacity lesson, not the main story.

**Avoid as primary UI:** decision-boundary heatmaps, XOR/circle/spiral, unlabeled input neurons.

## Learning goals

After the demo, students should be able to:

1. Describe training as: predict → compare to human label → adjust weights → repeat
2. Read **“n of 150 correct”** as the visible result of minimizing error on labeled examples
3. Notice that some species become correct before others (not all labels are equally easy)
4. Connect the same loop to harder deployments (e.g. retinopathy) where inputs are not four measurements

## Scope (v1)

**In scope**

- All **150** UCI irises embedded as JSON
- **3-class** classification: setosa, versicolor, virginica (`4 → hidden → 3`, softmax)
- **Epoch counter + correct count** as the hero metric (loss in smaller type or sparkline)
- Grid or list of irises updating each epoch (color by true species; mark wrong predictions)
- **Play / Pause / Step (+1 epoch)** controls
- Named features in UI: sepal L/W, petal L/W (not “input 1”)
- Optional: compact network diagram with edge weights updating each epoch
- Optional: **layer-width slider** to show graph becoming unreadable while count still improves

**Out of scope (v1)**

- Flower photographs (no paired image dataset)
- Toy 2D datasets (XOR, spiral, etc.)
- Three.js

## Dataset

Source: [UCI Iris](https://archive.ics.uci.edu/dataset/53/iris)

| Field | Use |
| --- | --- |
| sepal length, sepal width, petal length, petal width | Network inputs (normalize 0–1) |
| species | Human-assigned label; show name on each row |

**Instructor note:** These rows are measurements from the 1930s – not photos. Each “iris” in the UI is a **record**, not a picture.

## UI layout

```text
┌──────────────────────────────────────────────────────────────┐
│  [▶ Train] [⏸] [+1 epoch]     Epoch 23 · 118 / 150 correct │
│  Loss: 0.31    setosa 50/50 · versicolor 38/50 · virginica 30/50 │
├────────────────────────────┬─────────────────────────────────┤
│  150 irises (grid)         │  Network 4 → 8 → 3 (optional) │
│  · color = true species    │  weights update each epoch      │
│  · ✓ or ✗ = this epoch     │  [+ neurons] opacity demo       │
│  · wrong ones stand out    │                                 │
├────────────────────────────┴─────────────────────────────────┤
│  (after training) Classify new measurements → predicted species │
└──────────────────────────────────────────────────────────────┘
```

### Iris grid (primary)

Each cell shows at minimum:

- True species (color or abbreviation: Set / Ver / Vir)
- Predicted species this epoch
- ✓ if match, ✗ if not

Optional on hover: the four measurements; “labeled by botanists as …”

When an iris flips from ✗ to ✓ between epochs, brief highlight – students see **learning as fixing mistakes on labeled examples**.

### Metrics to show each epoch

| Metric | Why |
| --- | --- |
| **Total correct / 150** | Main story |
| Per-species correct (e.g. 50/50, 42/50, 40/50) | Setosa hits 100% first; hard pair visible |
| Loss (secondary) | For instructors who want the technical term |

Rough expectations (small net, 4 features):

| Epoch | About |
| --- | --- |
| 0 | ~50–70 / 150 (near chance for 3 classes) |
| Early | setosa → 50/50 quickly |
| Mid | versicolor / virginica improving |
| Late | ~140–148 / 150 (some confusion remains) |

That last plateau is a feature: *“More training didn’t make every mistake disappear.”*

## Training behavior

1. User hits **Train** (or autoplay from epoch 0).
2. Each epoch: forward pass all 150 → count correct → backprop → update weights.
3. UI updates counter and grid **before** the next epoch (throttle for visibility).
4. **Pause** freezes epoch count so class can discuss: “Which irises is it still getting wrong?”
5. **+1 epoch** for Socratic stepping.

Snapshots (Beginning / Middle / End) = pause at epoch 0, ~50, ~final – same UI, frozen count.

## Feature-ablation stretch (optional)

Same UI, different input count:

| Features | Typical correct @ epoch 200 |
| --- | --- |
| Sepal L + W only (2) | Lower |
| + petal L (3) | Better |
| + petal W (4) | Best |

Same sentence each time: **“Epoch 200: z of 150 correct.”** Students compare z across runs.

## Pedagogical script (5–10 min)

1. **Epoch 0:** “Random weights – most irises wrong. The system is guessing.”
2. **Early epochs:** “Setosa rows flip to ✓ first. Why might that species be easier?”
3. **Mid training:** “Count is climbing. Weights are changing to reduce error on **these** labels.”
4. **Late training:** “142 of 150 – still 8 wrong. Same measurements, human labels disagreed in gray zones.”
5. **(Optional) More neurons:** Graph is unreadable; count still improves – “opacity.”
6. **Bridge:** “Retinopathy: thousands of inputs, same loop – how many patients classified correctly, and who pays for the mistakes?”

## Closing Reflection

- The counter went up – did the system learn “what an iris is,” or learn to match botanists’ categories?
- Which wrong irises at the end are versicolor called virginica (or the reverse)? Who decided those names matter?

## Technical implementation

### File structure

```text
public/demos/iris-trainer/index.html   # v1 standalone
```

### Core loop (pseudocode)

```javascript
for (let epoch = 0; epoch < maxEpochs; epoch++) {
  let correct = 0;
  for (const flower of IRIS_150) {
    const pred = model.predict(flower.features);
    if (pred === flower.label) correct++;
  }
  ui.setEpoch(epoch);
  ui.setCorrect(correct, 150);
  ui.updateGrid(predictions);  // ✓ / ✗ per row
  if (!playing) break;
  model.trainOneEpoch(IRIS_150);
  ui.updateNetworkWeights(model.weights);
  await sleep(150);
}
```

TF.js or hand-rolled backprop both fine; counting correct is the product.

### Core modules

1. `IRIS_DATA` – 150 rows with named fields
2. `trainEpoch()` / `evaluateAll()` → `{ correct, perSpecies, predictions[] }`
3. `renderGrid(predictions, labels)`
4. `renderCounter(epoch, correct, total)`
5. `renderNetwork(weights)` – optional, secondary

## Success criteria

- [ ] Hero text is **“Epoch n · z / 150 correct”** – obvious without explanation
- [ ] Students can point at **which** irises are wrong at any pause
- [ ] More epochs generally increase z (visible on autoplay)
- [ ] Species names and measurement names on screen (not node indices)
- [ ] No toy geometry datasets
- [ ] Training step slow enough to watch (~5–15 s for a full run)

## v2 ideas

- Click a wrong iris → show its four numbers + predicted vs true species
- Mislabel one row → watch count cap below 150
- Classify sliders for a **new** flower after training
- Link from `supervised-learning.md` and `neural-networks.md`

## Why not Expecto-style toys

Tools like [Expecto](https://expecto-eight.vercel.app/) optimize for 2D boundaries (XOR, spiral). This demo optimizes for **relatable records**: named species, countable success, mistakes you can inspect. Use toy shapes only as a 30-second aside if needed – not as the dataset.

## References

- UCI Iris: https://archive.ics.uci.edu/dataset/53/iris
- Expecto (contrast): https://sandwich.codes/projects/expecto
- Iris-CV (photos only, not paired): https://doi.org/10.48448/ztxw-4x61
