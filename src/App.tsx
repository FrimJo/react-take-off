import * as React from 'react'
import { ReactQueryConfigProvider, ReactQueryProviderConfig } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
// import { InstallMessage } from 'components/install-message'
import Router from 'components/router'
import ThemeProvider from 'components/theme-provider'
// import { UpdateSnackbar } from 'components/update-snackbar'
import { LocalStorageProvider } from 'contexts/local-storage-context'
import { LocalizationProvider } from 'localization'
import { GlobalStyle } from 'styles/global'
import { THEME } from 'styles/theme'

const queryConfig: ReactQueryProviderConfig = {
  shared: { suspense: true },
  queries: {
    staleTime: 60 * 1000, // Fetched data will be fresh for 1 minute befor becoming stale
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  },
}

type ServerError = { code: number; title: string; traceId: string; type: string }
export function isServerError(error: unknown): error is ServerError {
  return (
    (error as ServerError).code !== undefined &&
    (error as ServerError).title !== undefined &&
    (error as ServerError).traceId !== undefined &&
    (error as ServerError).type !== undefined
  )
}

export function App() {
  return (
    <LocalizationProvider>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <LocalStorageProvider>
          <ReactQueryConfigProvider config={queryConfig}>
            <Router />
            {/*
            Uncomment when using service workers
            <InstallMessage />
            <UpdateSnackbar />
            */}
          </ReactQueryConfigProvider>
        </LocalStorageProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </LocalizationProvider>
  )
}
