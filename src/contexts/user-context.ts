import React from 'react'
import { queryCache, useQuery } from 'react-query'
import { api, User } from 'api/api'
import { buildContext } from 'utilities/build-context'
import { useOptimisticMutation } from 'utilities/use-optimistic-mutation'

const useUserContext = () => {
  const [isEdit, setIsEdit] = React.useState(false)
  const userQuery = useQuery('user', api.getUserAsync, {
    refetchOnWindowFocus: false,
    manual: true,
  })

  const [updateUserAsync, userMutation] = useOptimisticMutation('user', api.updateUserAsync)

  const getUser = React.useCallback(() => userQuery.refetch(), [userQuery])

  const updateUser = React.useCallback((userToUpdate: User) => updateUserAsync(userToUpdate), [
    updateUserAsync,
  ])

  const clearUser = React.useCallback(() => {
    queryCache.setQueryData('user', null)
  }, [])

  return {
    state: { isEdit, userMutation, userQuery },
    actions: { updateUser, getUser, setIsEdit, clearUser },
  }
}

export const Context = buildContext(useUserContext, 'UserContext')

const useAuthenticatedState = () => {
  const stateContext = React.useContext(Context.StateContext)

  if (!stateContext?.userQuery.data) {
    throw Error('User is not fetched.')
  }

  return {
    ...stateContext,
    userQuery: { ...stateContext.userQuery, data: stateContext.userQuery.data },
  }
}

export const UserContext = {
  ...Context,
  useAuthenticatedState,
}
