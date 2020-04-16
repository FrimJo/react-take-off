import * as React from 'react'
import { useLoggedInUser } from 'utilities/use-logged-in-user'

export const DisplayUserContainer: React.FC = () => {
  const { user } = useLoggedInUser()
  return <p>{user.firstName}</p>
}
