---
title: "How a technology is described shapes how it is governed."
num: '24'
id: sts-framing-shapes-governance
slug: how-a-technology-is-described-shapes-how-it-is-governed
excerpt: "The words, metaphors, and origin stories attached to a system shape what questions get asked about it — and who gets to ask them."
field_guide_section: 'sts-concepts'
field_guide_order: 3
order: 3
card_type: concept
field_guide_group: 'constructed-not-natural'
subtheme: 'constructed-not-natural'
subtheme_title: 'Constructed, not natural'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: 1
---

## What This Means

The language used to describe a technology is never a neutral label. When a system is called "artificial intelligence," "anomaly detection," "brain-inspired computing," or "predictive analytics," each of those terms carries associations — about what the system can do, how sophisticated it is, what precedents apply to it, and what kind of oversight seems appropriate. These framings don't just describe technologies; they shape how those technologies are understood by funders, policymakers, journalists, courts, and the public.

This is part of what Sheila Jasanoff means when she writes about co-production: scientific and technical knowledge are produced alongside the social order that makes them legitimate. How a technology gets described is part of how it gets authorized. A system described as "brain-inspired" imports associations with human cognition — associations that may generate enthusiasm and funding while also making the system seem more autonomous, more capable, or more like a subject than a tool. A system described as "statistical pattern matching" invites different questions about what it can do, what it needs, and who should oversee it.

These framings travel. A description established in a research paper shapes how the system appears in a funding proposal; the funding proposal shapes how it appears in a press release; the press release shapes how regulators understand it when governance questions arise. By the time a technology reaches policy debate, its framing has often already determined which questions seem obvious to ask and which seem beside the point. Bruno Latour called this inscription: assumptions get built into technical descriptions and carried forward, invisibly, in every subsequent document that uses those descriptions.

## Questions To Ask

- What metaphors or analogies are used to describe this system?
- What associations does that language import from other domains?
- Who benefits from this particular framing — researchers, vendors, policymakers?
- What questions become harder to ask once a framing is established?
- How does the description change across different audiences — researchers, funders, regulators, affected communities?
- What would become visible about this system if a different description were used?

## Why This Matters

This card is a companion to the sociotechnical imaginaries card: where imaginaries describe the broad social visions embedded in technologies, this card focuses on how specific descriptions and framings do political work at a more granular level.

For the BRAID neuromorphic case, the framing question is direct and consequential. The system is described as "brain-inspired computing" modeled on the cerebellum — a brain region associated with learned motor coordination, not cognition in the philosophically interesting sense. But the language of brains carries cognitive associations regardless of which region is invoked. Understanding how this framing shapes which governance questions get asked — and which seem unnecessary — is a core analytical task for the course capstone.

## What Happened

Clearview AI was a company that scraped more than three billion facial images from publicly accessible websites — including social media platforms, news sites, and other online sources — and built a searchable facial recognition database out of them. The company marketed access to this database to law enforcement agencies beginning around 2017. Because the images were already publicly accessible on the internet, Clearview described its service using the language of open-source intelligence (OSINT) — a category familiar to law enforcement investigators for decades, referring to information gathered from publicly available sources such as news archives, public records, and social media.

For several years, Clearview operated without substantial public awareness or regulatory scrutiny. The company had signed up hundreds of law enforcement agencies, as well as some private companies, before its existence was widely reported. Kashmir Hill's January 2020 investigation in the *New York Times* was the first major public account of the company's database and its law enforcement use. Hill's reporting revealed that more than 600 agencies had used Clearview, that the company had been founded by Hoan Ton-That and Richard Schwartz, and that its technology had been used in cases ranging from shoplifting to violent crime.

Following the 2020 reporting, Clearview faced a cascade of legal and regulatory challenges. Multiple US states filed suits. The Federal Trade Commission investigated its data practices. In Europe, regulators in the UK, France, Italy, Greece, and the Netherlands imposed fines and ordered Clearview to stop collecting and processing European residents' facial images. The Dutch Data Protection Authority fined Clearview €30.5 million in September 2024. The EU AI Act, which entered into force in 2024, explicitly prohibits untargeted scraping to create or expand facial recognition databases — a provision that directly addressed the Clearview model.

By the time these regulatory responses arrived, Clearview's database had grown to over 30 billion images, and the company continued to operate in the United States, where no federal law specifically prohibited its model. The law enforcement agencies that had adopted the tool had years of operational experience with it embedded in investigative workflows.

**Source:** Kashmir Hill, "The Secretive Company That Might End Privacy as We Know It," *The New York Times*, January 18, 2020. Dutch Data Protection Authority enforcement decision, September 2024. EU AI Act, Regulation (EU) 2024/1689, Article 5(1)(e).

## How This Connects

The Clearview case shows how a framing decision — describing facial recognition built from scraped images as "open-source intelligence" — determined which governance questions seemed applicable and which did not. OSINT was an established category in law enforcement contexts, with established norms about appropriate use. Framing Clearview as an OSINT tool imported those norms: if the images were publicly available, using them felt analogous to using publicly available records in any investigation. The governance frameworks that would have applied to a novel biometric surveillance system did not seem obviously relevant to what looked, from the OSINT framing, like an ordinary investigative tool.

This is what Latour means by inscription. The description "open-source intelligence" was not just a label — it was built into how the product was marketed to customers, how customers understood what they were doing when they used it, and therefore which legal questions agencies' counsel thought to ask. By the time regulators began asking hard governance questions, the technology was already embedded in hundreds of law enforcement workflows, and the framing had shaped several years of adoption decisions. The work of disentangling which legal frameworks applied took years of litigation and legislation. The framing did not prevent governance from happening — but it shaped what governance had to work against.
