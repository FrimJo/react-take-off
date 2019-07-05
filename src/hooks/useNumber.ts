import useDraftReducer, { DraftReducer } from 'hooks/useDraftReducer'
import React from 'react'
import { useCallback } from 'react'

export type NumberState = Readonly<{ value: number }>

export type NumberAction = Readonly<
  { type: 'INCREMENT' } | { type: 'RESET' } | { type: 'SET'; value: number }
>

const reducer: React.Reducer<NumberState, NumberAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...prevState, value: prevState.value + 1 }
    case 'RESET':
      return { ...prevState, value: 0 }
    case 'SET':
      return { ...prevState, value: action.value }
  }
}

const useNumber = () => {
  const [state, dispatch] = React.useReducer(reducer, { value: 0 })

  const increment = useCallback(() => dispatch({ type: 'INCREMENT' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])
  const setValue = useCallback(
    (v: number) => dispatch({ type: 'SET', value: v }),
    []
  )

  return { state, increment, reset, setValue }
}

export default useNumber
