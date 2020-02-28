import * as React from 'react'

type Function<S, A, P> = (props: P) => { state: S; actions: A }

export default function buildContext<S, A, P extends object>(
  useHook: Function<S, A, P>,
  identification?: string
) {
  const StateContext = React.createContext<S | undefined>(undefined)
  const ActionsContext = React.createContext<A | undefined>(undefined)

  const Provider: React.SFC<P> = ({ children, ...props }) => {
    const { state, actions } = useHook(props as P)
    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>
      </StateContext.Provider>
    )
  }

  const useState = () => {
    const context = React.useContext(StateContext)
    if (context === undefined) {
      throw Error(`Missing Provider for useState ${identification}`)
    }
    return context
  }

  const useActions = () => {
    const context = React.useContext(ActionsContext)
    if (context === undefined) {
      throw Error(`Missing Provider for useActions ${identification}`)
    }
    return context
  }

  const StateConsumer: React.SFC<{
    children: (state: S) => React.ReactNode
  }> = ({ children }) => {
    return (
      <StateContext.Consumer>
        {state => {
          if (state === undefined) {
            throw Error(`Missing Provider for StateConsumer ${identification}`)
          }
          return children(state)
        }}
      </StateContext.Consumer>
    )
  }
  const ActionsConsumer: React.SFC<{
    children: (actions: A) => React.ReactNode
  }> = ({ children }) => {
    return (
      <ActionsContext.Consumer>
        {actions => {
          if (actions === undefined) {
            throw Error(`Missing Provider for ActionsConsumer ${identification}`)
          }
          return children(actions)
        }}
      </ActionsContext.Consumer>
    )
  }

  return {
    Provider,
    useState,
    useActions,
    StateContext,
    ActionsContext,
    StateConsumer,
    ActionsConsumer,
  }
}
