import { StylesProvider } from '@material-ui/styles'
import React from 'react'

import { Authentication } from 'components/authentication'
import { Router } from 'components/router'
import { ThemeProvider } from 'components/theme-provider'
import { Global } from '@emotion/core'
import { THEME } from 'styles/theme'
import { GlobalStyles } from 'styles/global-styles'

export const App = () => (
  <StylesProvider injectFirst={true}>
    <ThemeProvider theme={THEME}>
      <Authentication.Provider>
        <Global styles={GlobalStyles} />
        <Router />
      </Authentication.Provider>
    </ThemeProvider>
  </StylesProvider>
)
