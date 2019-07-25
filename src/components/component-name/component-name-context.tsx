import React from 'react'

type ComponentNameState = Readonly<{}>

type ComponentNameActions = Readonly<{}>

const StateContext = React.createContext<ComponentNameState | undefined>(
  undefined
)
const ActionsContext = React.createContext<ComponentNameActions | undefined>(
  undefined
)

const ComponentNameProvider: React.FunctionComponent = ({ children }) => {
  return (
    <StateContext.Provider value={{}}>
      <ActionsContext.Provider value={{}}>{children}</ActionsContext.Provider>
    </StateContext.Provider>
  )
}

const useComponentNameState = () => {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw Error(
      'useComponentNameState needs to be wrapped in a ComponentNameProvider'
    )
  }
  return context
}

const useComponentNameActions = () => {
  const context = React.useContext(ActionsContext)
  if (context === undefined) {
    throw Error(
      'useComponentNameActions needs to be wrapped in a ComponentNameProvider'
    )
  }
  return context
}

export default {
  useComponentNameState,
  useComponentNameActions,
  ComponentNameProvider,
}
