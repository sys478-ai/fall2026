---
title: 'Sensors Translate the World into Data'
num: '7'
date: '2026-10-21'
type: 'lab'
due_date: '2026-10-28'
draft: 0
---

How measurement choices shape what AI systems can know, miss, and act on.

## Overview

AI systems do not encounter the world directly. They rely on data. But data does not simply appear. It is produced through sensors, forms, logs, cameras, microphones, wearables, databases, surveys, and other measurement systems.

A sensor translates some part of the world into a signal. That signal may then become data. That data may then be used by an AI system to classify, predict, recommend, alert, or intervene.

This means that measurement is not neutral. A system can only act on what it can sense, record, and represent. It may miss important context. It may overemphasize what is easy to measure. It may treat partial signals as objective truth.

In this lab, you will examine how sensors and measurement systems turn messy real-world situations into data, and how those choices shape AI decisions.

## Core Learning Goals

By the end of this lab, you should be able to:

- Explain that data is produced through measurement, not simply collected.
- Identify what a sensor or measurement system captures and what it misses.
- Analyze how measurement choices shape AI classification, prediction, and anomaly detection.
- Distinguish between a real-world condition and a measurable proxy for that condition.
- Connect sensors and measurement to surveillance, privacy, bias, accountability, and governance.

## Key Terms

| Term         | Working Definition                                                                            |
| ------------ | --------------------------------------------------------------------------------------------- |
| Sensor       | A device or system that detects something in the world and converts it into a signal or data. |
| Signal       | A measurable output from a sensor or system.                                                  |
| Measurement  | The process of turning something in the world into data.                                      |
| Proxy        | A measurable stand-in for something harder to observe directly.                               |
| Noise        | Variation or error in data that may not reflect the thing being measured.                     |
| Context      | Information needed to interpret data meaningfully.                                            |
| Surveillance | Systematic observation, monitoring, or tracking of people, behavior, or environments.         |
| Datafication | The process of turning aspects of life into data that can be stored, analyzed, or acted upon. |

## Part 1: Warm-Up Reflection

Individually, respond to the following prompt:

> What is something important about a person, place, or situation that would be hard to measure with a sensor?

Write 4–6 sentences.

Consider examples such as:

- whether a student understands a topic
- whether someone feels safe
- whether a worker is doing meaningful work
- whether a patient is in distress
- whether a neighborhood is healthy
- whether someone is paying attention
- whether an online conversation is harmful
- whether a machine is about to fail

## Part 2: Scenario

A university is considering a new AI-supported classroom engagement system.

The system is supposed to help instructors understand when students are engaged, confused, distracted, or struggling.

The system may use several kinds of data:

- webcam images
- microphone audio
- keyboard activity
- learning management system clicks
- quiz responses
- attendance records
- assignment submission times
- classroom sensor data
- self-reported student reflections

The university claims the system will help instructors support students earlier and improve learning outcomes.

Your task is to analyze what these measurements can and cannot tell us.

## Part 3: Measurement Inventory

For each possible data source, identify what it might capture and what it might miss.

| Data Source                 | What It Might Capture | What It Might Miss | Possible Risk |
| --------------------------- | --------------------- | ------------------ | ------------- |
| Webcam images               |                       |                    |               |
| Microphone audio            |                       |                    |               |
| Keyboard activity           |                       |                    |               |
| LMS clicks                  |                       |                    |               |
| Quiz responses              |                       |                    |               |
| Attendance records          |                       |                    |               |
| Assignment submission times |                       |                    |               |
| Classroom motion sensors    |                       |                    |               |
| Self-reported reflections   |                       |                    |               |

## Part 4: Proxy Analysis

Many AI systems use measurable proxies for things that are difficult to observe directly.

For example:

| Hard-to-Measure Concept | Possible Proxy       | Why the Proxy Is Limited                                                       |
| ----------------------- | -------------------- | ------------------------------------------------------------------------------ |
| Student engagement      | Number of LMS clicks | Clicking does not necessarily mean learning.                                   |
| Attention               | Eye direction        | Looking away does not necessarily mean distraction.                            |
| Understanding           | Quiz score           | A score may reflect anxiety, wording, prior knowledge, or access to resources. |

Complete the table below.

| Hard-to-Measure Concept | Possible Proxy | What the Proxy Might Get Wrong |
| ----------------------- | -------------- | ------------------------------ |
| Engagement              |                |                                |
| Confusion               |                |                                |
| Learning                |                |                                |
| Participation           |                |                                |
| Distress                |                |                                |
| Academic effort         |                |                                |
| Collaboration           |                |                                |
| Belonging               |                |                                |

## Part 5: Context Matters

Consider the following student situations.

| Student | Situation                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------- |
| A       | A student rarely turns on their camera because they share a bedroom with siblings.                   |
| B       | A student looks away often because they take handwritten notes.                                      |
| C       | A student submits assignments late at night because they work evening shifts.                        |
| D       | A student rarely clicks through the LMS because they download materials once and work offline.       |
| E       | A student is quiet in class because they are anxious about speaking publicly.                        |
| F       | A student does poorly on quizzes because they understand the material but freeze during timed tests. |
| G       | A student frequently checks their phone because they are coordinating childcare.                     |
| H       | A student attends every class but is experiencing food insecurity and exhaustion.                    |

For each student, discuss:

- What might the system infer?
- What might actually be happening?
- What context would be needed?
- What harm could result from a wrong inference?

Complete the table for at least four students.

| Student | Possible System Inference | Missing Context | Possible Harm |
| ------- | ------------------------- | --------------- | ------------- |
|         |                           |                 |               |
|         |                           |                 |               |
|         |                           |                 |               |
|         |                           |                 |               |

## Part 6: Sensor Limits

Now consider a different domain: health monitoring.

A wearable device tracks:

- heart rate
- steps
- sleep duration
- movement patterns
- skin temperature

The system claims it can detect whether a person may be experiencing stress, illness, or unusual behavior.

Discuss:

1. What can these sensors measure directly?
2. What are they only guessing or inferring?
3. What context might be missing?
4. What kinds of people might be misread by the system?
5. What could go wrong if the system automatically alerts a caregiver, employer, insurer, doctor, or school?

Write your group’s response:

## Part 7: From Measurement to Action

Measurement becomes more consequential when it triggers action.

Complete the table.

| Measurement              | Possible AI Inference       | Possible Action       | Possible Harm If Wrong |
| ------------------------ | --------------------------- | --------------------- | ---------------------- |
| Low LMS activity         | Student is disengaged       | Advisor outreach      |                        |
| Looking away from screen | Student is distracted       | Participation penalty |                        |
| High heart rate          | Person is distressed        | Emergency alert       |                        |
| Unusual movement pattern | Fall or health concern      | Caregiver notified    |                        |
| Loud classroom audio     | Disruption                  | Behavior report       |                        |
| Repeated login failures  | Suspicious account activity | Account locked        |                        |
| Unusual network traffic  | Cybersecurity threat        | Device blocked        |                        |
| Factory vibration change | Machine failure risk        | Shutdown              |                        |

## Part 8: Social and Ethical Questions

Discuss:

- Who decides what should be measured?
- Who decides what the measurement means?
- Who is measured most often?
- Who benefits from measurement?
- Who is burdened by measurement?
- What kinds of context are lost when life is turned into data?
- When does measurement become surveillance?
- Should people be able to opt out?
- Should people be able to see, correct, or challenge sensor data?
- Should some forms of measurement be prohibited even if they are useful?

## Part 9: Technical Translation

This lab illustrates several technical ideas.

| Lab Activity                             | Technical Analogue                   |
| ---------------------------------------- | ------------------------------------ |
| Identifying data sources                 | Sensor and data pipeline analysis    |
| Asking what each source captures         | Measurement validity                 |
| Asking what each source misses           | Missing context and data limitations |
| Using measurable stand-ins               | Proxy variables                      |
| Considering sensor error                 | Noise and uncertainty                |
| Linking measurement to action            | Automated decision pipeline          |
| Asking who can challenge data            | Contestability and governance        |
| Asking whether measurement should happen | Data minimization and ethical review |

Key takeaway:

> Data is not simply collected from the world. It is produced through measurement choices, and those choices shape what AI systems can know, ignore, misread, and act upon.

## Part 10: Connection to Anomaly Detection

Anomaly detection systems depend heavily on measurement.

They often ask:

> Is this signal different from what the system expects?

But before the system can detect an anomaly, someone has to decide:

- what to sense
- how often to measure
- what counts as normal variation
- what counts as noise
- what counts as meaningful difference
- what action should follow an alert

This matters for systems such as:

- health monitors
- cybersecurity systems
- autonomous vehicles
- classroom analytics
- workplace safety sensors
- elder-care devices
- smart homes
- neuromorphic edge devices

In a later BRAID-focused lab, we will ask how these questions change when anomaly detection happens on-device or in hardware.

## Part 11: Governance Review

Your group has been asked to advise the university about the classroom engagement system.

Complete the table.

| Governance Question                                        | Group Response |
| ---------------------------------------------------------- | -------------- |
| What should the system be allowed to measure?              |                |
| What should the system not be allowed to measure?          |                |
| What data should students be able to see?                  |                |
| What data should students be able to correct or challenge? |                |
| What actions should never be automated?                    |                |
| What human review should be required?                      |                |
| What should students be told before the system is used?    |                |
| Should students be able to opt out? Why or why not?        |                |

## Deliverable: Measurement Audit Memo

Submit a short memo that evaluates the classroom engagement system.

Your memo should include:

1. The system’s stated purpose.
2. Three data sources the system might use.
3. What each data source captures.
4. What each data source misses.
5. One proxy concern.
6. One privacy or surveillance concern.
7. A governance recommendation.

## Suggested Memo Format

```markdown
# Measurement Audit Memo

## System Purpose

What is the system supposed to do?

## Data Sources

What data sources does the system use or propose to use?

## What the Data Captures

What can these measurements reasonably show?

## What the Data Misses

What important context might be missing?

## Proxy Concern

What is one example of a measurable proxy being used for something more complex?

## Privacy or Surveillance Concern

What could make this system invasive, coercive, or harmful?

## Governance Recommendation

Should the system be used as proposed, redesigned, limited, or rejected?
Explain your reasoning.
```

## Exit Ticket

Individually, answer:

1. What is one way measurement can shape what an AI system “knows”?
2. What is one kind of context that sensors or logs might miss?
3. What is one question you would ask before allowing an institution to measure people in order to make predictions about them?
