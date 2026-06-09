---
title: "Systems are reactive: they change what they measure."
num: '27'
id: sts-systems-are-reactive
slug: systems-are-reactive-they-change-what-they-measure
excerpt: "When a system measures, classifies, or monitors people, it changes the behavior it was designed to observe."
field_guide_section: 'sts-concepts'
field_guide_order: 7
order: 7
card_type: concept
field_guide_group: 'sociotechnical-systems'
subtheme: 'sociotechnical-systems'
subtheme_title: 'AI systems are socio-technical systems'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: 2
---

## What This Means

A speedometer describes how fast a car is moving. It does not change how fast the car moves. Most measurement works this way — we assume the act of measuring is separate from the thing being measured.

AI systems that measure, classify, or monitor people do not work this way. When people know they are being observed, assessed, or scored, they change their behavior in response. This is not deception — it is a normal feature of how people operate in social environments. The problem is that a system designed to measure some stable underlying phenomenon is now measuring a phenomenon that has already been reshaped by the existence of the system.

Donald MacKenzie's study of financial models showed that models are "engines, not cameras." A financial model that predicts where prices will go does not just describe the market — it shapes what traders do, which shapes the market, which shapes what the model sees. The model and the market co-evolve. Ian Hacking called the analogous phenomenon in human classification "looping effects": being labeled changes how people understand and present themselves, which changes the data the classification system sees, which can change the classification. In anomaly detection systems, this dynamic is particularly consequential. Once people learn what counts as anomalous, "normal" shifts — either because people consciously conform to baseline expectations, or because the system's interventions reshape the population it monitors.

## Questions To Ask

- Does the existence of this system change the behavior it was designed to measure?
- Who knows they are being measured, and how does that knowledge affect what they do?
- What feedback loops exist between the system's outputs and its future inputs?
- Is the baseline this system compares against stable, or is it being reshaped by the system's own interventions?
- When the system makes an error, does its error change the world in ways that make the error harder to detect later?

## Why This Matters

This card connects directly to the BRAID case. An anomaly detection system deployed in a real environment does not just observe that environment — it changes it. Understanding that systems are reactive matters for anticipating what a system will actually do over time, and for designing governance frameworks that account for feedback effects rather than assuming the system's measurements are independent of its interventions.

## What Happened

In 2018, Facebook made a significant change to the ranking algorithm governing what content appeared in users' News Feeds. The new system, described internally under the concept of "Meaningful Social Interactions" (MSI), was intended to prioritize content that generated genuine engagement — particularly comments and reshares between friends and family — over passive content like viral videos that users watched without interacting with. The stated goal was to make time on the platform feel more meaningful.

Internal research conducted at Facebook documented an unintended consequence of the change. Because the MSI algorithm rewarded content that generated high volumes of emotional response — comments, angry reactions, and reshares — content provoking outrage and strong negative emotion performed systematically better under the new ranking system than under the previous one. A 2019 internal study found that posts tagged with the "angry" reaction emoji were disproportionately likely to be misinformation, low-quality news, or content from hyperpartisan publishers. Internal researchers reportedly recommended applying a downranking multiplier to angry-reaction content to reduce this effect; the recommendation was not implemented.

Publishers and content creators responded to the algorithmic environment they were operating in. News organizations, political pages, and media companies that tracked their engagement data observed that divisive and emotionally provocative content consistently outperformed more measured reporting under the new system. Some publishers, including those covering US political news, restructured their content strategies around the signals the algorithm rewarded. Sensational headlines, conflict framing, and outrage-inducing stories produced measurably more shares and comments — and therefore more algorithmic distribution — than equivalent stories presented without those features.

In September 2021, the Wall Street Journal published the "Facebook Files," a series based on tens of thousands of internal company documents provided by Frances Haugen, a former Facebook product manager. The documents showed that Facebook's own researchers had documented these dynamics internally and had recommended changes that were not made, partly because of concerns about the effect on growth metrics. Haugen testified before the US Senate in October 2021, and the internal documents were subsequently reviewed by an international consortium of news organizations.

**Source:** Wall Street Journal, "The Facebook Files" (September 2021), Jeff Horwitz and Deepa Seetharaman reporting. Frances Haugen, testimony before the US Senate Commerce Subcommittee on Consumer Protection, October 5, 2021. Nieman Journalism Lab, "More internal documents show how Facebook's algorithm prioritized anger," October 2021.

## How This Connects

The Facebook engagement algorithm case illustrates what it means for a system to change the behavior it was designed to observe. The MSI algorithm was built to measure meaningful engagement — the thing it was supposed to capture was the presence of genuine human connection and interest. But by rewarding specific behavioral signals (comments, reshares, angry reactions), the algorithm changed what content was produced. Publishers, responding rationally to the incentive structure in front of them, optimized for the rewarded signals rather than for the underlying goal those signals were meant to proxy. The algorithm was no longer measuring organic engagement; it was measuring behavior it had already shaped.

This is MacKenzie's "engines, not cameras" insight applied to a content ecosystem. The algorithm did not passively reflect what content users found meaningful — it actively shaped what content existed to be found. And Hacking's looping effect is visible in the feedback: as publishers produced more outrage-optimized content, that content became the dominant signal in the training data for further ranking iterations. The system and the information environment it was supposed to measure co-evolved, in a direction that the platform's own research showed was predictable and predicted.
