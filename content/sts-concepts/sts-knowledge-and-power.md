---
title: "Knowledge and power are co-produced."
num: '28'
id: sts-knowledge-and-power
slug: knowledge-and-power-are-co-produced
excerpt: "Systems that produce knowledge about people also produce authority over them — and those who control the knowledge control the power."
field_guide_section: 'sts-concepts'
field_guide_order: 11
order: 11
card_type: concept
field_guide_group: 'power-and-governance'
subtheme: 'power-and-governance'
subtheme_title: 'Power & Governance'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: 2
---

## What This Means

Michel Foucault's insight is that knowledge and power are not separate — they are constitutively linked. Producing knowledge about a population is itself an exercise of power over that population. The psychiatric diagnosis is not just a description that exists alongside institutional authority — it is the institutional authority. The risk score is not just information provided to a decision-maker — it is the decision. The classification is not a neutral input to a process — it structures what the process can see and what actions it can authorize.

In AI systems, this dynamic takes a specific form. A system that classifies, scores, flags, or monitors people produces what institutions treat as facts about those people — facts that then authorize action. Who controls what counts as a meaningful signal, what threshold triggers a flag, what baseline defines normality — those people control not just knowledge but the authority to act. When that authority is embedded in a technical system, it can become invisible: the system appears to be merely providing information while it is in fact distributing institutional authority.

Sheila Jasanoff's work on co-production extends this to scientific knowledge more broadly: what counts as evidence is not determined by nature alone — it is determined through institutional processes that simultaneously establish epistemic authority and legitimate social arrangements. An AI system that produces risk assessments doesn't just tell you who is risky — it constructs a social arrangement in which some people are treated as risky, which then produces the institutions, policies, and practices that act on that classification.

## Questions To Ask

- Who controls what counts as meaningful evidence in this system?
- What authority to act flows from the system's outputs?
- Is the system's knowledge-production process visible to those affected by it?
- Who is in a position to contest the system's classifications?
- What institutional arrangements does this system reinforce or produce?
- What would it mean to distribute the authority embedded in this system differently?

## Why This Matters

This card explains why opacity in AI systems is not just a transparency problem — it is a power problem. When knowledge-production processes are hidden, so is the authority they generate. It connects the technical question of how a system works to the political question of who the system works for, and it gives you language for explaining why visibility into these processes is a governance issue, not just a design preference.

## What Happened

The Correctional Offender Management Profiling for Alternative Sanctions (COMPAS) is a risk assessment instrument developed by Northpointe, Inc. (later renamed Equivant). It was designed to generate risk scores predicting the likelihood that a defendant would be rearrested, fail to appear for court, or recidivate. Courts and corrections systems in Wisconsin, New York, Michigan, Florida, and other states used COMPAS scores in decisions about pretrial detention, sentencing, and parole.

Northpointe classified the COMPAS algorithm as a proprietary trade secret. The methodology — which variables were included, how they were weighted, what the scoring thresholds meant — was not disclosed to courts, defendants, or their attorneys. Defendants who received scores did not receive an explanation of how their score was calculated. Defense attorneys who sought to challenge the validity or accuracy of their clients' scores had no access to the methodology that would allow them to do so.

In 2013, Eric Loomis was convicted in Wisconsin on charges related to a drive-by shooting. At sentencing, the court received a COMPAS risk score for Loomis indicating a high risk of recidivism. The court imposed a six-year prison sentence. Loomis challenged the sentence, arguing that using an algorithm whose methodology he could not access or contest violated his due process rights. The case reached the Wisconsin Supreme Court, which issued its decision in *State v. Loomis* in 2016. The court upheld the use of COMPAS in sentencing, ruling that the defendant's due process rights were not violated because the algorithm was one factor among several and judges were not required to follow its recommendations. The court simultaneously acknowledged the opacity problem, attaching a five-point warning to future use of the algorithm that noted its limitations — but did not require disclosure of the methodology or create a mechanism for defendants to contest their scores. The US Supreme Court declined to hear the case.

In May 2016, ProPublica published "Machine Bias," an investigation by Julia Angwin, Jeff Larson, Surya Mattu, and Lauren Kirchner that analyzed COMPAS scores for more than 7,000 people arrested in Broward County, Florida. The investigation found that Black defendants were nearly twice as likely as white defendants to be falsely flagged as future criminals, while white defendants were more likely to be incorrectly labeled low risk when they went on to reoffend. Northpointe disputed the methodology of ProPublica's analysis, and an academic debate about the correct way to measure algorithmic fairness followed. The underlying opacity of the system — the fact that neither the journalists nor the researchers nor the defendants could see how the scores were produced — was a constant constraint on all parties' ability to evaluate the claims.

**Source:** *State v. Loomis*, 881 N.W.2d 749 (Wis. 2016). Julia Angwin, Jeff Larson, Surya Mattu, and Lauren Kirchner, "Machine Bias," ProPublica, May 23, 2016. Harvard Law Review case comment on *State v. Loomis*, vol. 130, 2017.

## How This Connects

The COMPAS case shows how a knowledge-production system can simultaneously generate factual claims about people and generate authority over them — and how opacity in the production process protects that authority from challenge. The risk score was not merely information provided to a judge; it was a classification that authorized institutional action. Judges who used COMPAS were not just receiving a data point — they were receiving a determination produced by a process they could not inspect, about a person who could not contest it. The score appeared in the court record as a finding; its production remained invisible.

This is Foucault's insight made concrete. The power to define who is a "high recidivism risk" is the power to determine who gets imprisoned. By embedding that determination in a technical system classified as proprietary, Northpointe insulated the knowledge-production process from the forms of challenge that would be available against a human expert offering the same opinion. A forensic psychologist offering a risk opinion could be cross-examined; her credentials could be challenged; her methodology could be evaluated against other methodologies. The algorithm, because it was a trade secret, was placed outside the ordinary scope of adversarial challenge. The Loomis court's acknowledgment that the opacity was a problem — combined with its ruling that the opacity did not make the system unconstitutional — is itself an example of how institutional authority absorbs and neutralizes challenges to knowledge claims it has invested in.
