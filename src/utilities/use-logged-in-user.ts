import { useStoredToken } from './use-stored-token'
import { useUser } from './use-user'

export const useLoggedInUser = () => {
  const storedToken = useStoredToken()
  const loggedInUser = useUser({ id: storedToken.storage?.id })
  if (loggedInUser.user === undefined) {
    throw Error('Logged in user is only accessible within a PrivateRoute')
  }
  return {
    ...loggedInUser,
    user: loggedInUser.user,
  }
}
