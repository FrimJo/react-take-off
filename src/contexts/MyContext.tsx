import React, { useCallback, useEffect, useState } from 'react'
import * as api from '../services/api'
import useRandomNumber from '../hooks/useRandomNumber'

type State = { isLoading: boolean; value: number }
type Actions = {
  fetchDataAsync: () => void
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}

const MyContext = React.createContext({} as [State, Actions])

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
  return (
    <MyContext.Provider
      value={[
        { isLoading, value },
        {
          fetchDataAsync,
          increment,
          reset,
          setValue,
        },
      ]}>
      {children}
    </MyContext.Provider>
  )
}

const MyContextConsumer = MyContext.Consumer

export { MyContext, MyContextProvider, MyContextConsumer }
