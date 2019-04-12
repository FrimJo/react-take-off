import React from 'react'

enum Type {
  INCREMENT,
  RESET,
  SET,
}

type ReducerState = { value: number }
type ReducerBaseAction = { type: Type; changes?: ReducerState }
type ReducerAction = (
  | { type: Type.INCREMENT }
  | { type: Type.RESET }
  | { type: Type.SET; value: number }) &
  ReducerBaseAction

type ReducerFunction = React.Reducer<ReducerState, ReducerAction>

const randomNumberReducer: ReducerFunction = (state, action): ReducerState => {
  switch (action.type) {
    case Type.INCREMENT:
      return { ...state, value: state.value + 1 }
    case Type.RESET:
      return { ...state, value: 0 }
    case Type.SET:
      return { ...state, value: action.value }
  }
}

type UseRandomNumberHook = (
  reducer?: ReducerFunction
) => {
  value: number
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}

const useRandomNumber: UseRandomNumberHook = (
  reducer = (s, a) => ({ ...s, ...a.changes })
) => {
  const [{ value }, dispatch] = React.useReducer<ReducerFunction>(
    (prevState, action) => {
      const changes = randomNumberReducer(prevState, action)

      return reducer(prevState, { ...action, changes })
    },
    { value: 0 }
  )

  const increment = () => dispatch({ type: Type.INCREMENT })
  const reset = () => dispatch({ type: Type.RESET })
  const setValue = (value: number) => dispatch({ type: Type.SET, value })

  return { value, increment, reset, setValue }
}

export default useRandomNumber
