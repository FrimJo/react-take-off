import React, { useReducer, useEffect, useState, useCallback, useMemo } from 'react'

const InitialState = { value: 0 }
type State = Readonly<typeof InitialState>

type Action = { type: 'increment' } | { type: 'clear' } | { type: 'fetch' } | { type: 'setValue'; value: number }

const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    case 'clear':
      return InitialState
    case 'setValue':
      return { ...state, value: action.value }
    default:
      return state
  }
}

const MyContext = React.createContext({} as [State, React.Dispatch<Action>])

type Payload = Readonly<{ type: string; length: number; data: Array<number>; success: boolean }>

const MyContextProvider: React.FunctionComponent = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(Reducer, InitialState)
  const controller = useMemo(() => new AbortController(), [])

  const fetchDataAsync = useCallback(async () => {
    setLoading(true)
    const { signal } = controller
    const { data, length } = (await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8', { signal }).then(response => response.json())) as Payload
    if (length === 0) return
    dispatch({
      type: 'setValue',
      value: data[0]
    })
    setLoading(false)
  }, [controller, dispatch, setLoading])

  useEffect(() => {
    fetchDataAsync()
    return () => controller.abort()
  }, [fetchDataAsync, controller])

  const customDispatch = useCallback(
    (action: Action) => {
      switch (action.type) {
        case 'fetch':
          fetchDataAsync()
          break
        default:
          dispatch(action)
          break
      }
    },
    [fetchDataAsync, dispatch]
  )
  return isLoading ? <>is loading</> : <MyContext.Provider value={[state, customDispatch]}>{children}</MyContext.Provider>
}

const MyContextConsumer = MyContext.Consumer

export { MyContext, MyContextProvider, MyContextConsumer }
