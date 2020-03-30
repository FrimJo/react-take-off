import { useLocalStorage } from './use-local-storage'

export const TOKEN_DATA_KEY = 'token_data'

export interface ITokenData {
  token: string
  id: number
}

export function useTokenStorage() {
  return useLocalStorage<ITokenData>(TOKEN_DATA_KEY)
}