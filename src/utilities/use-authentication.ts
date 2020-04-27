import * as React from 'react'
import { useMutation, queryCache } from 'react-query'
import { useAuthenticateApi } from 'api/use-authenticate-api'
import { useRegisterStorage } from 'utilities/use-register-storage'
import { useTokenStorage } from 'utilities/use-token-storage'

export const useAuthentication = () => {
  const tokenStorage = useTokenStorage()
  const registerStorage = useRegisterStorage()
  const api = useAuthenticateApi()

  const [loginFromApi, { error, status }] = useMutation(api.login, { throwOnError: true })

  const isLoggedIn = React.useMemo(() => tokenStorage.value !== null, [tokenStorage.value])

  const logout = React.useCallback(() => {
    queryCache.clear()
    tokenStorage.clear()
  }, [tokenStorage])

  const login = React.useCallback(
    async (credentials: { username: string; password: string }) => {
      if (!registerStorage.value) {
        throw Error('Need to register first.')
      }
      const { id } = registerStorage.value

      const tokenData = await loginFromApi({
        email: credentials.username,
        password: credentials.password,
      })

      // Prefetch the user before setting loggin token
      const user = await queryCache.prefetchQuery(['user', id], (key, id) =>
        api.getLoggedInUser(id)
      )

      // We have logged in and we have logged in user, proceed to set token
      tokenStorage.set({ ...tokenData, id })
      return user
    },
    [api, loginFromApi, registerStorage.value, tokenStorage]
  )

  return React.useMemo(
    () => ({
      error,
      status,
      isLoggedIn,
      login,
      logout,
    }),
    [error, isLoggedIn, login, logout, status]
  )
}
