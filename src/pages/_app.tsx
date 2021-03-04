import { GoogleFonts } from 'next-google-fonts'
import type { AppProps /*, AppContext */ } from 'next/app'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { Hydrate } from 'react-query/hydration'
import { InstallMessage, Head } from 'components'
import { ThemeProvider } from 'contexts'
import { LocalStorageProvider } from 'contexts/local-storage'
import { ReactQueryProvider } from 'contexts/react-query-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head />
      <CookiesProvider>
        <ReactQueryProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <LocalStorageProvider>
              <React.Suspense fallback={<h2>Loading...</h2>}>
                <ThemeProvider>
                  <Component {...pageProps} />
                  <InstallMessage />
                </ThemeProvider>
              </React.Suspense>
            </LocalStorageProvider>
          </Hydrate>
        </ReactQueryProvider>
      </CookiesProvider>
    </React.Fragment>
  )
}

export default MyApp
