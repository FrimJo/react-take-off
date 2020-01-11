import React from 'react'
import { useMachine } from '@xstate/react'

import { ManagePromiseMachine, IContext } from './manage-promise-machine'

export type PromiseState = Readonly<{
  hasError: boolean
  isResolving: boolean
  error: IContext['error']
}>

type ManagePromiseFunction = <T>(promise: Promise<T>) => Promise<T>

export const usePromiseManager = (): [PromiseState, ManagePromiseFunction] => {
  const [current, send] = useMachine(ManagePromiseMachine)
  const { error } = current.context

  const state = React.useMemo(() => ({ hasError: error.length > 0, isResolving: current.matches('pending'), error }), [error, current])

  const manage: ManagePromiseFunction = React.useCallback(
    async promise => {
      send({ type: 'INIT' })
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
