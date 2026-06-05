---
title: "Thresholds make uncertainty consequential."
num: '9'
excerpt: "Thresholds turn scores, signals, and probabilities into action. They decide when systems intervene, wait, ignore, escalate, or ask for human judgment."
field_guide_section: 'how-systems-draw-boundaries'
field_guide_section_title: 'How systems draw boundaries — and who and what falls outside them'
field_guide_section_intro: "Every AI system classifies people in some way. This section helps you ask whose experience is treated as the norm, how categories are drawn, and who bears the cost when a system's categories don't fit."
field_guide_section_order: 2
field_guide_order: 2
order: 1
card_type: recognition
---

## What To Notice

A threshold is the point where a score, signal, probability, or anomaly measure becomes an action. It may trigger a flag, warning, denial, escalation, intervention, audit, second look, or decision to do nothing. That line may look mathematical, but it is also a policy choice about when uncertainty becomes consequential.

Thresholds do more than distribute harm. They allocate attention, resources, delay, trust, accountability, and responsibility. They can reduce some risks while increasing others. They can make a system more cautious, more permissive, more efficient, more intrusive, more helpful, or more punitive.

The ethical question is not simply whether the threshold is "right." It is what the threshold is being asked to optimize, who benefits from that choice, who bears the cost of mistakes, and how easily the threshold can be contested or changed.

## Questions To Ask

- Where is the cutoff, and who chose it?
- What action happens above the threshold, and what happens below it?
- What is the system optimizing: safety, access, efficiency, cost, caution, speed, fairness, or something else?
- Which errors become more likely when the threshold moves?
- Who benefits from false positives, false negatives, delay, or extra review?
- Is there a gray zone where human judgment, appeal, or additional evidence can matter?
- Who is accountable for monitoring, adjusting, and explaining the threshold over time?

## Why This Matters

Use this pattern when you want to move from model output to lived consequence. A model score is not yet a decision. The threshold is what makes the score act in the world.

Accuracy alone does not tell you enough. A system with identical accuracy can behave very differently depending on where the threshold is set, what happens near the cutoff, and who has power to challenge the result. Thresholds are therefore part of governance — they connect technical uncertainty to institutional action, and choices about where to draw the line are choices about who bears the cost of mistakes.

## STS Readings

- Virginia Eubanks, [_Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor_](https://us.macmillan.com/books/9781250074317/automatinginequality), St. Martin's Press, 2018. Detailed case studies of predictive risk systems in public services — useful for tracing how threshold choices translate into scrutiny, investigation, and intervention for specific populations.
- Julia Angwin, Jeff Larson, Surya Mattu, and Lauren Kirchner, ["Machine Bias,"](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing) _ProPublica_, 2016. The foundational investigation of COMPAS risk scores in criminal sentencing — shows how threshold choices interact with racial disparities in false positive and false negative rates.
- Solon Barocas, Moritz Hardt, and Arvind Narayanan, [_Fairness and Machine Learning_](https://fairmlbook.org/), 2023. Chapter 2 is especially useful for understanding how different fairness definitions involve different threshold tradeoffs — and why it is mathematically impossible to satisfy all definitions simultaneously.
- Clare Garvie, Alvaro Bedoya, and Jonathan Frankle, ["The Perpetual Line-Up,"](https://www.perpetuallineup.org/) Georgetown Law Center on Privacy and Technology, 2016. Systematic analysis of police use of face recognition, including the threshold and accuracy problems that lead to wrongful identifications.
