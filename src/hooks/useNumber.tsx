import { DraftReducer } from 'components/types'
import React, { useCallback } from 'react'

type NumberState = Readonly<{ value: number }>

type NumberAction = Readonly<
  { type: 'INCREMENT' } | { type: 'RESET' } | { type: 'SET'; value: number }
>

const reducer: React.Reducer<NumberState, NumberAction> = (
  prevState,
  action
): NumberState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...prevState, value: prevState.value + 1 }
    case 'RESET':
      return { ...prevState, value: 0 }
    case 'SET':
      return { ...prevState, value: action.value }
  }
}

const useNumber = (draftReducer?: DraftReducer<NumberState, NumberAction>) => {
  const [{ value }, dispatch] = React.useReducer<
    React.Reducer<NumberState, NumberAction>
  >(
    (prevState, action) => {
      const draft = reducer(prevState, action)
      return draftReducer
        ? draftReducer(prevState, { ...action, draft })
        : draft
    },
    { value: 0 }
  )

  const increment = useCallback(() => dispatch({ type: 'INCREMENT' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])
  const setValue = useCallback(
    (v: number) => dispatch({ type: 'SET', value: v }),
    []
  )

  return { value, increment, reset, setValue }
}

export default useNumber
