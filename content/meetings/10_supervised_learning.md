---
title: 'Learning From Data: Training Sets, Errors, and Bias'
slug: '10'
scheduled_day: 10
module_id: 2
draft: 0
subtitle: 'Training examples shape what a model learns; the consequences of errors depend on whose examples and needs are represented.'
readings:
  - citation: "Intro to Supervised Learning (Course Website)"
    url: /field-guide/technical-explainers/supervised-learning
  - citation: "Zewe, Adam. “Can Machine-Learning Models Overcome Biased Datasets?” MIT CSAIL, 2 Mar. 2022."
    url: https://news.mit.edu/2022/machine-learning-biased-data-0221
optional_readings:
  - citation: 'Google. Teachable Machine [Interactive].'
    notes: Try object classification; test unfamiliar backgrounds and examples.
    url: 'https://teachablemachine.withgoogle.com/'
  - citation: 'U.S. Food and Drug Administration. “FDA Proposes Updated Recommendations to Help Improve Performance of Pulse Oximeters Across Skin Tones.” FDA, 6 Jan. 2025.'
    notes: Measurement bias; consider how errors can enter a system before machine learning begins.
    url: 'https://www.fda.gov/news-events/press-announcements/fda-proposes-updated-recommendations-help-improve-performance-pulse-oximeters-across-skin-tones'

  - citation: 'Koenecke, Allison, et al. “Automated Speech Recognition Less Accurate for Blacks.” Stanford Report, 23 Mar. 2020.'
    notes: Interactive examples show substantially higher speech-recognition error rates for Black speakers.
    url: 'https://news.stanford.edu/stories/2020/03/automated-speech-recognition-less-accurate-blacks'

  - citation: 'Stanford Computational Policy Lab. “The Race Gap in Speech Recognition Technology.” FairSpeech.'
    notes: Listen to audio examples and compare human speech with machine-generated transcripts.
    url: 'https://fairspeech.stanford.edu/'

  - citation: 'Wilson, Kyra, and Aylin Caliskan. “Gender, Race, and Intersectional Bias in AI Resume Screening via Language Model Retrieval.” Brookings Institution, 25 Apr. 2025.'
    notes: Identical resumes with different race- and gender-associated names receive different rankings.
    url: 'https://www.brookings.edu/articles/gender-race-and-intersectional-bias-in-ai-resume-screening-via-language-model-retrieval/'

  - citation: 'AlDahoul, Nouar, Talal Rahwan, and Yasir Zaki. “AI-Generated Faces Influence Gender Stereotypes and Racial Homogenization.” Scientific Reports, vol. 15, 2025.'
    notes: Examines racial and gender stereotypes in Stable Diffusion images across 32 professions.
    url: 'https://www.nature.com/articles/s41598-025-99623-3'

  - citation: 'Omar, Mahmud, et al. “Sociodemographic Biases in Medical Decision Making by Large Language Models.” Nature Medicine, vol. 31, 2025, pp. 1873–1881.'
    notes: Researchers hold clinical cases constant while changing sociodemographic information and compare model recommendations.
    url: 'https://www.nature.com/articles/s41591-025-03626-6'

  - citation: 'Jonas, Anne, and Jenna Burrell. “Friction, Snake Oil, and Weird Countries: Cybersecurity Systems Could Deepen Global Inequality through Regional Blocking.” Big Data & Society, vol. 6, no. 1, 2019.'
    notes: Examines regional blocking, fraud detection, false positives, and how automated security systems can treat geographically patterned behavior as suspicious.
    url: 'https://journals.sagepub.com/doi/10.1177/2053951719835238'

  - citation: 'Zewe, Adam. “Avoiding Shortcut Solutions in Artificial Intelligence.” MIT News, 2 Nov. 2021.'
    notes: Explains shortcut learning using the example of image classifiers learning to associate cows with grass rather than recognizing the cow itself.
    url: 'https://news.mit.edu/2021/shortcut-artificial-intelligence-1102'

  - citation: 'Geirhos, Robert, et al. “ImageNet-Trained CNNs Are Biased Towards Texture; Increasing Shape Bias Improves Accuracy and Robustness.” ICLR, 2019.'
    notes: Shows that image classifiers may rely more strongly on texture than shape; includes striking shape-texture conflict examples.
    url: 'https://github.com/rgeirhos/texture-vs-shape'
---

## Topic / Focus

Distinguish training examples from test examples, and separate model performance from the decision to rely on its output. Document one failure and whether revising the training set addresses it.

## In This Class

- Is it a Fish Activity
- Key terms:
    - False positive
    - False negative
    - Overfitting
    - Training v. Test Data
- How I learned in-class presentations

## Slides and Activities
- [Slides](https://docs.google.com/presentation/d/1x8Phv0BiN5sWKpIn8ZcFwwlCH-mZaVV2xFci60C2hho/edit?usp=sharing)

## Societal / Ethical Questions

- Whose examples are represented?
- What gets left out?
- Which errors matter most, and to whom?
