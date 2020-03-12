import { useTokenData } from './token-data'
import { navigate } from 'utilities/react-router-hooks'
import { PageRoutes } from 'config/page-routes'
import React from 'react'

export type HTTP = Readonly<{
  fetch(url: RequestInfo, init?: RequestInit): Promise<Response>
}>

export function useHttpMiddleware(initOptions: RequestInit = {}): HTTP {
  const { storage } = useTokenData()

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
            Authorization: `Bearer ${storage?.token}`,
          },
        }
        return window.fetch(url, init).then(result => {
          // If Unauthorized
          if (result.status === 401) {
            navigate(PageRoutes.Unauthorized.path)
          }
          return Promise.resolve(result)
        })
      },
    }),
    [initOptions, storage]
  )
}
