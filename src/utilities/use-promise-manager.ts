import React from 'react'
import { useMachine } from '@xstate/react'

import { ManagePromiseMachine, ILightContext } from './manage-promise-machine'

export type PromiseState = Readonly<{
  hasError: boolean
  isResolving: boolean
  error: ILightContext['error']
}>

type ManagePromiseFunction = <T>(promise: Promise<T>, options?: { silent?: boolean }) => Promise<T>

export const usePromiseManager = (): [PromiseState, ManagePromiseFunction] => {
  const [current, send] = useMachine(ManagePromiseMachine)
  const { count, error } = current.context

  const isResolving = React.useMemo(() => count > 0, [count])
  const hasError = React.useMemo(() => error.length > 0, [error.length])

  const manage: ManagePromiseFunction = React.useCallback(
    async (promise, options = {}) => {
      const { silent } = options
      send({ type: 'INIT', silent })
      return promise
        .then(() => {
          send({ type: 'RESOLVE' })
        })
        .catch(error => {
          send({ type: 'REJECT', error })
          return error
        })
    },
    [send]
  )

  return [{ hasError, isResolving, error }, manage]
}
