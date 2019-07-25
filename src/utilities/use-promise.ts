import React from 'react'

export type FetchState = Readonly<{
  isLoading: boolean
  isError: boolean
  error: any
}>

export type FetchAction = Readonly<
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_FAILURE'; payload: string }
>

const fetchDataReducer = (
  state: FetchState,
  action: FetchAction
): FetchState => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: '',
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      }
  }
}

const usePromiseApi = () => {
  const [state, dispatch] = React.useReducer(fetchDataReducer, {
    isLoading: false,
    isError: false,
    error: null,
  })

  const fetchAsync = React.useCallback(
    async <T extends any>(promise: Promise<T>): Promise<T> => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const result = await promise
        dispatch({ type: 'FETCH_SUCCESS' })

        return result
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error })
        return Promise.reject()
      }
    },
    []
  )

  return { state, fetchAsync }
}

export default usePromiseApi
