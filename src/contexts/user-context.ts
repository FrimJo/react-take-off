import { useUserApi } from './../api/use-user-api'
import React from 'react'
import { queryCache, useQuery } from 'react-query'
import { buildContext } from 'utilities/build-context'
import { useOptimisticMutation } from 'utilities/use-optimistic-mutation'
import { useTokenData } from 'utilities/token-data'

const useUserContext = () => {
  const tokenData = useTokenData()
  const [isEdit, setIsEdit] = React.useState(false)
  const api = useUserApi()

  console.log('tokenData.storage', tokenData.storage)
  const { data: user, refetch, ...state } = useQuery(
    tokenData.storage !== null && ['user', tokenData.storage.id],
    (key, id) => api.getSingle(id)
  )

  const [update] = useOptimisticMutation('user', api.update)

  const clear = React.useCallback(() => {
    queryCache.setQueryData('user', null)
  }, [])

  return {
    state: { isEdit, state, user },
    actions: { update, refetch, setIsEdit, clear },
  }
}
export const UserContext = buildContext(useUserContext, 'UserContext')
