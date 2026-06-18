---
slug: braid-case-study
title: 'BRAID Case Study'
subtitle: 'The goal of this case study is not to become neuromorphic engineers. The goal is to develop enough technical grounding to ask better public questions about emerging AI systems before their uses become settled.'
type: 'case-study'
---

> ## Pedagogical Plan
>
> “Here is a science or engineering idea. What public question does this idea force us to ask?”
>
> - Every BRAID topic should explicitly connect technical grounding to a SYS Field Guide concept, AI deployment pattern, or ethical/governance question.

## 1. What is BRAID?

BRAID is an NSF-funded research project exploring brain-inspired, energy-efficient computing systems that can detect unexpected patterns and adapt over time. In this course, we use BRAID as a case study in anticipatory governance: how should publics, researchers, institutions, and policymakers reason about an emerging technology before its uses become settled?

## 2. How does BRAID connect to the course?

BRAID is a worked case study for practicing the main habit of this course: connecting technical ideas to public questions.

The broader course introduces a Field Guide of technical explainers, AI deployment patterns, STS concepts, and ethical frameworks. The BRAID case study gives us one emerging technology where we can practice using those tools together. As you move through the BRAID materials, ask how each science or engineering idea connects to larger questions about power, accountability, explanation, harm, benefit, and governance.

This case study asks us to move through four layers of the [Field Guide](/fall2026/field-guide):

| Layer                                                                               | Guiding question                                                                                                     |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **[Technical or scientific grounding](/fall2026/field-guide/technical-explainers)** | What is the science or engineering idea?                                                                             |
| **[AI deployment pattern](/fall2026/field-guide/deployment-patterns)**              | What recurring pattern does this idea create, intensify, or make visible?                                            |
| **[STS concept](/fall2026/field-guide/sts-concepts)**                               | What assumptions, institutions, histories, or infrastructures help explain why this pattern matters?                 |
| **[Ethical or governance question](/fall2026/field-guide/ethical-frameworks)**      | Who benefits, who bears risk, who can contest the system, and what forms of oversight or refusal should be possible? |

The goal is not to analyze BRAID in isolation. The goal is to use BRAID as a concrete case for practicing how public reasoning about emerging AI systems can be technically grounded, socially informed, and governance-oriented.

## 3. About the Technology & Its Potential Impacts

> ### Rubric to Use Here:
>
> <!-- .list-spaced -->
>
> 1. **What is the science or engineering idea?**<br>What concept, mechanism, metaphor, or design choice is being introduced?
> 2. **What problem is this idea trying to solve?**<br>Why does this idea matter to researchers or engineers?
> 3. **What does it assume, simplify, or make invisible?**<br>What gets left out when we explain the system this way?
> 4. **What public question follows?**<br>What questions does this raise about harm, benefit, accountability, governance, or democratic participation?

### 3.1. Why neuromorphic computing?

What problems is neuromorphic computing supposed to solve? What values are built into claims about speed, efficiency, adaptivity, and brain-inspired design?

#### Field Guide connections

<!-- .list-spaced -->

1. **Technical explainer:** [Neuromorphic Computing](/fall2026/field-guide/technical-explainers/neuromorphic-computing)
1. **STS concept:** [AI is material: it depends on energy, water, chips, labor, mining, and waste](/fall2026/field-guide/sts-concepts/ai-is-material)<br>
   Helps students scrutinize energy-efficiency claims without dismissing them.
1. **STS concept:** [Sociotechnical imaginaries](/fall2026/field-guide/sts-concepts/sociotechnical-imaginaries)<br>Helps students ask what future this technology invites us to imagine.
1. **STS concept:** [How a technology is described shapes how it is governed](/fall2026/field-guide/sts-concepts/how-a-technology-is-described-shapes-how-it-is-governed)<br>Helps students analyze phrases like “brain-inspired,” “efficient,” “adaptive,” and “edge.”

### 3.2. Neuroscience primer

What do neurons, synapses, spikes, plasticity, and the cerebellum helps us understand? What do brain metaphors clarify, and what might they distort?

#### Field Guide connections

<!-- .list-spaced -->

1. **Pattern:** [AI can encourage anthropomorphism and aliveness claims](/fall2026/field-guide/deployment-patterns/ai-systems-can-encourage-anthropomorphism-aliveness-or-sentience-claims) <br>
   Strongest connection. A neuroscience primer can easily lead students to overread the analogy: if the system has “neurons,” “spikes,” or “learning,” they may assume it is more brain-like, intelligent, or alive than it really is. The deployment pattern page describes this as human-centered metaphors distorting public understanding of what systems are and what they deserve.
1. **STS concept:** [How a technology is described shapes how it is governed](/fall2026/field-guide/sts-concepts/how-a-technology-is-described-shapes-how-it-is-governed) <br>
   This fits because words like brain-inspired, neural, learning, plasticity, and cerebellum-inspired are not neutral. They shape what students, publics, policymakers, and even researchers think the system is. If it sounds “natural” or “brain-like,” some people may trust it too much; others may fear it for the wrong reasons.
1. **STS concept:** [Sociotechnical imaginaries](/fall2026/field-guide/sts-concepts/sociotechnical-imaginaries) <br>
   This fits because neuroscience analogies carry visions of the future: machines that learn like brains, adapt like organisms, or respond intelligently in the world. This concept helps students ask what future is being imagined and who gets to shape that imagination.
1. **STS concept:** [Situated knowledge](/fall2026/field-guide/sts-concepts/situated-knowledge) <br>
   This is useful because neuroscience itself is a partial way of knowing, not a total explanation of intelligence, learning, or human experience. It helps students remember that biological accounts, engineering accounts, and lived human accounts each reveal different things.

### 3.3. Spiking neural networks

How do spiking neural networks differ from other neural networks? What does event-driven, timing-based computation make possible? What might it make harder to explain?

#### Field Guide connections

<!-- .list-spaced -->

1. **Technical explainer:** [Unsupervised Learning](/fall2026/field-guide/technical-explainers/unsupervised-learning)<br>
   Helps contextualize SNN activity, which involves clustering, specialization, or learning without labels. It helps students understand that the system is not simply being told the “right answer”; it is organizing input patterns according to learned structure.
1. **Pattern:** [Thresholds make uncertainty consequential](/fall2026/field-guide/deployment-patterns/thresholds-make-uncertainty-consequential)<br>
   SNNs involve firing thresholds, activation conditions, and sensitivity settings. That means uncertainty does not remain abstract; it becomes consequential when a neuron fires or does not fire, when a pattern is recognized or ignored, or when later systems act on that signal.
1. **Pattern:** [Opacity shifts authority](/fall2026/field-guide/deployment-patterns/opacity-shifts-authority)<br>
   Possibly the most important pattern for 3.3. If a system’s behavior depends on spike timing, distributed weights, learned patterns, and network dynamics, it may become hard for non-specialists — and sometimes even developers — to explain why a particular output happened. That shifts authority toward technical experts, vendors, or system designers.
1. **STS concept:** [Features are value choices](/fall2026/field-guide/sts-concepts/features-are-value-choices)<br>
   This one fits if students are thinking about what the network receives as input. Even before the SNN learns, someone has decided what signals, dimensions, or measurements count as meaningful. That choice shapes what the system can learn.
1. **Ethical framework:** [Procedural Justice](/fall2026/field-guide/ethical-frameworks/procedural-justice)<br>
   Help us ask whether timing-based, distributed learning systems can be explained well enough for affected people to question, challenge, or appeal their outputs.

### 3.4. Possible deployment scenarios

Anomaly detection can be used in many settings. In some cases, the stakes may be relatively low: a system might flag unusual machine vibration, unexpected network traffic, spoiled fruit, or a failing sensor. In other cases, the stakes may be much higher: a system might flag suspicious behavior, health risk, driver danger, workplace noncompliance, security threats, or military targets. These scenarios matter because the same technical idea -- learning expected patterns and flagging deviations -- raises different public questions depending on where it is used, who is affected, and what happens after something is labeled anomalous. Possible deployment contexts include:

<!-- .list-spaced -->

- **Cybersecurity:** detecting unusual network traffic, possible intrusions, denial-of-service attacks, or device behavior.
- **Industrial monitoring:** detecting machine failure, manufacturing defects, equipment stress, or environmental changes.
- **Robotics and autonomous systems:** detecting unexpected obstacles, sensor changes, balance problems, or unsafe operating conditions.
- **Healthcare and biosensing:** detecting unusual physiological signals, medication needs, mobility changes, or possible health events.
- **Wearables and smart environments:** detecting changes in sleep, movement, behavior, attention, location, or bodily state.
- **Transportation:** detecting driver impairment, unusual road conditions, mechanical faults, or pedestrian/vehicle anomalies.
- **Workplace monitoring:** detecting productivity deviations, safety violations, fatigue, or nonstandard behavior.
- **Public safety and security:** detecting suspicious activity, crowd anomalies, perimeter breaches, or perceived threats.
- **Military or defense systems:** detecting targets, threats, unfamiliar movement patterns, or adversarial behavior.

> For each scenario, ask:
>
> 1. What data or signals are being sensed?
> 2. What counts as normal, expected, risky, or anomalous?
> 3. What happens after the system flags an anomaly?
> 4. Who benefits from the detection?
> 5. Who bears the risk of false positives or false negatives?
> 6. Can affected people understand, contest, or appeal the result?
> 7. Should anomaly detection be used in this context at all?

These scenarios prepare us for the interactive activity below. In that activity, we will use a simplified anomaly detection system to examine how learned patterns, baselines, thresholds, and errors shape what a system treats as normal or unusual.

### 3.5. Interactive anomaly detection activity

How can a system learn patterns and flag something as unusual? Who defines what counts as normal, expected, anomalous, risky, or suspicious?

#### Field Guide connections

<!-- .list-spaced -->

1. **Technical explainer:** [Anomaly Detection](/fall2026/field-guide/technical-explainers/anomaly-detection)<br>
   Grounds the activity in the core idea: systems learn expected patterns and flag inputs that differ from those expectations.
1. **Pattern:** [This system's baseline and categories were chosen, not given](/fall2026/field-guide/deployment-patterns/this-system-baseline-and-categories-were-chosen-not-given)<br>
   Helps students see that “normal” is not discovered automatically. It is shaped by data, examples, thresholds, and design choices.
1. **Pattern:** [Thresholds make uncertainty consequential](/fall2026/field-guide/deployment-patterns/thresholds-make-uncertainty-consequential)<br>
   Helps students ask what changes when a system becomes more or less sensitive to difference.
1. **STS concept:** ["Normal" is constructed](/fall2026/field-guide/sts-concepts/normal-is-constructed)<br>
   Connects the simplified activity to the broader question of how systems define ordinary, expected, risky, or suspicious behavior.
1. **Ethical framework:** [Procedural Justice](/fall2026/field-guide/ethical-frameworks/procedural-justice)<br>
   Helps students ask whether people affected by anomaly detection can understand, question, or challenge the result.

### 3.6. Edge AI and hardware-level learning

What changes when AI systems process data on-device or adapt at the hardware level? Who can inspect, intervene, patch, document, or contest the system once it is deployed?

#### Field Guide connections

<!-- .list-spaced -->

1. **Pattern:** [Automation changes accountability](/fall2026/field-guide/deployment-patterns/automation-changes-accountability)<br>
   Central to this section. If an edge device detects an anomaly and triggers an action quickly, responsibility can become difficult to locate. Is the device designer accountable? The institution that deployed it? The human who trusted it? The person who failed to intervene?
1. **Pattern:** [Opacity shifts authority](/fall2026/field-guide/deployment-patterns/opacity-shifts-authority)<br>
   Hardware-level or on-device learning may be harder to inspect after the fact. If the system adapts locally, or if its internal state is difficult to reconstruct, authority may shift toward whoever has specialized access to the hardware, logs, firmware, or diagnostic tools.
1. **Pattern:** [This system creates asymmetric visibility](/fall2026/field-guide/deployment-patterns/this-system-creates-asymmetric-visibility)<br>
   Edge AI can make sensing more distributed and less obvious. People may be visible to systems they cannot see, understand, question, or opt out of. This matters especially for wearables, smart environments, public safety, workplace monitoring, and defense contexts.
1. **Pattern:** [Power can concentrate in infrastructure](/fall2026/field-guide/deployment-patterns/power-can-concentrate-in-infrastructure)<br>
   This fits better here than in the opening neuromorphic computing section. Even if edge AI seems more distributed than cloud-based AI, control may still concentrate in hardware design, chip fabrication, standards, firmware, vendors, maintenance systems, and audit tools.
1. **STS concept:** [Governance is broader than regulation alone](/fall2026/field-guide/sts-concepts/governance-is-broader-than-regulation-alone)<br>
   This section is about practical governance: documentation, logging, patchability, procurement rules, maintenance, human oversight, appeals, institutional policy, and decisions about whether a system should be deployed at all. Those questions extend beyond formal law.
1. **Ethical framework:** [Rights-Based](/fall2026/field-guide/ethical-frameworks/rights-based)<br>
   Helps students ask questions about privacy, consent, due process, surveillance, refusal, and whether people have a right to know when they are being monitored, classified, or acted upon by an edge system.
1. **Ethical framework:** [Procedural Justice](/fall2026/field-guide/ethical-frameworks/procedural-justice)<br>
   Helps students ask whether affected people can challenge a system output. Is there a process for review? Are decisions documented? Can errors be corrected? Can someone appeal when an edge system gets something wrong?

## 4. Governance Synthesis and Reflection

### ELSI / governance analysis

How should we evaluate the ethical, legal, and societal implications of neuromorphic anomaly detection? What questions should we ask about accountability, bias, privacy, explainability, misuse, environmental impact, and power concentration?

### Reflection and study instruments

What did technical grounding help you understand? What remains unclear or difficult to explain? What would a non-specialist public need to know in order to participate meaningfully in decisions about this kind of technology?
