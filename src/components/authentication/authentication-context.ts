import React from 'react'
import { useMutation, setQueryData, useQuery } from 'react-query'
import buildContext from 'build-context'
import { api } from 'api/api'

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [authenticateAsync, authenticateMutation] = useMutation(api.authenticateAsync)

  const [updateUserAsync, updateMutation] = useMutation(api.updateUserAsync)
  const userQuery = useQuery(isLoggedIn && 'user', api.getUserAsync, {
    refetchOnWindowFocus: false,
  })

  // Happy case user update
  const updateUser = (user: { id: number; name: string }) => {
    // Set userQuery to new user, and skipp refetch
    setQueryData('user', user, { shouldRefetch: false })

    // Update DB with new user and on success set userQuery with returned user
    updateUserAsync(user, { updateQuery: 'user' }).catch(() => {
      // On fail, reset userQuery to previous value
      setQueryData('user', userQuery.data, { shouldRefetch: false })
    })
  }

  const logOut = React.useCallback(() => setIsLoggedIn(false), [])
  const logIn = React.useCallback(
    (credentials: { username: string; password: string }) =>
      authenticateAsync(credentials).then(token => setIsLoggedIn(true)),
    [authenticateAsync]
  )

  return {
    state: { isLoggedIn, logInMutation: authenticateMutation, userQuery, updateMutation },
    actions: { logIn, logOut, updateUser },
  }
}

export const AuthenticationContext = buildContext(useAuthentication)
