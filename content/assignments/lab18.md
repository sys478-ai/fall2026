---
title: 'How Circuits Do Math'
num: '18'
type: 'lab'
draft: 0
---

How switches, logic gates, and binary states can become arithmetic, computation, and decision-making.

## Overview

Computers can seem magical because they do so many complex things: calculate, classify, predict, recommend, generate text, detect anomalies, and control physical systems. But at the hardware level, computation is built from simple physical operations.

A circuit can represent information using electrical states such as low voltage and high voltage. Logic gates combine those states according to simple rules. By connecting gates together, computers can perform arithmetic. By connecting many arithmetic operations together, computers can run programs, train models, process sensor data, and support AI systems.

This lab introduces the basic idea of how circuits can “do math.” You will work with binary values, logic gates, truth tables, and a simple half-adder. The purpose is not to become an electrical engineer. The purpose is to demystify computation and connect hardware-level operations to larger questions about abstraction, opacity, reliability, energy, and governance.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain how binary values can represent information.
- Describe how logic gates implement simple rules.
- Read and complete a truth table.
- Explain how a half-adder uses logic gates to add two bits.
- Describe how simple circuit operations can scale into complex computation.
- Analyze why understanding the parts of a system does not always mean understanding the whole system.
- Connect circuit-level computation to governance questions about opacity, reliability, hardware control, and accountability.

## Key Terms

| Term        | Working Definition                                                                   |
| ----------- | ------------------------------------------------------------------------------------ |
| Bit         | A binary value, usually represented as `0` or `1`.                                   |
| Binary      | A system with two possible values.                                                   |
| Logic gate  | A circuit or rule that takes one or more binary inputs and produces a binary output. |
| Truth table | A table showing the output of a logic rule for every possible input combination.     |
| AND gate    | Outputs `1` only if both inputs are `1`.                                             |
| OR gate     | Outputs `1` if at least one input is `1`.                                            |
| NOT gate    | Reverses the input: `1` becomes `0`, and `0` becomes `1`.                            |
| XOR gate    | Outputs `1` if the inputs are different.                                             |
| Half-adder  | A simple circuit that adds two one-bit numbers and produces a sum and carry.         |
| Abstraction | A way of hiding lower-level details so people can work at a higher level.            |
| Scale       | The way small operations combine into larger systems.                                |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> What does it mean to say that a computer “does math”? Where do you imagine the math happens?

Write 4–6 sentences.

Consider:

- electricity
- circuits
- software
- memory
- processors
- numbers
- instructions
- physical states
- rules
- interpretation

## Part 2: Binary Values

Computers often represent information using binary values.

A bit can be:

| Physical State | Binary Meaning |
| -------------- | -------------- |
| low voltage    | `0`            |
| high voltage   | `1`            |
| switch open    | `0`            |
| switch closed  | `1`            |
| LED off        | `0`            |
| LED on         | `1`            |

But the physical state and the meaning are not the same thing. People and systems assign meaning to physical states.

Complete the table.

| Physical State | Possible Binary Value | What Could It Represent? |
| -------------- | --------------------- | ------------------------ |
| LED off        |                       |                          |
| LED on         |                       |                          |
| switch open    |                       |                          |
| switch closed  |                       |                          |
| low voltage    |                       |                          |
| high voltage   |                       |                          |
| no spike       |                       |                          |
| spike          |                       |                          |

Discuss:

- Could the meanings be reversed?
- What makes the representation reliable?
- What happens if the physical signal is noisy?
- Why is binary useful for physical computation?

## Part 3: Logic Gates as Rules

Logic gates combine binary inputs to produce binary outputs.

### AND Gate

The AND gate outputs `1` only if both inputs are `1`.

| A   | B   | A AND B |
| --- | --- | ------- |
| 0   | 0   |         |
| 0   | 1   |         |
| 1   | 0   |         |
| 1   | 1   |         |

### OR Gate

The OR gate outputs `1` if at least one input is `1`.

| A   | B   | A OR B |
| --- | --- | ------ |
| 0   | 0   |        |
| 0   | 1   |        |
| 1   | 0   |        |
| 1   | 1   |        |

### XOR Gate

The XOR gate outputs `1` if the inputs are different.

| A   | B   | A XOR B |
| --- | --- | ------- |
| 0   | 0   |         |
| 0   | 1   |         |
| 1   | 0   |         |
| 1   | 1   |         |

Discuss:

- Which gate seems most intuitive?
- Which gate seems least intuitive?
- How are these rules like classification rules?
- How are they different from machine learning models?

## Part 4: Switch Models of Gates

Logic gates can be represented with simple switch arrangements.

### AND as Switches in Series

Two switches in a row can model AND.

The light turns on only if both switches are closed.

| Switch A | Switch B | Light On? | Binary Output |
| -------- | -------- | --------- | ------------- |
| open     | open     |           |               |
| open     | closed   |           |               |
| closed   | open     |           |               |
| closed   | closed   |           |               |

### OR as Switches in Parallel

Two switches on alternate paths can model OR.

The light turns on if either switch is closed.

| Switch A | Switch B | Light On? | Binary Output |
| -------- | -------- | --------- | ------------- |
| open     | open     |           |               |
| open     | closed   |           |               |
| closed   | open     |           |               |
| closed   | closed   |           |               |

Discuss:

- How can a physical circuit implement a logical rule?
- What has to be true physically for the rule to work?
- What could make the circuit fail?
- Why might engineers build more reliable versions of these gates at tiny scales?

## Part 5: Adding Two Bits

Now imagine adding two one-bit numbers.

The possible inputs are:

| A   | B   | Decimal Meaning |
| --- | --- | --------------- |
| 0   | 0   | 0 + 0           |
| 0   | 1   | 0 + 1           |
| 1   | 0   | 1 + 0           |
| 1   | 1   | 1 + 1           |

When adding bits, the result may require two outputs:

- **Sum**: the value in the current bit position
- **Carry**: the value carried into the next bit position

Complete the table.

| A   | B   | Decimal Addition | Sum | Carry |
| --- | --- | ---------------- | --- | ----- |
| 0   | 0   | 0 + 0 = 0        |     |       |
| 0   | 1   | 0 + 1 = 1        |     |       |
| 1   | 0   | 1 + 0 = 1        |     |       |
| 1   | 1   | 1 + 1 = 2        |     |       |

Hint:

In binary, `1 + 1` is written as `10`.

That means:

- Sum = `0`
- Carry = `1`

## Part 6: The Half-Adder

A half-adder is a simple circuit that adds two bits.

It uses:

- XOR for the **Sum**
- AND for the **Carry**

Complete the table.

| A   | B   | A XOR B = Sum | A AND B = Carry |
| --- | --- | ------------- | --------------- |
| 0   | 0   |               |                 |
| 0   | 1   |               |                 |
| 1   | 0   |               |                 |
| 1   | 1   |               |                 |

Key idea:

> A circuit can do arithmetic by combining simple logic gates.

Discuss:

- Why does XOR produce the sum?
- Why does AND produce the carry?
- What does this show about how math can be physically implemented?

## Part 7: From One Bit to Larger Computation

A half-adder only adds two one-bit numbers.

But larger circuits can be built by connecting smaller circuits.

Complete the table.

| Small Component    | Larger System Built From It |
| ------------------ | --------------------------- |
| transistor         |                             |
| logic gate         |                             |
| half-adder         |                             |
| full adder         |                             |
| arithmetic circuit |                             |
| processor          |                             |
| computer           |                             |
| AI accelerator     |                             |
| neuromorphic chip  |                             |

Discuss:

- How can simple operations scale into complex systems?
- At what point does the system become hard to understand?
- Does understanding a half-adder mean understanding a modern AI chip?
- Why is abstraction necessary?
- What does abstraction hide?

## Part 8: Abstraction and Opacity

Computing systems are built in layers.

| Layer        | Example                                         |
| ------------ | ----------------------------------------------- |
| Materials    | silicon, metals, 2D materials, insulators       |
| Devices      | transistors, memristors, sensors                |
| Circuits     | logic gates, memory cells, adders               |
| Architecture | processor, memory, bus, accelerator             |
| Software     | operating systems, libraries, applications      |
| Models       | classifiers, neural networks, anomaly detectors |
| Institutions | hospitals, schools, companies, governments      |
| Society      | laws, norms, markets, power, inequality         |

Discuss:

- Which layers are visible to users?
- Which layers are visible to developers?
- Which layers are visible to hardware engineers?
- Which layers are visible to regulators?
- Which layers are usually hidden?
- Where can ethical issues enter the system?

Key question:

> If every small part follows a rule, can the whole system still be difficult to explain or govern?

## Part 9: Reliability and Failure

Circuit-level computation depends on reliable physical behavior.

Possible failures include:

- voltage too high or too low
- heat
- noise
- material defects
- manufacturing variation
- aging components
- power loss
- faulty connections
- design bugs
- malicious tampering

Complete the table.

| Failure Mode         | What Could Happen? | Possible Consequence | Governance Question |
| -------------------- | ------------------ | -------------------- | ------------------- |
| Voltage fluctuation  |                    |                      |                     |
| Heat                 |                    |                      |                     |
| Manufacturing defect |                    |                      |                     |
| Aging hardware       |                    |                      |                     |
| Design bug           |                    |                      |                     |
| Malicious tampering  |                    |                      |                     |
| Power loss           |                    |                      |                     |

Discuss:

- How do physical failures become informational errors?
- How do informational errors become social harms?
- Who is responsible when hardware fails?
- What testing should be required for high-stakes systems?

## Part 10: From Circuits to AI Decisions

AI systems are built on many layers of computation.

A system that denies a loan, flags a medical anomaly, recommends a video, or detects a cyberattack may ultimately rely on physical circuits carrying out simple operations.

Complete the table.

| AI System                 | High-Level Decision | Low-Level Physical Basis | Governance Concern |
| ------------------------- | ------------------- | ------------------------ | ------------------ |
| Spam filter               |                     |                          |                    |
| Credit scoring model      |                     |                          |                    |
| Health anomaly detector   |                     |                          |                    |
| Autonomous vehicle system |                     |                          |                    |
| Facial recognition system |                     |                          |                    |
| Cybersecurity detector    |                     |                          |                    |
| Neuromorphic edge device  |                     |                          |                    |

Discuss:

- Does the physical basis make the system more trustworthy?
- Does understanding the circuit make the AI decision explainable?
- What kinds of explanation are needed at different layers?
- Who should be able to inspect each layer?

## Part 11: Social and Ethical Questions

Discuss:

- Why is it useful to demystify computation?
- Why is demystification not enough for governance?
- Who benefits when computing systems seem magical or incomprehensible?
- Who benefits when computing systems are explainable at multiple layers?
- How can hardware complexity concentrate power?
- Should public institutions adopt systems they cannot inspect?
- Should high-stakes AI systems require hardware documentation?
- What should be required before AI chips are used in safety-critical settings?

## Part 12: Technical Translation

This lab illustrates several technical and governance ideas.

| Lab Activity                        | Technical or Governance Analogue |
| ----------------------------------- | -------------------------------- |
| Completing truth tables             | Formal logic                     |
| Modeling gates with switches        | Physical implementation of logic |
| Building a half-adder               | Arithmetic circuit design        |
| Connecting small parts into systems | Scaling and abstraction          |
| Asking what layers are visible      | Transparency and documentation   |
| Asking how circuits fail            | Reliability and safety analysis  |
| Connecting circuits to AI systems   | Hardware-level accountability    |
| Asking who can inspect              | Governance and power             |

Key takeaway:

> Computation can be built from simple physical operations, but large systems can still become difficult to understand, inspect, repair, and govern.

## Part 13: Connection to BRAID

BRAID focuses on neuromorphic hardware, not just software.

This means that computation is shaped by:

- materials
- devices
- circuits
- memory
- spikes
- timing
- architecture
- energy constraints
- manufacturing variation
- hardware-level learning

The half-adder is not a neuromorphic circuit, but it teaches an important principle:

> Physical circuits can implement information processing.

In conventional computers, circuits implement digital logic and arithmetic. In neuromorphic systems, circuits may implement spike generation, timing behavior, memory-like state changes, adaptation, and anomaly detection.

This raises governance questions:

- What physical behavior is being used as computation?
- What happens when the circuit behaves unexpectedly?
- Can the behavior be tested and verified?
- Can the system be inspected after deployment?
- Can a decision be traced from signal to circuit to output?
- Who has the expertise and authority to evaluate the hardware?

## Part 14: Governance Review

Your group has been asked to evaluate whether a specialized AI chip should be used in a high-stakes anomaly detection system.

Choose one context:

- medical device
- autonomous vehicle
- cybersecurity hardware
- factory safety system
- public infrastructure monitor
- smart home safety device
- drone navigation system
- hospital patient monitor

Complete the table.

| Governance Question                                     | Group Response |
| ------------------------------------------------------- | -------------- |
| What high-level decision does the system make?          |                |
| What physical signals or circuits support the decision? |                |
| What could go wrong at the hardware level?              |                |
| What could go wrong at the model level?                 |                |
| What could go wrong at the institutional level?         |                |
| What testing should be required?                        |                |
| What documentation should be required?                  |                |
| Who should be able to inspect the hardware?             |                |
| What should happen if the chip cannot be audited?       |                |
| Should this system be used in this context?             |                |

## Deliverable: Circuit-to-Governance Memo

Submit a short memo explaining how hardware-level computation connects to governance.

Your memo should include:

1. The high-stakes system you analyzed.
2. The high-level decision or action.
3. One low-level hardware or circuit dependency.
4. One possible hardware failure or uncertainty.
5. One explanation or auditability concern.
6. One accountability concern.
7. A governance recommendation.

## Suggested Memo Format

```markdown
# Circuit-to-Governance Memo

## System Context

What high-stakes system are you analyzing?

## High-Level Decision

What decision, alert, or action does the system produce?

## Hardware Dependency

What physical signals, circuits, chips, or devices support the decision?

## Failure or Uncertainty

What could go wrong at the hardware level?

## Explanation or Auditability Concern

What would need to be inspected, documented, or explained?

## Accountability Concern

Who should be responsible if hardware-level computation contributes to harm?

## Governance Recommendation

What testing, documentation, audit, repair, or use restrictions should be required?
```

## Exit Ticket

Individually, answer:

1. How can a circuit “do math”?
2. Why does understanding simple gates not automatically make large AI systems easy to govern?
3. What is one governance question that becomes visible when we trace AI decisions down to hardware?
