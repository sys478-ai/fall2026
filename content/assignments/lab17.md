---
title: 'Electricity as Information'
num: '17'
date: '2026-12-30'
type: 'lab'
due_date: '2027-01-06'
draft: 0
---

How physical signals become bits, data, and decisions.

## Overview

Computers often feel abstract. We talk about files, data, models, apps, clouds, platforms, and algorithms. But computation depends on physical systems. At the lowest level, computers use matter and energy: wires, switches, circuits, voltages, charges, materials, sensors, chips, batteries, heat, and signals.

One of the most important ideas in computing is that a physical difference can be interpreted as information. A high voltage can represent `1`. A low voltage can represent `0`. A switch can be open or closed. A light can be on or off. A signal can be present or absent. Once physical states are made reliable, they can be used to represent numbers, text, images, model weights, sensor readings, alerts, and decisions.

This lab introduces the idea that electricity can represent information. You will use simple circuits, diagrams, or a paper simulation to explore how physical states become bits. Then you will connect this technical idea to social and ethical questions about reliability, infrastructure, access, environmental cost, and governance.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain how a physical state can represent information.
- Describe how voltage differences can be interpreted as binary values.
- Distinguish between a physical signal and the meaning assigned to that signal.
- Explain why reliability, thresholds, and noise matter in digital systems.
- Analyze why computation should be understood as material, not immaterial.
- Connect physical computation to governance questions about infrastructure, access, energy, environmental impact, and accountability.

## Key Terms

| Term        | Working Definition                                                           |
| ----------- | ---------------------------------------------------------------------------- |
| Signal      | A physical pattern that can carry information.                               |
| Voltage     | Electrical potential difference; often used in circuits to represent states. |
| Bit         | The smallest unit of digital information, usually represented as `0` or `1`. |
| Binary      | A system with two possible values, such as off/on or 0/1.                    |
| Circuit     | A path through which electricity can flow.                                   |
| Switch      | A component that opens or closes a circuit.                                  |
| Threshold   | A cutoff used to interpret a physical signal as one state or another.        |
| Noise       | Unwanted variation in a signal that can make interpretation harder.          |
| Reliability | The ability of a system to behave consistently under expected conditions.    |
| Abstraction | A way of hiding lower-level details so people can reason at a higher level.  |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> When you save a file, send a message, or use an AI system, what physical things do you imagine are happening?

Write 4–6 sentences.

Consider:

- electricity
- wires
- batteries
- chips
- wireless signals
- data centers
- cooling
- sensors
- storage devices
- materials
- heat
- manufacturing

## Part 2: From Physical Difference to Information

A bit can be represented by many kinds of physical differences.

Complete the table.

| Physical Difference              | Possible Information Meaning | Example           |
| -------------------------------- | ---------------------------- | ----------------- |
| Light off / light on             | 0 / 1                        | LED indicator     |
| Switch open / switch closed      | 0 / 1                        | Wall switch       |
| Low voltage / high voltage       | 0 / 1                        | Digital circuit   |
| No hole / hole                   | 0 / 1                        | Punched card      |
| Magnetized one way / another way | 0 / 1                        | Magnetic storage  |
| No spike / spike                 | 0 / 1 or no event / event    | Spiking system    |
| Quiet / sound detected           | no event / event             | Microphone sensor |
| Stillness / motion detected      | no event / event             | Motion sensor     |

Discuss:

- Is the physical difference itself meaningful?
- Who or what assigns the meaning?
- What has to be stable for the representation to work?
- What could cause the representation to fail?

## Part 3: Simple Circuit Model

Your instructor may provide physical materials or a paper simulation.

### Option A: Physical Circuit

Use:

- battery
- LED
- resistor
- wires
- switch

Build a circuit where the LED turns on when the switch is closed.

### Option B: Paper Simulation

Use cards or drawings to represent:

- power source
- wire
- switch
- LED
- open circuit
- closed circuit

For each state, complete the table.

| Switch State | Does Electricity Flow? | LED State | Possible Bit Value |
| ------------ | ---------------------- | --------- | ------------------ |
| Open         |                        |           |                    |
| Closed       |                        |           |                    |

Discuss:

- Why might “LED off” represent `0`?
- Why might “LED on” represent `1`?
- Could the meanings be reversed?
- What matters more: the physical state or the agreed interpretation?

## Part 4: Thresholds in Physical Signals

Real signals are not always perfectly clean.

Imagine a digital system that interprets voltage this way:

- 0.0 to 1.0 volts = `0`
- 4.0 to 5.0 volts = `1`
- between 1.0 and 4.0 volts = uncertain or invalid

Complete the table.

| Measured Voltage | Interpreted Value | Confident or Uncertain? |
| ---------------: | ----------------- | ----------------------- |
|            0.0 V |                   |                         |
|            0.7 V |                   |                         |
|            1.5 V |                   |                         |
|            2.9 V |                   |                         |
|            4.2 V |                   |                         |
|            5.0 V |                   |                         |

Discuss:

- Why might a system need thresholds?
- What happens if voltage is noisy?
- What happens if the power supply is unstable?
- What happens if hardware degrades?
- How is this similar to thresholds in AI systems?

## Part 5: Noise and Interpretation

A sensor reads the following signal values from a device.

The system treats values above 70 as “active” and values 70 or below as “inactive.”

| Time | Signal Value | Active or Inactive? |
| ---- | -----------: | ------------------- |
| 1    |           20 |                     |
| 2    |           25 |                     |
| 3    |           28 |                     |
| 4    |           68 |                     |
| 5    |           72 |                     |
| 6    |           69 |                     |
| 7    |           75 |                     |
| 8    |           30 |                     |
| 9    |           26 |                     |
| 10   |           80 |                     |

Discuss:

- Which values are clearly inactive?
- Which values are clearly active?
- Which values are close to the threshold?
- How could noise create false signals?
- What safeguards could reduce misinterpretation?

## Part 6: From Bits to Meaning

A bit is simple. But systems combine many bits to represent complex things.

Complete the table.

| Thing Represented   | What It Might Become in a Computer |
| ------------------- | ---------------------------------- |
| Letter              |                                    |
| Photo               |                                    |
| Song                |                                    |
| Temperature reading |                                    |
| GPS location        |                                    |
| Heart rate          |                                    |
| Model weight        |                                    |
| Anomaly score       |                                    |
| Alert               |                                    |
| User profile        |                                    |

Discuss:

- How can simple physical states represent complex information?
- What gets lost when the world is represented as bits?
- What becomes easier to store, copy, transmit, analyze, and monetize?
- What becomes easier to surveil?

## Part 7: Infrastructure Behind “Digital” Systems

Digital systems depend on physical infrastructure.

Complete the table.

| Infrastructure       | What It Does | What Could Go Wrong? | Who Might Be Affected? |
| -------------------- | ------------ | -------------------- | ---------------------- |
| Power grid           |              |                      |                        |
| Batteries            |              |                      |                        |
| Chips                |              |                      |                        |
| Sensors              |              |                      |                        |
| Networks             |              |                      |                        |
| Data centers         |              |                      |                        |
| Cooling systems      |              |                      |                        |
| Repair supply chains |              |                      |                        |
| Recycling systems    |              |                      |                        |

Discuss:

- Who has reliable access to this infrastructure?
- Who does not?
- What happens when infrastructure fails?
- How does infrastructure shape who benefits from AI?

## Part 8: Materiality and Environmental Impact

Because computation is physical, it has environmental impacts.

Consider:

- mining materials
- manufacturing chips
- producing batteries
- powering devices
- cooling servers
- shipping components
- replacing devices
- disposing of e-waste

Complete the table.

| Material or Energy Issue   | Why It Matters | Governance Question |
| -------------------------- | -------------- | ------------------- |
| Rare or critical materials |                |                     |
| Chip fabrication           |                |                     |
| Battery production         |                |                     |
| Electricity use            |                |                     |
| Heat and cooling           |                |                     |
| Device replacement         |                |                     |
| Repairability              |                |                     |
| E-waste                    |                |                     |

Discuss:

- Why might “digital” feel immaterial?
- Who experiences the material costs?
- Who receives the benefits?
- What would responsible design require?

## Part 9: Electricity, Access, and Power

A system that depends on physical infrastructure can deepen inequality.

Discuss the following examples.

| Situation                                                                 | Technical Issue | Social or Ethical Issue |
| ------------------------------------------------------------------------- | --------------- | ----------------------- |
| A student lacks reliable internet or power.                               |                 |                         |
| A medical device needs frequent charging.                                 |                 |                         |
| A smart home device requires constant connectivity.                       |                 |                         |
| A rural clinic has limited network access.                                |                 |                         |
| A school uses AI tools that require newer devices.                        |                 |                         |
| A factory installs sensors workers cannot inspect.                        |                 |                         |
| A city deploys surveillance cameras in some neighborhoods but not others. |                 |                         |

Key question:

> Who gets included or excluded when computation depends on specific infrastructure?

## Part 10: Social and Ethical Questions

Discuss:

- Who controls the physical infrastructure of AI?
- Who owns the chips, sensors, networks, and servers?
- Who can inspect them?
- Who can repair them?
- Who is harmed when infrastructure fails?
- Who benefits when computation becomes cheaper and more widespread?
- What environmental costs are hidden by the language of “cloud” and “digital”?
- Should users know where and how their data is physically processed?
- Should public institutions consider infrastructure and energy costs before adopting AI systems?

## Part 11: Technical Translation

This lab illustrates several technical and governance ideas.

| Lab Activity                             | Technical or Governance Analogue         |
| ---------------------------------------- | ---------------------------------------- |
| Switch open or closed                    | Binary state                             |
| LED off or on                            | Physical representation of a bit         |
| Voltage threshold                        | Digital interpretation of analog signals |
| Noise near a cutoff                      | Signal reliability problem               |
| Combining bits                           | Data representation                      |
| Asking what infrastructure is needed     | Materiality of computation               |
| Asking who has access                    | Infrastructure justice                   |
| Asking about mining, energy, and e-waste | Environmental governance                 |
| Asking who can inspect or repair         | Hardware accountability                  |

Key takeaway:

> Digital information depends on physical states. Computation is not weightless, placeless, or immaterial; it is built from energy, matter, infrastructure, labor, and interpretation.

## Part 12: Connection to BRAID

BRAID focuses on neuromorphic hardware: physical systems designed to support brain-inspired computation.

This means the project is not only about algorithms. It is also about materials, circuits, devices, energy, manufacturing, and physical signals.

Understanding electricity as information helps explain:

- how signals become data
- how spikes can represent events
- how circuits can process information
- how physical states can store memory
- how sensors translate the world into signals
- how hardware can shape what AI systems can do
- why energy efficiency and material design matter

It also raises governance questions:

- What physical signals are being sensed?
- What do those signals represent?
- What uncertainty or noise exists?
- What materials are required?
- What happens if the device fails?
- Who can inspect the hardware?
- Who can repair or replace it?
- What environmental costs are created?

## Part 13: Governance Review

Your group has been asked to evaluate a low-power sensor device that detects anomalies using electrical signals.

Choose one context:

- heart monitoring
- fall detection
- factory vibration monitoring
- cybersecurity hardware
- autonomous vehicle sensor
- smart home safety
- classroom environment monitoring
- public infrastructure monitoring

Complete the table.

| Governance Question                                | Group Response |
| -------------------------------------------------- | -------------- |
| What physical signal is being sensed?              |                |
| What does the signal represent?                    |                |
| What might the signal fail to capture?             |                |
| What noise or uncertainty might affect the signal? |                |
| What threshold interprets the signal?              |                |
| What happens if power fails?                       |                |
| What happens if the sensor degrades?               |                |
| Who can inspect or repair the device?              |                |
| What infrastructure does the device depend on?     |                |
| What environmental costs should be considered?     |                |

## Deliverable: Electricity as Information Memo

Submit a short memo explaining how physical signals become information in one computing or AI system.

Your memo should include:

1. The system or device you analyzed.
2. The physical signal being measured.
3. How the signal is interpreted as information.
4. One uncertainty, noise, or threshold concern.
5. One infrastructure or access concern.
6. One environmental or repair concern.
7. A governance recommendation.

## Suggested Memo Format

```markdown
# Electricity as Information Memo

## System or Device

What system are you analyzing?

## Physical Signal

What physical signal is sensed, stored, transmitted, or interpreted?

## Information Meaning

What does the system treat the signal as meaning?

## Noise or Threshold Concern

What could make the signal ambiguous, unreliable, or misinterpreted?

## Infrastructure or Access Concern

What infrastructure does the system depend on?
Who might be excluded or harmed if that infrastructure is unreliable?

## Environmental or Repair Concern

What material, energy, maintenance, repair, or disposal issue matters?

## Governance Recommendation

What should designers, institutions, or policymakers require before using this system?
```

## Exit Ticket

Individually, answer:

1. What is one way electricity or physical state can represent information?
2. Why is it misleading to think of computation as immaterial?
3. What is one governance question that becomes visible when we remember that AI depends on physical infrastructure?
