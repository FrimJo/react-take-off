import React from 'react'
import { usePromiseManager } from 'use-promise-manager'
import { useMutation, useIsFetching, setQueryData, useQuery } from 'react-query'
import buildContext from 'build-context'
import { api } from 'api/api'

const useAuthentication = () => {
  const [state, manage] = usePromiseManager()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [updateUserApi] = useMutation(api.updateUserAsync)
  const { data: user } = useQuery('user', api.getUserAsync, {
    initialData: { id: 5, name: 'No name' },
  })

  const updateUser = (user: { id: number; name: string }) => {
    updateUserApi(user, { updateQuery: 'user', waitForRefetchQueries: true })
    setQueryData('user', user)
  }

  const logOut = React.useCallback(() => {
    // Dummy log in call
    manage(api.logOutAsync()).then(() => setIsLoggedIn(false))
  }, [manage])

  const logIn = React.useCallback(() => {
    // Dummy log out call
    manage(api.logInAsync()).then(() => setIsLoggedIn(true))
  }, [manage])

  return { state: { ...state, isLoggedIn, user }, actions: { logIn, logOut, updateUser } }
}

export const AuthenticationContext = buildContext(useAuthentication)
