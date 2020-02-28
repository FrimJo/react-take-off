import React from 'react'

import { AuthenticationContext } from 'contexts/authentication-context'

export const DisplayUserContainer: React.FC = () => {
  const { user } = AuthenticationContext.useAuthenticatedState()
  return <p>{user.name}</p>
}
