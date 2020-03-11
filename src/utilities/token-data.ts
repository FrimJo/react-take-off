import { LocalStorageContext } from 'contexts/local-storage-context'
import React from 'react'

export const TOKEN_DATA_KEY = 'token_data'

export interface ITokenData {
  token: string
}

export function useTokenData() {
  const { storedValues } = LocalStorageContext.useState()
  const { setValue, clearValue } = LocalStorageContext.useActions()

  const tokenData: ITokenData | null = React.useMemo(() => storedValues[TOKEN_DATA_KEY] ?? null, [
    storedValues,
  ])
  const setTokenData = React.useCallback((value: ITokenData) => setValue(TOKEN_DATA_KEY, value), [
    setValue,
  ])
  const clearTokenData = React.useCallback(() => clearValue(TOKEN_DATA_KEY), [clearValue])
  return { tokenData, setTokenData, clearTokenData }
}
