import React from 'react'

import { AuthenticationContext } from 'components/authentication/authentication-context'

export const DisplayUserContainer: React.FC = () => {
  const { user } = AuthenticationContext.useAuthenticatedState()
  return <p>{user.name}</p>
}
