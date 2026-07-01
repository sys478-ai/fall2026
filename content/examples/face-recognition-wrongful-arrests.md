---
title: 'Face recognition match thresholds and wrongful arrests'
id: ex-face-recognition-wrongful-arrests
slug: face-recognition-wrongful-arrests
year: '2020'
show_in_timeline: true
excerpt: 'Three men were wrongfully arrested in part because face recognition systems returned weak matches that analysts treated as identifications.'
domains: ['criminal-justice-and-policing']
tags: ['criminal-justice']
timeline_cards:
  - label: 'This system treats one group as the default'
    href: '/field-guide/pattern-22'
  - label: 'Automation changes accountability'
    href: '/field-guide/pattern-10'
  - label: 'Thresholds make uncertainty consequential'
    href: '/field-guide/pattern-07'
connected_cards:
  - num: '26'
    section: 'sts-concepts'
    interpretation: 'The technology was adopted by many agencies before strong public governance frameworks were in place, before accuracy disparities were widely recognized in policy debates, and before affected communities had meaningful ways to contest its use. The NIST FRVT Part 3 report in December 2019 established the evidence base for governance, but by then the technology was already embedded in operational law enforcement workflows at scale. Those who benefit from rapid deployment had incentives to move quickly while those who would bear the risks had no formal mechanism to require governance before deployment — the cost of waiting for evidence of harm was paid entirely by the people the technology was used against.'
  - num: '9'
    interpretation: 'Face recognition systems produce a similarity score, not a yes/no identification. Analysts apply a threshold to decide when a score counts as a match. Setting that threshold low catches more potential suspects but generates more false positives. In the wrongful arrest cases, the threshold was low, the probe images were poor quality, and human review was insufficient. The arrests were downstream effects of a threshold decision — not just of model accuracy.'
  - num: '22'
    interpretation: "All three wrongful arrests involved darker-skinned men. The accuracy gap that made weak matches more dangerous was itself a consequence of training data that underrepresented darker-skinned faces. The system's higher error rate for this group meant that when the match threshold was set low enough to return a hit, the hit was less reliable than it would have been for a lighter-skinned subject — but was treated with the same confidence."
field_guide_section: 'examples'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What Happened

Three men — Robert Williams in Detroit, Michael Oliver in New Jersey, and Nijeer Parks in New Jersey — were wrongfully arrested based in part on face recognition identifications that were later shown to be incorrect.

In each case, a face recognition system was used to compare a probe image (from surveillance footage or an ID document) against a database. The system returned a candidate match. In each case, the match was weak, the probe image was of poor quality, and human investigators proceeded to arrest without sufficient additional corroboration.

All three men are Black. The Gender Shades research by Buolamwini and Gebru, published in 2018, had documented that commercial face analysis systems performed substantially worse on darker-skinned faces — with error rates for darker-skinned women up to 34 percentage points higher than for lighter-skinned men. The accuracy gap applied to the kinds of low-quality, real-world images typical of surveillance footage.

The arrests raised questions both about the threshold at which face recognition outputs are treated as actionable identifications and about the accuracy disparities that make low-quality matches more dangerous for some groups than others.

**Source:** For the wrongful arrest cases: Kashmir Hill, ["Wrongfully Accused by an Algorithm,"](https://www.nytimes.com/2020/06/24/technology/facial-recognition-arrest.html) _The New York Times_, June 2020; and subsequent reporting on Oliver and Parks. For the accuracy research: Joy Buolamwini and Timnit Gebru, ["Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification,"](http://proceedings.mlr.press/v81/buolamwini18a.html) _Proceedings of Machine Learning Research_, 2018.
