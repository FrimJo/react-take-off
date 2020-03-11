import { useHttpMiddleware } from 'utilities/use-http-middleware'
import React from 'react'

const API_BASE_URL = 'https://reqres.in'

export const useAuthenticateApi = () => {
  const initOptions: RequestInit = React.useMemo(() => ({}), [])
  const http = useHttpMiddleware(initOptions)

  const register = React.useCallback(
    (credentials: { email: string; password: string }): Promise<{ id: number; token: string }> => {
      const content_ = JSON.stringify(credentials)

      const init: RequestInit = {
        body: content_,
        method: 'POST',
      }

      return http.fetch(API_BASE_URL + '/api/register', init).then(async response => {
        const json = response.json()
        if (response.status === 400) {
          throw await json
        }
        return json
      })
    },
    [http]
  )

  const login = React.useCallback(
    (credentials: { email: string; password: string }): Promise<{ token: string }> => {
      const content_ = JSON.stringify(credentials)

      const init: RequestInit = {
        body: content_,
        method: 'POST',
      }

      return http.fetch(API_BASE_URL + '/api/login', init).then(async response => {
        const json = response.json()
        if (response.status === 400) {
          throw await json
        }
        return json
      })
    },
    [http]
  )

  return React.useMemo(
    () => ({
      login,
      register,
    }),
    [login, register]
  )
}
