---
title: "Situated knowledge."
num: '29'
id: sts-situated-knowledge
slug: situated-knowledge
excerpt: "All knowledge comes from somewhere — and the perspective of affected communities is epistemically relevant, not just ethically important."
field_guide_section: 'sts-concepts'
field_guide_order: 5
order: 5
card_type: concept
field_guide_group: 'constructed-not-natural'
subtheme: 'constructed-not-natural'
subtheme_title: 'Constructed, not natural'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: 2
---

## What This Means

Donna Haraway's argument in "Situated Knowledges" is that there is no view from nowhere — no standpoint so neutral and detached that it transcends all perspectives. Every claim to knowledge is produced from somewhere: from a particular position, with particular tools, within particular institutional contexts, with particular blind spots. This is not a skeptical argument against knowledge; it is an argument about the conditions under which knowledge is produced and what would make it better.

The practical implication for AI systems is both epistemic and political. A system built without input from affected communities doesn't just have an ethical problem — it has an epistemic problem. The people who were not at the table possessed knowledge that would have improved the system: knowledge about edge cases, about context, about what the categories leave out, about what the baseline misses. Excluding them was not just unfair; it made the system less accurate and less likely to work well for the people it was supposed to serve.

Sandra Harding's standpoint epistemology makes a related argument: marginalized perspectives are not just politically important but epistemically valuable. People who navigate systems from positions of less power often have more complete views of how those systems work than people who designed them. The person who is misclassified learns something about the classification system that the person who built it may never know.

## Questions To Ask

- Whose perspectives were included in building this system, and whose were not?
- What knowledge is held by the communities most affected by this system that is not represented in its design?
- What would the system look like if it had been designed by or with those it affects?
- What does the system fail to see, and who already knows that?
- What institutional arrangements make it difficult for affected communities to contribute their knowledge?

## Why This Matters

This card is the theoretical grounding for why participation in design matters beyond fairness. It reframes the question from "is this system fair to affected communities?" to "is this system epistemically incomplete because affected communities were excluded?" Both questions matter, but the second one has different implications: it suggests the system is not just unjust but also less accurate, less complete, and less likely to work well for the people it affects.

## What Happened

Pulse oximeters are non-invasive medical devices that estimate blood oxygen saturation by shining infrared and red light through the skin — typically at the fingertip — and measuring how much light is absorbed. The devices have been standard clinical tools since the 1980s and became widely used in hospital settings for monitoring critically ill patients. During the COVID-19 pandemic, pulse oximeters also entered widespread use for home monitoring as a way to detect silent hypoxemia — dangerously low blood oxygen without accompanying breathlessness — which was a documented feature of severe COVID-19 cases.

The performance characteristics of commercial pulse oximeters were established through clinical validation studies conducted primarily on lighter-skinned subjects. The physics of the measurement depends on the differential absorption of light at different wavelengths by oxygenated and deoxygenated hemoglobin; higher concentrations of melanin in the skin absorb additional light at these wavelengths, introducing a systematic error that causes the devices to overestimate oxygen saturation in people with darker skin. Regulatory standards in the United States historically required manufacturers to validate devices against arterial blood gas measurements taken from human subjects, but did not specify that subject populations needed to be demographically diverse or that performance needed to be validated across skin tones. Most validation studies involved small numbers of subjects whose demographics were not reported or whose skin tone distribution was not representative of clinical populations.

In December 2020, Michael Sjoding and colleagues published a research letter in the *New England Journal of Medicine* documenting racial disparities in pulse oximetry performance. Analyzing data from two large cohorts of patients receiving intensive care, the study found that Black patients experienced occult hypoxemia — a condition in which arterial blood gas measurement showed blood oxygen below 88% while the pulse oximeter reading was in the normal range — at nearly three times the rate of white patients. In one cohort, approximately 12 percent of Black patients with pulse oximeter readings in the safe range actually had dangerously low blood oxygen, compared with approximately 4 percent of white patients. The clinical consequence was that Black patients were more likely to receive inadequate supplemental oxygen when treatment decisions were based on pulse oximetry rather than the more invasive arterial blood gas measurement.

Earlier research had documented accuracy problems with pulse oximeters in darker-skinned patients. Studies from the 1990s and 2000s had raised similar concerns, but their findings had not prompted regulatory revision of validation standards or widespread changes to clinical protocols. The COVID-19 pandemic, by dramatically increasing the population monitored with pulse oximeters and by making the consequences of missed hypoxemia more visible, brought the problem to broader clinical and public attention. The FDA began reviewing oximetry performance standards and their demographic adequacy in 2021.

**Source:** Michael W. Sjoding, Robert P. Dickson, Theodore J. Iwashyna, Steven E. Gay, and Thomas S. Valley, "Racial Bias in Pulse Oximetry Measurement," *New England Journal of Medicine* 383, no. 25 (December 17, 2020): 2477–2478. Amy Moran-Thomas, "How a Popular Medical Device Encodes Racial Bias," *Boston Review*, 2020.

## How This Connects

The pulse oximetry case is unusually clean as an illustration of situated knowledge, because the epistemic failure has a specific, verifiable mechanism and a directly measurable consequence. The people calibrating and validating the devices were working from a particular standpoint — one that treated lighter-skinned subjects as the relevant reference population, implicitly. The people most affected by that standpoint — patients with darker skin tones who would be monitored with the devices — were not part of the calibration process in any meaningful way. Their exclusion was not a policy choice anyone articulated; it was an absence built into standard practice.

Haraway's point is precisely this: the view from the calibration lab was not a view from nowhere. It was a view from a particular position, with particular blind spots, and those blind spots had direct epistemic consequences. The patients who received dangerously low oxygen while their pulse oximeters showed safe readings possessed knowledge through their own bodies — knowledge that the device was failing them — that the engineers and regulatory bodies certifying the device did not have access to. That knowledge was epistemically relevant to making the device work better. It was also knowledge that could only be accessed by including diverse populations in validation rather than by further optimizing the device within the existing calibration framework. The problem was not resolvable by doing more of what had already been done; it required a different standpoint.
