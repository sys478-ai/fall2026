---
card_type: learning-theory
id: tl-constructivism
slug: constructivism
title: "Constructivism"
subtitle: "Is this system constructing its own understanding by actively building and revising internal models of the world, the way a child does – or is it just fitting a function to data?"
num: '3'
order: 3
related_recognition_cards: []
related_concept_cards: []
related_example_cards: []
field_guide_section: 'theories-of-learning'
status: unverified
priority: high
---

## The Core Idea

Constructivism holds that learners are not passive recipients of information – they actively build their own understanding by interacting with the world and revising the ***mental models*** they already hold. Jean Piaget described this as a cycle of assimilation (fitting new information into an existing framework) and accommodation (changing the framework when new information will not fit). A child does not absorb the concept of number; they construct it through repeated encounters with objects, quantities, and error.

Constructivism therefore explains learning as a change in how a learner organizes and makes sense of experience. Piaget also argued that some forms of understanding emerge through developmental stages, as children develop new ways to reason about objects, relationships, and ideas.

## Example: Explaining Learning

A child sees two equal amounts of water in identical glasses. When one is poured into a taller, narrower glass, a younger child may say the taller glass has more water. Later, the child understands that the amount stayed the same even though its appearance changed. Piaget treated this shift as evidence that **the child's mental structures had changed across developmental stages**.

***Assimilation*** and ***accommodation*** describe how such change happens. A child may initially fit new experiences into an existing idea (assimilation), but when the idea no longer works, the child must revise it (accommodation). Constructivism explains learning as this active process of building and revising an understanding of the world.

- ***Assimilation*** - fitting an idea or experience into one's existing way of understanding the world.
- ***Accommodation*** – changing an existing mental model, or creating a new one, when an new experience does not fit.

## Why This Matters for AI

Constructivism makes internal models central. For AI, it raises a question that behaviorism does not: when a system produces increasingly accurate outputs, has it built a model of its domain that helps it deal with new situations, or has it only learned patterns that fit its training data?

It is easy to confuse that question with categorization in machine learning. In *supervised learning*, examples are paired with target labels such as "cat" or "dog," and the system may develop internal representations in which similar examples produce similar patterns. In *unsupervised learning*, a system may group examples into clusters based on similarity – but what those clusters mean depends on the data, features, objective, and human interpretation. Neither labels nor clusters are automatically Piagetian categories. For Piaget, a category is part of a learner's actively constructed way of understanding the world: it shapes interpretation, expectation, and revision through assimilation and accommodation. An ML label, cluster, or representation may resemble one piece of that process, but by itself it does not show that the system has constructed a category in Piaget's sense.

<div class="diagnostic-question diagnostic-question--sky">
  <p class="diagnostic-question-eyebrow">Caveats</p>
  <p class="diagnostic-question-text">Is this system constructing its own understanding by actively building and revising internal models of the world, the way a child does – or is it just fitting a function to data?</p>
</div>

## Questions To Ask

- What evidence suggests that this system has built a model of its domain, rather than only learned to produce familiar-looking outputs?
- How does the system respond when new information conflicts with its earlier patterns?
- Is the system tested and corrected through contact with the world, or trained once on a fixed dataset and then frozen?
- When someone says the system "understands," what would count as evidence for that claim?

## Tensions and Limits

Constructivism can be hard to test: almost any successful learning system can be described as having "constructed a model," which risks making the idea less explanatory. Piaget's account also centers the individual learner more than the social and cultural conditions that make learning possible. The [Sociocultural](/field-guide/theories-of-learning/tl-sociocultural) card develops that critique. Still, constructivism gives students a useful standard for asking whether an AI system has anything like an internal model, rather than stopping at whether its outputs look right.

## Key Thinkers

<div class="thinker-entry">
  <div class="thinker-avatar-wrap">
    <img class="thinker-avatar" src="/fall2026/images/ethics-field-guide/theories-of-learning/piaget.jpg" alt="Portrait of Jean Piaget">
    <span class="thinker-avatar-caption">Public domain</span>
  </div>
  <p><strong>Jean Piaget</strong> (1896–1980) spent five decades studying how children's understanding develops, describing four qualitatively distinct stages of cognitive development in works including <em>The Origins of Intelligence in Children</em> (1952). His central claim – that knowledge is actively built through interaction with the world, not transmitted or absorbed – became the foundation of constructivist learning theory.</p>
</div>

<p><strong>John Dewey</strong> (1859–1952) was a pragmatist who argued that people learn through inquiry, action, and reflection on experience. He is not a Piagetian, but his work is an important bridge to constructivism: learners make sense of problems by testing ideas in the world, not by receiving finished knowledge. Dewey also connected this kind of shared inquiry to democratic participation.</p>

<div class="thinker-entry">
  <div class="thinker-avatar-wrap">
    <img class="thinker-avatar" src="/fall2026/images/ethics-field-guide/theories-of-learning/papert.jpg" alt="Portrait of Seymour Papert">
    <span class="thinker-avatar-caption">CC BY-SA 2.0, Wikimedia</span>
  </div>
  <p><strong>Seymour Papert</strong> (1928–2016), Piaget's student and collaborator, extended constructivism directly into computing. His "constructionism" argued that learners build understanding most effectively by building external artifacts – famously through the Logo programming language he co-created for children. Papert's work sits at the exact intersection this card is concerned with: what it means for a machine, and for a child working with one, to construct knowledge.</p>
</div>

## Sources

- Jean Piaget, _The Origins of Intelligence in Children_, trans. Margaret Cook (New York: International Universities Press, 1952).
- John Dewey, _Democracy and Education_ (New York: Macmillan, 1916).
- ["Jean Piaget,"](https://www.britannica.com/biography/Jean-Piaget) Encyclopædia Britannica.

**Further Reading (More Accessible):**

- Saul McLeod, ["Piaget's Theory and Stages of Cognitive Development,"](https://www.simplypsychology.org/piaget.html) Simply Psychology.
