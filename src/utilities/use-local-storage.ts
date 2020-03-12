import React from 'react'
import { LocalStorageContext } from 'contexts/local-storage-context'

export function useLocalStorage<IStorage>(key: string) {
  const { storedValues } = LocalStorageContext.useState()
  const { setValue, clearValue } = LocalStorageContext.useActions()

  const storage: IStorage | null = React.useMemo(() => storedValues[key] ?? null, [
    key,
    storedValues,
  ])

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

  return { storage, set, clear }
}
