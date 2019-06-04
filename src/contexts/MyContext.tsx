import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useRandomNumber from '../hooks/useRandomNumber'
import * as api from '../services/api'

interface IState {
  readonly isLoading: boolean
  readonly value: number
}
type Actions = Readonly<{
  fetchDataAsync: () => void
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}>

const StateContext = React.createContext({} as IState)
const ActionsContext = React.createContext({} as Actions)

const MyContextProvider: React.FunctionComponent = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const { value, increment, reset, setValue } = useRandomNumber(
    (currentState, action) => action.changes
  )

  const fetchDataAsync = useCallback(async () => {
    setLoading(true)
    const { data, length } = await api.fetchRandomNumberAsync()
    if (length > 0) {
      setValue(data[0])
    }
    setLoading(false)
  }, [setValue])

  useEffect(() => {
    fetchDataAsync()
  }, [fetchDataAsync])

  const stateValue: IState = useMemo(
    () => ({
      isLoading,
      value,
    }),
    [isLoading, value]
  )

  const actionValue: Actions = useMemo(
    () => ({
      fetchDataAsync,
      increment,
      reset,
      setValue,
    }),
    [fetchDataAsync, increment, reset, setValue]
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
