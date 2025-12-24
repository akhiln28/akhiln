---
title: Math equation js
---

# Math equation js

Write math equations for the browser in html in a simple format.

I got inspiration from the math typesetting from typst https://typst.app/docs/reference/math/. But as of now there isn't a simple way to write math equations in the browser html.

## Examples with LaTeX

Here is the quadratic formula rendered with KaTeX:

$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

And a summation:

$\sum_{i=1}^\infty \frac{1}{i^2} = \frac{\pi^2}{6}$

## MathML Features (Original content)

MathML is divided into two parts:
- Presentation MathML: Focuses on how mathematical notation is displayed visually.
- Content MathML: Describes the structure and meaning of math expressions in a semantic way.

| Attribute | Description | Example |
|-----------|-------------|---------|
| msup      | Superscript | $a^2$   |
| msub      | Subscript   | $a_2$   |
| mfrac     | Fraction    | $\frac{a}{b}$ |
| msqrt     | Square root | $\sqrt{2}$ |
