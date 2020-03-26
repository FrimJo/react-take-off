import * as React from 'react'

type HookFunction<S, A, P> = (props: P) => { state: S; actions: A }

export function buildContext<S, A, P extends object>(
  useHook: HookFunction<S, A, P>,
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
    const state = React.useContext(StateContext)
    if (state === undefined) {
      throw Error(`Missing Provider for useState ${identification}`)
    }
    return state
  }

  const useActions = () => {
    const actions = React.useContext(ActionsContext)
    if (actions === undefined) {
      throw Error(`Missing Provider for useActions ${identification}`)
    }
    return actions
  }

  const StateConsumer: React.SFC<{
    children: (state: S) => React.ReactNode
  }> = ({ children }) => {
    return (
      <StateContext.Consumer>
        {(state) => {
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
        {(actions) => {
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
