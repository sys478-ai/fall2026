---
title: 'Facial recognition accuracy gaps (Gender Shades)'
id: ex-facial-recognition-accuracy-gaps
slug: facial-recognition-accuracy-gaps
year: '2018'
show_in_timeline: true
excerpt: 'Systematic testing of commercial face analysis systems found error rates up to 34 percentage points higher for darker-skinned women than for lighter-skinned men.'
domains: ['criminal-justice-and-policing', 'platform-and-consumer']
timeline_cards:
  - label: 'This system treats one group as the default'
    href: '/field-guide/pattern-22'
  - label: 'Concentrated harm is hidden by aggregate benefit'
    href: '/field-guide/pattern-25'
  - label: 'Data is produced, not found (not yet published)'
connected_cards:
  - num: '22'
    interpretation: "The Gender Shades study found that commercial face analysis systems had been benchmarked primarily on lighter-skinned faces, and that performance on those faces was treated as the standard for evaluation. The accuracy gaps weren't incidental — they were a direct consequence of whose faces the training data reflected most fully. The systems worked well for the group that was treated as the default, and performed substantially worse for everyone else."
field_guide_section: 'examples'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What Happened

In 2018, MIT researcher Joy Buolamwini and Google researcher Timnit Gebru published "Gender Shades," a systematic audit of commercial gender classification systems from three major technology companies.

The study tested each system's ability to classify faces by gender using a dataset of 1,270 parliamentary figures from three African countries and three Nordic countries, selected to include diversity across skin tone and gender.

The results showed substantial accuracy disparities. Across all three commercial systems tested, error rates were significantly higher for darker-skinned faces and for women. The combined group of darker-skinned women had the highest error rates — up to 34.7 percentage points higher than the lowest-error group (lighter-skinned men) in the worst-performing system.

The researchers found that industry benchmark datasets used to evaluate these systems were predominantly composed of lighter-skinned faces, which meant that performance on lighter-skinned faces shaped what counted as good performance. The systems were not tested against the populations where the accuracy gaps were most consequential.

**Source:** Joy Buolamwini and Timnit Gebru, ["Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification,"](http://proceedings.mlr.press/v81/buolamwini18a.html) _Proceedings of Machine Learning Research_, 2018.
