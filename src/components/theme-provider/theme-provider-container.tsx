import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
  StylesProvider,
} from '@material-ui/core'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import * as React from 'react'
import { ThemeProvider as ScThemeProvider } from 'styled-components'

type Props = Readonly<{
  theme: ThemeOptions
}>

const ThemeProvider: React.FunctionComponent<Props> = ({ theme, children }) => {
  const themeInstance = React.useMemo(() => responsiveFontSizes(createMuiTheme(theme)), [theme])
  return (
    <StylesProvider injectFirst={true}>
      <ScThemeProvider theme={themeInstance}>
        <MuiThemeProvider theme={themeInstance}>{children}</MuiThemeProvider>
      </ScThemeProvider>
    </StylesProvider>
  )
}

export default ThemeProvider
