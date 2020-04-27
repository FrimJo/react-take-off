import * as React from 'react'
import { BaseQueryOptions } from 'react-query/types'
import { useTokenStorage } from './use-token-storage'
import { useUser } from './use-user'

export const useLoggedInUser = (config?: BaseQueryOptions) => {
  const tokenStorage = useTokenStorage()
  if (tokenStorage.value === null) {
    throw Error('Need to be logged in to use useLoggedInUser hook')
  }

  const loggedInUser = useUser(tokenStorage.value.id, config)
  const { user } = loggedInUser
  if (user === undefined) {
    throw Error('Logged in user is only accessible within a <PrivateRoute> component')
  }
  return React.useMemo(
    () => ({
      ...loggedInUser,
      user,
    }),
    [loggedInUser, user]
  )
}
