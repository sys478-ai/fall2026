---
slug: icd
title: 'Adaptive Cardiac Devices'
nav_label: 'Adaptive Cardiac Devices'
subtitle: 'Recommend whether your hospital should participate in a limited clinical pilot of an adaptive-learning ICD model for patients like the one described in this case.'
order: 1
type: 'case-study'
---

## The Problem

Last month, a patient at your hospital received an inappropriate shock from their implantable cardioverter-defibrillator, or ICD. Device interrogation showed that the shock was triggered by muscle noise during a forceful physical movement. The device misread that noise as ventricular fibrillation, a life-threatening rhythm that requires immediate treatment.[^1]

The patient is physically fine, but shaken. They have asked their cardiologist whether "a better device" exists.

Around the same time, a manufacturer has invited your hospital to participate in a limited clinical pilot of a new adaptive-learning ICD model. The device is designed to continuously learn each patient's individual heart rhythm and noise patterns after implantation.

Your committee is not deciding whether this device should be approved for general use. You are deciding whether your hospital should participate in the pilot, whether patients like the one described above should be eligible, and what conditions would need to be in place before enrollment.

<figure class="image-placeholder">
  <div class="image-placeholder__frame" aria-hidden="true">
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" role="img" aria-label="Image placeholder">
      <rect x="2" y="2" width="636" height="396" fill="none" stroke="currentColor" stroke-width="3" />
      <line x1="2" y1="2" x2="638" y2="398" stroke="currentColor" stroke-width="3" />
      <line x1="638" y1="2" x2="2" y2="398" stroke="currentColor" stroke-width="3" />
    </svg>
  </div>
  <figcaption class="image-placeholder__caption"><strong>Placeholder:</strong> A two-panel signal trace showing the triggering case. Left panel: the patient's actual rhythm during forceful movement, labeled muscle noise / artifact. Right panel: how the ICD classified the same window, labeled ventricular fibrillation, with a shock marker. Helps students see the misread at the center of the case.</figcaption>
</figure>

## A Note About This Case

This case combines two kinds of material:

1. **Cited background evidence** about current ICDs, inappropriate shocks, missed arrhythmias, and early neuromorphic cardiac-classification research. Every claim under this heading has a numbered source.
2. **A simulated pilot packet**, created for classroom analysis and marked as such below. It does not describe a real device approval record.

Keep these two categories separate in your writing. The pivot point in your recommendation (see Task, below) should come from the cited evidence, not from the simulated packet.

## The Core Dilemma

If an ICD is too quick to shock, patients may receive painful and frightening treatment they did not need. If it is too cautious, it may fail to treat a real emergency:

> **Can an adaptive ICD reduce inappropriate shocks without increasing the risk that the device will miss a true life-threatening arrhythmia?**

The manufacturer's pitch is essentially win-win: fewer false positives, with no increase in false negatives. Your task is to decide whether the evidence and safeguards in the pilot packet make that promise credible enough for your hospital to participate — or whether the same tradeoff has simply moved somewhere harder to see.

## What We Know About Current ICDs

### False positives: inappropriate shocks

In one large cohort of 811 heart-failure patients with ICDs, 141 patients, or 17.4%, received at least one inappropriate shock during follow-up.[^2] Inappropriate shocks are also associated with greater all-cause mortality.[^3]

The common thread across causes is that the device misreads a signal that isn't actually dangerous — muscle noise, or a fast-but-not-lethal heart rhythm — as ventricular fibrillation.

### False negatives: failure to treat a real arrhythmia

ICDs can also fail in the opposite direction: withholding treatment during a real emergency. A 2024 study of the FDA's MAUDE adverse-event database identified 854 verified reports from 2019–2023 in which normally functioning ICDs failed to treat a true life-threatening episode.[^4]

**Important:** This is a count of reported events, not a rate calculated against all ICD patients. It should not be compared directly to the 17.4% figure above.[^4]

The most common cause was misclassification in the other direction: the device read a genuine emergency as a less dangerous rhythm and withheld therapy.[^4]

### The tradeoff is already built in

Current ICDs use rate- and pattern-based rules to decide whether a fast rhythm is dangerous.[^5] Making those rules more skeptical reduces inappropriate shocks — but that same skepticism is the leading documented cause of failing to treat a real emergency.[^4] In other words, current ICDs already make this tradeoff. Tightening detection in one direction loosens it in the other.

<figure class="image-placeholder">
  <div class="image-placeholder__frame" aria-hidden="true">
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" role="img" aria-label="Image placeholder">
      <rect x="2" y="2" width="636" height="396" fill="none" stroke="currentColor" stroke-width="3" />
      <line x1="2" y1="2" x2="638" y2="398" stroke="currentColor" stroke-width="3" />
      <line x1="638" y1="2" x2="2" y2="398" stroke="currentColor" stroke-width="3" />
    </svg>
  </div>
  <figcaption class="image-placeholder__caption"><strong>Placeholder:</strong> A simple balance or threshold diagram with two labeled harms: inappropriate shock (false positive) on one side and missed VT/VF (false negative) on the other. Moving the detection threshold toward one side should visibly increase risk on the other. Supports the core dilemma section.</figcaption>
</figure>

## How Current ICDs Are Adjusted

Current ICDs do not usually change their own detection rules in the field. Adjustment happens through a clinician, during in-office interrogation or remote review, generally every 3–12 months.[^6] But one study found that only about 6% of scheduled in-office follow-up visits resulted in reprogramming or another management change.[^7] Between clinical checkpoints, the device runs on a fixed, human-set rule set — even if that rule set no longer fits the patient well.

<figure class="image-placeholder">
  <div class="image-placeholder__frame" aria-hidden="true">
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" role="img" aria-label="Image placeholder">
      <rect x="2" y="2" width="636" height="396" fill="none" stroke="currentColor" stroke-width="3" />
      <line x1="2" y1="2" x2="638" y2="398" stroke="currentColor" stroke-width="3" />
      <line x1="638" y1="2" x2="2" y2="398" stroke="currentColor" stroke-width="3" />
    </svg>
  </div>
  <figcaption class="image-placeholder__caption"><strong>Placeholder:</strong> A timeline comparing current ICD management to the proposed adaptive device. Current path: long flat stretches between clinician checkpoints, with only occasional reprogramming events. Adaptive path: continuous on-device model updates between visits. Should make the governance gap visually obvious.</figcaption>
</figure>

## The Proposed Adaptive Device

The proposed device in this case is a hypothetical adaptive-learning ICD being evaluated for a limited clinical pilot. Unlike current ICDs, which rely on clinician-programmed settings, this device would update part of its detection model after implantation — for example, learning to distinguish a patient's harmless muscle noise from true ventricular fibrillation, which could help prevent another inappropriate shock like the one in the triggering case.

But that same adaptive feature is the source of the governance problem. If the device updates its model using incomplete or misleading data, its sense of "normal" could shift in an unsafe direction — and later decisions could become harder for clinicians to interpret, audit, or challenge.

The question for your committee is not whether adaptive learning sounds more accurate. It is what evidence, logging, review, and rollback procedures would be necessary before a hospital allows an implanted device to change its own detection behavior after deployment.

## What Research Suggests So Far

Spiking neural network arrhythmia classifiers have reported accuracy in the 93–97% range at microwatt-scale power draw.[^8] However, this research is mostly focused on external wearables, not certified implanted devices, and has not yet demonstrated implant-grade reliability in the setting your committee is being asked to evaluate. A wearable classifier that gives a recommendation is different from an implanted device that may deliver or withhold life-saving therapy.

## What Is Structurally Different About the Adaptive Device

With the current device, changes generally pass through a clinician review step. With the proposed adaptive device, the model can change continuously, on-device, without a clinician approving each update by default:

> **The adaptive device does not eliminate the false-positive / false-negative tradeoff. It changes where the tradeoff is made, who can see it, and who can intervene when it shifts.**

<figure class="image-placeholder">
  <div class="image-placeholder__frame" aria-hidden="true">
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" role="img" aria-label="Image placeholder">
      <rect x="2" y="2" width="636" height="396" fill="none" stroke="currentColor" stroke-width="3" />
      <line x1="2" y1="2" x2="638" y2="398" stroke="currentColor" stroke-width="3" />
      <line x1="638" y1="2" x2="2" y2="398" stroke="currentColor" stroke-width="3" />
    </svg>
  </div>
  <figcaption class="image-placeholder__caption"><strong>Placeholder:</strong> A side-by-side architecture diagram. Left: current ICD with fixed rules, clinician review gate, and shock/no-shock output. Right: adaptive ICD with on-device learning loop, logging, rollback path, and the same shock/no-shock output. Label where visibility and accountability differ between the two systems.</figcaption>
</figure>

## Simulated Pilot Packet

The manufacturer has provided your committee with a **simulated pilot packet** for classroom analysis. It includes early performance summaries, eligibility criteria, consent language, monitoring and logging plans, and rollback rules.

**[Read the Simulated Pilot Packet →](/fall2026/braid-case-study/cardiac-pilot-packet)**

This packet is fictional. Your committee must decide whether it is strong enough for your hospital to participate in the pilot, and what conditions would need to be added before patients could be enrolled.

## Your Roles

Assign these three roles within your group before you begin:

- **The electrophysiologist** cares most about whether the device reduces harm to the patient in front of them. They want to know: does this device plausibly prevent the next inappropriate shock, or the next missed arrhythmia, for this patient?

- **The hospital risk/compliance officer** cares most about what happens when something goes wrong. They want to know: if this device makes a decision no one can fully explain six months from now, who is answerable — the hospital, the manufacturer, or the implanting physician?

- **The patient advocate** cares most about informed consent. They want to know: does the patient understand that this device's model of "normal" may keep changing after implantation, and that neither they nor their doctor may know exactly how?

Your final recommendation should not read like three separate opinions. It should read like one committee decision shaped by three competing pressures: patient safety, institutional accountability, and informed consent.

## Real-World Comparisons to Draw On

Find at least **2 analogous, real-world comparisons**, either from the examples we've already explored in the course ([link](#)) or ones you find on your own ([link](#)). A comparison does not need to involve ICDs or medical devices — it should help you reason about what happens when a system learns from data after deployment, makes high-stakes classifications, or becomes difficult to audit after something goes wrong.

Use each comparison carefully. Do not just say, "This is like self-driving cars." Explain the specific similarity that matters — for example, whether it's about who is responsible when automation fails, or about whether people can contest a decision.

## Your Task

Write a 2-page committee recommendation that answers this question:

> **Should your hospital participate in a limited clinical pilot of this adaptive ICD for patients like the one described in this case?**

Your recommendation should take one of three positions: participate in the pilot; participate only with conditions; or decline to participate at this stage. Make a clear argument — don't simply list possible benefits and harms.

### 1. State your decision in the first sentence

Begin with one of the three positions above, then explain why.

### 2. Test the manufacturer's tradeoff claim

Do you believe the device truly reduces the false-positive / false-negative tradeoff, or does it move that tradeoff somewhere less visible?

### 3. Name your pivot point

Identify the single strongest piece of _cited_ evidence that shaped your committee's decision, and explain what would have had to be different for your committee to reach a different recommendation. A recommendation without a pivot point is just an opinion.

### 4. Make the pilot governable

If you recommend participating with conditions, those conditions must be specific enough that someone could check next month whether they are being met. A vague condition like "require transparency" is not enough. Your condition should answer at least one of these:

- **Will it learn after deployment?** Is the device allowed to keep updating itself after implantation? If so, when, how often, under what limits?
- **What will it log, and can it log enough?** What data, model state, or decision history must the device record?
- **How will it be updated or rolled back?** Who can push a change, or disable adaptive learning, and how is it reversed?
- **What happens after it detects an anomaly?** What action does the device take, and who reviews it afterward?

### 5. Use at least two real-world comparisons

Explain what each comparison helps your committee see about the adaptive ICD pilot — don't just name another technology.

## Deliverable

This case has two parts: a written recommendation and a short presentation defending it.

### Part 1: Written recommendation

- **Length:** about 2 double-spaced pages
- **Format:** one committee recommendation
- **Include:** a clear recommendation, the tradeoff you think the device creates, at least one concrete condition, and at least two real-world comparisons
- **End with:** one sentence naming which of the three roles pushed hardest against the group's final answer, and why

### Part 2: 3-slide presentation

Build a 3-slide deck from your written recommendation and present it to the class (about 5 minutes, plus questions). The slides should carry the argument, not decorate it — each one maps to a specific part of your written recommendation:

1. **Position + tradeoff.** Your recommendation (participate / participate with conditions / decline) and, in a sentence or two, whether the adaptive device escapes the false-positive/false-negative tradeoff or just relocates it.
2. **Pivot point.** The single cited fact that drove your decision, and what would have had to be different for your committee to land somewhere else.
3. **Conditions + comparisons.** Your concrete condition(s) for participation, and how your real-world comparison(s) helped you see why they matter.

Be ready to defend your pivot point under questions from the rest of the class. If someone pushes on it and you can't hold your position, that's useful information for your written recommendation too — you're welcome to revise Part 1 afterward if the defense changes your thinking.

## Success Criteria

A strong submission will:

- state participate / participate with conditions / decline in the first sentence of the written recommendation;
- explain the false-positive / false-negative tradeoff;
- use at least one specific cited fact from the brief;
- identify the pivot point that drove the recommendation;
- name at least one concrete condition, connected to learning, logging, updates, rollback, or post-anomaly action;
- use at least two real-world comparisons to make the analysis more concrete;
- present a 3-slide deck that maps cleanly onto the written recommendation, and hold the pivot point under questioning.

## Glossary

| Term                                               | Definition                                                                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Arrhythmia**                                     | An abnormal heart rhythm. In this case, the question is whether a rhythm is dangerous enough that the ICD should deliver a shock.                                              |
| **ICD (implantable cardioverter-defibrillator)**   | A device implanted in the chest that monitors heart rhythm and can deliver a shock to stop a life-threatening arrhythmia.                                                      |
| **VT/VF (ventricular tachycardia / fibrillation)** | The life-threatening ventricular rhythms an ICD is designed to detect and treat. A "true VT/VF episode" is a real emergency, not muscle noise or a less dangerous fast rhythm. |
| **MAUDE**                                          | The FDA's Manufacturer and User Facility Device Experience database, where adverse events involving medical devices are reported.                                              |

## References

[^1]: Case of inappropriate ICD shock caused by myopotential, or muscle-contraction, oversensing. [PMC2615066](https://pmc.ncbi.nlm.nih.gov/articles/PMC2615066/)

[^2]: 17.4% of 811 heart-failure patients with ICDs received at least one inappropriate shock during follow-up. Poole JE, et al. Prognostic Importance of Defibrillator Shocks in Patients with Heart Failure. _N Engl J Med._ [NEJM full text](https://www.nejm.org/doi/full/10.1056/NEJMoa071098)

[^3]: Inappropriate shock causes and association with mortality. [Medscape: Pacemakers and ICDs – Overview](https://emedicine.medscape.com/article/162245-overview)

[^4]: MAUDE database study, 2019–2023, of failure-to-treat VT/VF by normally functioning ICDs: 854 verified reports, most common cause misclassification, 54.8%. [PubMed 39216717](https://pubmed.ncbi.nlm.nih.gov/39216717/)

[^5]: Discriminator programming significantly reduces but does not eliminate inappropriate therapy. [PMC1877826](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1877826/)

[^6]: Recommended follow-up interval for pacemaker/ICD patients. [PMC4730109](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4730109/)

[^7]: Only about 6% of scheduled in-office follow-up visits result in reprogramming or management change. [PMC10122094](https://pmc.ncbi.nlm.nih.gov/articles/PMC10122094/)

[^8]: Spiking neural network arrhythmia classification accuracy and power consumption. [Neuromorphic Computing for Long-Term Cardiac Health (review)](https://www.researchgate.net/publication/402047552_Neuromorphic_Computing_for_Long-Term_Cardiac_Health_A_Review_of_Spiking_Neural_Networks_in_Low-Power_Wearable_Electronics); [MDPI Electronics 15(6):1179](https://www.mdpi.com/2079-9292/15/6/1179)
