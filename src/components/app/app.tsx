import { Global } from '@emotion/core'
import { StylesProvider } from '@material-ui/styles'
import * as React from 'react'
import { ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { IsFetchingSnackbarView } from 'components/is-fetching-snackbar/is-fetching-snackbar-view'
import { RouterContainer } from 'components/router/router-container'
import { StatusSnackbarErrorBoundary } from 'components/status-snackbar-error/status-snackbar-error-boundary'
import { ThemeProviderContainer } from 'components/theme-provider/theme-provider-container'
import { LocalStorageContext } from 'contexts/local-storage-context'
import { GlobalStyles } from 'styles/global-styles'
import { THEME } from 'styles/theme'

const queryConfig = {}

export const App: React.FC = () => {
  return (
    <LocalStorageContext.Provider>
      {/* Set injectFirst to false to have index.css load first (contains PostCSS Normalize)*/}
      <StylesProvider injectFirst={false}>
        <ThemeProviderContainer theme={THEME}>
          <Global styles={GlobalStyles} />
          <ReactQueryConfigProvider config={queryConfig}>
            <StatusSnackbarErrorBoundary>
              <RouterContainer />
            </StatusSnackbarErrorBoundary>
            <IsFetchingSnackbarView />
          </ReactQueryConfigProvider>
        </ThemeProviderContainer>
      </StylesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </LocalStorageContext.Provider>
  )
}
