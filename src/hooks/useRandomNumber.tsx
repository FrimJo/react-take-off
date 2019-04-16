import React from 'react'

enum Type {
  INCREMENT,
  RESET,
  SET,
}

type State = { value: number }

type Action =
  | { type: Type.INCREMENT }
  | { type: Type.RESET }
  | { type: Type.SET; value: number }

type ActionWithChanges = Action & { changes: State }

const localReducer: ReducerFunction<Action> = (state, action): State => {
  switch (action.type) {
    case Type.INCREMENT:
      return { ...state, value: state.value + 1 }
    case Type.RESET:
      return { ...state, value: 0 }
    case Type.SET:
      return { ...state, value: action.value }
  }
}

type ReducerFunction<T extends Action = Action> = React.Reducer<State, T>
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
      const changes = localReducer(state, action)

      return reducer ? reducer(state, { ...action, changes }) : changes
    },
    { value: 0 }
  )

  const increment = () => dispatch({ type: Type.INCREMENT })
  const reset = () => dispatch({ type: Type.RESET })
  const setValue = (value: number) => dispatch({ type: Type.SET, value })

  return { value, increment, reset, setValue }
}

export default useRandomNumber
