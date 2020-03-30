import { StylesProvider } from '@material-ui/styles'
import React from 'react'
import { Router } from 'components/router'
import { ThemeProvider } from 'components/theme-provider'
import { Global } from '@emotion/core'
import { THEME } from 'styles/theme'
import { GlobalStyles } from 'styles/global-styles'
import { LocalStorageContext } from 'contexts/local-storage-context'
import { ReactQueryDevtools } from 'react-query-devtools'
import { StatusSnackbar } from 'components/status-snackbar'
import { IsFetchingSnackbar } from 'components/status-snackbar/is-fetching-snackbar'

export const App: React.FC = () => {
  return (
    <LocalStorageContext.Provider>
      <StylesProvider injectFirst={true}>
        <ThemeProvider theme={THEME}>
          <Global styles={GlobalStyles} />
          <StatusSnackbar>
            <Router />
          </StatusSnackbar>
          <IsFetchingSnackbar />
        </ThemeProvider>
      </StylesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </LocalStorageContext.Provider>
  )
}
