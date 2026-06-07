---
card_type: technical-explainer
title: "Anomaly Detection"
subtitle: "How systems learn what counts as normal — and why that definition is never neutral."
num: '5'
order: 5
related_recognition_cards: ['22', '7', '25', '8']
related_concept_cards: []
related_labs: ['8', '9']
---

> **Course connection:** This explainer connects directly to the course's capstone case — a neuromorphic chip designed for edge-based anomaly detection. The technical failure modes here are the same ones the capstone analysis asks you to evaluate prospectively.

## What the System Is Trying to Do

Anomaly detection identifies data points, events, or patterns that deviate significantly from what the system has learned to expect as normal. It is used in fraud detection, network security, industrial monitoring, medical diagnostics, and — critically for this course — edge computing applications where sensors must flag unusual activity in real time with minimal power consumption.

## Core Mechanism

The system first learns a model of normal behavior, either from labeled examples of normal and anomalous data, or (more commonly in practice) by finding statistical structure in unlabeled data that is assumed to be mostly normal. At inference time, new inputs are scored by how much they deviate from that model. Points above a deviation threshold are flagged as anomalies.

## How It Works

**Statistical approaches:** Model the distribution of normal data (e.g., as a multivariate Gaussian). Flag inputs whose probability under the learned distribution falls below a threshold. The distance from a cluster center can serve as a proxy for how anomalous a point is.

**Reconstruction-based approaches:** Train an autoencoder to compress and reconstruct normal inputs. Inputs that the autoencoder cannot reconstruct accurately — because they don't fit the patterns it learned — produce high reconstruction error and are flagged as anomalous.

**Threshold setting:** In both approaches, the threshold for flagging is a design parameter that trades off false positives (normal inputs flagged as anomalous) against false negatives (anomalies that are missed). This trade-off is a values choice with asymmetric costs that do not fall equally on different groups.

## What Can Go Wrong

**Anomalies are defined relative to a training distribution, not universally.** "Anomalous" means "different from what the model learned as normal." If the training data came from one population or context, members of another population may appear anomalous simply by being unfamiliar to the model — not because they are actually engaging in unusual behavior.

**The threshold is a value choice with asymmetric, unequal costs.** Setting the threshold lower catches more anomalies but produces more false positives — incorrectly flagging normal behavior. Setting it higher misses more anomalies. Who bears the cost of false positives (the people incorrectly flagged) and who bears the cost of false negatives (whoever the system is protecting) are different groups with different power to challenge the system's decisions.

**The system cannot distinguish genuinely anomalous from merely unfamiliar.** Rare but normal variation in underrepresented populations gets flagged at higher rates. A person whose behavior patterns differ from the training population is more likely to be flagged regardless of whether anything suspicious is actually occurring.

**Edge deployment means training and deployment contexts often diverge.** Systems trained on data from one environment are deployed in another. Seasonal patterns, population shifts, or new types of behavior that didn't exist in the training data can degrade performance unpredictably.

**What counts as anomalous in one context is normal in another.** Normal behavior varies across cultures, contexts, and individuals. A system trained to detect anomalies in one demographic or geographic context will misclassify normal behavior in others.

## Critical Bridge

| Technical failure mode | Field guide recognition card |
|---|---|
| Normal defined by training distribution | *Normal is constructed (not yet published)* |
| Threshold setting trades off asymmetric costs | [Thresholds make uncertainty consequential](/field-guide/pattern-07) |
| Underrepresented populations flagged as anomalous | [This system treats one group as the default](/field-guide/pattern-22) |
| Training and deployment context mismatch | [Prediction imports the past](/field-guide/pattern-08) |
| False positive costs fall disproportionately | [Concentrated harm is hidden by aggregate benefit](/field-guide/pattern-25) |

## Connected Labs

Lab 8 (anomaly detection and the construction of normal) and Lab 9 (edge AI, privacy, and accountability).
