import { UserContext } from 'contexts/user-context'
import React from 'react'
import { queryCache, useMutation } from 'react-query'
import { buildContext } from 'utilities/build-context'
import { useAuthenticateApi } from 'api/use-authenticate-api'
import { useTokenData } from 'utilities/token-data'

const useAuthentication = () => {
  const userActions = UserContext.useActions()

  const { tokenData, setTokenData, clearTokenData } = useTokenData()

  const api = useAuthenticateApi()

  const [loginFromApi, loginState] = useMutation(api.login, { throwOnError: true })
  const [registerFromApi, registerState] = useMutation(api.register, { throwOnError: true })

  const isLoggedIn = React.useMemo(() => !!tokenData, [tokenData])

  const logout = React.useCallback(() => {
    userActions.clear()
    queryCache.clear()
    queryCache.getQuery('key')
    clearTokenData()
  }, [clearTokenData, userActions])

  const login = React.useCallback(
    (credentials: { username: string; password: string }) =>
      loginFromApi({ email: credentials.username, password: credentials.password })
        .then(setTokenData)
        .then(() => userActions.refetch()),
    [loginFromApi, setTokenData, userActions]
  )

  const register = React.useCallback(
    (credentials: { email: string; password: string }) => registerFromApi(credentials),
    [registerFromApi]
  )

  return {
    state: { isLoggedIn, login: loginState, register: registerState },
    actions: { login, logout, register },
  }
}

export const AuthenticationContext = buildContext(useAuthentication, 'AuthenticationContext')
