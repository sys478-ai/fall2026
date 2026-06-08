---
title: 'Clearview AI'
id: ex-clearview-ai
slug: clearview-ai
year: '2019'
show_in_timeline: true
excerpt: "Clearview AI scrapes billions of images from public websites to build a facial recognition database used by law enforcement — testing the claim that publicly accessible data is available for any use."
domains: ['criminal-justice-and-policing', 'platform-and-consumer']
contested: >-
  Courts and regulators have reached different conclusions about Clearview's liability. The FTC's
  2022 settlement restricted commercial use but not law enforcement use. European data protection
  authorities imposed fines and ordered data deletion; Clearview has appealed some rulings and
  continued operating. The underlying legal question — whether aggregating publicly accessible
  images for a new purpose falls within privacy law protections — is not settled in US federal
  law. Several states have passed biometric privacy statutes (Illinois BIPA, Texas CUBI) that have
  imposed liability; federal law does not resolve the question. Law enforcement use sits in a
  particular gap: privacy regulations that apply to commercial contexts often include broad law
  enforcement exemptions. Whether "technically public" means "available for any purpose" is
  legally open in most US jurisdictions. See: ACLU v. Clearview AI settlement, 2022; Ricci v.
  Clearview AI (Illinois BIPA), 2022.
timeline_cards:
  - label: 'Data collected for one purpose gets used for another'
    href: '/field-guide/pattern-03'
  - label: 'Extraction can be disguised as innovation'
    href: '/field-guide/pattern-14'
  - label: "Consent was obtained but wasn't meaningful"
    href: '/field-guide/pattern-26'
connected_cards:
  - num: '03'
    interpretation: "Billions of images were posted publicly — for social purposes, professional profiles, news coverage, personal expression. Clearview scraped them without consent into a law enforcement identification database. The context of original posting bore no resemblance to the context of use. 'Publicly accessible' and 'available for any use' are not the same thing."
  - num: '14'
    interpretation: "Clearview framed its product as a new capability: a tool that makes public information useful for law enforcement in new ways. What it actually did was aggregate data that individuals had made available in fragmented public contexts and centralize it into a searchable surveillance database — extracting value from data produced by others, without their knowledge or compensation."
  - num: '26'
    interpretation: "Images posted publicly are technically accessible. Accessibility in a given context does not constitute consent to all possible uses. A photo posted on a professional networking site is public in that context. Its inclusion in a facial recognition database used for law enforcement identification is a categorically different use that the original context did not disclose or anticipate."
field_guide_section: 'examples'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What Happened

In January 2020, _The New York Times_ reported on Clearview AI, a company that had built a facial recognition database from more than three billion images scraped from Facebook, YouTube, Venmo, and millions of other websites. The company licensed the database to law enforcement agencies, allowing officers to upload a photo of an unknown person and find matching images along with the URLs where they appeared.

Clearview's legal argument was that publicly posted images are public, and that collecting publicly available information is lawful. Several major platforms sent cease-and-desist letters arguing that scraping violated their terms of service. Illinois and Texas brought lawsuits under biometric privacy laws. Clearview was banned from commercial use in the US by a settlement with the ACLU and restricted or banned in several EU countries.

The case focuses a question that recurs throughout debates about AI training data: is data that is technically accessible therefore available for any purpose? "Public" is not a single context — it is a range of contexts, each with different expectations. The contextual expectations under which data was shared are not transferred when it is aggregated into a new database for a different purpose.

**Source:** Kashmir Hill, "The Secretive Company That Might End Privacy as We Know It," _The New York Times_, January 18, 2020.
