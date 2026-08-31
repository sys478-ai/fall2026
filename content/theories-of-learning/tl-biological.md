---
card_type: learning-theory
id: tl-biological
slug: biological
title: "Biological"
subtitle: "Is this system's 'learning' happening through something like synaptic strengthening, or is that just a metaphor borrowed from neuroscience?"
num: '1'
order: 1
related_recognition_cards: []
related_concept_cards: []
related_example_cards: []
field_guide_section: 'theories-of-learning'
status: unverified
priority: high
---

## The Core Idea

Biological accounts of learning start from a simple hypothesis: when an organism learns something, its nervous system physically changes.

Donald Hebb proposed a foundational mechanism in 1949: when one neuron repeatedly helps fire another, the connection between them strengthens. Learning, on this account, isn't abstract information processing happening somewhere immaterial; it is a physical modification of the nervous system produced by experience.

<div class="diagnostic-question diagnostic-question--teal">

  <p class="diagnostic-question-eyebrow">Basic Claim</p>

  <p class="diagnostic-question-text">Experience changes the nervous system, and those physical changes alter what the organism is likely to do in the future</p>

</div>


The changes can involve how strongly neurons communicate, how responsive a pathway becomes, or, over longer periods, the physical structure of the connections between neurons.

## How Biological Learning Works

Research by Eric Kandel and his collaborators provided concrete examples of how experience can change neural signaling.

### Habituation: Weakening Synaptic Connections

In Kandel's experiments with the sea slug <em>Aplysia</em>, repeated gentle touches made the animal withdraw its gill less and less. This process is called <strong>habituation</strong>.

The intuition is simple: if the same stimulus keeps happening and nothing bad follows, the nervous system gradually treats it as *less important*. At the biological level, the neurons involved in the withdrawal reflex begin sending *weaker signals* to one another. Because the signal traveling through the pathway is weaker, the animal becomes **less likely** to respond.

### Sensitization: Strengthening Synaptic Connections

Kandel and his collaborators also studied the opposite process, called <strong>sensitization</strong>. After a *strong or noxious stimulus*, such as a tail shock, the animal became more responsive to later stimulation. In this case, signaling between neurons became **stronger**, making the withdrawal response **more likely**.

Together, habituation and sensitization show the basic biological principle: experience can change the strength of neural responses, and those changes can alter subsequent behavior.

### Longer-Term Learning

With longer-term learning, these changes can become more durable. The nervous system may not only change how strongly neurons communicate, but also make **physical changes to the connections between neurons**, including changes in the number and structure of synaptic connections.

This gives the biological account a physical picture of memory and learning: experience can leave lasting changes in the nervous system that affect how the organism responds later.


## Why This Matters for AI

The vocabulary of machine learning is closely connected to this biological tradition. "Neural network," "neuron," "weights," and "learning" all draw, directly or indirectly, on ideas developed through the study of biological nervous systems.

That connection is historically and conceptually important, but it can also be misleading. An artificial neural network does not automatically become biologically similar simply because it uses biological terminology.

The useful question is therefore not whether an AI system is called "neural," but **what actually changes when it learns**.

A system might change:

- its numerical parameters or weights;
- its internal structure;
- its behavior without changing its underlying parameters;
- or some combination of these.

Those distinctions matter when someone claims that an AI system learns "like a brain."

## Tensions and Limits

The inspiration connecting artificial and biological neural networks is real but loose.

**Backpropagation** – the algorithm that actually trains most modern neural networks – has no known biological analogue. Nothing in a real nervous system is known to compute gradients and update connections in exactly the way backpropagation does. The shared vocabulary can therefore overstate the resemblance: a system can be called "neural" while working very differently from a nervous system.

That said, the metaphor isn't completely unfounded, either. Biological ideas helped shape the development of artificial neural networks and continue to influence how the field thinks about connectivity, plasticity, distributed representation, and learning.

Therefore, the biological lineage is real, but the analogy breaks down in specific places.

## Questions To Ask

- What changes in this system when it learns: its weights, its structure, its behavior, or something else?
- Is the change persistent, or does it disappear when the system is reset?
- What mechanism produces the change?
- When a company says its AI learns "like the brain," what specific biological mechanism is it claiming?
- Does the system actually implement that mechanism, or is "brain-like" mainly a metaphor?
- What does the biological metaphor clarify about this system?
- What might the metaphor obscure or overstate?

## Key Thinkers

<div class="thinker-entry">

  <div class="thinker-avatar-wrap">

    <img class="thinker-avatar" src="/fall2026/images/ethics-field-guide/theories-of-learning/hebb.jpg" alt="Portrait of Donald Hebb">

    <span class="thinker-avatar-caption">Photo: McGill University. Unconfirmed license.</span>

  </div>

  <p><strong>Donald Hebb</strong> (1904–1985) proposed the foundational hypothesis in <em>The Organization of Behavior</em> (1949): when a neuron repeatedly participates in firing another, a growth process strengthens the connection between them. Later summarized as "neurons that fire together, wire together," Hebb's postulate provided an influential mechanistic account of how experience could become physical change in the nervous system.</p>

</div>

<div class="thinker-entry">

  <div class="thinker-avatar-wrap">

    <img class="thinker-avatar" src="/fall2026/images/ethics-field-guide/theories-of-learning/kandel.jpg" alt="Portrait of Eric Kandel">

    <span class="thinker-avatar-caption">CC BY-SA 4.0, Wikimedia</span>

  </div>

  <p><strong>Eric Kandel</strong> (1929–) provided important experimental evidence that learning and memory correspond to measurable changes in synaptic strength. His work with the sea slug <em>Aplysia</em> helped establish a physical, cellular account of learning and memory and contributed to his receiving the 2000 Nobel Prize in Physiology or Medicine.</p>

</div>

<div class="thinker-entry">

  <div class="thinker-avatar-wrap">

    <img class="thinker-avatar" src="/fall2026/images/ethics-field-guide/theories-of-learning/bliss-lomo.jpg" alt="Photo of Timothy Bliss and Terje Lømo">

    <span class="thinker-avatar-caption">Photo: BrainFacts.org (Tim Vernimmen). Unconfirmed license.</span>

  </div>

  <p><strong>Timothy Bliss and Terje Lømo</strong> discovered long-term potentiation (LTP) in 1973–a long-lasting strengthening of synaptic transmission in the mammalian brain following repeated stimulation. Their work provided an important experimental basis for the idea that changes in synaptic strength could contribute to the physical storage of memory.</p>

</div>

## Sources

- Donald O. Hebb, *The Organization of Behavior: A Neuropsychological Theory* (New York: Wiley, 1949).

- Eric R. Kandel, *In Search of Memory: The Emergence of a New Science of Mind* (New York: W. W. Norton & Company, 2006).

- T.V.P. Bliss and T. Lømo, "Long-Lasting Potentiation of Synaptic Transmission in the Dentate Area of the Anaesthetized Rabbit Following Stimulation of the Perforant Path," *Journal of Physiology* 232, no. 2 (1973): 331–356.

**<strong>Further Reading (More Accessible):</strong>**

- ["Hebbian Learning,"](https://thedecisionlab.com/reference-guide/neuroscience/hebbian-learning) The Decision Lab.