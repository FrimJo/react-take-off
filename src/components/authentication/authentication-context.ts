import React from 'react'

import { usePromiseManager } from 'utilities/use-promise-manager'
import { createContext } from 'utilities/create-context'

const logInAsync = async () => true

const useAuthentication = () => {
  const [state, manage] = usePromiseManager()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const logOut = () => {
    // Dummy log in call
    manage(
      logInAsync()
        .then(_ => setIsLoggedIn(false))
        .finally(() => Promise.resolve())
    )
  }

  const logIn = () => {
    // Dummy log out call
    manage(
      logInAsync()
        .then(_ => setIsLoggedIn(true))
        .finally(() => Promise.resolve())
    )
  }

  return { state: { ...state, isLoggedIn }, actions: { logIn, logOut } }
}

export const AuthenticationContext = createContext(useAuthentication)
