import React from 'react'
import { useHttpMiddleware } from 'utilities/use-http-middleware'
import { User, mapApiUserToClientUser } from './use-user-api'

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

      return http.fetch(API_BASE_URL + '/api/register', init).then(async (response) => {
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

      return http.fetch(API_BASE_URL + '/api/login', init).then(async (response) => {
        const json = response.json()
        if (response.status === 400) {
          throw await json
        }
        return json
      })
    },
    [http]
  )

  const getLoggedInUser = React.useCallback(
    (id: number): Promise<User> => {
      const init: RequestInit = {
        method: 'GET',
      }
      return http
        .fetch(API_BASE_URL + `/api/users/${id}`, init)
        .then((response) => response.json())
        .then((result) => result.data)
        .then(mapApiUserToClientUser)
    },
    [http]
  )

  return React.useMemo(
    () => ({
      login,
      register,
      getLoggedInUser,
    }),
    [login, register, getLoggedInUser]
  )
}
