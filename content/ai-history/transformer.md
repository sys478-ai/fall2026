---
title: '"Attention Is All You Need"'
year: '2017'
excerpt: "A team at Google introduces the Transformer architecture, replacing recurrent processing with a self-attention mechanism that lets a model weigh every part of an input against every other part in parallel. This single architectural choice becomes the technical foundation for every major large language model that follows, including the systems behind ChatGPT five years later."
timeline_cards:
  - label: 'How Do Machines Learn from Data (Module 2)'
  - label: 'Opacity shifts authority'
    href: '/field-guide/pattern-09'
priority: low
---

Ashish Vaswani and colleagues at Google publish "Attention Is All You Need," introducing the Transformer: a neural network architecture built entirely around self-attention, with no recurrence and no convolution. Where earlier sequence models (RNNs, LSTMs) process a sentence one token at a time, forcing later tokens to wait on earlier ones, self-attention lets a model weigh every token against every other token simultaneously.

The immediate motivation is machine translation, where the Transformer sets a new state of the art. The consequence that matters more in retrospect is architectural: because self-attention parallelizes, Transformers can be trained on far larger datasets with far more compute than recurrent architectures allowed. That combination – an architecture built for scale, arriving alongside continued growth in available data and GPU compute – is what makes the large language models of the following decade possible.

Every model behind the current wave of generative AI systems, including the GPT family that becomes publicly visible with ChatGPT's 2022 release, is a Transformer. The architecture that started as a translation benchmark result becomes the substrate of an entire industry within five years – and the scale that makes it powerful is the same scale that makes it impossible to fully inspect: billions of parameters distributed across attention layers with no human-legible mapping back to "what the model knows."

**Source:** Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin, ["Attention Is All You Need,"](https://arxiv.org/abs/1706.03762) _Advances in Neural Information Processing Systems 30_ (NeurIPS 2017).
