import React from 'react'
import { usePromiseManager } from 'use-promise-manager'
import { useMutation, useIsFetching, setQueryData, useQuery } from 'react-query'
import buildContext from 'build-context'
import { api } from 'api/api'

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [logOutApi, logOutMutation] = useMutation(api.logOutAsync)
  const [logInApi, logInMutation] = useMutation(api.logInAsync)

  const [updateUserApi, userMutation] = useMutation(api.updateUserAsync)
  const userQuery = useQuery(isLoggedIn && 'user', api.getUserAsync, {
    initialData: { id: 5, name: 'Initial data' },
  })

  const updateUser = (user: { id: number; name: string }) => {
    updateUserApi(user, { updateQuery: 'user', waitForRefetchQueries: true })
    setQueryData('user', user)
  }

  const logOut = React.useCallback(() => {
    // Dummy log in call
    logOutApi().then(() => setIsLoggedIn(false))
  }, [logOutApi])

  const logIn = React.useCallback(() => {
    // Dummy log out call
    logInApi().then(() => setIsLoggedIn(true))
  }, [logInApi])

  return {
    state: { isLoggedIn, logOutMutation, logInMutation, userMutation, userQuery },
    actions: { logIn, logOut, updateUser },
  }
}

export const AuthenticationContext = buildContext(useAuthentication)
