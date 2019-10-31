import React from 'react'

import { fetchDataReducer } from './fetch-data-reducer'

type FetchAsync = <T>(promise: Promise<T>) => Promise<T>
export type PromiseState = Readonly<{
  isError: boolean
  isLoading: boolean
  error: any[]
}>

export const usePromiseApi = (): {
  state: PromiseState
  fetchAsync: FetchAsync
} => {
  const [{ count, error }, dispatch] = React.useReducer(fetchDataReducer, {
    error: [],
    count: 0,
  })

  const isLoading = React.useMemo(() => count > 0, [count])
  const isError = React.useMemo(() => error.length > 0, [error.length])

  const fetchAsync: FetchAsync = async promise => {
    dispatch({ type: 'FETCH_INIT' })

    try {
      const result = await promise
      dispatch({ type: 'FETCH_SUCCESS' })

      return result
    } catch (error) {
      // Aborted has error code 20
      if (error instanceof DOMException && error.code === 20) {
        console.error('Request aborted')
        dispatch({ type: 'FETCH_ABORTED' })
      } else {
        dispatch({ type: 'FETCH_FAILURE', payload: error })
      }

      // throw error
      return Promise.reject(error)
    }
  }

  return { state: { isError, isLoading, error }, fetchAsync }
}
