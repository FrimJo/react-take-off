import React from 'react'
import { usePromiseManager } from 'use-promise-manager'
import buildContext from 'build-context'

const logInAsync = () => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
}

const useAuthentication = () => {
  const [state, manage] = usePromiseManager()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const logOut = React.useCallback(() => {
    // Dummy log in call
    manage(logInAsync()).then(() => setIsLoggedIn(false))
  }, [manage])

  const logIn = React.useCallback(() => {
    // Dummy log out call
    manage(logInAsync()).then(() => setIsLoggedIn(true))
  }, [manage])
  return { state: { ...state, isLoggedIn }, actions: { logIn, logOut } }
}

export const AuthenticationContext = buildContext(useAuthentication)
