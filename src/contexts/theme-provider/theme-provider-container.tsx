import {
  StylesProvider,
  responsiveFontSizes,
  createMuiTheme,
  ThemeOptions,
} from '@material-ui/core'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import React, { useMemo } from 'react'
import { ThemeProvider as ScThemeProvider } from 'styled-components'
import { GlobalStyle } from 'styles/global'

type Props = { theme: ThemeOptions }

const ThemeProviderContainer = (props: React.PropsWithChildren<Props>) => {
  const { children, theme } = props
  const responseiveTheme = useMemo(() => responsiveFontSizes(createMuiTheme(theme)), [theme])
  return (
    <StylesProvider injectFirst={true}>
      <ScThemeProvider theme={responseiveTheme}>
        <MuiThemeProvider theme={responseiveTheme}>
          <GlobalStyle />
          {children}
        </MuiThemeProvider>
      </ScThemeProvider>
    </StylesProvider>
  )
}

export default ThemeProviderContainer
