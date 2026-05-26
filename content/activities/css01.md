---
title: 'Intro to CSS: Photo Gallery'
date: '2026-10-09'
type: 'activity'
---

Please download the exercise files (below).

<a href="/fall2025/downloads/activities/intro-css-gallery.zip" class="nu-button">Download Activity Files <i class="fas fa-download"></i></a>

Then, use the CSS Property Cheatsheet (below) and what you've learned about selectors to make the following drawing:

<img class="large" src="/fall2025/images/activities/photo-gallery/gallery.png" />

## Tips

1. **Turn on the borders:** To make debugging easier, turn on the borders for all elements (temporarily).

   ```css
   body * {
     border: solid 1px black;
     padding: 5px;
   }
   ```

2. **Use CSS to create a 3-column grid**: Apply a style to main -- the parent of the photo sections -- that converts it to a three-column grid layout as follows:

   ```css
   main {
     display: grid;
     grid-template-columns: 1fr 1fr 1fr;
     gap: 20px;
   }
   ```

   We'll be talking about this more next week.

## Some extra challenges (if you have time)

1. Make one of the image "cards" have a different background color.
2. Try using a custom Google font instead of one of the built-in system fonts. Resources to consult:
   - <a href="https://www.w3docs.com/snippets/css/how-to-import-google-fonts-in-css-file.html" target="_blank">https://www.w3docs.com/snippets/css/how-to-import-google-fonts-in-css-file.html</a>
   - <a href="https://developers.google.com/fonts/docs/getting_started" target="_blank">https://developers.google.com/fonts/docs/getting_started</a>
   - <a href="https://www.w3schools.com/css/css_font_google.asp" target="_blank">https://www.w3schools.com/css/css_font_google.asp</a>
3. Make a hover effect using a "pseudoclass": when your user mouses over one the cards, make it do something (fade, grow, change colors, etc.). We will go over this in a future lesson, but in the meantime, you can take a look at W3 Schools:
   - <a href="https://www.w3schools.com/css/css_pseudo_classes.asp" target="_blank">https://www.w3schools.com/css/css_pseudo_classes.asp</a>

## CSS Cheatsheet

Here are some of the most common properties:

| Property         | Sample Values                                                | Example                                     |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------- |
| font-size        | `1.2em`, `16px`, `12pt`                                      | `font-size: 1.5em;`                         |
| font-family      | `Arial, Helvetica, san-serif`                                | `font-family: Arial, Helvetica, san-serif;` |
| color            | `red`, `#820263`, `rgb(130, 2, 99)`, `rgba(130, 2, 99, 0.6)` | `color: #820263;`                           |
| background-color |                                                              | `background-color: #820263;`                |
| display          | `inline`, `inline-block`, `block`, `flex`, `grid`            | `display: inline-block;`                    |
| border           | `solid 1px black`, `dotted 5px hotpink`                      | `border: solid 1px black;`                  |
| border-radius    | `3px`, `50%`                                                 | `border-radius: 10px;`                      |
| width            | `100%`, `500px`, `50vw`                                      | `width: 150px;`                             |
| height           | `100%`, `500px`, `50vh`                                      | `height: 150px;`                            |
| border-left      |                                                              | `border-left: solid 1px black;`             |
| border-right     |                                                              | `border-right: solid 1px black;`            |
| border-top       |                                                              | `border-top: solid 1px black;`              |
| border-bottom    |                                                              | `border-bottom: solid 1px black;`           |
| padding          | `5px`, `5vw`, `5%`                                           | `padding: 20px;`                            |
| padding-left     |                                                              | `padding-left: 20px;`                       |
| padding-right    |                                                              | `padding-right: 20px;`                      |
| padding-top      |                                                              | `padding-top: 20px;`                        |
| padding-bottom   |                                                              | `padding-bottom: 20px;`                     |
| margin           | `5px`, `5vw`, `5%`                                           | `margin: 20px;`                             |
| margin-left      |                                                              | `margin-left: 20px;`                        |
| margin-right     |                                                              | `margin-right: 20px;`                       |
| margin-top       |                                                              | `margin-top: 20px;`                         |
| margin-bottom    |                                                              | `margin-bottom: 20px;`                      |
