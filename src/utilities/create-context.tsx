import React from 'react'

type HookFunction<State, Actions> = () => { state: State; actions: Actions }

export const createContext = <State extends object, Actions extends object>(hookFunction: HookFunction<State, Actions>) => {
  const StateContext = React.createContext<State | undefined>(undefined)
  const ActionsContext = React.createContext<Actions | undefined>(undefined)

  const Provider: React.FC = ({ children }) => {
    const { state, actions } = hookFunction()

    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
      </StateContext.Provider>
    )
  }

  const useState = () => {
    const context = React.useContext(StateContext)
    if (context === undefined) {
      throw Error('Missing Provider for useState')
    }
    return context
  }

  const useActions = () => {
    const context = React.useContext(ActionsContext)
    if (context === undefined) {
      throw Error('Missing Provider for useActions')
    }
    return context
  }
  return { Provider, useState, useActions }
}
