import { useUserApi } from '../api/use-user-api'
import React from 'react'
import { queryCache, useQuery } from 'react-query'
import { buildContext } from 'utilities/build-context'
import useOptimisticMutation from 'utilities/use-optimistic-mutation'

export const useUser = (props: { id?: number }) => {
  const { id } = props
  const api = useUserApi()

  const { data: user, refetch, ...state } = useQuery(id !== undefined && ['user', id], (key, id) =>
    api.getSingle(id)
  )

  const [update] = useOptimisticMutation(['user', id], api.update)

  const clear = React.useCallback(() => {
    queryCache.setQueryData('user', null)
  }, [])

  return {
    state: { ...state, user },
    actions: { update, refetch, clear },
  }
}

export const UserContext = buildContext(useUser, 'UserContext')
