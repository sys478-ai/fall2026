---
title: 'Predictive policing and drug-crime data'
excerpt: 'Predictive policing systems trained on arrest records learned the history of enforcement, not the geography of drug use.'
domains: ['criminal-justice-and-policing']
connected_cards:
  - num: '2'
    interpretation: "Drug arrest records were treated as if they measured where drug use occurs. But those records were produced by patrol decisions, enforcement priorities, and earlier patterns of surveillance. Drug use is far more widespread than arrest data suggests. A model trained on arrest records learned the history of policing — and sent police back to already-policed neighborhoods, generating more records that appeared to confirm the original pattern."
---

## What Happened

Predictive policing systems such as PredPol were trained on police incident and arrest records and used to forecast where crime was likely to occur. These predictions were then used to direct patrol resources.

Researchers analyzing Oakland's drug arrest data found that these records reflected patrol decisions more than actual drug use. Drug activity is far more widespread than arrest records suggest — arrests happen where police patrol, not necessarily where drug use is most common. When a model is trained on such records, it learns the geography of enforcement, not the geography of crime.

The result is a feedback loop: the model directs police to already-policed neighborhoods, which generates more arrests there, which produces more training data confirming the original prediction. The dataset appears to validate itself while the underlying pattern it claimed to measure remains untested.

**Source:** Kristian Lum and William Isaac, ["To Predict and Serve?"](https://rss.onlinelibrary.wiley.com/doi/full/10.1111/j.1740-9713.2016.00960.x) _Significance_, 2016. For the feedback loop mechanism, see Danielle Ensign et al., ["Runaway Feedback Loops in Predictive Policing,"](https://proceedings.mlr.press/v81/ensign18a.html) _Proceedings of Machine Learning Research_, 2018.
