import React from 'react'
import { useQuery, setQueryData, clearQueryCache } from 'react-query'

import buildContext from 'utilities/build-context'
import { api } from 'api/api'

const useAuthentication = () => {
  const userQuery = useQuery('user', api.authenticateAsync, {
    refetchOnWindowFocus: false,
    manual: true,
  })

  const isLoggedIn = React.useMemo(() => !!userQuery.data, [userQuery])

  React.useEffect(() => {
    console.log('useAuthentication isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  const logOut = React.useCallback(() => {
    setQueryData('user', null, { shouldRefetch: false })
    clearQueryCache()
  }, [])

  const logIn = React.useCallback(async (credentials: { username: string; password: string }) => {
    return Promise.resolve()
    // return await userQuery.refetch({ variables: credentials })
  }, [])

  return {
    state: { isLoggedIn, userQuery },
    actions: { logIn, logOut },
  }
}

const Context = buildContext(useAuthentication, 'AuthenticationContext')

const useAuthenticatedState = () => {
  const stateContext = React.useContext(Context.StateContext)

  if (!stateContext?.userQuery.data) {
    throw Error('User is not logged in.')
  }

  return { ...stateContext, user: stateContext.userQuery.data }
}

export const AuthenticationContext = {
  ...Context,
  useAuthenticatedState,
}
