import React, { useReducer } from 'react'

type State = { value: number; error?: string }
type Action = {
  type: 'increment' | 'setValue' | 'clear'
  value?: number
}

const ContextReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1, error: undefined }
    case 'clear':
      return { ...state, value: 0, error: undefined }
    case 'setValue':
      const { value } = action
      if (!value)
        return {
          ...state,
          error: 'No or invalid value provided to dispatch action "setValue".'
        }
      return { ...state, value: value, error: undefined }
  }
}

type ContextValue = { state: State; dispatch: React.Dispatch<Action> }
export const MyContext = React.createContext({} as ContextValue)

export const MyContextProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ContextReducer, { value: 0 })
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}
