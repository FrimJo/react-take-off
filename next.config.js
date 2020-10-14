/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

/* Uncomment this to serv as SPA */
// const sitemap = require('nextjs-sitemap-generator')

/* It generates a sitemap.xml file inside the out directory. Keep in mind; Need to
manually provide your sitemap to the Google Search Console for it get recognized by Google. */

/* Uncomment this to serv as SPA */
// sitemap({
//   baseUrl: '<your_website_base_url>', // TODO: Update with correct website base url
//   pagesDirectory: __dirname + '/pages',
//   targetDirectory: 'static/',
// })

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  /* Uncomment this to serv as SPA */
  // target: 'serverless',
  // async rewrites() {
  //   return [
  //     // Do not rewrite API routes
  //     {
  //       source: '/api/:any*',
  //       destination: '/api/:any*',
  //     },
  //     // Rewrite everything else to use `pages/index`
  //     {
  //       source: '/:any*',
  //       destination: '/',
  //     },
  //   ]
  // },
})
