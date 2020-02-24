import React from 'react'
import { useMutation, setQueryData } from 'react-query'

import { api, User } from 'api/api'
import buildContext from 'utilities/build-context'

const useUserContext = () => {
  const [isEdit, setIsEdit] = React.useState(false)
  const [updateUserAsync, userMutation] = useMutation(api.updateUserAsync)

  // Happy case user update
  const updateUser = (updateUser: User) => {
    // Set userQuery to new user, and skip refetch
    setQueryData('user', updateUser, { shouldRefetch: false })

    // Update DB with new user and on success set userQuery with returned user
    return updateUserAsync(updateUser, { updateQuery: 'user' }).catch(() => {
      // On fail, reset userQuery to previous value
      userMutation.reset()
      return setQueryData('user', updateUser, { shouldRefetch: false })
    })
  }
  return { state: { isEdit, userMutation }, actions: { updateUser, setIsEdit } }
}

export const UserContext = buildContext(useUserContext)
