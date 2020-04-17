/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { override, useEslintRc } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')

module.exports = override(
  useEslintRc(path.resolve(__dirname, '.eslintrc.json')), // Makes sure we use local eslintrc-file, same as EXTEND_ESLINT=true in .env
  addReactRefresh({ disableRefreshCheck: true }) // Enables react-refresh
)
