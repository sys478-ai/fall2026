---
title: 'Fictional Pilot Packet'
nav_label: 'Fictional Packet'
subtitle: 'Fictional evidence and governance materials for the Adaptive Cardiac Devices case. For classroom analysis only — not a real device approval record.'
case_parent: cardiac
fictional_watermark: true
hide_from_list: 1
order: 2
type: 'case-study'
toc: true
---

This pilot packet is fictional and is provided for classroom analysis. It represents the kind of evidence and governance materials a hospital committee might review when deciding whether to participate in a limited clinical pilot.

The manufacturer has provided your hospital with:

- an early performance summary comparing the adaptive ICD against current rule-based detection;
- proposed eligibility criteria for patient enrollment;
- a draft informed-consent form;
- a monitoring plan for reviewing shocks, withheld shocks, alerts, and model updates;
- a logging plan describing what the device records when it updates its model or classifies a rhythm;
- a rollback plan for disabling adaptive learning or reverting to a previous model state;
- an adverse-event reporting plan.

Your committee must decide whether this packet is strong enough for your hospital to participate in the pilot, and what conditions would need to be added before patients could be enrolled.

## Early Performance Summary

In manufacturer testing, the adaptive ICD appeared to reduce inappropriate-shock classifications compared with the current rule-based detection system.

The strongest improvement appeared in cases involving muscle noise and exercise-related signal artifacts. That matters because the triggering case at your hospital involved muscle noise being misread as ventricular fibrillation.

However, the packet also identifies several limits:

1. The test set included relatively few patients with complex combinations of atrial fibrillation, supraventricular tachycardia, and true VT/VF.
2. The manufacturer reported overall performance patterns, but did not provide detailed patient-level subgroup results.
3. The device's adaptive updates were evaluated over a short follow-up period, so the committee cannot yet tell whether the learned model remains stable over months or years.
4. The packet does not clearly explain how often the device's learned baseline can change, or how large a change would trigger clinician review.
5. The packet does not show whether the device performs equally well for patients whose rhythms change because of new medications, disease progression, or other implanted devices.

The manufacturer argues that the results justify a limited pilot because the device targets known causes of inappropriate shocks while preserving existing safety fallbacks.

Your committee must decide whether that is enough.

## Eligibility Criteria

The manufacturer proposes enrolling adult ICD candidates who have a documented history of inappropriate shocks, signal artifacts, or rhythm patterns that are difficult to classify using current rule-based detection.

The manufacturer proposes excluding patients who:

- have highly unstable cardiac conditions;
- require immediate device implantation with no time for additional consent discussion;
- have recent medication changes that may substantially alter heart rhythm;
- have clinical histories that make it difficult to distinguish harmless signal variation from dangerous arrhythmia;
- are unable to participate in follow-up monitoring.

The eligibility criteria are meant to limit the pilot to patients who may benefit from personalization while avoiding patients whose signals may change too quickly for the adaptive model to remain reliable.

However, the packet does not clearly explain who decides whether a patient's rhythm is "too unstable" for enrollment, or how disagreements between the electrophysiologist, patient, and manufacturer would be resolved.

## Consent Language

The draft consent form tells patients that the adaptive ICD may continue learning after implantation. It explains that the device may update its model of the patient's usual rhythm and noise patterns over time.

The consent form also tells patients that the goal of adaptation is to reduce inappropriate shocks while preserving protection against dangerous arrhythmias.

However, the consent form is less clear about three things:

1. The device's definition of "normal" may change after implantation.
2. The patient's clinician may not review or approve every model update before the device uses it.
3. If the device's behavior changes over time, it may be difficult to explain exactly why a later shock was delivered or withheld.

The patient advocate on your committee is especially concerned about whether patients can meaningfully consent to a device whose behavior may continue changing after it is implanted.

## Monitoring Plan

The manufacturer proposes enhanced monitoring during the pilot.

The plan includes:

- automatic review after any delivered shock;
- automatic review after any episode in which the device detected but withheld therapy;
- scheduled remote review of device activity;
- clinician review of major alerts;
- manufacturer review of aggregate pilot performance.

However, the monitoring plan does not clearly define what counts as a "major" alert. It also does not specify whether clinicians will be notified when the device's learned baseline shifts, even if no shock is delivered.

This matters because a harmful model change might not be visible until after an inappropriate shock or missed arrhythmia occurs.

## Logging Plan

The device can log some information about rhythm classifications, alerts, delivered shocks, and withheld therapy.

The manufacturer says the device will also log "clinically significant model updates."

However, the packet does not define "clinically significant." It does not say whether the device will record:

- when the adaptive model updates;
- what kind of data triggered the update;
- how much the patient's learned baseline changed;
- whether the model became more or less likely to shock;
- confidence scores for classifications;
- whether a clinician could reconstruct the device's reasoning after an adverse event.

The risk/compliance officer on your committee is especially concerned about this logging gap. If the hospital cannot reconstruct what changed, it may be difficult to determine whether the device, clinician, manufacturer, or hospital process contributed to a bad outcome.

## Rollback and Stop Rules

The manufacturer says adaptive learning can be disabled if clinicians become concerned.

The packet also says the device can revert to a prior model state, but it does not clearly explain:

- how many prior model states are stored;
- who is authorized to trigger rollback;
- how quickly rollback can happen;
- whether rollback requires manufacturer involvement;
- what evidence would justify stopping the pilot for a specific patient;
- what evidence would justify stopping the pilot for the hospital as a whole.

The electrophysiologist on your committee sees the rollback option as important, but worries that it may not help unless unsafe adaptation is detected early enough.

---

[← Back to Adaptive Cardiac Devices case brief](/braid-case-study/cardiac)
