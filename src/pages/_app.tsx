import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Hydrate } from 'react-query/hydration'
import { InstallMessage } from 'components'
import { LocalStorageProvider } from 'contexts/local-storage'
import { ReactQueryProvider } from 'contexts/react-query-provider'
import { ThemeProvider } from 'contexts/theme-provider'
import { THEME } from 'styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=Gv6xWBmJmL" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=Gv6xWBmJmL" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=Gv6xWBmJmL" />
        <link rel="manifest" href="/site.webmanifest?v=Gv6xWBmJmL" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=Gv6xWBmJmL" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico?v=Gv6xWBmJmL" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="apple-mobile-web-app-title" content="Example App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <title>Next.js PWA Example</title>
      </Head>
      <ReactQueryProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <LocalStorageProvider>
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <ThemeProvider theme={THEME}>
                <Component {...pageProps} />
                <InstallMessage />
              </ThemeProvider>
            </React.Suspense>
          </LocalStorageProvider>
        </Hydrate>
      </ReactQueryProvider>
    </>
  )
}

export default MyApp
