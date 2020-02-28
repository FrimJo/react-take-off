import { StylesProvider } from '@material-ui/styles'
import React from 'react'
import { AuthenticationContext } from 'contexts/authentication-context'
import { Router } from 'components/router'
import { ThemeProvider } from 'components/theme-provider'
import { Global } from '@emotion/core'
import { THEME } from 'styles/theme'
import { GlobalStyles } from 'styles/global-styles'
import { UserContext } from 'contexts/user-context'

export const App = () => {
  return (
    <StylesProvider injectFirst={true}>
      <ThemeProvider theme={THEME}>
        <AuthenticationContext.Provider>
          <UserContext.Provider>
            <Global styles={GlobalStyles} />
            <Router />
          </UserContext.Provider>
        </AuthenticationContext.Provider>
      </ThemeProvider>
    </StylesProvider>
  )
}
