import { Global } from '@emotion/core'
import { StylesProvider } from '@material-ui/styles'
import { Router } from 'components/router'
import { StatusSnackbar } from 'components/status-snackbar'
import { IsFetchingSnackbar } from 'components/status-snackbar/is-fetching-snackbar'
import { ThemeProvider } from 'components/theme-provider'
import { LocalStorageContext } from 'contexts/local-storage-context'
import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { GlobalStyles } from 'styles/global-styles'
import { THEME } from 'styles/theme'

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
