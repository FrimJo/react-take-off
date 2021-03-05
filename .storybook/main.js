const path = require('path')

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  "stories": [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (baseConfig) => {
    const nextConfig = require('../next.config.js')
    baseConfig.resolve = {
      alias: {
        components: path.resolve(__dirname, '../src/components'),
        contexts: path.resolve(__dirname, '../src/contexts'),
        localization: path.resolve(__dirname, '../src/localization'),
        pages: path.resolve(__dirname, '../src/pages'),
        styles: path.resolve(__dirname, '../src/styles'),
        utilities: path.resolve(__dirname, '../src/utilities'),
      },
      extensions: [...baseConfig.resolve.extensions,'.tsx', '.ts']
    }

    // Merge your next webpack config with this base
    return { ...nextConfig.webpack, ...baseConfig }
  }
}
