import React, { useCallback } from 'react'

enum Type {
  INCREMENT,
  RESET,
  SET,
}

interface IRandomNumberState {
  readonly value: number
}

type Action = Readonly<
  | { type: Type.INCREMENT }
  | { type: Type.RESET }
  | { type: Type.SET; value: number }
>

type ActionWithChanges = Action & { readonly changes: IRandomNumberState }

const localReducer: ReducerFunction<Action> = (
  state,
  action
): IRandomNumberState => {
  switch (action.type) {
    case Type.INCREMENT:
      return { ...state, value: state.value + 1 }
    case Type.RESET:
      return { ...state, value: 0 }
    case Type.SET:
      return { ...state, value: action.value }
  }
}

type ReducerFunction<T extends Action = Action> = React.Reducer<
  IRandomNumberState,
  T
>
type UseRandomNumber = (
  reducer?: ReducerFunction<ActionWithChanges>
) => {
  value: number
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}

const useRandomNumber: UseRandomNumber = reducer => {
  const [{ value }, dispatch] = React.useReducer<ReducerFunction>(
    (state, action) => {
      const updatedState = localReducer(state, action)

      return reducer
        ? reducer(state, { ...action, changes: updatedState })
        : updatedState
    },
    { value: 0 }
  )

  const increment = useCallback(() => dispatch({ type: Type.INCREMENT }), [])
  const reset = useCallback(() => dispatch({ type: Type.RESET }), [])
  const setValue = useCallback(
    (v: number) => dispatch({ type: Type.SET, value: v }),
    []
  )

  return { value, increment, reset, setValue }
}

export default useRandomNumber
