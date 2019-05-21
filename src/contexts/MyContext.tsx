import React, { useCallback, useEffect, useState, useMemo } from 'react'
import * as api from '../services/api'
import useRandomNumber from '../hooks/useRandomNumber'

type State = { isLoading: boolean; value: number }
type Actions = {
  fetchDataAsync: () => void
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}

const StateContext = React.createContext({} as State)
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
    return () => {}
  }, [fetchDataAsync])

  const stateValue: State = useMemo(
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
