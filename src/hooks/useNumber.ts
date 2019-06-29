import { useCallback } from 'react'
import useDraftReducer, { DraftReducer } from 'use-draft-reducer'

type NumberState = Readonly<{ value: number }>

type NumberAction = Readonly<
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
  const [{ value }, dispatch] = useDraftReducer(
    reducer,
    { value: 0 },
    draftReducer
  )

  const increment = useCallback(() => dispatch({ type: 'INCREMENT' }), [
    dispatch,
  ])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [dispatch])
  const setValue = useCallback(
    (v: number) => dispatch({ type: 'SET', value: v }),
    [dispatch]
  )

  return { value: value, increment, reset, setValue }
}

export default useNumber
