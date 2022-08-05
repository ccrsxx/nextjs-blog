# Learn Next.js

Important note about the tutorial:

- Link component also needs an a tag for semantic HTML and SEO.
- When you want to add an attribute to the Link, add it to the a tag inside.
- When you need to link to an external page outside the Next.js app, just use an \<a> tag without Link.
- Use Image component from next instead of img element, it supports responsiveness, optimize image sizing, lazy loaded by default.
- Use CSS module to style specific components.
- Top App is in the src/pages/\_app.tsx, you can declare state that persist between pages here. Also this a place to add global styles.
- When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)
- In development mode, getStaticProps runs on each request instead.
