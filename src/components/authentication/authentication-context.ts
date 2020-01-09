import React from 'react'

import { usePromiseManager } from 'utilities/use-promise-manager'
import { createContext } from 'utilities/create-context'

const logInAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('resolve')
      resolve(true)
    }, Math.random() * 4000)
  })
}

const useAuthentication = () => {
  const [state, manage] = usePromiseManager()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const logOut = () => {
    // Dummy log in call
    manage(
      logInAsync()
        .then(() => setIsLoggedIn(false))
        .finally(() => Promise.resolve())
    )
  }

  const logIn = () => {
    // Dummy log out call
    manage(
      logInAsync()
        .then(() => setIsLoggedIn(true))
        .finally(() => Promise.resolve())
    )
    manage(
      logInAsync()
        .then(() => setIsLoggedIn(true))
        .finally(() => Promise.resolve())
    )
    manage(
      logInAsync()
        .then(() => setIsLoggedIn(true))
        .finally(() => Promise.resolve())
    )
    setTimeout(
      () =>
        manage(
          logInAsync()
            .then(() => setIsLoggedIn(true))
            .finally(() => Promise.resolve())
        ),
      Math.random() * 4000
    )
    setTimeout(
      () =>
        manage(
          logInAsync()
            .then(() => setIsLoggedIn(true))
            .finally(() => Promise.resolve())
        ),
      Math.random() * 4000
    )
  }

  return { state: { ...state, isLoggedIn }, actions: { logIn, logOut } }
}

export const AuthenticationContext = createContext(useAuthentication)
