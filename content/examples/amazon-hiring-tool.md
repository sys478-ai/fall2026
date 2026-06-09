---
title: "Amazon's Algorithmic Hiring Tool"
id: ex-amazon-hiring-tool
slug: amazon-hiring-tool
year: '2014'
show_in_timeline: true
excerpt: "Amazon develops a machine learning tool to screen resumes. Trained on historical hiring data, it learns to penalize resumes associated with women. Amazon discovers the bias internally and abandons the tool in 2018."
domains: ['labor-and-employment']
timeline_cards:
  - label: 'Prediction imports the past'
    href: '/field-guide/pattern-08'
  - label: 'This system treats one group as the default'
    href: '/field-guide/pattern-22'
  - label: 'The people most affected had no voice in the design'
    href: '/field-guide/pattern-24'
connected_cards:
  - num: '08'
    interpretation: "The system was trained on resumes submitted to Amazon over a 10-year period and on Amazon's historical hiring decisions. Amazon's engineering workforce was predominantly male. The model learned that attributes of successful candidates correlated with male-coded resume features. It then reproduced that correlation as a scoring signal. The tool encoded the outcomes of past discrimination as predictions about future performance."
  - num: '22'
    interpretation: "The system penalized resumes that used the word 'women's' and downgraded graduates of all-women's colleges. The features most associated with successful candidates in the training data were features most associated with men — not because men were more qualified, but because men had historically been hired more often. Women's applications were systematically disadvantaged by a system that treated male candidates as the implicit standard."
  - num: '24'
    section: 'ai-deployment-patterns'
    interpretation: "The engineers who built the tool and the HR leadership who deployed it did not include candidates in the design process. Candidates had no mechanism to know the system existed, no knowledge that they were being penalized for attending a women's college or participating in women's professional organizations, and no recourse. The people most affected by the tool's outputs had no input into its design."
field_guide_section: 'examples'
status: unverified
status_reviewer:
status_date:
status_notes:
priority: high
---

## What Happened

Around 2014, Amazon began developing a machine learning tool to automate the screening of job applications, training it on resumes submitted over a ten-year period and on the company's historical hiring decisions.

Because Amazon's technical workforce was predominantly male, the historical data reflected that imbalance. The system learned to penalize resumes that included the word "women's" — as in "women's chess club" or "captain of the women's debate team" — and downgraded graduates of all-women's colleges. It also identified other patterns in successful candidates that correlated with male applicants.

Amazon's recruiters discovered the bias around 2015. The company adjusted the model to make it gender-neutral on these specific features, but subsequently determined that there was no guarantee the model wasn't finding other ways to discriminate. Amazon disbanded the team working on the project in 2017 and was not using the tool by 2018, when reporting on the project became public.

**Source:** Jeffrey Dastin, "Amazon scraps secret AI recruiting tool that showed bias against women," _Reuters_, October 10, 2018.
