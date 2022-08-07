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
- Return value from getStaticProps is a json object, so that's not running in production. instead, it'll get fetched along with the generated html and javascript.
- Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.
- When exporting a function called getStaticPaths from a page that uses Dynamic Routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
- Predefined routes take precedence over dynamic routes, and dynamic routes over catch all routes. Take a look at the following examples:

  - pages/post/create.js - Will match /post/create.
  - pages/post/[pid].js - Will match /post/1, /post/abc, etc. But not /post/create.
  - pages/post/[...slug].js - Will match /post/1/2, /post/a/b/c, etc. But not /post/create, /post/abc.

- Fallback types:

  - false. If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

  - true. If fallback is true, then any paths not returned by getStaticPaths will not result in a 404 page. Instead they will give you the fallback page with no props and you can check it with `const { isFallback } = useRouter();` in your page if it's the first time request to that page.

    While in fallback, next.js will statically generate the requested html and json. This including running the page's getStaticProps again. When complete, the page received the json static props and isFallback will be false. The page changes from fallback to the fully generated page.

    At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, like other pages pre-rendered at build time.

  - 'blocking'. If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.

    The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will SSR on the first request and return the generated HTML.

    When complete, the browser receives the HTML for the generated path. From the user’s perspective, it will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of loading/fallback state.

    Same behavior after the finishing generating the HTML. like the fallback true, that another request will serve the cached generated page.

- Develop, Preview, Ship
  We’ve just gone through the workflow we call DPS: Develop, Preview, and Ship.

  - Develop: We’ve written code in Next.js and used the Next.js development server running to take advantage of its hot reloading feature.

  - Preview: We’ve pushed changes to a branch on GitHub, and Vercel created a preview deployment that’s available via a URL. We can share this preview URL with others for feedback. In addition to doing code reviews, you can do deployment previews.

  - Ship: We’ve merged the pull request to main to ship to production.
