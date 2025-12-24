---
title: Web components over frameworks
---

# Web components over frameworks

> The main motivation for using the frontend frameworks like react and others is to be able to create modular components that can be used (reused) together to create a new component.

To elaborate what I mean by that let's say your website has a navigation header, footer and sidebar. You need to include the html for them in each and every html page of your website. The only way to do this earlier is to copy paste the same html code in each and every html page This is much harder to maintain. Or create a script that will create a new html element and append it somewhere in the body. This solves the problem of reusing the code, but it is not a nice user experience. The browser will first render the page without the header and footer and then render the header and footer. This is not a nice user experience.

There is no way to do that before without using frontend frameworks earlier. But after the introduction of web components, you can create such reusable components without any frameworks or additional tooling.

- Browser can't understand react code.
- We can't write a react application without using node.
- React and such frameworks don't respect the html semantics. This might result in less accessible web pages.
- There is a lot of additional tooling required to use react like node, npm, webpack, babel, etc.

In this context, the less dependencies you have, the easier it is to maintain your code, the easier it is to make changes, the easier it is to port it to another project and so on, the easier it is to later switch to another dependencies.

> You will have freedom.

Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.

The hard part of development is not to write the code, but to maintain it. Once you realize that creating web components is not that much different compared to creating class components in react, you will see that you can create a lot of reusable components that can be used in any project.
