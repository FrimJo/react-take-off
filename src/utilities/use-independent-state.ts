import * as React from 'react'
import { Dispatch, SetStateAction } from 'react'

/**
 * This hook is similar to React.useState, but is not required as dependecy when
 * used in other hooks, but it will re-render when set.
 */
export function useIndependentState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = React.useState(initialState)
  const latestRef = React.useRef<S>()
  latestRef.current = state

  return [latestRef.current, setState]
}
