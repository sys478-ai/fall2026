---
title: "Classification systems don't just describe the world — they produce it."
num: '23'
id: sts-classification-produces-world
slug: classification-systems-dont-just-describe-the-world-they-produce-it
excerpt: "Before a system can classify anything, someone has to build the categories. Once deployed, those categories reshape the behavior and reality they were built to describe."
field_guide_section: 'sts-concepts'
field_guide_order: 2
order: 2
card_type: concept
field_guide_group: 'constructed-not-natural'
subtheme: 'constructed-not-natural'
subtheme_title: 'Constructed, not natural'
related_recognition_cards: ['pattern-22', 'pattern-07', 'pattern-08']
status: unverified
status_reviewer:
status_date:
status_notes:
priority: 1
---

## What This Means

Classification looks like description. Before a system can classify anything, someone has to decide what categories exist — what counts as one kind of thing and not another. Those decisions are not neutral. They reflect what was considered important to distinguish, what kinds of similarity and difference were treated as meaningful, and what happened to things that didn't fit the available categories. Geoffrey Bowker and Susan Leigh Star, in their study of classification systems in medicine and other institutions, called this the "politics of classification": every category system reflects choices made by particular people with particular interests, and leaves visible traces of who was doing the classifying and who was being classified.

Classification systems also create residuals — things that don't fit cleanly. What happens to those residuals reveals where a system's assumptions break down. A person whose condition doesn't match any diagnostic code. A worker whose labor doesn't fit any legal employment category. A behavior that falls between threat categories in an anomaly detection system. How residuals are handled — whether they are forced into available categories, flagged for human review, or simply dropped — is a political and institutional question, not a technical one.

But categories don't just reflect choices — they produce effects. Judith Butler's work on performativity and Donald MacKenzie's work on financial models both point to the same insight: when categories are enacted by institutions, they reshape the reality they were supposed to describe. A neighborhood classified as high-risk receives more surveillance, which generates more arrests, which confirms the classification. A person diagnosed with a condition gets treated according to the category, which changes the course of their condition. Ian Hacking called this "looping effects": being classified changes how people understand and present themselves, which changes the data the classification sees. The category and the world it classifies begin reshaping each other.

## Questions To Ask

- Who defined the categories this system uses, and what were their goals?
- What kinds of people, behaviors, or situations don't fit the available categories?
- What happens to those that don't fit — are they forced into categories, dropped, or flagged?
- Is the classification being treated as a description of reality, or is it understood as producing reality?
- What feedback loops exist between the classification and the thing being classified?
- Who benefits from the current category boundaries staying where they are?

## Why This Matters

This card sits at the foundation of several other concepts in the field guide. Understanding that classification is constructed — someone built these categories, reflecting their assumptions and goals — and performative — the categories now shape the world — gives you a way to ask sharp questions about any AI system.

In the BRAID neuromorphic case, this shows up in how "anomaly" is defined. The system doesn't detect anomalies in nature — it detects departures from a baseline that was built from prior data. How that baseline was constructed, whose behavior it treats as normal, and what feedback effects the classification produces when acted upon are all classification questions with direct governance consequences.

## Related Recognition Cards

- [This system treats one group as the default](/fall2026/field-guide/deployment-patterns/this-system-treats-one-group-as-the-default)
- [Thresholds make uncertainty consequential](/fall2026/field-guide/deployment-patterns/thresholds-make-uncertainty-consequential)
- [Prediction imports the past](/fall2026/field-guide/deployment-patterns/prediction-imports-the-past)

## What Happened

The United States credit reporting system assigns every adult a score based on their history of borrowing and repayment. People who have never had a credit card, mortgage, car loan, or other credit product have no record — and therefore no score. The Consumer Financial Protection Bureau (CFPB) documented this population in a 2015 report. At the time of the report, approximately 26 million Americans had no credit file at any of the three major nationwide consumer reporting agencies, and an additional 19 million had files too thin or too stale to generate a score under standard scoring models — a total of roughly 45 million people effectively unscored.

The CFPB found that this population was not evenly distributed. Approximately 15 percent of Black and Hispanic consumers were credit invisible compared with 9 percent of white consumers. An additional 13 percent of Black consumers and 12 percent of Hispanic consumers had unscorable records, compared with 7 percent of white consumers. Young adults and residents of low-income neighborhoods were also disproportionately represented among the unscored. The populations least served by the credit system were, in many cases, the populations with the most limited access to the financial institutions through which credit histories are normally built.

The absence of a credit record carries significant practical consequences. Lenders use credit scores to decide whether to extend credit and at what interest rate. Landlords commonly run credit checks before approving rental applications. Employers in some industries check credit as part of hiring. The CFPB report found that being unscored functioned as a classification in its own right — not "bad credit" exactly, but something the scoring system treated as equivalent to or worse than bad credit in many automated decision contexts.

The term "thin-file borrower" entered use in financial and policy discussions to describe people with some credit history but not enough to generate a reliable score. Credit-building products — secured credit cards, credit-builder loans — exist specifically to help people accumulate enough record to become scorable. But accessing these products typically requires prior demonstrated creditworthiness or financial reserves. The path out of the thin-file category runs, in many cases, through the very credit access that being thin-file makes difficult to obtain.

**Source:** Consumer Financial Protection Bureau, *Data Point: Credit Invisibles* (May 2015). Full report available at consumerfinance.gov. Updated figures in: CFPB, *Who Are the Credit Invisibles?* (December 2016).

## How This Connects

The credit invisibility case illustrates what Hacking called "looping effects" with particular clarity. The classification "credit invisible" or "thin file" does not merely describe a person's current creditworthiness — it shapes their future access to the institutions through which creditworthiness is built. Being unscored makes it harder to obtain credit; having no credit makes it harder to build a score; having no score means being treated, in many automated systems, as uncreditworthy. The category and the reality it purports to describe reinforce each other.

This is the performative dimension of classification systems that Bowker, Star, Butler, and MacKenzie each point to from different directions. The credit system was built to describe creditworthiness as it exists. But the classification doesn't just describe — it produces access conditions that determine who becomes creditworthy and who doesn't. A person who enters the system with no record is not simply described as uncreditworthy; they are placed in a structural position where building a record is made more difficult. The category produces the reality it claims to measure.
