import React from "react";

export const baseTopics = [
  {
    id: 1,
    title: "What Is Intelligence?",
    description: (<>This opening unit introduces the course's central question: what do we mean when we call a person, animal, institution, or machine "intelligent"? We will treat intelligence not as a neutral fact, but as a concept shaped by history, culture, measurement, and power. Students will begin building the shared vocabulary for the semester by asking how intelligence gets defined, who benefits from particular definitions, and what gets left out when complex forms of life are reduced to scores, labels, or predictions.</>),
    meetings: [
      {
        date: "Tu, Aug 18",
        topic: "Course introduction and seminar framing",
        description: (<><ul><li>This opening lecture introduces the seminar's central framing: intelligence as a social, technical, and public question rather than a purely computational one.</li></ul></>),
        activities: [
          { title: "Course introduction and seminar framing", url: "https://docs.google.com/presentation/d/1aAc7NBQFoqyINVuNuKOT64A5cChhNdVh/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
        ],
        readings: [
          { citation: (<><em>The Dream Hotel</em> by Laila Lalami. Opening chapters and first discussion prompt. <strong>Placeholder:</strong> add edition-specific chapter assignment and link information.</>) },
          { citation: (<>Langdon Winner. "Do Artifacts Have Politics?" <strong>Placeholder:</strong> add course copy or stable library link.</>) },
          { citation: (<>Lucy Suchman. "Located Accountabilities in Technology Production." <strong>Placeholder:</strong> add stable link or PDF.</>) },
          { citation: (<><a href="https://design-justice.pubpub.org/" target="_blank" rel="noopener noreferrer">Sasha Costanza-Chock, <em>Design Justice</em></a>. Suggested excerpts on who gets centered in design decisions.</>) },
          { citation: (<><a href="/syllabus" target="_blank" rel="noopener noreferrer">Please read the syllabus</a></>) },
          { citation: (<><em>The Dream Hotel</em> by Laila Lalami. <strong>Placeholder:</strong> assign opening chapters and add edition-specific reading guidance.</>) },
          { citation: (<>Kazim, E., & Koshiyama, A. S. (2021). <a href="https://www.cell.com/patterns/pdf/S2666-3899(21)00157-4.pdf" target="_blank" rel="noopener noreferrer">A high-level overview of AI ethics</a>. <em>Patterns</em>, 2(9).</>) },
        ],
      },
      {
        date: "Th, Aug 20",
        topic: "Intelligence, measurement, and speculative futures",
        description: (<><ul><li>We use speculative fiction and public examples to ask who gets to define intelligence, what gets measured, and how scoring systems shape social life.</li></ul></>),
        activities: [
          { title: "Intelligence, measurement, and speculative futures", url: "https://docs.google.com/presentation/d/1h0JOSf9PcxceNeLTBLzp0PsNKb5LRMuc/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
        ],
        readings: [
          { citation: (<><em>The Dream Hotel</em> by Laila Lalami. <strong>Placeholder:</strong> add first discussion checkpoint tied to evidence, scoring, and institutional knowledge.</>) },
          { citation: (<><a href="https://www.netflix.com/watch/80195733" target="_blank" rel="noopener noreferrer"><em>Black Mirror</em>: "Joan Is Awful"</a> or <a href="https://www.netflix.com/watch/80195733" target="_blank" rel="noopener noreferrer"><em>Black Mirror</em>: "Nosedive"</a>.</>) },
          { citation: (<>Intelligence testing and measurement history. <strong>Placeholder:</strong> add a short reading on IQ, testing, and what such measures leave out.</>) },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "How Are Human Learning and Machine Learning Similar and Different?",
    description: (<>This unit compares human learning with machine learning without collapsing one into the other. We will study learning as a biological, social, embodied, and historical process, then contrast that with machine learning systems built from data, models, optimization, and inference. The goal is not to reject comparison altogether, but to understand when the analogy is useful, when it becomes misleading, and why those distinctions matter in public conversations about AI.</>),
    meetings: [
      {
        date: "Tu, Aug 25",
        topic: "How humans learn: neuroscience, memory, and plasticity",
        description: (<><ul><li>This lecture introduces human learning as a biological, embodied, and social process, with attention to memory, neural communication, plasticity, and the limits of simplified brain talk.</li></ul></>),
        activities: [
          { title: "How humans learn: neuroscience, memory, and plasticity", url: "https://docs.google.com/presentation/d/1VW15Fwqd4yeTM0tGlXc-O7yncign2ZJu7Q5dDDlCgnA/edit?usp=sharing", draft: 0 },
        ],
        readings: [
          { citation: (<><em>The Dream Hotel</em> by Laila Lalami. Continue reading. <strong>Placeholder:</strong> add chapter range tied to unit discussion on dreams, memory, and prediction.</>) },
          { citation: (<><a href="https://www.cambridge.org/core/books/cambridge-handbook-of-the-learning-sciences/science-of-learning/6E57F4F0E0D0D6E721B0F0C8A6D9078D" target="_blank" rel="noopener noreferrer">Keith Sawyer, "The Science of Learning"</a>. <strong>Placeholder:</strong> confirm library/course-access route for assigned excerpt.</>) },
          { citation: (<><a href="https://www.nist.gov/artificial-intelligence" target="_blank" rel="noopener noreferrer">NIST overview of artificial intelligence</a>. Background reading on AI, models, and public terminology.</>) },
          { citation: (<>Human learning vs. machine learning explainer. <strong>Placeholder:</strong> add a short, public-facing reading or video for non-CS majors.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=eDQquPtqMZs" target="_blank" rel="noopener noreferrer">Neurologists Debunk 11 Brain Myths</a>. Insider Science.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=A0ucST0jyqw" target="_blank" rel="noopener noreferrer">Action Potential - Firing of a Neuron</a>. Psych Explained.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=tfifTUYuAYU" target="_blank" rel="noopener noreferrer">Synaptic Plasticity</a>. Brains Explained.</>) },
          { citation: (<>Dreams, memory, and prediction. <strong>Placeholder:</strong> add a short, accessible reading that connects sleep, dreaming, or memory to prediction without overclaiming.</>) },
        ],
      },
      {
        date: "Th, Aug 27",
        topic: "Machine learning basics: models, training, and inference",
        description: (<><ul><li>We introduce machine learning in accessible terms by unpacking data, models, training, and inference, then compare those processes to human learning without treating them as equivalent.</li></ul></>),
        activities: [
          { title: "Machine learning basics: models, training, and inference", url: "https://docs.google.com/presentation/d/1HDEd7oHVQ2ai9Eg-avtmZLcsWqrNrGbxTFRPpoqyoYQ/edit?usp=sharing", draft: 0 },
        ],
        readings: [
          { citation: (<><a href="https://www.nist.gov/artificial-intelligence" target="_blank" rel="noopener noreferrer">NIST overview of artificial intelligence</a>.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=aircAruvnKk" target="_blank" rel="noopener noreferrer">But what is a neural network?</a> 3Blue1Brown.</>) },
        ],
      },
      {
        date: "Tu, Sep 1",
        topic: "What It Means for a Machine to Learn",
        description: (<><ul><li>We introduce machine learning in accessible terms by unpacking data, models, training, and inference, then compare those processes to human learning without treating them as equivalent.</li></ul></>),
        readings: [
          { citation: (<><a href="https://drive.google.com/file/d/1wM3Fm2C0qphH1hyNg5hXbPehrSp-eu0I/view?usp=sharing" target="_blank" rel="noopener noreferrer">Chapter 1. The Science of Learning</a>. Keith Sawyer.</>) },
          { citation: (<>Public-facing machine learning explainer. <strong>Placeholder:</strong> add a short reading that defines training data, features, labels, and inference for non-CS majors.</>) },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "What Do Brain-Inspired Systems Reveal About the Limits of Comparison?",
    description: (<>This unit turns to neural networks, spiking neural networks, and neuromorphic computing. We will examine how biological metaphors shape technical design, and how brain-inspired systems can be both scientifically productive and conceptually misleading. Students will learn enough about artificial neurons, hardware, and emerging architectures to ask what these systems actually borrow from biology, what they simplify away, and why that distinction matters.</>),
    meetings: [
      {
        date: "Th, Sep 3",
        topic: "Generative AI, solutionism, and public imagination",
        description: (<><ul><li>This lecture treats generative AI as one AI paradigm among many, and asks how marketing, hype, and metaphor shape public beliefs about what these systems are and what they can do.</li></ul></>),
        activities: [
          { title: "Generative AI, solutionism, and public imagination", url: "https://docs.google.com/presentation/d/1lf5QcEkBEhyMSyiNpv5XsEUhr-Q1N13n/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
        ],
        readings: [
          { citation: (<>Selections on neural networks and biological analogy. <strong>Placeholder:</strong> add an accessible introductory reading or video.</>) },
          { citation: (<>Selections on neuromorphic computing and spiking neural networks. <strong>Placeholder:</strong> add public-facing overview and one deeper technical explainer.</>) },
          { citation: (<>Hardware and infrastructure reading. <strong>Placeholder:</strong> add piece on materiality, energy, or edge AI infrastructure.</>) },
          { citation: (<>Brain metaphor critique. <strong>Placeholder:</strong> add a reading on the limits of comparing brains and machines.</>) },
          { citation: (<>Benjamin, Ruha (2019). Chapter 4. Technological Benevolence. <em>Race After Technology</em>.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=x4O8pojMF0w" target="_blank" rel="noopener noreferrer">OpenAI marketing video</a>.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=pdRzEASwksA" target="_blank" rel="noopener noreferrer">Will A.G.I. Save the World?</a> Evgeny Morozov. Watch the first 30 minutes.</>) },
          { citation: (<>Generative AI overview for non-specialists. <strong>Placeholder:</strong> add a short explainer that distinguishes language models from AI more broadly.</>) },
        ],
      },
      {
        date: "Tu, Sep 8",
        topic: "Neural Networks and Biological Analogy",
        description: (<><ul><li>We examine artificial neural networks as technically useful but limited abstractions inspired by biology, and ask what they capture from brains and what they leave out.</li></ul></>),
        readings: [
          { citation: (<><a href="https://www.youtube.com/watch?v=aircAruvnKk" target="_blank" rel="noopener noreferrer">But what is a neural network?</a>. 3Blue1Brown.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=UZDiGooFs54" target="_blank" rel="noopener noreferrer">The moment we stopped understanding AI</a>. Welch Labs.</>) },
        ],
      },
      {
        date: "Th, Sep 10",
        topic: "Neural Networks and Biological Analogy",
        description: (<><ul><li>We examine artificial neural networks as technically useful but limited abstractions inspired by biology, and ask what they capture from brains and what they leave out.</li></ul></>),
        readings: [
          { citation: (<>Biological inspiration vs. biological equivalence. <strong>Placeholder:</strong> add a short reading critiquing simplistic "AI works like the brain" claims.</>) },
        ],
      },
      {
        date: "Th, Sep 17",
        topic: "Neuromorphic computing and spiking neural networks",
        description: (<><ul><li>This lecture introduces spiking neural networks and neuromorphic computing as emerging approaches that shift AI from abstract models toward hardware inspired by neural signaling.</li></ul></>),
        activities: [
          { title: "Neuromorphic computing and spiking neural networks", url: "https://docs.google.com/presentation/d/11b5zyHXdncB85U8dIbind7abPkn3UwxeqgL03sQdVQA/edit?usp=sharing", draft: 0 },
        ],
        readings: [
          { citation: (<><a href="https://www.youtube.com/watch?v=TetLY4gPDpo" target="_blank" rel="noopener noreferrer">Neuromorphic computing is a big deal for A.I., but what is it?</a> Seeker.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=6Dcs6fQglRA" target="_blank" rel="noopener noreferrer">Architecture all access: Neuromorphic computing part 1</a>. Intel Technology.</>) },
        ],
      },
      {
        date: "Tu, Sep 22",
        topic: "Neuromorphic Computing and Spiking Neural Networks",
        description: (<><ul><li>This lecture introduces spiking neural networks and neuromorphic computing as emerging approaches that shift AI from abstract models toward hardware inspired by neural signaling.</li></ul></>),
        readings: [
          { citation: (<><a href="https://www.youtube.com/watch?v=XWds3FIVm0U&t=162s" target="_blank" rel="noopener noreferrer">Architecture all access: Neuromorphic computing part 2</a>. Intel Technology.</>) },
          { citation: (<><a href="https://www.nature.com/articles/s43588-021-00184-y" target="_blank" rel="noopener noreferrer">Opportunities for neuromorphic computing algorithms and applications</a>. <em>Nature Reviews</em>.</>) },
        ],
      },
      {
        date: "Tu, Oct 27",
        topic: "Cerebellum-Inspired Anomaly Detection",
        description: (<><ul><li>We examine anomaly detection as both a technical practice and a social problem, with attention to emerging brain-inspired approaches and the risks of defining normality too narrowly.</li></ul></>),
        readings: [
          { citation: (<>Cerebellum-inspired anomaly detection overview. <strong>Placeholder:</strong> add an accessible article or lab overview connected to the course's neuromorphic case study.</>) },
          { citation: (<>Anomaly detection explainer for non-specialists. <strong>Placeholder:</strong> add a short reading defining normality, outliers, thresholds, false positives, and false negatives.</>) },
          { citation: (<>Application case study in cybersecurity, robotics, wearables, or biosensing. <strong>Placeholder:</strong> add one contemporary example for discussion.</>) },
        ],
      },
      {
        date: "Th, Oct 29",
        topic: "Computer architecture, bottlenecks, and what changes in hardware",
        description: (<><ul><li>This lecture compares conventional computing architectures with neuromorphic approaches and asks what hardware design reveals about the limits of comparing brains and machines.</li></ul></>),
        activities: [
          { title: "Computer architecture, bottlenecks, and what changes in hardware", url: "https://docs.google.com/presentation/d/1bkDiWD2V4w_wTJvmyf9HI8WaZ9Damdb5aVzz-zTrfJI/edit?usp=sharing", draft: 0 },
        ],
        readings: [
          { citation: (<><a href="https://www.youtube.com/watch?v=zOxB2BLxgdk" target="_blank" rel="noopener noreferrer">How a Computer Works | Visual Learners</a>. Watch the first 5 minutes.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=QZwneRb-zqA" target="_blank" rel="noopener noreferrer">Exploring How Computers Work</a>.</>) },
          { citation: (<><a href="https://www.youtube.com/watch?v=Vv_2C95cO6s" target="_blank" rel="noopener noreferrer">Moore's Law Is Ending... So, What's Next?</a></>) },
          { citation: (<><a href="https://news.northwestern.edu/stories/2023/10/ai-just-got-100-fold-more-energy-efficient/" target="_blank" rel="noopener noreferrer">AI just got 100-fold more energy efficient</a>. Northwestern Now.</>) },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "What Are the Stakes of Prediction, Classification, and Anomaly Detection?",
    description: (<>This unit connects technical mechanisms to social consequences. We will study prediction, classification, clustering, anomaly detection, false positives, and false negatives, then ask how those operations shape people’s lives in institutions such as schools, workplaces, healthcare systems, policing, and digital platforms. The central concern is not only whether a system is accurate, but who defines normality, who gets marked as risky, and what recourse exists when automated judgments are wrong.</>),
    meetings: [
      {
        date: "Th, Oct 29",
        topic: "What Are the Stakes of Prediction, Classification, and Anomaly Detection?",
        readings: [
          { citation: (<><em>The Dream Hotel</em> by Laila Lalami. Major middle-to-late semester discussion section. <strong>Placeholder:</strong> add exact chapter range for prediction, detention, and false-positive themes.</>) },
          { citation: (<>Bowker and Star on classification and infrastructure. <strong>Placeholder:</strong> add stable excerpt or course PDF.</>) },
          { citation: (<><a href="https://www.ruhabenjamin.com/race-after-technology" target="_blank" rel="noopener noreferrer">Ruha Benjamin, <em>Race After Technology</em></a>. Suggested excerpts on classification, bias, and the New Jim Code.</>) },
          { citation: (<>Risk scoring, contestability, or false positives case study. <strong>Placeholder:</strong> add one contemporary article or report.</>) },
        ],
      },
      {
        date: "Tu, Nov 3",
        topic: "Classification, categories, and social significance",
        description: (<><ul><li>This lecture turns from learning systems themselves to the categories, labels, and norms they produce, asking how technical classification becomes social power.</li></ul></>),
        activities: [
          { title: "Classification, categories, and social significance", url: "https://docs.google.com/presentation/d/1sTQd9LSYoOeA9NBbkPJiIXsC4KhfMKYP/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
        ],
        readings: [
          { citation: (<>Benjamin, Ruha (2019). Chapter 1. Engineered Inequity. <em>Race After Technology</em>.</>) },
          { citation: (<>Bowker & Star (1998). <em>Sorting Things Out</em>. Introduction. <strong>Placeholder:</strong> add stable course copy or library link.</>) },
        ],
      },
      {
        date: "Th, Nov 5",
        topic: "Who gets sorted, who gets served, who gets flagged?",
        description: (<><ul><li>This lecture turns from learning systems themselves to the categories, labels, and norms they produce, asking how technical classification becomes social power.</li></ul></>),
        activities: [
          { title: "Who gets sorted, who gets served, who gets flagged?", url: "https://docs.google.com/presentation/d/1SiWTPoP_sMVl9C-eUeTWBU_H9sTgHk50/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
        ],
        readings: [
          { citation: (<>Thorn, Abigail. <a href="https://www.youtube.com/watch?v=koud7hgGyQ8" target="_blank" rel="noopener noreferrer">Social Constructs</a>.</>) },
          { citation: (<>Massey, Douglas (2007). <a href="https://www.russellsage.org/sites/default/files/Massey_Chap1_2.pdf" target="_blank" rel="noopener noreferrer">Chapter 1. How Stratification Works</a>.</>) },
        ],
      },
      {
        date: "Tu, Nov 10",
        topic: "False Positives, Surveillance, and Contesting Automated Decisions",
        description: (<><ul><li>Across three class meetings, we study false positives, surveillance systems, edge AI, biosensing, and the practical challenge of explaining or contesting automated judgments.</li></ul></>),
        readings: [
          { citation: (<><a href="https://www.netflix.com/title/81328723" target="_blank" rel="noopener noreferrer"><em>Coded Bias</em></a></>) },
          { citation: (<><a href="https://independentlens.s3.amazonaws.com/2200/10%20Coded%20Bias/Indie%20Lens%20Pop-Up/CODEDBIAS_DiscussionGuide.pdf" target="_blank" rel="noopener noreferrer">Skim the <em>Coded Bias</em> discussion guide</a>.</>) },
        ],
      },
      {
        date: "Th, Nov 12",
        topic: "False Positives, Surveillance, and Contesting Automated Decisions",
        description: (<><ul><li>Across three class meetings, we study false positives, surveillance systems, edge AI, biosensing, and the practical challenge of explaining or contesting automated judgments.</li></ul></>),
        readings: [
          { citation: (<>Edge AI, wearables, and biosensing case study. <strong>Placeholder:</strong> add one accessible example that connects intimate data to public stakes.</>) },
          { citation: (<>Explainability explainer. <strong>Placeholder:</strong> add a short reading on what it means to explain an AI decision to a non-specialist audience.</>) },
        ],
      },
      {
        date: "Tu, Nov 17",
        topic: "False Positives, Surveillance, and Contesting Automated Decisions",
        description: (<><ul><li>Across three class meetings, we study false positives, surveillance systems, edge AI, biosensing, and the practical challenge of explaining or contesting automated judgments.</li></ul></>),
        readings: [
          { citation: (<>Accountability and appeal in automated systems. <strong>Placeholder:</strong> add a reading on contestability, recourse, or due process.</>) },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "How Should Publics Reason About Uncertain AI Futures?",
    description: (<>The final unit turns toward governance, public scholarship, historical analogy, and anticipatory reasoning. Students will synthesize the semester's technical and social lenses in order to ask how communities can evaluate AI systems before their uses are fully settled. This unit supports the course's SYS 478 emphasis on public-facing work by helping students design explanations, briefs, workshops, and other artifacts for audiences beyond the classroom.</>),
    meetings: [
      {
        date: "Th, Nov 12",
        topic: "How Should Publics Reason About Uncertain AI Futures?",
        readings: [
          { citation: (<><em>The Dream Hotel</em> by Laila Lalami. Final discussion and synthesis. <strong>Placeholder:</strong> add concluding chapter assignment.</>) },
          { citation: (<><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer">NIST AI Risk Management Framework</a>. Selected overview sections.</>) },
          { citation: (<><a href="https://oecd.ai/en/ai-principles" target="_blank" rel="noopener noreferrer">OECD AI Principles</a>. Public-facing governance framework.</>) },
          { citation: (<>Responsible innovation / anticipatory governance reading. <strong>Placeholder:</strong> add Stilgoe, Owen, and Macnaghten excerpt or equivalent.</>) },
          { citation: (<>Public scholarship or design fiction example. <strong>Placeholder:</strong> add a model artifact for the final project.</>) },
        ],
      },
      {
        date: "Th, Nov 19",
        topic: "Energy, water, materials, and the planet",
        description: (<><ul><li>This lecture examines AI as a material system built from energy, water, labor, extraction, and infrastructure rather than as a purely virtual technology.</li></ul></>),
        activities: [
          { title: "Energy, water, materials, and the planet", url: "https://docs.google.com/presentation/d/1iGsU3TNCi1kjm35zXshvvQ8T7pQYhi8VnQ-N5zFn0nQ/edit?usp=sharing", draft: 0 },
        ],
        readings: [
          { citation: (<>Crawford, K. (2021). <a href="https://learnonline.unca.edu/pluginfile.php/1510960/mod_resource/content/1/CRAWFORD-Earth-2021.pdf" target="_blank" rel="noopener noreferrer">Chapter 1. Earth</a>. <em>Atlas of AI</em>.</>) },
          { citation: (<>AI energy and water use explainer. <strong>Placeholder:</strong> add a current article or report suitable for non-specialists.</>) },
        ],
      },
      {
        date: "Tu, Nov 24",
        topic: "Business models, labor, and historical comparison",
        description: (<><ul><li>We place AI in longer histories of labor, media, and infrastructure, asking what older technological shifts can and cannot teach us about the present.</li></ul></>),
        activities: [
          { title: "Business models, labor, and historical comparison", url: "https://docs.google.com/presentation/d/1Fr1vFI11hdwxcmKv_qi4uT3QzrcmufIVS1Tu-Nufs2g/edit?usp=sharing", draft: 0 },
        ],
        readings: [
          { citation: (<><a href="https://www.newamerica.org/oti/reports/its-not-just-content-its-business-model/" target="_blank" rel="noopener noreferrer">It's Not Just the Content, It's the Business Model</a>. New America.</>) },
          { citation: (<>Crawford, K. (2021). <a href="https://learnonline.unca.edu/pluginfile.php/1510962/mod_resource/content/4/CRAWFORD-Labor-2021.pdf" target="_blank" rel="noopener noreferrer">Chapter 2. Labor</a>. <em>Atlas of AI</em>.</>) },
          { citation: (<><a href="https://www.politico.com/magazine/story/2016/12/fake-news-history-long-violent-214535" target="_blank" rel="noopener noreferrer">The Long and Brutal History of Fake News</a>. <em>Politico</em>.</>) },
        ],
      },
      {
        date: "Tu, Dec 1",
        topic: "Governance Frameworks, Accountability, and Anticipatory Reasoning",
        description: (<><ul><li>This lecture introduces governance frameworks and asks how communities can evaluate and shape AI systems before their effects are fully entrenched.</li></ul></>),
        readings: [
          { citation: (<><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer">NIST AI Risk Management Framework</a>. Selected overview sections.</>) },
          { citation: (<><a href="https://oecd.ai/en/ai-principles" target="_blank" rel="noopener noreferrer">OECD AI Principles</a>.</>) },
          { citation: (<><a href="https://news.berkeley.edu/2023/11/21/hany-farid-to-limit-disinformation-we-must-regulate-internet-platforms/" target="_blank" rel="noopener noreferrer">To limit disinformation, we must regulate internet platforms</a>. UC Berkeley News.</>) },
          { citation: (<>Anticipatory governance or responsible innovation reading. <strong>Placeholder:</strong> add Stilgoe, Owen, and Macnaghten or a comparable course-accessible text.</>) },
        ],
      },
      {
        date: "Th, Dec 3",
        topic: "Public scholarship, design justice, and critical hope",
        description: (<><ul><li>The final lecture helps students translate the semester's ideas into public-facing artifacts that support democratic reasoning about AI.</li></ul></>),
        activities: [
          { title: "Public scholarship, design justice, and critical hope", url: "https://docs.google.com/presentation/d/1EYCyKx3bkymiU2326gPTwryrGsE97BDUW66lsitjj1E/edit?usp=sharing", draft: 0 },
        ],
        readings: [
          { citation: (<>Costanza-Chock, Sasha (2020). <a href="https://designjustice.mitpress.mit.edu/pub/cfohnud7/release/2" target="_blank" rel="noopener noreferrer">Design Practices: "Nothing About Us Without Us"</a>.</>) },
          { citation: (<>Grain, K. M., & Land, D. E. (2017). <a href="https://quod.lib.umich.edu/cgi/t/text/text-idx?cc=mjcsloa;c=mjcsl;c=mjcsloa;idno=3239521.0023.104;g=mjcslg;rgn=main;view=text;xc=1" target="_blank" rel="noopener noreferrer">The social justice turn: Cultivating critical hope in an age of despair</a>.</>) },
          { citation: (<>Model public-facing AI literacy artifact. <strong>Placeholder:</strong> add one example students can learn from as they finish their projects.</>) },
        ],
      },
    ],
  },
];
