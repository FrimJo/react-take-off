import { Provider as AuthProvider } from 'next-auth/client'
import type { AppProps /*, AppContext */ } from 'next/app'
import React from 'react'
import { Hydrate } from 'react-query/hydration'
import { InstallMessage, Head } from 'components'
import { ThemeProvider } from 'contexts'
import { LocalStorageProvider } from 'contexts/local-storage'
import { ReactQueryProvider } from 'contexts/react-query-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head />
      <ReactQueryProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider session={pageProps.session}>
            <LocalStorageProvider>
              <React.Suspense fallback={<h2>Loading...</h2>}>
                <ThemeProvider>
                  <Component {...pageProps} />
                  <InstallMessage />
                </ThemeProvider>
              </React.Suspense>
            </LocalStorageProvider>
          </AuthProvider>
        </Hydrate>
      </ReactQueryProvider>
    </React.Fragment>
  )
}

export default MyApp
