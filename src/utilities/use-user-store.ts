import { useLocalStorage } from './use-local-storage'
import { User } from 'api/use-user-api'

export const USER_DATA_KEY = 'user_data'

export function useUserStore() {
  return useLocalStorage<User>(USER_DATA_KEY)
}
