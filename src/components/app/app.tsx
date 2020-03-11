import { StylesProvider } from '@material-ui/styles'
import React from 'react'
import { AuthenticationContext } from 'contexts/authentication-context'
import { Router } from 'components/router'
import { ThemeProvider } from 'components/theme-provider'
import { Global } from '@emotion/core'
import { THEME } from 'styles/theme'
import { GlobalStyles } from 'styles/global-styles'
import { UserContext } from 'contexts/user-context'
import { LocalStorageContext } from 'contexts/local-storage-context'
import { TOKEN_DATA_KEY } from 'utilities/token-data'
import { ReactQueryDevtools } from 'react-query-devtools'

export const App: React.FC = () => {
  return (
    <LocalStorageContext.Provider storageKeys={[TOKEN_DATA_KEY]}>
      <StylesProvider injectFirst={true}>
        <ThemeProvider theme={THEME}>
          <UserContext.Provider>
            <AuthenticationContext.Provider>
              <Global styles={GlobalStyles} />
              <Router />
            </AuthenticationContext.Provider>
          </UserContext.Provider>
        </ThemeProvider>
      </StylesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </LocalStorageContext.Provider>
  )
}
