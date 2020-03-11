import React from 'react'
import { UserContext } from 'contexts/user-context'

export const DisplayUserContainer: React.FC = () => {
  const { user } = UserContext.useState()
  return <p>{user?.firstName}</p>
}
