import React from 'react'
import { useMutation, queryCache } from 'react-query'
import { useAuthenticateApi } from 'api/use-authenticate-api'
import { useStoredToken } from 'utilities/use-stored-token'
import { useStoredRegister } from 'utilities/use-stored-register'

export const useAuthentication = () => {
  const storedToken = useStoredToken()
  const registerStore = useStoredRegister()
  const api = useAuthenticateApi()

  const [loginFromApi, { error, status }] = useMutation(api.login, { throwOnError: true })

  const isLoggedIn = React.useMemo(() => storedToken.storage !== null, [storedToken.storage])

  const logout = React.useCallback(() => {
    queryCache.clear()
    storedToken.clear()
  }, [storedToken])

  const login = React.useCallback(
    (credentials: { username: string; password: string }) =>
      loginFromApi({
        email: credentials.username,
        password: credentials.password,
      }).then((tokenData) => {
        if (!registerStore.storage) {
          return Promise.reject('Need to register first.')
        }
        const { id } = registerStore.storage
        return queryCache
          .prefetchQuery(['user', id], (key, id) => api.getLoggedInUser(id))
          .then((user) => {
            storedToken.set({ ...tokenData, id })
            return user
          })
      }),
    [api, loginFromApi, registerStore.storage, storedToken]
  )

  return {
    error,
    status,
    isLoggedIn,
    login,
    logout,
  }
}
