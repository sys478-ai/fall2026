---
title: 'Data is produced, not found.'
num: '2'
excerpt: 'Data is created through measurement choices, interfaces, institutions, and assumptions about what should count.'
featured_image: 'fall2026/images/ethics-field-guide/data/02-observation-sensing.png'
field_guide_section: 'what-the-system-is-made-of'
field_guide_section_title: '1. What the System Is Made Of'
field_guide_section_intro: 'Before an AI system acts in the world, people have already made choices about data, infrastructure, materials, and what counts as a meaningful signal. This section helps you look upstream at what systems are made of.'
field_guide_section_order: 1
field_guide_order: 2
---

## What To Notice

Data does not simply appear. People, institutions, tools, sensors, categories, and storage systems all shape what becomes data — and what gets left out.

### 1. Lived Reality / The World

![A busy city scene with people, vehicles, weather, conversation, and movement happening at once.](/fall2026/images/ethics-field-guide/data/01-lived-reality.png)

The world is complex, messy, and full of context. More is happening than any dataset can capture. Given this, it's important to think about how data gets made, and how this can shape how reality is interpreted.


### 2. Observation & Sensing

![Sensors, a camera, a phone, a smartwatch, and a tablet translating a person and city scene into signals.](/fall2026/images/ethics-field-guide/data/02-observation-sensing.png)

Tools make some parts of the world visible and measurable while ignoring others. A camera, survey, sensor, form, transcript, phone, or monitoring device does not capture everything. It translates selected parts of experience into signals a system can store.


### 3. Selecting What to Measure

![A group of people around a board with charts, sliders, icons, checkmarks, and sticky notes.](/fall2026/images/ethics-field-guide/data/03-selecting-what-to-measure.png)

People decide which questions matter, which metrics count, and which tradeoffs are acceptable. These choices may be made by researchers, designers, institutions, agencies, vendors, or whoever controls the system being built.


### 4. Categorizing & Labeling

![People sorting messy media, documents, and examples into folders, tags, and organized groups.](/fall2026/images/ethics-field-guide/data/04-categorizing-labeling.png)

Messy inputs are organized into categories. Labels make analysis possible, but they also simplify. A label can make ambiguity easier to compute while making disagreement, uncertainty, context, or lived experience harder to see.


### 5. Organizing Into a Dataset

![Documents, images, chat bubbles, and database records flowing into a spreadsheet-like dataset and charts.](/fall2026/images/ethics-field-guide/data/05-dataset-output.png)

Structured data is useful for analysis because earlier choices have made it legible to a system. By the time something appears as a dataset, it already carries a history of observation, selection, categorization, cleaning, omission, and institutional purpose.


### 6. Takeaway / Data is a Human Construct

![A group discussing values and tradeoffs around a system diagram with icons for privacy, fairness, power, care, and efficiency.](/fall2026/images/ethics-field-guide/data/06-human-construct.png)

Data is a human construct. It is shaped by goals, tools, values, institutions, and power. Better data starts with more intentional choices — and better documentation of those choices.

## Questions To Ask

- What had to happen for this data to exist?
- What experiences were translated, simplified, or discarded?
- Who decided what counts as a signal worth keeping?
- What cannot easily be measured in this system?

## Examples

### Boston's Street Bump app

Boston once tested a smartphone app called Street Bump that used phone accelerometers to detect potholes as people drove. At first glance, this looked like a clever way to gather road-condition data without sending inspectors everywhere. But the data depended on who owned a smartphone, who installed the app, where they drove, how their phone was positioned, and which neighborhoods were already connected to city services. The resulting map was not just a map of potholes. It was also a map of participation, wealth, commuting patterns, and municipal attention.

Source: Kate Crawford discusses Street Bump in ["The Hidden Biases in Big Data"](https://www.hbr.org/2013/04/the-hidden-biases-in-big-data), _Harvard Business Review_, 2013.

### Predictive policing and drug-crime data

Predictive policing systems have often treated police incident or arrest records as if they measured where crime happens. But those records are also produced through patrol decisions, resident reporting, enforcement priorities, and earlier patterns of surveillance. Drug use, for example, is far more widespread than arrest data suggest. If a model is trained on drug arrest records, it may send police back to already-policed neighborhoods, creating more records there and making the pattern look confirmed. The dataset is not a neutral view of crime. It is partly a history of policing.

Source: Kristian Lum and William Isaac analyze Oakland drug-crime records and PredPol-style prediction in ["To Predict and Serve?"](https://rss.onlinelibrary.wiley.com/doi/full/10.1111/j.1740-9713.2016.00960.x), _Significance_, 2016. For the feedback-loop mechanism, see Danielle Ensign, Sorelle A. Friedler, Scott Neville, Carlos Scheidegger, and Suresh Venkatasubramanian, ["Runaway Feedback Loops in Predictive Policing"](https://proceedings.mlr.press/v81/ensign18a.html), _Proceedings of Machine Learning Research_, 2018.

### Google Flu Trends and search data

Google Flu Trends tried to estimate flu activity by looking for patterns in flu-related searches. The appeal was obvious: search data appeared faster than traditional public health reporting. But search behavior is not the same thing as infection. People search because they feel sick, because the news is talking about flu, because autocomplete suggests terms, because a platform changes how results are displayed, or because public anxiety changes. The data was produced through a search engine, a media environment, and user behavior. It was not a direct sensor for disease.

Source: David Lazer, Ryan Kennedy, Gary King, and Alessandro Vespignani discuss this case in ["The Parable of Google Flu: Traps in Big Data Analysis"](https://doi.org/10.1126/science.1248506), _Science_, 2014.

## Why This Matters

This pattern helps you resist the idea that datasets simply show up ready-made and objective. It also helps you connect technical measurement to larger questions of representation, omission, and institutional power.

## STS Readings

- Lisa Gitelman and Virginia Jackson, ["Introduction: Raw Data Is an Oxymoron"](https://dsl.lsu.edu/nehtextualdata/wp-content/uploads/2017/11/RawData.pdf), in _Raw Data Is an Oxymoron_, edited by Lisa Gitelman, MIT Press, 2013. A clear starting point for the claim that data are always made through interpretation, classification, and context.
- Geoffrey C. Bowker and Susan Leigh Star, _Sorting Things Out: Classification and Its Consequences_, MIT Press, 1999. Useful for understanding how classification systems become infrastructure and how they shape what can be known.
- danah boyd and Kate Crawford, ["Critical Questions for Big Data"](https://doi.org/10.1080/1369118X.2012.678878), _Information, Communication & Society_, 2012. A concise article on scale, context, bias, and the mistaken belief that large datasets are automatically more objective.
- Kate Crawford, ["The Hidden Biases in Big Data"](https://www.hbr.org/2013/04/the-hidden-biases-in-big-data), _Harvard Business Review_, 2013. A short, accessible piece that uses cases like Street Bump to show how data collection can reflect unequal participation.
- Kristian Lum and William Isaac, ["To Predict and Serve?"](https://rss.onlinelibrary.wiley.com/doi/full/10.1111/j.1740-9713.2016.00960.x), _Significance_, 2016. A clear case study of predictive policing, feedback loops, and how police data can reproduce past enforcement patterns.
- David Lazer, Ryan Kennedy, Gary King, and Alessandro Vespignani, ["The Parable of Google Flu: Traps in Big Data Analysis"](https://doi.org/10.1126/science.1248506), _Science_, 2014. A useful case for discussing platform-generated data, proxy measurement, and the limits of large-scale behavioral traces.
- Catherine D'Ignazio and Lauren F. Klein, [_Data Feminism_](https://data-feminism.mitpress.mit.edu/), MIT Press, 2020. Especially useful for thinking about missing data, power, standpoint, and the politics of counting.
