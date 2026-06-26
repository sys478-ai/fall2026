---
title: 'HW01 Pass 3: Governance Brief'
scheduled_day:
num:
type: 'homework'
draft: 0
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

Turning your analysis into a governance recommendation.

## Overview

In Pass 3, your group will move from concern-spotting to governance judgment.

Your task is to recommend what should be required, limited, redesigned, monitored, or prohibited before this technology is deployed in your scenario.

Use your Pass 1 and Pass 2 artifacts as evidence of how your thinking developed. Your final brief should be polished, but it should grow out of the earlier phases.

## Pass 3 Artifact

Your group must submit a final written brief and prepare a short presentation.

The brief should be specific enough that someone could understand:

- what the scenario is
- what the chip makes possible
- why the technical features create governance concerns
- who is affected
- what should be done before deployment

## Final Brief Requirements

Your final group brief should include the following sections.

### 1. Scenario Summary

Briefly explain the scenario your group analyzed.

Include:

- what the chip is monitoring
- what kinds of changes the system treats as unusual
- whether the model is fixed, adaptive, or hybrid
- what happens after an anomaly is flagged
- why this use case matters

### 2. Value Proposition

What problem is the chip supposed to solve?

Explain what becomes possible because of the chip's technical features, such as:

<!-- .compact -->

- local processing
- low power operation
- real-time response
- always-on monitoring
- operation without reliable connectivity
- personalization over time
- adaptation to drift

Also explain whether the strongest value proposition depends on the model being fixed, adaptive, or hybrid.

### 3. Technical Features Creating Governance Stakes

Identify the two or three technical features that matter most in your scenario.

For each feature, explain:

- what the feature allows practically
- what new risk, uncertainty, or governance question it creates
- how the learning mode changes the stakes

### 4. Stakeholders and Affected Parties

Identify who is involved and who is affected.

Be specific. Avoid writing only "users" or "society."

Explain:

- who benefits if the system works well
- who is harmed if it fails
- who acts on the system's outputs
- who has power to change, audit, repair, or stop the system
- who may be affected without having meaningful control

### 5. Three Priority Governance Concerns

Analyze the three governance categories your group selected as most important.

For each category:

- name the concern
- explain why it matters in this scenario
- connect it to a technical feature of the chip
- explain how fixed, adaptive, or hybrid learning affects the concern
- identify who is most affected
- explain what would need to be known before deployment

### 6. Governance Recommendation

End with a recommendation.

Your recommendation may take one of several forms:

<!-- .compact -->

- Require a technical design feature.
- Require documentation or logging.
- Require human review before action.
- Require a model-freeze point before high-stakes use.
- Limit online learning in high-stakes contexts.
- Require bounded adaptation and periodic review.
- Limit where the chip can be used.
- Require consent, deletion, or data transfer rules.
- Prohibit secondary uses of learned models.
- Require environmental lifecycle assessment.
- Require independent auditing.
- Argue that the use should not be allowed in this context.

Your recommendation should be specific enough that someone could act on it.

Weak recommendation:

> The system should be regulated.

Stronger recommendation:

> In worker-monitoring contexts, an adaptive chip should not be allowed to generate disciplinary alerts unless the worker can access an explanation, challenge the result, and prevent the learned physiological model from being reused for insurance, promotion, or termination decisions.

### 7. Anticipatory Question

End with one question that researchers, designers, policymakers, or affected communities should ask now, before this technology becomes widely deployed.

Example:

> Who should be allowed to decide whether an implanted device keeps learning after it has been placed inside a patient's body?

## Suggested Brief Format

```markdown
# BRAID Student Anticipatory Analysis Brief

## Scenario Summary

What scenario did your group analyze?
What is being monitored?
What kinds of changes does the system treat as unusual?
Is the model fixed, adaptive, or hybrid?
What happens after an alert?

## Value Proposition

What does the chip make possible?
Why might this matter in this context?
Does the strongest benefit depend on fixed, adaptive, or hybrid learning?

## Technical Features Creating Governance Stakes

Feature 1:
- What it allows:
- Governance question it creates:

Feature 2:
- What it allows:
- Governance question it creates:

Feature 3:
- What it allows:
- Governance question it creates:

## Stakeholders and Affected Parties

Who benefits?
Who could be harmed?
Who acts on the chip's output?
Who has power to inspect, repair, update, or stop the system?
Who is affected without meaningful control?

## Priority Governance Concern 1

Category:
Concern:
Technical feature that creates the concern:
Role of learning mode:
Who is affected:
What would need to be known before deployment:

## Priority Governance Concern 2

Category:
Concern:
Technical feature that creates the concern:
Role of learning mode:
Who is affected:
What would need to be known before deployment:

## Priority Governance Concern 3

Category:
Concern:
Technical feature that creates the concern:
Role of learning mode:
Who is affected:
What would need to be known before deployment:

## Governance Recommendation

What should be required, limited, redesigned, monitored, or prohibited before deployment?

## Anticipatory Question

What is one question that should be asked now, before this technology becomes widely deployed?
```

## Group Presentation

Each group will give a short presentation to the class.

Your presentation should include:

1. **Scenario:** What case did your group analyze?
2. **Value proposition:** What does the chip make possible?
3. **Technical mechanism:** What technical feature creates the main governance stakes?
4. **Priority concerns:** What are your three most important governance concerns?
5. **Recommendation:** What should be required, limited, redesigned, monitored, or prohibited?
6. **Open question:** What is one question that should be asked before deployment?

The goal is not to summarize every part of your notes. The goal is to present the clearest and most important parts of your analysis.

## What to Submit for Pass 3

Submit:

1. Your final written brief.
2. Your presentation notes or slides.
3. Your individual reflection.

## Individual Reflection

Each student should answer:

1. What is one technical feature of the chip that changed how you thought about the governance problem?
2. What is one concern your group did not notice until you used the analytic framework?
3. What is one question you would want BRAID researchers, policymakers, or affected communities to discuss before deployment?

## Final Submission Checklist

Your full HW01 submission should include:

- Pass 1 scenario worksheet
- Pass 2 framework sorting artifact
- Pass 3 final brief
- presentation notes or slides
- individual reflections from each group member

## End

[← Back to Pass 2](/fall2026/assignments/hw01-pass-2)  
[Back to HW01 Overview](/fall2026/assignments/hw01)
