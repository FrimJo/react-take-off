import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import {
  ReactQueryCacheProvider,
  QueryCache,
  ReactQueryConfig,
  ReactQueryConfigProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Hydrate } from 'react-query/hydration'
import { InstallMessage } from 'components'
import { LocalStorageProvider } from 'contexts/local-storage'
import { ThemeProvider } from 'contexts/theme-provider'
import { THEME } from 'styles/theme'

const queryCache = new QueryCache()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Set location pathname in a ref to not update queryConfig unnecessarily amount of times
  const pathnameRef = React.useRef(router.pathname)
  React.useEffect(() => {
    pathnameRef.current = router.pathname
  }, [router.pathname])

  const handleError: (error: unknown) => Promise<unknown> | void = React.useCallback(
    (error: any) => {
      if (error instanceof Response) {
        if (error.status === 401) {
          console.warn('Error status 401, logout user')
          // TODO: Logout user
          router.push('/login')
          return
        } else if (error.status === 403) {
          console.warn('Error status 403, show "forbiden" message to user')
          alert('Your are forbiden to do this, please conntact IT Support')
          return
        } else if (error.status === 404) {
          console.warn('Error status 404, show "not found" message to user')
          alert('Resource not found, please conntact IT Support')
          return
        }
      }

      console.error(error) // Log error to console for bug tracking

      // TODO: Implement better handling of unknown errors
      alert('Unknown error occured, conntact IT Support')
      return
    },
    [router]
  )

  const queryConfig: ReactQueryConfig = React.useMemo(
    () => ({
      mutations: {
        suspense: false,
        useErrorBoundary: false,
        throwOnError: false,
        onError: (error) => handleError(error),
      },
      shared: { suspense: true },
      queries: {
        retry: false, // Do not retry
        queryFnParamsFilter: (args) => args.slice(1), // Removes the 'key' values for the key-array in all useQuery
        suspense: true,
        useErrorBoundary: true,
        staleTime: 60 * 1000, // Fetched data will be fresh for 1 minute befor becoming stale
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        keepPreviousData: true,
        onError: (error) => handleError(error),
      },
    }),
    [handleError]
  )

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
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryConfigProvider config={queryConfig}>
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
          <ReactQueryDevtools />
        </ReactQueryConfigProvider>
      </ReactQueryCacheProvider>
    </>
  )
}

export default MyApp
