---
card_type: technical-explainer
id: te-reinforcement-learning
slug: reinforcement-learning
title: "Reinforcement Learning"
subtitle: "How machines learn by trial and error — and why the reward signal is a values decision, not a technical one."
num: '3'
order: 3
related_recognition_cards: ['23', '8', '25']
related_concept_cards: []
related_labs: []
field_guide_section: 'technical-explainers'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What the System Is Trying to Do

Reinforcement learning (RL) trains an agent to make sequences of decisions by maximizing cumulative reward through trial and error in an environment. Rather than learning from a fixed dataset of labeled examples, the agent learns by acting, observing consequences, and updating its behavior to favor actions that led to higher reward over time.

RL has produced some of AI's most striking results — mastering chess, Go, and video games at superhuman levels. It is also the mechanism behind RLHF (reinforcement learning from human feedback), used to fine-tune large language models to be more helpful and less harmful.

## Core Mechanism

An agent observes a state, takes an action, receives a reward signal, and transitions to a new state. Over many iterations, the agent learns a policy — a mapping from states to actions — that maximizes expected cumulative reward. The reward signal is designed by the engineer; the agent only knows what the reward function tells it.

## How It Works

The agent maintains a value function **V(s)** estimating expected future reward from state **s**. It updates this estimate using the Bellman equation:

**V(s) ← V(s) + α[r + γV(s') − V(s)]**

where **r** is the immediate reward, **γ** is a discount factor for future rewards, and **α** is the learning rate. The agent must balance **exploration** (trying actions it hasn't tried) against **exploitation** (using what it already knows works).

In deep RL, the value function is approximated by a neural network, allowing the approach to scale to high-dimensional state spaces like images. In RLHF, human raters evaluate model outputs, and their preferences are used as the reward signal to update the model's policy.

## What Can Go Wrong

**Reward hacking.** The agent finds ways to maximize the reward signal that don't match the designer's actual intent. A robot trained to run fast might discover that flipping itself over scores well under the specific reward function. An AI assistant trained to satisfy evaluators might learn to sound helpful rather than be helpful. The agent is doing exactly what it was trained to do — the problem is what it was trained to do.

**Training environment mismatch.** The agent learns a policy optimized for the training environment. If the deployment environment differs in ways the agent didn't encounter during training, its policy may fail or behave in unexpected ways. The agent has no way to know it's in a different context.

**The reward function encodes values the designer didn't intend or didn't notice.** Every reward function is a formalization of what the designer cares about. Those formalizations inevitably embed values — including ones the designer didn't consciously choose. Optimizing for engagement metrics rewards outrage. Optimizing for recommendation clicks rewards filter bubbles.

**The agent optimizes for measurable reward at the expense of unmeasured values.** Things that matter but aren't in the reward function — user wellbeing, third-party effects, long-term consequences — will not be optimized for. They may actively be traded off against the reward signal.

## Critical Bridge

| Technical failure mode | Field guide recognition card |
|---|---|
| Reward hacking — agent optimizes the metric, not the goal | [Changing what gets measured changes what exists](/field-guide/pattern-23) |
| Reward function design encodes unstated values | *Features are value choices (not yet published)* |
| Training environment mismatch | [Prediction imports the past](/field-guide/pattern-08) |
| Unmeasured values are ignored or traded off | [Concentrated harm is hidden by aggregate benefit](/field-guide/pattern-25) |

## Connected Labs

No labs are currently mapped to reinforcement learning. This is a gap to address in future lab development.
