/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Theme } from '@material-ui/core'
import { CSSProp } from 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>
  }
}

// and extend them!
declare module 'styled-components' {
  // export type DefaultTheme = Theme
  export interface DefaultTheme extends Theme {}
}
