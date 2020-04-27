import * as React from 'react'
import { useQuery, queryCache, BaseQueryOptions } from 'react-query'
import useOptimisticMutation from 'use-optimistic-mutation'
import { useUserApi } from 'api/use-user-api'

export const useUser = (id?: number, config?: BaseQueryOptions) => {
  const api = useUserApi()

  const queryKey: ['user', number] | undefined = React.useMemo(
    () => (id === undefined ? undefined : ['user', id]),
    [id]
  )

  const { data: user, refetch, ...state } = useQuery(queryKey, (_, id) => api.getSingle(id), config)

  const [update] = useOptimisticMutation(queryKey, api.update)

  const clear = React.useCallback(() => {
    queryCache.setQueryData('user', null)
  }, [])

  return React.useMemo(() => ({ ...state, user, update, refetch, clear }), [
    clear,
    refetch,
    state,
    update,
    user,
  ])
}
