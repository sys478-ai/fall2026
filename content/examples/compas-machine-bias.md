---
title: 'ProPublica Publishes "Machine Bias"'
id: ex-compas-machine-bias
slug: compas-machine-bias
year: '2016'
show_in_timeline: true
excerpt: "ProPublica's investigation of the COMPAS recidivism prediction tool finds it nearly twice as likely to falsely flag Black defendants as high-risk compared to white defendants — sparking a major public and academic debate about what it means for a predictive system to be fair."
domains: ['criminal-justice-and-policing']
contested: >-
  Northpointe, the tool's maker, disputed ProPublica's methodology. Subsequent research by computer
  scientists showed that the different definitions of fairness each side invoked are mathematically
  incompatible — no classifier can simultaneously satisfy both when base rates differ between groups.
  This is not a dispute about facts; it is a dispute about which fairness criterion should take
  precedence, and there is no purely technical answer to that question.
timeline_cards:
  - label: 'Prediction imports the past'
    href: '/field-guide/pattern-08'
  - label: 'Concentrated harm is hidden by aggregate benefit'
    href: '/field-guide/pattern-25'
  - label: 'Thresholds make uncertainty consequential'
    href: '/field-guide/pattern-07'
  - label: 'This system treats one group as the default'
    href: '/field-guide/pattern-22'
connected_cards:
  - num: '28'
    section: 'sts-concepts'
    interpretation: "The COMPAS case shows how a knowledge-production system can simultaneously generate factual claims about people and generate authority over them — and how opacity in the production process protects that authority from challenge. The risk score was not merely information provided to a judge; it was a classification that authorized institutional action. By embedding that determination in a proprietary technical system, Northpointe insulated the knowledge-production process from the forms of challenge available against a human expert — a forensic psychologist offering a risk opinion could be cross-examined, but the algorithm could not be. The Loomis court's acknowledgment that the opacity was a problem, combined with its ruling that it did not make the system unconstitutional, is itself an example of how institutional authority absorbs and neutralizes challenges to knowledge claims it has invested in."
  - num: '08'
    interpretation: "COMPAS was trained on historical data from a criminal justice system with documented disparities in surveillance and prosecution. A defendant's prior arrest record is a feature that encodes not only their conduct but the policing practices of their community. The prediction encodes those practices as an individual risk assessment."
  - num: '25'
    section: 'ai-deployment-patterns'
    interpretation: "COMPAS's aggregate accuracy statistics looked acceptable. The accuracy concealed a sharp disparity in error types by race. False positives — incorrectly predicting that someone would reoffend — were concentrated among Black defendants. False negatives were concentrated among white defendants. These errors are not equivalent in consequence, and they don't cancel each other out."
  - num: '07'
    interpretation: "The COMPAS score is a probability expressed as a categorical risk level. A threshold converts that category into a sentencing or bail input. The choice of threshold is not set by the model — it is a human decision — and its effects fall disproportionately on one group depending on where the line is drawn."
  - num: '22'
    interpretation: "When recorded recidivism rates differ between groups, no classifier can simultaneously achieve equal false positive rates and equal false negative rates. Northpointe's tool was calibrated for predictive parity — accuracy balanced across groups — which mathematically required accepting different error rates. Whether predictive parity or equal false positive rates is the correct criterion is a value judgment that the algorithm does not and cannot make."
field_guide_section: 'examples'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What Happened

In May 2016, ProPublica published "Machine Bias," an investigation into COMPAS (Correctional Offender Management Profiling for Alternative Sanctions), a risk assessment tool used by judges in Broward County, Florida and other jurisdictions to inform bail and sentencing decisions.

ProPublica obtained COMPAS scores for more than 7,000 people arrested in Broward County between 2013 and 2014, along with their subsequent two-year recidivism records. The analysis found that Black defendants were nearly twice as likely as white defendants to be falsely flagged as high-risk (false positive rate of 44.9% vs. 23.5%). White defendants were more likely to be falsely flagged as low-risk when they went on to reoffend (false negative rate of 47.7% vs. 28.0%).

Northpointe, the company that makes COMPAS, responded that ProPublica's analysis was flawed. Northpointe argued that COMPAS was calibrated to achieve predictive parity — meaning that a score of, say, 7 meant roughly the same probability of reoffending regardless of race. This is true. The dispute between ProPublica and Northpointe is not about the data; it is about which statistical definition of fairness should apply.

Computer scientists subsequently showed these criteria are mathematically incompatible under realistic conditions — you can satisfy one or the other, but not both simultaneously when base rates differ between groups.

The ProPublica investigation remains one of the most cited cases in algorithmic fairness research.

**Source:** Julia Angwin, Jeff Larson, Surya Mattu, and Lauren Kirchner, "Machine Bias," _ProPublica_, May 23, 2016.
