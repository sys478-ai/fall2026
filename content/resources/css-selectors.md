---
title: "CSS Selectors"
group_order: 3
group: "CSS"
order: 2
---

## Recommended Resources

### W3Schools Reference
* [http://www.w3schools.com/css/css_syntax.asp](http://www.w3schools.com/css/css_syntax.asp)
* [http://www.w3schools.com/cssref/css_selectors.asp](http://www.w3schools.com/cssref/css_selectors.asp)

## Overview

| Selector | Example | Example description |
|--|--|--|
|.class	| .intro | Selects all elements with class="intro" |
|\#id | #firstname | Selects the element with id="firstname" |
| element | p | Selects all &lt;p&gt; elements |
| element, element | div, p | Selects all &lt;div&gt; elements and all &lt;p&gt; elements|



## Basic Selector Examples

### Element Selector
Selects elements based on the element name

**Example:** `h1 { color: red; }`
<iframe src="//codepen.io/vanwars/embed/BzWQPL/?theme-id=18654&default-tab=html,result" allowfullscreen="true" class="codepen-frame"></iframe>

### ID Selector
Uses the id attribute of an HTML element to select a specific element, using the hash character (#):

**Example:** `#my_tag { color: red; }`
<iframe src="//codepen.io/vanwars/embed/MepbzV/?theme-id=18654&default-tab=html,result" allowfullscreen="true" class="codepen-frame"></iframe>


### Class Selector
Selects elements with a specific class attribute. To select elements with a specific class, write a period (.) character, followed by the name of the class.

**Example:** `.heading { color: red; }`
<iframe src="//codepen.io/vanwars/embed/BzWQGQ/?theme-id=18654&default-tab=html,result" allowfullscreen="true" class="codepen-frame"></iframe>

### Grouping Selectors
When you want to apply the same rule to many selectors, separate them with a comma:

**Example:** `h1, h2, h3 { color: red; }`
<iframe src="//codepen.io/vanwars/embed/Vjpmqw/?theme-id=18654&default-tab=html,result" allowfullscreen="true" class="codepen-frame"></iframe>
