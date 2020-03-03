import { LocalStorageContext } from 'contexts/local-storage-context'
import React from 'react'

export const TOKEN_DATA_KEY = 'token_data'

export function useTokenData() {
  const { storedValues } = LocalStorageContext.useState()
  const { setValue, clearValue } = LocalStorageContext.useActions()
  const tokenData = React.useMemo(() => storedValues[TOKEN_DATA_KEY], [storedValues])
  const setTokenData = (value: { token: string }) => setValue(TOKEN_DATA_KEY, value)
  const clearTokenData = (value: { token: string }) => clearValue(TOKEN_DATA_KEY)
  return [tokenData, setTokenData, clearTokenData]
}
