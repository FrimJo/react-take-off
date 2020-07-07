const { override, useEslintRc, useBabelRc } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')

module.exports = override(
  useBabelRc(), // Makes sure we use local .babelrc-file
  useEslintRc(), // Makes sure we use local .eslintrc-file, same as EXTEND_ESLINT=true in .env
  addReactRefresh({}) // Enables react-refresh
)
