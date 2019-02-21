import React, { useEffect, useState, useCallback, useMemo } from 'react'
import * as api from '../services/api'

const MyContext = React.createContext({} as [
  { isLoading: boolean; value: number },
  { fetchDataAsync: () => void; increment: () => void; reset: () => void; changeValue: (value: number) => void }
])

const MyContextProvider: React.FunctionComponent = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [value, setValue] = useState(0)
  const controller = useMemo(() => new AbortController(), [])

  const fetchDataAsync = useCallback(async () => {
    setLoading(true)
    const { signal } = controller
    const { data, length } = await api.fetchRandomNumberAsync(signal)
    if (length > 0) {
      setValue(data[0])
    }
    setLoading(false)
  }, [])

  const increment = useCallback(() => setValue(value + 1), [value])
  const reset = useCallback(() => setValue(0), [])
  const changeValue = useCallback((value: number) => !isNaN(value) && setValue(value), [])

  useEffect(() => {
    fetchDataAsync()
    return () => controller.abort()
  }, [])

  return <MyContext.Provider value={[{ isLoading, value }, { fetchDataAsync, increment, reset, changeValue }]}>{children}</MyContext.Provider>
}

const MyContextConsumer = MyContext.Consumer

export { MyContext, MyContextProvider, MyContextConsumer }
