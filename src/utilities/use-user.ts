import * as React from 'react'
import { useQuery, queryCache } from 'react-query'
import useOptimisticMutation from 'use-optimistic-mutation'
import { useUserApi } from 'api/use-user-api'

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

  return { ...state, user, update, refetch, clear }
}
