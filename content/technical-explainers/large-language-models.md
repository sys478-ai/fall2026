---
card_type: technical-explainer
id: te-large-language-models
slug: large-language-models
title: "Large Language Models"
subtitle: "How LLMs work — and why fluency is not the same as accuracy, understanding, or trustworthiness."
num: '4'
order: 4
related_recognition_cards: ['12', '9', '15', '3', '27', '8', '22']
related_concept_cards: []
related_labs: ['6']
field_guide_section: 'technical-explainers'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What the System Is Trying to Do

Large language models (LLMs) learn to predict the most likely next word fragment (token) given all preceding tokens, trained on very large corpora of text scraped from the internet, books, and other sources. At scale, this produces systems that can generate fluent text, answer questions, summarize documents, translate languages, write code, and perform many other language tasks — without any explicit programming for any of them.

## Core Mechanism

LLMs use a **transformer architecture** that processes text by computing attention weights — representing how much each token should "attend to" every other token in the context when predicting the next token. Trained on next-token prediction across billions of documents, the model develops internal representations that capture statistical patterns in language at many levels of abstraction: syntax, semantics, style, and more.

The model has no access to the world beyond its training data. It predicts plausible continuations of text, not true statements about reality.

## How It Works

During training, the model sees a token sequence, predicts the next token, compares its prediction to the actual token using cross-entropy loss, and updates its weights to reduce error via backpropagation. This is supervised learning at massive scale, applied to the task of next-token prediction.

At inference time, the model generates text **autoregressively** — one token at a time, each prediction conditioned on all previous tokens including its own previously generated output. This means errors or confabulations early in a response condition all subsequent tokens.

Most deployed LLMs are further fine-tuned using **RLHF** (reinforcement learning from human feedback): human raters evaluate outputs, and the model is updated to produce outputs that human raters prefer. This introduces a second layer of values encoding — the values and incentives of the raters, and of the rating process.

## What Can Go Wrong

**The model reflects the biases, perspectives, and gaps in its training data.** Training data scraped from the internet overrepresents English, Western perspectives, and the views of people who produce text online. Groups that produce less online text — or whose text was less likely to be scraped — are less well represented in the model's knowledge and more likely to be stereotyped.

**Fluency is mistaken for accuracy.** The model produces grammatically correct, confident-sounding text regardless of whether the content is true. There is no internal signal that marks confabulation differently from accurate recall. Users and systems that rely on LLM outputs without verification risk trusting confident-sounding fabrications.

**The model has no stable referent to the world.** LLMs predict plausible text, not true statements. They have no mechanism for knowing when they don't know something, no access to current information (beyond their training cutoff), and no way to verify claims against external reality.

**Training data overrepresents some cultures and underrepresents others.** Performance is uneven across languages, dialects, and cultural contexts. Behavior that seems neutral in high-resource contexts can be actively incorrect or harmful in others.

**The model learns to perform helpfulness in ways that satisfy evaluators.** RLHF trains models on what human raters rate as good responses. Raters may prefer confident, fluent responses over accurate, hedged ones. The model learns to satisfy the rating process, which may not be the same as being genuinely helpful or honest.

**Enormous compute and data requirements concentrate capability.** Training frontier LLMs requires resources available only to a small number of organizations. This concentrates both the capability and the decisions about how it is designed, deployed, and governed.

## Critical Bridge

| Technical failure mode | Field guide recognition card |
|---|---|
| Training data reflects existing biases and gaps | [Prediction imports the past](/field-guide/pattern-08) and [This system treats one group as the default](/field-guide/pattern-22) |
| Fluency mistaken for accuracy or understanding | [AI systems can encourage anthropomorphism](/field-guide/pattern-12) |
| Confident confabulation with no internal signal | [Opacity shifts authority](/field-guide/pattern-09) |
| Concentration of capability in few organizations | [Power can concentrate in infrastructure](/field-guide/pattern-15) |
| Scraping training data from user-generated content | [Extraction can be disguised as innovation](/field-guide/pattern-14) and [Data collected for one purpose gets used for another](/field-guide/pattern-03) |
| Invisible human labor in data labeling and RLHF | [Invisible labor makes the system possible](/field-guide/pattern-27) |

## Connected Labs

Lab 6 (opacity and the limits of AI explanation).
