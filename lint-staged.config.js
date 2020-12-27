/* eslint-disable @typescript-eslint/no-var-requires */
const { ESLint } = require('eslint')

const cli = new ESLint()

module.exports = {
  '*.{js,jsx,ts,tsx}': (files) =>
    'eslint --max-warnings=0 --fix' + files.filter((file) => !cli.isPathIgnored(file)).join(' '),
}
