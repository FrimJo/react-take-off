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

const useNumber = (draftReducer?: DraftReducer<NumberState, NumberAction>) => {
  const [state, dispatch] = useDraftReducer(reducer, { value: 0 }, draftReducer)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const increment = useCallback(() => dispatch({ type: 'INCREMENT' }), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])
  const setValue = useCallback(
    (v: number) => dispatch({ type: 'SET', value: v }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { state, increment, reset, setValue }
}

export default useNumber
