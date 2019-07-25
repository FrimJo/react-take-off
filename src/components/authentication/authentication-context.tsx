import React from 'react'

import usePromiseApi, { FetchState } from 'utilities/use-promise'

type State = Readonly<{ isLoggedIn: boolean } & FetchState>

type Actions = Readonly<{
  logIn: (username: string, password: string) => Promise<void>
  logOut: () => Promise<void>
}>

const StateContext = React.createContext<State | undefined>(undefined)
const ActionsContext = React.createContext<Actions | undefined>(undefined)

const Provider: React.FunctionComponent = ({ children }) => {
  const { state: stateOfFetch, fetchAsync } = usePromiseApi()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const logOut = React.useCallback(async () => {
    // Dummy log in call
    const logInAsync = new Promise<boolean>(() => true)

    fetchAsync(logInAsync).then(success => success && setIsLoggedIn(true))
  }, [fetchAsync])

  const logIn = React.useCallback(async () => {
    // Dummy log out call
    const logInAsync = new Promise<boolean>(() => true)

    fetchAsync(logInAsync).then(success => success && setIsLoggedIn(false))
  }, [fetchAsync])

  return (
    <StateContext.Provider value={{ ...stateOfFetch, isLoggedIn }}>
      <ActionsContext.Provider value={{ logIn, logOut }}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

const useState = () => {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw Error('Missing AuthenticationProvider for useAuthenticationState')
  }
  return context
}

const useActions = () => {
  const context = React.useContext(ActionsContext)
  if (context === undefined) {
    throw Error('Missing AuthenticationProvider for useAuthenticationActions')
  }
  return context
}

const AuthenticationContext = {
  useState,
  useActions,
  Provider,
}

export default AuthenticationContext
