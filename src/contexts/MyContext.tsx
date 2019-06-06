import useAxiosSuspense from 'hooks/useAxiosSuspense'
import React, { useEffect, useMemo } from 'react'
import useNumber from '../hooks/useNumber'
import * as api from '../services/api'

interface IState {
  readonly value: number
}
type Actions = Readonly<{
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}>

const StateContext = React.createContext({} as IState)
const ActionsContext = React.createContext({} as Actions)

const MyContextProvider: React.FunctionComponent = ({ children }) => {
  const { value, increment, reset, setValue } = useNumber(
    (currentState, action) => action.changes
  )

  const [data] = useAxiosSuspense<api.Payload>(
    'https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8'
  )
  console.log('data', data)

  useEffect(() => {
    if (data.data.length > 0) {
      setValue(data.data[0])
    }
  }, [data, setValue])

  const stateValue: IState = useMemo(
    () => ({
      value,
    }),
    [value]
  )

  const actionValue: Actions = useMemo(
    () => ({
      increment,
      reset,
      setValue,
    }),
    [increment, reset, setValue]
  )
  return (
    <StateContext.Provider value={stateValue}>
      <ActionsContext.Provider value={actionValue}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

export { StateContext, ActionsContext, MyContextProvider }
