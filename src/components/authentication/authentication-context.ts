import React from 'react'

import usePromiseApi from 'utilities/use-promise'
import { createContext } from 'utilities/create-context'

const logInAsync = async () => true

const useAuthentication = () => {
  const { state: stateOfFetch, fetchAsync } = usePromiseApi()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const logOut = () => {
    // Dummy log in call
    fetchAsync(
      logInAsync()
        .then(_ => setIsLoggedIn(false))
        .finally(() => Promise.resolve())
    )
  }

  const logIn = () => {
    // Dummy log out call
    fetchAsync(
      logInAsync()
        .then(_ => setIsLoggedIn(true))
        .finally(() => Promise.resolve())
    )
  }

  return { state: { ...stateOfFetch, isLoggedIn }, actions: { logIn, logOut } }
}

export const AuthenticationContext = createContext(useAuthentication)
