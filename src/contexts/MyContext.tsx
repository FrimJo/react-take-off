import React, { useCallback, useEffect, useMemo, useState } from 'react'
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

    const actions = {
        fetchDataAsync,
        increment: useCallback(() => setValue(value + 1), [value]),
        reset: useCallback(() => setValue(0), []),
        changeValue: useCallback((value: number) => !isNaN(value) && setValue(value), []),
    }

    const state = { isLoading, value }

    useEffect(() => {
        fetchDataAsync()
        return () => controller.abort()
    }, [])

    return <MyContext.Provider value={[state, actions]}>{children}</MyContext.Provider>
}

const MyContextConsumer = MyContext.Consumer

export { MyContext, MyContextProvider, MyContextConsumer }
