import React from 'react'

import { managerReducer } from './fetch-data-reducer'

type ManagePromiseFunction = <T>(promise: Promise<T>) => Promise<T>
export type PromiseState = Readonly<{
  hasError: boolean
  isResolving: boolean
  error: any[]
}>

export const usePromiseManager = (): [PromiseState, ManagePromiseFunction] => {
  const [{ count, error }, dispatch] = React.useReducer(managerReducer, {
    error: [],
    count: 0,
  })

  const isResolving = React.useMemo(() => count > 0, [count])
  const hasError = React.useMemo(() => error.length > 0, [error.length])

  const manage: ManagePromiseFunction = async promise => {
    dispatch({ type: 'INIT' })

    try {
      const result = await promise
      dispatch({ type: 'SUCCESS' })

      return result
    } catch (error) {
      // Aborted has error code 20
      if (error instanceof DOMException && error.code === 20) {
        console.error('Request aborted')
        dispatch({ type: 'ABORTED' })
      } else {
        dispatch({ type: 'FAILURE', payload: error })
      }

      // throw error
      return Promise.reject(error)
    }
  }

  return [{ hasError, isResolving, error }, manage]
}
