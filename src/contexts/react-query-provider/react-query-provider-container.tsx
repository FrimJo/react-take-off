import { useRouter } from 'next/router'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { trackException } from 'utilities/application-insights'

const ReactQueryProvider: React.FC = ({ children }) => {
  const router = useRouter()

  const handleError: (error: unknown) => Promise<void> | void = React.useCallback(
    (error: any) => {
      if (error instanceof Response) {
        if (error.status === 401) {
          console.warn('Error status 401, logout user')
          router.push(`/login?from=${router.pathname}`, 'login')
          return
        } else if (error.status === 403) {
          console.warn('Error status 403, show "forbbiden" message to user')
          alert('You are not allowed to do this, please contact IT Support')
          return
        }
      }

      console.error(error) // Log error to console for bug tracking
      trackException(JSON.stringify(error, null, 2)) // Track error using application insights

      // TODO: Implement better handling of unknown errors
      alert('An unknown error has occured, please contact IT Support')
      return
    },
    [router]
  )

  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            useErrorBoundary: false,
            onError: handleError,
          },
          queries: {
            retry: (failureCount, error: any) => error.status !== 401 && failureCount !== 3,
            suspense: true,
            useErrorBoundary: true,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            keepPreviousData: true,
            onError: handleError,
          },
        },
      }),
    [handleError]
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
