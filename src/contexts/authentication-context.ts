import { UserContext } from 'contexts/user-context'
import React from 'react'
import { queryCache, useMutation } from 'react-query'
import { buildContext } from 'utilities/build-context'
import { api } from 'api/api'
import { useTokenData } from 'utilities/token-data'

const useAuthentication = () => {
  const { getUser, clearUser } = UserContext.useActions()
  const [tokenData, setTokenData, clearTokenData] = useTokenData()
  const [authenticate] = useMutation(api.authenticateAsync)
  const isLoggedIn = React.useMemo(() => !!tokenData, [tokenData])

  const logOut = React.useCallback(() => {
    clearUser()
    queryCache.clear()
    queryCache.getQuery('key')
    clearTokenData()
  }, [clearTokenData, clearUser])

  const logIn = React.useCallback(
    (credentials: { username: string; password: string }) =>
      authenticate(credentials)
        .then(setTokenData)
        .then(() => getUser()),
    [authenticate, getUser, setTokenData]
  )

  return {
    state: { isLoggedIn },
    actions: { logIn, logOut },
  }
}

export const AuthenticationContext = buildContext(useAuthentication, 'AuthenticationContext')
