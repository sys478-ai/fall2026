---
card_type: technical-explainer
id: te-large-language-models
slug: large-language-models
title: "Large Language Models"
subtitle: "How language models generate fluent text — and why fluency does not guarantee accuracy, understanding, or trustworthiness."
num: '4'
order: 4
related_recognition_cards: ['12', '9', '15', '14', '3', '27', '8', '22']
related_concept_cards: []
related_labs: ['6']
field_guide_section: 'technical-explainers'
status: verified
status_reviewer: Maxwell Chalmers
status_date: 2026-06-25
status_notes: "Technical explanation reviewed for accuracy and introductory readability. Confirm that related_labs ['6'] and the recognition-card links match the current field guide index."
priority: high
---

## What the System Is Trying to Do

A **large language model**, or LLM, is trained to predict which token is likely to come next in a sequence of text. A **token** is a small unit of text that may be a whole word, part of a word, punctuation, or a short group of characters. By practicing next-token prediction across enormous collections of text, an LLM learns detailed statistical patterns involving grammar, style, facts, reasoning, programming, and many other forms of written communication. This simple training goal can produce systems that answer questions, summarize documents, translate languages, generate code, and continue conversations. However, the model is still generating likely sequences of tokens. Fluent output does not by itself establish that the information is accurate, that the model understands the subject as a person would, or that its answer should be trusted.

## Core Mechanism

Most modern text-generating LLMs are built using a type of deep neural network called a **transformer**. Before text enters the transformer, it is divided into tokens. Each token is then converted into a long list of numbers called a **vector** or **embedding**. This numerical representation allows the model to perform mathematical operations on language.

A token’s starting vector contains learned information about how that token is generally used, but words do not have the same meaning in every sentence. Consider the word “bank”:

* “We sat on the bank of the river.”
* “She deposited money at the bank.”
* “He made a bank shot off the backboard.”

The token is the same, but its meaning changes with the surrounding words. A transformer uses a mechanism called **attention** to identify which other tokens provide useful context. In the first sentence, “bank” may draw strongly from “river.” In the second, “deposited” and “money” are more relevant. Attention uses these relationships to create a more context-specific representation of each token.

The transformer does not simply look up one fixed definition for “bank.” It repeatedly transforms the token’s vector using information from the surrounding text. After this process, the numerical representation of “bank” in a sentence about rivers differs from its representation in a sentence about money.

## How It Works

A language model is trained and used through a sequence of steps.

1. **Text is divided into tokens.**
   The model does not usually process text one complete word at a time. A common word may form one token, while a longer or less familiar word may be divided into several pieces. Punctuation and spaces can also affect tokenization. For a simple explanation, tokens can often be imagined as words, but the two are not always identical.

2. **Each token becomes a vector.**
   Every token is converted into a long list of numbers. These vectors allow relationships between tokens to be represented mathematically. Tokens used in similar situations may develop related numerical patterns, but the model must still account for the particular context in which each token appears.

3. **Information about position is added.**
   Word order matters. “The dog chased the cat” does not mean the same thing as “The cat chased the dog.” Since attention examines relationships across a sequence, the model also needs information about where each token appears. This is supplied through **positional information**, which helps distinguish the first token from the tenth and preserves the order of the text.

4. **Attention identifies relevant relationships.**
   Each token creates three new numerical representations called a **query**, a **key**, and a **value**. The query represents the kind of information a token is looking for, the key represents the kind of information another token can offer, and the value contains the information that may be passed along.

   The transformer compares queries with keys to calculate **attention weights**, which indicate how strongly tokens should influence one another. It then combines the corresponding values. In a text-generating model, a token can normally attend to earlier tokens in the sequence, but not to future tokens that have not yet been generated.

   The detailed mathematics involves operations on vectors and matrices, but the central purpose is straightforward: identify relevant relationships and use them to add context.

5. **Multiple attention heads examine the sequence.**
   Transformers use **multi-head attention**, meaning that several attention processes examine the same sequence in parallel. This can be imagined as looking at a sentence from several perspectives at once. One head may become useful for tracking grammatical relationships, while another may respond to references, locations, or connections between distant parts of the text.

   These roles are learned rather than assigned by programmers, and individual heads do not always have one clear, human-readable purpose. The important point is that multiple heads allow the model to represent several kinds of relationships at the same time.

6. **The information passes through transformer blocks.**
   Attention is one part of a larger structure called a **transformer block**. Each block usually includes an attention layer, a feed-forward neural network, and additional operations that help keep the calculations stable. The feed-forward network processes each token’s updated representation using learned weights and biases.

   An LLM stacks many transformer blocks together. As the vectors pass through these layers, they can develop increasingly detailed representations of grammar, topic, tone, and context. The output of one block becomes the input to the next.

7. **The model predicts the next token.**
   After the tokens have passed through the transformer layers, the model produces a probability distribution over its possible next tokens. Given the phrase “Peanut butter and,” for example, it might assign a high probability to “jelly.”

   One token is then selected. The most likely token is not always chosen; a setting sometimes called **temperature** can make the selection more predictable or more varied.

8. **Generation repeats one token at a time.**
   The selected token is added to the sequence, and the entire prediction process happens again. This is called **autoregressive generation**: each new token is generated using the tokens that came before it, including the model’s own earlier output.

   A response that appears all at once on a screen was therefore constructed through many repeated predictions. The model does not normally prepare the entire answer in advance. It builds the answer token by token.

## How the Model Is Trained

During its initial training, the model receives large amounts of text. Part of a sequence is provided as input, and the model attempts to predict the token that actually came next. A loss function measures the difference between the model’s predicted probabilities and the real next token.

This is often called **self-supervised learning** because the training material supplies its own labels. People do not need to manually label every sentence. The next token already present in the text acts as the target answer.

Backpropagation calculates how the model’s parameters contributed to the error, and an optimization method adjusts those parameters slightly. This cycle is repeated across enormous numbers of token sequences:

1. Read part of a sequence.
2. Predict the next token.
3. Compare the prediction with the actual token.
4. Calculate the loss.
5. Adjust the parameters.
6. Repeat.

During training, the model repeatedly adjusts its internal values so that its predicted next-token probabilities more closely match the text it is trained on. Across enormous numbers of examples, these adjustments shape the model’s ability to recognize patterns involving grammar, context, style, facts, and relationships between ideas.
After this initial training, many deployed LLMs receive additional **post-training**. Methods such as reinforcement learning from human feedback, or RLHF, use human preferences to encourage responses that people rate as more helpful, safe, or appropriate. Other preference-training methods use similar comparisons without following the exact RLHF process.

Post-training changes how the model responds, but it also introduces another layer of human judgment. The model learns not only from the original text, but also from the preferences, instructions, and incentives built into the evaluation process.

## Why Transformers Require So Much Computation

Attention is powerful because it compares relationships among tokens. However, these comparisons become expensive as the sequence grows.

Imagine placing dots around a circle and drawing a line between every pair. With only a few dots, the number of lines is manageable. As more dots are added, the number of possible connections increases rapidly.

Standard self-attention has a similar property. If the sequence becomes twice as long, the number of token-to-token comparisons can grow to roughly four times as many. This is called **quadratic scaling** with sequence length.

Longer contexts therefore require much more memory and computation. Multiple attention heads and many transformer layers add further work. The feed-forward networks inside the transformer blocks also contain a large share of the model’s parameters and calculations.

Training a frontier-scale LLM can require:

* Enormous text datasets
* Large groups of specialized processors
* Extensive memory and data storage
* Significant electricity and cooling
* Weeks or months of coordinated computation
* Large teams responsible for data, infrastructure, evaluation, and safety

Each individual operation is relatively simple. The extraordinary capability and cost come from performing vast numbers of these operations across billions of parameters and enormous amounts of data.

## What the Model Learns

An LLM does not store one readable dictionary, database, or set of handwritten rules. Its training changes billions of parameters so that the network becomes better at predicting language. Information is distributed across this large numerical system.

Because written language contains descriptions of the world, arguments, stories, instructions, code, and records of human reasoning, next-token prediction requires the model to learn rich patterns. Predicting the next word in a complicated passage may require tracking the subject, following an argument, recalling relevant information, or imitating a particular style.

This helps explain why next-token prediction can produce abilities that appear broader than simple autocomplete. However, predicting language remains different from guaranteeing truth. A model can learn how a correct explanation usually sounds without having a dependable way to check whether a particular explanation is correct.

An LLM can also be connected to search engines, databases, calculators, sensors, or other tools. In those systems, the model may gain access to information beyond its original training data. That added access can improve accuracy, but it does not remove the need to verify how the information was retrieved, interpreted, and presented.

## What Can Go Wrong

### Fluency can be mistaken for accuracy

An LLM is trained to produce plausible continuations of text. A false claim can be written in the same clear, confident style as a true one. The model’s ability to produce polished language can therefore encourage people to trust an answer more than the evidence supports.

Models do produce probability estimates over tokens, but those probabilities are not reliable truth scores. A model can be highly confident in a continuation that is factually wrong.

### The model can generate unsupported information

When an LLM produces information that is false, fabricated, or unsupported by the available evidence, the output is often called a **hallucination** or **confabulation**. This can include invented quotations, nonexistent sources, false legal cases, incorrect medical information, or made-up details about real people and events.

Because generation is autoregressive, an early mistake can influence everything that follows. Once the model introduces a false detail, later tokens may build a coherent explanation around it.

### Context changes the model’s behavior

The model’s response depends heavily on the text in its current context, including the system instructions, the user’s request, attached documents, and its own earlier output. Small changes in wording can sometimes produce large changes in the answer.

This sensitivity makes LLM behavior difficult to predict consistently. A model may answer one version of a question correctly and fail on a slightly different version. It can also be manipulated by misleading or hostile instructions included in text it is asked to process.

### Training data carries social patterns and exclusions

Training data contains stereotypes, misinformation, cultural assumptions, and unequal representation. Languages and communities with large amounts of digitized text are represented more heavily than those with less available data.

The model can reproduce these patterns in both obvious and subtle ways. It may perform unevenly across languages, dialects, professions, cultures, or social groups. Even when explicitly harmful content is filtered, unequal representation can still shape which knowledge and communication styles the model treats as normal.

### Preference training can reward agreeableness

Post-training often encourages models to be helpful and satisfying to interact with. However, human evaluators may prefer confident, agreeable, or emotionally reassuring answers even when a more cautious response would be more accurate.

This can contribute to **sycophancy**, in which a model accepts or reinforces a user’s framing instead of challenging a mistaken assumption. The behavior that earns positive feedback is not always identical to the behavior that is most honest or useful.

### Human-like language encourages anthropomorphism

LLMs use conversational language, respond immediately, remember information within a context, and can imitate empathy or personality. These features make it easy to treat the system as if it possesses stable beliefs, feelings, intentions, or a personal relationship with the user.

The model’s language can be socially convincing without demonstrating that it experiences the conversation or understands it in the same way a person does. Confusing linguistic performance with human-like inner experience can distort trust and authority.

### Training data can be extracted without meaningful consent

Large language models are often trained on material gathered from websites, books, forums, code repositories, and other sources. Some creators and users did not expect their work or conversations to become training data for commercial AI systems.

Whether a source was technically accessible does not settle whether using it was fair, consensual, lawful, or consistent with its original purpose. The scale of data collection can hide the individual people and communities whose work made the model possible.

### Human labor remains hidden

LLMs depend on substantial human labor. People create the original text, clean datasets, label examples, evaluate outputs, identify harmful content, and provide preference feedback. Some of this work is performed under low-paid or psychologically difficult conditions.

Describing the model as learning automatically can make this labor disappear from view, even though the system could not exist without it.

### Scale concentrates control

Training and operating frontier models requires expensive hardware, data infrastructure, energy, and specialized expertise. Only a limited number of companies and governments can develop systems at the largest scale.

This concentration gives a small number of organizations significant influence over which models are built, what data they use, how they are evaluated, who can access them, and which risks are treated as priorities.

## Critical Bridge

| Technical failure mode                                              | Field guide recognition card                                                                                                                             |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Training data reflects existing biases and gaps                     | [Prediction imports the past](/field-guide/pattern-08) and [This system treats one group as the default](/field-guide/pattern-22)                        |
| Fluency is mistaken for accuracy or understanding                   | [AI systems can encourage anthropomorphism](/field-guide/pattern-12)                                                                                     |
| Confident confabulation obscures uncertainty                        | [Opacity shifts authority](/field-guide/pattern-09)                                                                                                      |
| Capability and infrastructure are controlled by a few organizations | [Power can concentrate in infrastructure](/field-guide/pattern-15)                                                                                       |
| Training data is collected from human-created material              | [Extraction can be disguised as innovation](/field-guide/pattern-14) and [Data collected for one purpose gets used for another](/field-guide/pattern-03) |
| Data preparation and preference training rely on human workers      | [Invisible labor makes the system possible](/field-guide/pattern-27)                                                                                     |

## Connected Labs

Lab 6 examines opacity and the limits of AI explanation.
