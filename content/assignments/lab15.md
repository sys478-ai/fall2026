---
title: 'Energy and Computation'
num: '15'
date: '2026-12-16'
type: 'lab'
due_date: '2026-12-23'
draft: 0
---

How AI systems use energy, why efficiency claims matter, and when lower-power computing can create new risks.

## Overview

AI systems require energy. Energy is used to collect data, move data, train models, run models, cool servers, manufacture hardware, power devices, and maintain infrastructure.

Neuromorphic computing is often described as promising because it may perform some AI tasks more efficiently than conventional approaches. For example, an event-driven system may stay mostly quiet until something meaningful happens. A low-power edge device may process signals locally instead of sending large amounts of data to the cloud. Specialized hardware may reduce the energy needed for certain kinds of computation.

Energy efficiency can be a real benefit. It may reduce power use, lower costs, improve battery life, support remote or resource-constrained applications, and reduce dependence on large data centers.

But efficiency is not automatically good. If a technology becomes cheaper and easier to deploy, it may be used more widely. Low-power AI could support beneficial health monitoring or cybersecurity, but it could also enable pervasive surveillance, military automation, workplace monitoring, or disposable electronic devices. Environmental analysis must also consider manufacturing, materials, water use, repair, replacement, and e-waste.

In this lab, you will analyze the energy and environmental dimensions of AI systems, with special attention to neuromorphic and edge AI.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain that AI energy use includes more than model training.
- Identify energy costs across the lifecycle of an AI system.
- Distinguish between operational energy, manufacturing impact, and disposal impact.
- Analyze the benefits and risks of low-power AI systems.
- Explain why efficiency can enable both beneficial and harmful scaling.
- Evaluate environmental claims about emerging computing technologies.
- Connect energy efficiency to governance questions about surveillance, access, sustainability, and power concentration.

## Key Terms

| Term                 | Working Definition                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Energy use           | The amount of energy required to build, run, cool, update, or maintain a system.             |
| Operational energy   | Energy used while a system is running.                                                       |
| Embodied energy      | Energy used to manufacture, transport, install, and dispose of hardware.                     |
| Lifecycle assessment | Analysis of environmental impact across production, operation, maintenance, and end-of-life. |
| Data center          | A facility that houses servers, storage, networking, and cooling infrastructure.             |
| Edge device          | A device that processes data locally or near where data is collected.                        |
| Rebound effect       | A pattern where efficiency lowers cost and leads to more total use.                          |
| E-waste              | Electronic waste from discarded devices, batteries, sensors, chips, and components.          |
| Sustainability       | Designing and governing systems to reduce environmental harm over time.                      |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> When you use an AI system, where do you think energy is being used?

Write 4–6 sentences.

Consider:

- your device
- the network
- cloud servers
- cooling systems
- model training
- model use
- hardware manufacturing
- batteries
- sensors
- disposal

## Part 2: Where Does AI Use Energy?

AI energy use can happen at many stages.

Complete the table.

| Stage                 | What Happens? | Where Energy Is Used | Who Might Be Responsible? |
| --------------------- | ------------- | -------------------- | ------------------------- |
| Data collection       |               |                      |                           |
| Data storage          |               |                      |                           |
| Model training        |               |                      |                           |
| Model inference/use   |               |                      |                           |
| Data transmission     |               |                      |                           |
| Cooling               |               |                      |                           |
| Device manufacturing  |               |                      |                           |
| Hardware maintenance  |               |                      |                           |
| Software updates      |               |                      |                           |
| Disposal or recycling |               |                      |                           |

Discuss:

- Which energy costs are most visible to users?
- Which energy costs are hidden?
- Which costs are easiest to measure?
- Which costs are easiest to ignore?

## Part 3: Scenario

A company is developing two AI systems for detecting machine failures in factories.

### System A: Cloud-Based AI Monitoring

- Factory sensors continuously stream vibration, sound, and temperature data to cloud servers.
- The cloud system analyzes data from many factories.
- Alerts are sent back when the system detects possible machine failure.
- Data is stored for future model improvement.

### System B: Low-Power Edge AI Monitoring

- Each machine has a local low-power AI chip.
- The chip processes sensor signals on-device.
- The chip sends an alert only when it detects unusual patterns.
- Most raw data is not transmitted or stored centrally.

The company claims System B is more sustainable because it uses less operational energy.

Your task is to evaluate that claim.

## Part 4: Compare the Systems

Complete the table.

| Question                         | System A: Cloud-Based AI | System B: Low-Power Edge AI |
| -------------------------------- | ------------------------ | --------------------------- |
| Where is data processed?         |                          |                             |
| What data is transmitted?        |                          |                             |
| What data is stored?             |                          |                             |
| What hardware is required?       |                          |                             |
| What infrastructure is required? |                          |                             |
| What might use the most energy?  |                          |                             |
| What might be easiest to audit?  |                          |                             |
| What might be easiest to update? |                          |                             |
| What might create more e-waste?  |                          |                             |
| What might scale more easily?    |                          |                             |

## Part 5: Energy Benefits

For each possible benefit of low-power edge AI, explain why it matters.

| Possible Benefit             | Why It Matters | Who Benefits? |
| ---------------------------- | -------------- | ------------- |
| Less data sent to cloud      |                |               |
| Lower latency                |                |               |
| Lower operational energy     |                |               |
| Longer battery life          |                |               |
| Works in remote settings     |                |               |
| Less continuous data storage |                |               |
| Reduced cooling needs        |                |               |
| Lower operating cost         |                |               |

Discuss:

- Which benefits are environmental?
- Which benefits are economic?
- Which benefits are about safety or reliability?
- Which benefits could also create new risks?

## Part 6: Lifecycle Impacts

Operational energy is only one part of environmental impact.

Consider the full lifecycle of edge AI devices.

Complete the table.

| Lifecycle Stage              | Possible Environmental Impact | What Evidence Would You Need? |
| ---------------------------- | ----------------------------- | ----------------------------- |
| Mining materials             |                               |                               |
| Manufacturing chips          |                               |                               |
| Manufacturing sensors        |                               |                               |
| Packaging and transport      |                               |                               |
| Installation                 |                               |                               |
| Operation                    |                               |                               |
| Software or firmware updates |                               |                               |
| Repair                       |                               |                               |
| Replacement                  |                               |                               |
| Disposal or recycling        |                               |                               |

Discuss:

- Could a low-power device still have a high environmental cost?
- What happens if devices are replaced frequently?
- What happens if devices cannot be repaired?
- What happens if many small devices are deployed everywhere?

## Part 7: The Rebound Effect

Efficiency can sometimes lead to more total use.

For example:

> If low-power AI makes monitoring cheaper, organizations may install more sensors in more places, causing total energy use, surveillance, and e-waste to increase.

Complete the table.

| Efficiency Improvement      | Possible Good Outcome | Possible Rebound Effect |
| --------------------------- | --------------------- | ----------------------- |
| Cheaper sensors             |                       |                         |
| Longer battery life         |                       |                         |
| Low-power anomaly detection |                       |                         |
| Local processing            |                       |                         |
| Smaller chips               |                       |                         |
| Lower cloud costs           |                       |                         |
| Faster automated alerts     |                       |                         |
| Easier deployment at scale  |                       |                         |

Discuss:

- When does efficiency reduce harm?
- When does efficiency expand harmful use?
- Who decides whether scaling is desirable?
- Should some efficient technologies be limited because they are too easy to deploy?

## Part 8: Environmental Justice

Environmental impacts are not distributed equally.

AI infrastructure can affect communities through:

- energy demand
- water use
- mining
- manufacturing pollution
- electronic waste
- data center placement
- supply chains
- labor conditions
- disposal sites

Complete the table.

| Impact Area                     | Who Might Benefit? | Who Might Bear the Cost? | Governance Question |
| ------------------------------- | ------------------ | ------------------------ | ------------------- |
| Data centers                    |                    |                          |                     |
| Chip manufacturing              |                    |                          |                     |
| Rare or critical materials      |                    |                          |                     |
| Battery production              |                    |                          |                     |
| Device disposal                 |                    |                          |                     |
| Factory automation              |                    |                          |                     |
| Smart city sensors              |                    |                          |                     |
| Military or security deployment |                    |                          |                     |

Discuss:

- Who experiences the environmental costs of AI?
- Who receives the benefits?
- Are those the same groups?
- What would environmental justice require?

## Part 9: Sustainability Claims Audit

Companies and researchers may make claims such as:

- “100x more efficient”
- “low-power”
- “green AI”
- “sustainable computing”
- “reduced cloud dependence”
- “energy-efficient edge intelligence”

Choose one claim and audit it.

| Claim                      | What It Might Mean | What It Might Hide | Evidence Needed |
| -------------------------- | ------------------ | ------------------ | --------------- |
| “Low-power AI”             |                    |                    |                 |
| “Green computing”          |                    |                    |                 |
| “Less cloud data”          |                    |                    |                 |
| “Energy-efficient chip”    |                    |                    |                 |
| “Sustainable monitoring”   |                    |                    |                 |
| “Reduced carbon footprint” |                    |                    |                 |

Discuss:

- Is the claim about training, inference, or total lifecycle?
- Is the comparison fair?
- What baseline is being used?
- Are manufacturing and disposal included?
- Are social effects of wider deployment included?

## Part 10: Energy, Surveillance, and Scale

Low-power AI can make monitoring easier to deploy.

Consider these possible deployments.

| Deployment                      | Possible Benefit | Possible Harm if Scaled Widely |
| ------------------------------- | ---------------- | ------------------------------ |
| Health-monitoring wearables     |                  |                                |
| Elder-care sensors              |                  |                                |
| Classroom attention monitors    |                  |                                |
| Workplace productivity trackers |                  |                                |
| Public-space anomaly detectors  |                  |                                |
| Border surveillance sensors     |                  |                                |
| Smart home safety devices       |                  |                                |
| Factory monitoring systems      |                  |                                |
| Autonomous drones               |                  |                                |
| Cybersecurity edge devices      |                  |                                |

Discuss:

- Which uses seem socially beneficial?
- Which uses seem coercive or invasive?
- Which uses should require consent?
- Which uses should be prohibited?
- How does low energy use change the politics of deployment?

## Part 11: Social and Ethical Questions

Discuss:

- Who benefits from more energy-efficient AI?
- Who benefits if AI becomes cheaper to deploy?
- Who could be harmed if low-power AI expands surveillance?
- Should sustainability claims include social impacts?
- Should environmental review be required before large-scale AI deployment?
- Should devices be designed for repair and recycling?
- Should low-power systems still be restricted in high-risk contexts?
- Should some AI uses be rejected even if they are energy-efficient?
- Who should verify environmental claims?

## Part 12: Technical Translation

This lab illustrates several technical and governance ideas.

| Lab Activity                                   | Technical or Governance Analogue   |
| ---------------------------------------------- | ---------------------------------- |
| Identifying where energy is used               | Energy accounting                  |
| Comparing cloud and edge AI                    | Architecture-level energy analysis |
| Considering manufacturing and disposal         | Lifecycle assessment               |
| Evaluating efficiency claims                   | Benchmarking and evidence review   |
| Considering rebound effects                    | Socio-technical impact analysis    |
| Asking who bears environmental costs           | Environmental justice analysis     |
| Asking about repair and recycling              | Sustainable hardware governance    |
| Asking whether efficiency enables surveillance | Dual-use and misuse assessment     |

Key takeaway:

> Energy efficiency is important, but it is not the same as sustainability. A system can use less energy per operation while still creating environmental harm, expanding surveillance, or increasing total deployment.

## Part 13: Connection to BRAID

BRAID is concerned with neuromorphic hardware that may support fast, low-power anomaly detection.

This makes energy central to the project’s value proposition.

Potential benefits include:

- lower operational energy
- faster local response
- reduced data movement
- fewer cloud computing demands
- longer battery life for edge devices
- more efficient anomaly detection
- support for resource-constrained settings

But the same features raise governance questions:

- Will low-power anomaly detection make monitoring more widespread?
- What are the manufacturing impacts of specialized hardware?
- What materials are required?
- How long will devices last?
- Can they be repaired?
- What happens at end of life?
- Who verifies energy-efficiency claims?
- Does energy efficiency justify deployment in high-risk contexts?
- Could efficiency intensify surveillance, military use, or workplace monitoring?

## Part 14: Governance Review

Your group has been asked to evaluate whether a low-power neuromorphic anomaly detection system should be deployed in one of the following contexts:

- hospital monitoring
- elder-care monitoring
- cybersecurity
- autonomous vehicles
- factory safety
- classroom analytics
- workplace productivity monitoring
- public-space surveillance
- border security
- military drones

Choose one context and complete the table.

| Governance Question                                 | Group Response |
| --------------------------------------------------- | -------------- |
| What is the system supposed to detect?              |                |
| What energy benefit is claimed?                     |                |
| What evidence is needed to verify the claim?        |                |
| What lifecycle impacts should be assessed?          |                |
| What environmental justice concerns arise?          |                |
| Could efficiency lead to wider deployment?          |                |
| Could wider deployment create harm?                 |                |
| What uses should be limited or prohibited?          |                |
| What repair, recycling, or disposal plan is needed? |                |
| Who should verify sustainability claims?            |                |

## Deliverable: Energy and Sustainability Governance Memo

Submit a short memo evaluating the sustainability and governance implications of a low-power AI or neuromorphic anomaly detection system.

Your memo should include:

1. The use case.
2. The energy or sustainability claim.
3. What evidence would be needed to verify the claim.
4. One lifecycle concern.
5. One environmental justice concern.
6. One possible rebound effect.
7. One misuse or surveillance concern.
8. A governance recommendation.

## Suggested Memo Format

```markdown
# Energy and Sustainability Governance Memo

## Use Case

Which low-power AI or neuromorphic anomaly detection use case did your group analyze?

## Energy or Sustainability Claim

What claim is being made about energy efficiency, sustainability, or environmental benefit?

## Evidence Needed

What data would be needed to verify the claim?

## Lifecycle Concern

What environmental impacts might arise during manufacturing, operation, repair, replacement, or disposal?

## Environmental Justice Concern

Who might benefit from the system?
Who might bear environmental or social costs?

## Rebound Effect

How could efficiency lead to more total deployment or new forms of harm?

## Misuse or Surveillance Concern

Could low-power AI make monitoring easier to scale?
What risks would that create?

## Governance Recommendation

Should the system be used as proposed, redesigned, limited, independently audited, or rejected?
Explain your reasoning.
```

## Exit Ticket

Individually, answer:

1. Why is energy efficiency not the same thing as sustainability?
2. What is one environmental cost of AI that users may not see directly?
3. What is one governance question you would ask before accepting a claim that an AI system is “green” or “low-power”?
