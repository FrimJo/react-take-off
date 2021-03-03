/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

/* Uncomment this to serve as SPA */
// const sitemap = require('nextjs-sitemap-generator')

/* It generates a sitemap.xml file inside the out directory. Keep in mind; Need to
manually provide your sitemap to the Google Search Console for it get recognized by Google. */

/* Uncomment this to serv as SPA */
// sitemap({
//   baseUrl: '<your_website_base_url>',
//   pagesDirectory: __dirname + '/pages',
//   targetDirectory: 'static/',
// })

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' }
    }

    return config
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
