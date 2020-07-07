/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Theme, ThemeOptions } from '@material-ui/core'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {}

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {}
}
