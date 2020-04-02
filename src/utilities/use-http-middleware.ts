import { useTokenStorage } from './use-token-storage'
import { navigate } from 'utilities/react-router-hooks'
import { PageRoutes } from 'config/page-routes'
import React from 'react'

export type HTTP = Readonly<{
  fetch(url: RequestInfo, init?: RequestInit): Promise<Response>
}>

export function useHttpMiddleware(initOptions: RequestInit = {}): HTTP {
  const tokenStorage = useTokenStorage()

  return React.useMemo(
    () => ({
      fetch: (url, fetchInit = {}): Promise<Response> => {
        const init = {
          ...initOptions,
          ...fetchInit,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...initOptions.headers,
            ...fetchInit.headers,
            Authorization: `Bearer ${tokenStorage.value?.token}`,
          },
        }
        return window.fetch(url, init).then((response) => {
          if (!response.ok) {
            return Promise.reject(response)
          }
          // If Unauthorized
          if (response.status === 401) {
            tokenStorage.clear()
            navigate(PageRoutes.Unauthorized.path)
            return Promise.reject('Not authorized, redirecting to login page.')
          }
          return Promise.resolve(response)
        })
      },
    }),
    [initOptions, tokenStorage]
  )
}
