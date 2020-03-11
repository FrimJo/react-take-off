import { useUserApi } from './../api/use-user-api'
import React from 'react'
import { queryCache, useQuery } from 'react-query'
import { buildContext } from 'utilities/build-context'
import { useOptimisticMutation } from 'utilities/use-optimistic-mutation'

const useUserContext = () => {
  const [isEdit, setIsEdit] = React.useState(false)
  const api = useUserApi()

  const { data: user, refetch, ...status } = useQuery('user', () => api.getSingle(4), {
    manual: true,
    refetchOnWindowFocus: false,
  })
  const [update] = useOptimisticMutation('user', api.update)

  const clear = React.useCallback(() => {
    queryCache.setQueryData('user', null)
  }, [])

  return {
    state: { isEdit, status, user },
    actions: { update, refetch, setIsEdit, clear },
  }
}

export const UserContext = buildContext(useUserContext, 'UserContext')
