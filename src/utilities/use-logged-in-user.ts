import { useTokenStorage } from './use-token-storage'
import { useUser } from './use-user'

export const useLoggedInUser = () => {
  const tokenStorage = useTokenStorage()
  const loggedInUser = useUser({ id: tokenStorage.value?.id })
  if (loggedInUser.user === undefined) {
    throw Error('Logged in user is only accessible within a PrivateRoute')
  }
  return {
    ...loggedInUser,
    user: loggedInUser.user,
  }
}
