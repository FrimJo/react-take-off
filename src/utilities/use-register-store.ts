import { useLocalStorage } from './use-local-storage'

export const REGISTER_DATA_KEY = 'register_data'

interface IRegisterData {
  id: number
}

export function useRegisterStore() {
  return useLocalStorage<IRegisterData>(REGISTER_DATA_KEY)
}
