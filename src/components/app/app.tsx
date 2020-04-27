import { Global } from '@emotion/core'
import { StylesProvider } from '@material-ui/styles'
import * as React from 'react'
import { ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { IsFetchingSnackbarView } from 'components/is-fetching-snackbar/is-fetching-snackbar-view'
import { Router } from 'components/router'
import { StatusSnackbarError } from 'components/status-snackbar-error'
import { ThemeProvider } from 'components/theme-provider'
import { LocalStorageContext } from 'contexts/local-storage-context'
import { GlobalStyles } from 'styles/global-styles'
import { THEME } from 'styles/theme'

const queryConfig = {}

export const App: React.FC = () => {
  return (
    <LocalStorageContext.Provider>
      {/* Set injectFirst to false to have index.css load first (contains PostCSS Normalize)*/}
      <StylesProvider injectFirst={false}>
        <ThemeProvider theme={THEME}>
          <Global styles={GlobalStyles} />
          <ReactQueryConfigProvider config={queryConfig}>
            <StatusSnackbarError>
              <Router />
            </StatusSnackbarError>
            <IsFetchingSnackbarView />
          </ReactQueryConfigProvider>
        </ThemeProvider>
      </StylesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </LocalStorageContext.Provider>
  )
}
