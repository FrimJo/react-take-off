import React, { useReducer } from 'react'

type State = { value: number }
type Action = {
  type: 'increment' | 'setValue' | 'clear'
  value?: number
}
const InitialState: State = { value: 0 }
const ContextReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    case 'clear':
      return InitialState
    case 'setValue':
      const { value } = action
      if (!value) return state
      return { ...state, value }
  }
}

type ContextValue = { state: State; dispatch: React.Dispatch<Action> }
const MyContext = React.createContext({} as ContextValue)

const MyContextProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ContextReducer, InitialState)
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

const MyContextConsumer = MyContext.Consumer

export { MyContext, MyContextProvider, MyContextConsumer }
