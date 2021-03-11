/* eslint-disable @typescript-eslint/no-var-requires */
// Uncomment this to serve as PWA (also uncomment withPWA export at bottom of file)
// const withPWA = require('next-pwa')

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' }
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  /* Uncomment this to serve using serverless functions */
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
}

// Uncomment this to serve as PWA (also uncomment require('next-pwa') at top of file)
// module.exports = withPWA({ ...nextConfig, pwa: { dest: 'pbulic' } })
module.exports = nextConfig
