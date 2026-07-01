---
card_type: technical-explainer
id: te-supervised-learning
slug: supervised-learning
title: 'Supervised Learning'
subtitle: 'How machines learn from labeled examples — and how those labels define what the system treats as correct.' main
num: '1'
order: 1
related_recognition_cards: ['8', '23', '25', '7']
related_concept_cards: []
related_labs: ['1a', '2', '3', '4', '5', '6']
field_guide_section: 'technical-explainers'
status: verified
status_reviewer: Maxwell Chalmers
status_date: 2026-06-25
status_notes: "Technical explanation reviewed for accuracy and introductory readability. Confirm that related_labs ['1a', '2', '3', '4', '5', '6'] still match the current lab index."
priority: high
---

> Maybe we can separate out supervised learning from Neural Networks?

## What the System Is Trying to Do

**Supervised learning** is a way of training a computer model using examples that already have answers attached to them. An image might be labeled “cat” or “not cat,” a loan record might be labeled “repaid” or “defaulted,” and a medical scan might be labeled “malignant” or “benign.” The model examines many of these labeled examples and searches for patterns that connect the inputs to the labels. The goal is not simply to memorize the training data, but to **generalize**: to make useful predictions about new examples it has not seen before.

Supervised learning is a training method rather than one particular kind of model. Decision trees, linear models, and deep neural networks can all be trained through supervised learning. Their internal structures may differ, but they follow the same broad cycle: make a prediction, compare it with the supplied answer, adjust, and try again.

## Core Mechanism

Before a model can process something, the input must be represented as numbers. Consider a grayscale image that is 10 pixels wide and 10 pixels tall. The image contains 100 pixels, and each pixel can be represented by a number describing how light or dark it is. Those 100 values can then be given to a model as its input.

The model processes these numbers using adjustable internal values called **parameters**. Parameters control how different parts of the input affect the prediction. In a neural network, common parameters include **weights**, which control the strength of connections, and **biases**, which help determine when particular patterns become active. The technical use of the word “bias” here refers to an adjustable number inside the model and is different from social or statistical bias.

Parameters can be imagined as dials. One dial might increase the importance of a particular visual pattern, while another might reduce it. A modern neural network can contain millions or billions of these dials. At the beginning of training, the parameters are usually assigned small random values. The model does not begin with a built-in understanding of cats, numbers, diseases, or creditworthiness, so its early predictions are usually poor.

The model improves by comparing its predictions with the labels in the training data. A **loss function** turns the difference between the prediction and the supplied answer into a number. A small loss means the prediction was relatively good, while a large loss means it was poor. Training repeatedly adjusts the parameters in ways that reduce this loss.

## How It Works

A common introductory example is the **MNIST dataset**, a collection of small grayscale images of handwritten digits. Each image is 28 pixels wide and 28 pixels tall, giving it 784 pixel values. Every image also has a label identifying the digit it contains, from 0 through 9.

A neural network trained on MNIST might contain an **input layer** that receives the 784 pixel values, one or more **hidden layers** that combine and transform those values, and an **output layer** that gives a score to each possible digit.

Suppose the network receives an image labeled as a 5.

1. **The model makes a prediction.**
   The pixel values move through the network’s layers, and each layer performs mathematical operations using its current weights and biases. This movement from the input toward the output is called a **forward pass**. At the end of the forward pass, the model produces a prediction. Before training, it might incorrectly give the highest score to 3.

2. **The prediction is compared with the label.**
   The training data tells the system that the correct answer is 5. The loss function measures the difference between the model’s prediction and the supplied label. The loss function does not explain why the answer is wrong; it only provides a mathematical measure of how far the prediction was from the target.

3. **The model determines which parameters contributed to the error.**
   In a neural network, a process called **backpropagation** traces the error backward through the layers. It uses calculus to estimate how changing each weight or bias would affect the loss. The details of the calculus are not necessary for understanding its purpose. Backpropagation helps determine which parameters contributed to the mistake and in which direction they should be changed.

4. **The parameters are adjusted.**
   An optimization method such as **gradient descent** uses the information from backpropagation to make small adjustments to the parameters. Imagine operating a claw machine that cannot be seen from the outside. Instead of a joystick, it has several dials. Each time the claw drops, the machine provides a number indicating how far it landed from a prize. That number does not reveal the prize’s exact location, but it provides enough feedback to make a better adjustment for the next attempt.

   A neural network follows a similar process. The loss measures how poor the prediction was, and gradient descent determines how the dials should be moved. In a real model, there may be millions or billions of dials rather than two.

5. **The process repeats.**
   The model sees another labeled example, makes another prediction, measures another error, and adjusts again. One example does not teach the model very much. Useful behavior emerges through enormous numbers of small updates across many training examples.

6. **The model is evaluated on new data.**
   A model can perform well on examples it has already seen while failing on new ones. This is called **overfitting**. To test whether the model has learned patterns that generalize, part of the available data is normally kept separate from training. The model is then evaluated on these unseen examples. A strong result on training data alone does not show that a model will work reliably in the world.

## What the Model Learns

A supervised model does not necessarily learn why a label is correct. It learns statistical relationships that help it reproduce the labels in its training data. For handwritten digits, this can be useful. Early layers of a neural network may respond to basic features such as edges, curves, loops, or areas of darkness. Later layers can combine those features into patterns that help distinguish a 3 from an 8 or a 5 from a 6.

No programmer needs to write a rule for every possible handwriting style. Instead, the network learns numerical relationships from the examples. The same principle applies in higher-stakes systems. A lending model might learn that certain combinations of income, debt, location, employment history, and other variables are associated with a “repaid” label. Whether those patterns represent fair or appropriate reasons for approving a loan is a separate question.

Supervised learning teaches a model to predict the labels it is given. It does not guarantee that those labels represent truth, fairness, causation, or the outcome people actually care about.

## What Can Go Wrong

### Training data can reproduce historical decisions

The model learns from records created by earlier human and institutional choices. If past hiring, lending, medical, or policing decisions were discriminatory, the model may learn to reproduce those patterns because doing so lowers its error on the training data. The system does not need an explicit rule targeting a group. Discrimination can be encoded indirectly through variables connected to geography, income, education, disability, race, gender, or access to institutions.

### Labels encode human judgment

Labels are often presented as if they are objective facts, but many require interpretation. A clinician decides whether a case should be marked “high risk,” a moderator decides whether a post is “harmful,” and a manager decides whether an employee was “successful.” These decisions reflect the knowledge, values, working conditions, incentives, and blind spots of the people and institutions producing the labels. The model learns to imitate those decisions; it does not independently verify that the labels were appropriate.

### The loss function defines what counts as success

The model adjusts itself to reduce the loss it is given. If the loss function measures the wrong thing, the model can become very effective at achieving a poor objective. A hiring model might be trained to predict which applicants resemble previously successful employees. That is measurable, but it may discourage unfamiliar backgrounds or reinforce a narrow definition of success. The model does not know that the metric is incomplete. It treats the mathematical target as the task.

### A model can memorize instead of generalizing

A model may learn details that are specific to its training examples rather than patterns that transfer to new situations. For example, a medical-image model might appear to recognize a disease while actually relying on hospital markings, scanner differences, or image formatting associated with particular labels. This is overfitting: the system performs well under familiar conditions but fails when irrelevant shortcuts disappear.

### Real conditions can change

Training data represents a particular time, place, and population. A model may become less reliable when the world changes or when it is used in a different setting. A model trained using patients from one hospital may not perform equally well at another, and a fraud model trained on last year’s behavior may fail as tactics change. This problem is sometimes called **distribution shift**: the data encountered after deployment differs from the data used during training.

### Aggregate accuracy can hide concentrated failure

A model that is 95 percent accurate overall may perform much worse for particular groups. If one population is much larger than another, strong performance for the majority can hide severe failure for a smaller group. This is especially likely when some populations are underrepresented in the training data. Overall accuracy therefore cannot answer every important question; performance must also be examined across relevant groups and situations.

### Decision thresholds create unequal consequences

Many classification models do not directly produce “yes” or “no.” They produce a score or probability, and designers choose a **threshold** that converts that score into a decision. A system might flag everyone with a risk score above 0.7, for example.

Changing the threshold changes the balance between false positives and false negatives. In a medical system, one choice might miss more illnesses while another subjects more healthy people to unnecessary treatment. In a fraud system, one threshold might allow more fraud while another wrongly blocks more legitimate users. The threshold is therefore not simply a technical detail. It expresses a judgment about which mistakes are considered more acceptable and who will bear their consequences.

## Critical Bridge

| Technical failure mode                           | Field guide recognition card                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| Training data reproduces historical decisions    | [Prediction imports the past](/field-guide/pattern-08)                      |
| Labels encode human judgment                     | _Data is produced, not found (not yet published)_                           |
| The loss function defines what counts as success | [Changing what gets measured changes what exists](/field-guide/pattern-23)  |
| Aggregate accuracy hides concentrated failure    | [Concentrated harm is hidden by aggregate benefit](/field-guide/pattern-25) |
| Decision thresholds create unequal consequences  | [Thresholds make uncertainty consequential](/field-guide/pattern-07)        |

## Connected Labs

Labs 1a, 2, 3, 4, 5, and 6 involve supervised learning systems or their outputs.
