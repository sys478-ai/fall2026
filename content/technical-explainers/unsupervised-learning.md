---
card_type: technical-explainer
id: te-unsupervised-learning
slug: unsupervised-learning
title: "Unsupervised Learning"
subtitle: "How machines find structure without labels — and why the structure it finds reflects the data it was given."
num: '2'
order: 2
related_recognition_cards: ['22']
related_concept_cards: []
related_labs: ['1b', '1c', '8']
field_guide_section: 'technical-explainers'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What the System Is Trying to Do

Unsupervised learning finds structure in data without using labeled examples. Rather than learning a function from inputs to predefined outputs, the system discovers patterns, groupings, or compressed representations that weren't explicitly specified. Common applications include customer segmentation, anomaly detection, dimensionality reduction, and generative modeling.

## Core Mechanism

Without labels to supervise learning, the system finds structure by identifying regularities in the data itself — points that tend to co-occur, inputs that can be compressed and reconstructed accurately, regions of high density in the data space. The key insight is that structure in the data reflects something about the world — but what it reflects, and whether that reflection is accurate or fair, is a design question.

## How It Works

**Clustering (e.g., k-means):** Partition data into k groups by minimizing within-cluster variance. Given k cluster centers **μ₁, …, μₖ**, assign each point to its nearest center, then update centers to be the mean of their assigned points. Repeat until convergence. The number of clusters k is chosen by the designer.

**Dimensionality reduction (e.g., PCA):** Find a lower-dimensional representation that preserves as much variance as possible. The axes of the new representation are defined by directions of maximum variance in the training data.

**Density estimation / anomaly detection:** Model the probability distribution of the training data. Points in low-probability regions are flagged as anomalies.

In each case, what counts as "similar," "representative," or "normal" is determined by what structure exists in the training data — not by any ground truth about the world.

## What Can Go Wrong

**Clusters reflect structure in training data, not objective categories.** The groups a clustering algorithm finds are the groups that exist in the data it was given. If the data reflects existing social categories, power imbalances, or historical patterns, the clusters will reproduce those — and those clusters may then be used to make decisions as if they were natural or neutral.

**What counts as similar is a design choice.** Every similarity or distance metric embeds assumptions about what dimensions of difference matter and how much. Using Euclidean distance in raw pixel space produces different clusters than using distance in a learned embedding space — and neither is neutral.

**Anomalies are defined relative to what the model learned as normal.** A point is anomalous only relative to the distribution the model learned from its training data. If that training data came from one population or context, members of another population may appear anomalous simply by being different from what the model learned as normal.

**Cluster boundaries can sort people in ways that reproduce existing inequities.** When unsupervised learning is applied to data about people — their behavior, their characteristics, their history — the clusters it finds often track socially constructed categories like race, class, and gender, even when those variables are not explicitly included.

## Critical Bridge

| Technical failure mode | Field guide recognition card |
|---|---|
| Clusters reflect structure in training data, not objective categories | *Data is produced, not found (not yet published)* |
| What counts as similar is a design choice | *Classification is not neutral (not yet published)* |
| Anomalies defined relative to learned normal | *Normal is constructed (not yet published)* |
| Cluster boundaries can reproduce existing inequities | [This system treats one group as the default](/field-guide/pattern-22) |

## Connected Labs

Labs 1b, 1c, and 8.
