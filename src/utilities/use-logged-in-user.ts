import { useTokenStorage } from './use-token-storage'
import { useUser } from './use-user'

export const useLoggedInUser = () => {
  const tokenStorage = useTokenStorage()
  if (tokenStorage.value === null) {
    throw Error('Need to be logged in to use useLoggedInUser hook')
  }

  const loggedInUser = useUser({ id: tokenStorage.value.id })
  if (loggedInUser.user === undefined) {
    throw Error('Logged in user is only accessible within a <PrivateRoute> component')
  }
  return {
    ...loggedInUser,
    user: loggedInUser.user,
  }
}
