import React, { createContext, useContext, useMemo } from 'react'

type HookFunction<S, A, P> = (props: P) => { state: S; actions: A }

function asContext<S, A, P extends Record<string, unknown>>(
  useHook: HookFunction<S, A, P>,
  identification?: string
) {
  const StateContext = createContext<S | undefined>(undefined)
  const ActionsContext = createContext<A | undefined>(undefined)

  const Provider = ({ children, ...props }: React.PropsWithChildren<P>) => {
    const { state, actions } = useHook(props as P)
    const contextState = useMemo(() => state, [state])
    const contextActions = useMemo(() => actions, [actions])
    return (
      <StateContext.Provider value={contextState}>
        <ActionsContext.Provider value={contextActions}>{children}</ActionsContext.Provider>
      </StateContext.Provider>
    )
  }

  const useState = () => {
    const state = useContext(StateContext)
    if (state === undefined) {
      throw Error(`Missing Provider for useState ${identification}`)
    }
    return state
  }

  const useActions = () => {
    const actions = useContext(ActionsContext)
    if (actions === undefined) {
      throw Error(`Missing Provider for useActions ${identification}`)
    }
    return actions
  }

  const StateConsumer: React.FC<{
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

  const ActionsConsumer: React.FC<{
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

export default asContext
