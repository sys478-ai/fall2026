---
title: 'The Netflix Prize'
year: '2006'
show_in_timeline: true
excerpt: "Netflix offers $1 million for a 10% improvement in its recommendation algorithm — accelerating machine learning research while establishing the template for platform-scale data extraction dressed as an open competition."
domains: ['platform-and-consumer']
timeline_cards:
  - label: 'Extraction can be disguised as innovation'
    href: '/field-guide/pattern-14'
  - label: 'Power can concentrate in infrastructure'
    href: '/field-guide/pattern-15'
connected_cards:
  - num: '14'
    interpretation: "Netflix publicly released 100 million movie ratings from 480,000 users for competitors to train on. The framing was a competition: $1 million prize, clear rules, open participation. What actually happened was that Netflix crowdsourced algorithmic R&D — obtaining modeling work it would otherwise have had to fund itself, in exchange for prize money worth a fraction of the commercial value of the resulting improvements. The innovation framing obscured that participants were doing work that primarily benefited Netflix."
  - num: '15'
    interpretation: "The recommendation system is the layer through which content reaches viewers. At platform scale, whoever controls that layer controls what gets seen, what doesn't, and under what conditions. The Netflix Prize accelerated development of that layer and established recommendation infrastructure as a source of concentrated power over information flow — including decisions about which films, shows, and creators become visible to which audiences."
---

## What Happened

In October 2006, Netflix launched the Netflix Prize: a public competition offering $1 million to any team that could improve the accuracy of its recommendation algorithm by 10% on a held-out test set. Netflix released an anonymized dataset of 100 million movie ratings from 480,000 users for contestants to work with.

The competition ran for nearly three years, attracting submissions from research teams around the world. A team called BellKor's Pragmatic Chaos ultimately won in September 2009, achieving a 10.06% improvement.

The Prize had significant effects on machine learning research, popularizing collaborative filtering techniques and spurring development of ensemble methods. It also established a model for extracting technical labor: frame algorithmic improvement as an open competition, release data, collect submissions, take the resulting work.

The winning algorithm was never deployed in production. Netflix explained that the infrastructure cost of implementing the ensemble methods wasn't worth the improvement. But the techniques developed during the competition diffused widely through the research community.

A subsequent study found that the "anonymized" dataset was re-identifiable: combining it with publicly available ratings on IMDb allowed researchers to identify individuals in the dataset and infer sensitive information including political views and sexual orientation.

**Source:** Arvind Narayanan and Vitaly Shmatikoff, "Robust De-anonymization of Large Sparse Datasets," _IEEE Symposium on Security and Privacy_, 2008.
