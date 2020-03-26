import React from 'react'
import { AuthenticationContext } from 'contexts/authentication-context'

export const DisplayUserContainer: React.FC = () => {
  const loggedInUserState = AuthenticationContext.useLoggedInUserState()
  return <p>{loggedInUserState.user.firstName}</p>
}
