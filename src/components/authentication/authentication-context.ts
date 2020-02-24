import React from 'react'
import { useQuery, setQueryData, clearQueryCache } from 'react-query'

import buildContext from 'utilities/build-context'
import { api } from 'api/api'

const useAuthentication = () => {
  const userQuery = useQuery('user', api.authenticateAsync, {
    refetchOnWindowFocus: false,
    manual: true,
  })

  const isLoggedIn = React.useMemo(() => !!userQuery.data, [userQuery.data])

  const logOut = React.useCallback(() => {
    setQueryData('user', null, { shouldRefetch: false })
    clearQueryCache()
  }, [])

  const logIn = React.useCallback(
    (credentials: { username: string; password: string }) =>
      userQuery.refetch({ variables: credentials }),
    [userQuery]
  )

  return {
    state: { isLoggedIn, userQuery },
    actions: { logIn, logOut },
  }
}

const Context = buildContext(useAuthentication)

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
