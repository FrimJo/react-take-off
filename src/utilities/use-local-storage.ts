import { LocalStorageContext } from 'contexts/local-storage-context'
import React from 'react'

export function useLocalStorage<IStorage>(key: string) {
  const { storedValues } = LocalStorageContext.useState()
  const { setValue, clearValue } = LocalStorageContext.useActions()

  const value: IStorage | null = React.useMemo(() => storedValues[key] ?? null, [key, storedValues])

  const set = React.useCallback(
    (value: IStorage) => {
      try {
        setValue(key, value)
        return Promise.resolve(value)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    [key, setValue]
  )

  const clear = React.useCallback(() => clearValue(key), [clearValue, key])

  return { value, set, clear }
}
