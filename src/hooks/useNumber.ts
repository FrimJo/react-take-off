import useDraftReducer from 'hooks/useDraftReducer'
import { useCallback } from 'react'
import { DraftReducer } from 'types'

type NumberState = Readonly<{ value: number }>

type NumberAction = Readonly<
  { type: 'INCREMENT' } | { type: 'RESET' } | { type: 'SET'; value: number }
>

const reducer = (
  prevState: NumberState,
  action: NumberAction
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

  const [{value}, dispatch] = useDraftReducer(reducer, {value:0}, draftReducer)

  const increment = useCallback(() => dispatch({ type: 'INCREMENT' }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])
  const setValue = useCallback(
    (v: number) => dispatch({ type: 'SET', value: v }),
    []
  )

  return { value, increment, reset, setValue }
}

export default useNumber
