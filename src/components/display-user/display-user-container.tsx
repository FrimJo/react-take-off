import React from 'react'
import { UserContext } from 'contexts/user-context'

export const DisplayUserContainer: React.FC = () => {
  const { userQuery } = UserContext.useAuthenticatedState()
  return <p>{userQuery.data.name}</p>
}
