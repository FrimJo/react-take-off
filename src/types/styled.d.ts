import { Theme } from '@material-ui/core'
// import original module declarations
import 'styled-components'
import { DefaultTheme } from './styled.d'

// and extend them!
declare module 'styled-components' {
  // export type DefaultTheme = Theme
  export interface DefaultTheme extends Theme {}
}
