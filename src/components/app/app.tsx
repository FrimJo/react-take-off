import { StylesProvider } from '@material-ui/styles'
import React from 'react'

import { Authentication } from 'components/authentication'
import { Router } from 'components/router'
import { ThemeProvider } from 'components/theme-provider'
import { GlobalStyle } from 'styles/global-styles'
import { THEME } from 'styles/theme'

export const App = () => (
  <StylesProvider injectFirst={true}>
    <ThemeProvider theme={THEME}>
      <Authentication.Provider>
        <GlobalStyle />
        <Router />
      </Authentication.Provider>
    </ThemeProvider>
  </StylesProvider>
)
