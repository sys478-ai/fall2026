---
title: 'Anticipatory governance.'
num: '26'
id: sts-anticipatory-governance
slug: anticipatory-governance
excerpt: 'Anticipatory governance asks hard questions about a technology before it is widely deployed, while choices remain open and futures remain contestable.'
field_guide_section: 'sts-concepts'
field_guide_order: 14
order: 14
card_type: concept
field_guide_group: 'anticipation-and-change'
subtheme: 'anticipation-and-change'
subtheme_title: 'Anticipation & Change'
status: verified
status_reviewer: Maxwell Chalmers
status_date: 2026-06-14
status_notes: 'Reviewed for conceptual accuracy, accessibility, observational usefulness, and practical application.'
priority: high
---

Anticipatory governance is the practice of asking ethical, political, and design questions while a technology is still being shaped, before it becomes hard to change. The main question is not only **_whether_** a system works. It is **_what should be shaped, limited, redirected, or refused while meaningful choices are still available_**.

## Scenario

A college campus is considering AI-powered anomaly detection cameras in dorm hallways. The proposal is simple: use the system to spot unusual behavior, alert staff faster, and improve safety.

<img class="mt-10 mb-4" src="/fall2026/images/ethics-field-guide/sts/anticipatory-governance/dorm-camera.png" />

> **What should the campus do:** approve it, pause it, redesign it, or reject it? Before reading further, can you think of any unintended consequences?

## Why Anticipation Matters

Emerging technologies are easiest to shape before they become normal infrastructure. Once a system is installed, habits form quickly. Contracts get signed. Data practices solidify. Staff begin relying on outputs. People change their behavior because they know they are being watched.

This is why waiting for harms to be fully documented is not neutral. By the time evidence is clear enough to satisfy skeptics, the system may already be much harder to challenge, redesign, or remove.

## Questions to Ask

Start with questions about control, then move to questions about boundaries.

### Questions About Control

{% flip-cards %}

    {% flip-card icon="fa-sliders" title="Defining Normal" %}
        Who defines normal dorm behavior?

        ---

        Anomaly detection systems need a baseline for what counts as ordinary or expected. On a campus, that baseline might be shaped by administrators, vendors, housing staff, security officers, or past student data. But students’ lives vary widely. Work schedules, disability, stress, culture, caregiving, social life, and sleep patterns can all affect what “normal” looks like. A key governance question is whether students have any say in how normal is defined.
    {% endflip-card %}

    {% flip-card icon="fa-database" title="Data Storage and Reuse" %}
        What data is stored, and can it be repurposed?

        ---

        A camera system may collect video, timestamps, movement patterns, alerts, or behavioral summaries. Even if the original purpose is safety, stored data can later be used for discipline, policing, attendance, housing disputes, or analytics. Anticipatory governance asks what data is collected, how long it is kept, who can access it, and whether it can be used for purposes students did not agree to.
    {% endflip-card %}

    {% flip-card icon="fa-bell" title="Alert Pathways" %}
        Who receives alerts?

        ---

        An anomaly flag is not just a technical output. It starts an institutional response. Alerts might go to resident assistants, housing staff, campus police, outside security contractors, or emergency responders. Each pathway changes the stakes. A flag routed to support staff may lead to care; a flag routed to police or discipline may lead to punishment or escalation.
    {% endflip-card %}

    {% flip-card icon="fa-scale-balanced" title="Appeal and Contestation" %}
        Can students appeal a flag?

        ---

        Students may be misread by the system or by the people interpreting its alerts. If a flag leads to questioning, discipline, housing consequences, or police involvement, students need a way to understand and challenge what happened. Governance should define who reviews flags, what evidence is available, and how students can contest errors.
    {% endflip-card %}

{% endflip-cards %}

### Questions About Boundaries

Then ask where the limits should be before the system becomes normal campus infrastructure.

{% flip-cards %}

    {% flip-card icon="fa-ban" title="No-Camera Zones" %}
        Are there places where cameras should never be used?

        ---

        Some spaces require stronger privacy protections than others. Dorm hallways are close to bedrooms, bathrooms, lounges, and other living spaces. Even if cameras are allowed in some campus settings, they may be inappropriate in residential areas or near sensitive locations. Anticipatory governance asks where the boundary should be before surveillance becomes normal.
    {% endflip-card %}

    {% flip-card icon="fa-lightbulb" title="Alternatives" %}
        Are there non-surveillance alternatives that could address the same safety concerns?

        ---

        A campus may want to improve safety, but cameras are not the only possible response. Alternatives might include better lighting, more student support staff, clearer guest policies, consent-based check-in systems, emergency call buttons, restorative conflict processes, or improved RA training. Governance should ask whether the same goal can be met with less monitoring.
    {% endflip-card %}

{% endflip-cards %}

## Possible Benefits

Before looking at the cards below, list two reasons a campus might want this system.

{% flip-cards tone="benefit" %}

    {% flip-card icon="fa-shield-halved" title="Emergency Response" %}
        Faster response to emergencies or urgent situations

        ---

        AI cameras in dorm hallways might help staff notice dangerous situations more quickly, such as an assault, medical emergency, unauthorized entry, or escalating conflict. This benefit depends on whether the system can distinguish serious risks from ordinary behavior, and whether alerts lead to helpful rather than punitive responses.
    {% endflip-card %}

    {% flip-card icon="fa-bolt" title="Repeated Safety Concerns" %}
        Earlier identification of repeated safety concerns

        ---

        Aggregated data might help a campus notice recurring safety issues, such as repeated unauthorized entries, poorly lit spaces, or times when staffing is inadequate. But this only helps if the campus uses the information to improve conditions rather than to intensify surveillance.
    {% endflip-card %}

    {% flip-card icon="fa-user-shield" title="Support" %}
        Support for students who may be isolated, distressed, or at risk

        ---

        A campus might argue that anomaly detection could help identify students in distress, students being followed, or students at risk of harm. This benefit depends on whether students trust the system, whether support is separated from discipline, and whether students have meaningful choices about being monitored.
    {% endflip-card %}

    {% flip-card icon="fa-chart-line" title="Evaluation" %}
        Better information for evaluating whether existing safety practices are working

        ---

        A campus may claim that the system could reveal where response systems are weak, when staffing patterns fail, or whether existing policies are addressing the safety problems they are meant to solve. But this benefit depends on strong limits: evaluation should not become individualized tracking, discipline, or surveillance of everyday student life.
    {% endflip-card %}

{% endflip-cards %}

## Possible Harms

Now list two ways this system could cause harm, even if it works as designed.

{% flip-cards tone="harm" %}

    {% flip-card icon="fa-eye" title="Privacy Loss" %}
        Privacy loss in residential spaces

        ---

        AI cameras in dorm hallways may reveal more than rule-breaking. They can expose when students leave or return, who visits whom, who is isolated, who is in distress, or which routines seem unusual. Privacy loss matters because dorms are living spaces, not just security zones.
    {% endflip-card %}

    {% flip-card icon="fa-scale-balanced" title="Unequal Impact" %}
        Unequal impact on students whose routines differ from dominant patterns

        ---

        Anomaly detection systems learn patterns of “normal.” Students whose routines differ from the dominant pattern - because of work, disability, caregiving, culture, anxiety, or social marginalization - may be flagged more often. The same system can produce different burdens for different groups.
    {% endflip-card %}

    {% flip-card icon="fa-snowflake" title="Chilling Effect" %}
        Chilling effects on social life, movement, and help-seeking

        ---

        Students may avoid normal activities because they do not know how the system will interpret them. They may stop visiting friends, pacing, lingering, coming home late, or seeking help in visible ways. A chilling effect occurs when surveillance changes behavior even without punishment.
    {% endflip-card %}

    {% flip-card icon="fa-bullseye" title="Misidentification" %}
        Misidentification or overreaction to ordinary behavior

        ---

        The system may flag harmless behavior as suspicious or miss genuinely concerning situations. A false alert could lead to embarrassment, disciplinary action, police involvement, or loss of trust. Misidentification is especially serious when people cannot understand, challenge, or appeal the label.
    {% endflip-card %}

    {% flip-card icon="fa-database" title="Repurposing" %}
        Repurposing of data beyond the original safety goal

        ---

        Data collected for dorm safety may later be used for discipline, policing, attendance monitoring, housing disputes, or other analytics that students did not expect or meaningfully consent to. A system can function as designed and still expand into new forms of control.
    {% endflip-card %}

{% endflip-cards %}

<img class="my-10" src="/fall2026/images/ethics-field-guide/sts/anticipatory-governance/anticipatory.png" />

> ### The Big Idea
>
> The earlier we ask governance questions, the less evidence we may have but the more power we have to shape the system; the later we ask, the clearer harms may be but the harder the system may be to reverse.

## Alternatives

Anticipatory governance is not only about regulating a proposed system. It is also about asking whether the same problem could be addressed differently. In the dorm-camera case, alternatives might include better lighting, more resident support staff, improved access to mental health response, clearer guest policies, emergency call systems, or restorative approaches to recurring conflict.

This matters because a new technology can narrow our imagination. Once a camera system is framed as the obvious answer, other options can disappear from view. Asking about alternatives keeps the problem open long enough to compare more than one path.

## Real-World Examples

{% examples %}

## Theoretical Foundations

Governance of emerging technologies can happen at two broad moments:

1. **Before a technology is widespread**, when evidence may be limited but many choices are still open.
2. **After it is widespread**, when harms may be easier to identify but the system is much harder to change.

**_Anticipatory governance_**, developed by David Guston **[CITATION NEEDED]** and colleagues, argues for building foresight, reflection, and public input into emerging technologies before they harden into infrastructure. The claim is not that the future can be predicted perfectly. It is that foreseeable consequences can be reasoned about while democratic choices are still open.

Erik Fisher’s idea of **_midstream modulation_** **[CITATION NEEDED]** adds that intervention during development can matter more than critique after deployment. Researchers and engineers make consequential choices every day about what to optimize, what to measure, and what to test. That is often where governance has the most leverage.

## Questions You Should Ask of an Emerging Technology

- What choices are still open right now?
- Who is defining the problem and setting the terms?
- What could become difficult to undo later?
- Who will benefit if the system scales quickly?
- Who will bear the risks if the system gets it wrong?
- What non-technical or less invasive alternatives are being ignored?
