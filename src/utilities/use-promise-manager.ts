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
  const { promises, error } = current.context

  const state = React.useMemo(() => ({ hasError: error.length > 0, isResolving: promises.length > 0, error }), [promises, error])

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

  return [state, manage]
}
