import * as React from 'react'
import {
  useLocalStorageState,
  useLocalStorageActions,
  getLocalStorage,
  setLocalStorage,
} from 'contexts/local-storage-context'

export function getLocalStorageFor<IStorage>(key: string): IStorage | undefined {
  return getLocalStorage()[key] ?? undefined
}

export function clearLocalStorageFor(key: string): void {
  return setLocalStorageForKey(key, null)
}

export function setLocalStorageForKey<IStorage>(
  key: string,
  value: ((prevValue: IStorage) => IStorage) | IStorage
): void {
  return setLocalStorage((prevStorage) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(prevStorage[key]) : value
    // Save state
    return { ...prevStorage, [key]: valueToStore }
  })
}

export function useLocalStorage<IStorage>(key: string, defaultValue?: IStorage) {
  const { storedValues } = useLocalStorageState()
  const { setValue, clearValue } = useLocalStorageActions()
  const defaultRefValue = React.useRef(defaultValue ?? null)
  const value: IStorage = React.useMemo(() => storedValues[key] ?? defaultRefValue.current, [
    key,
    storedValues,
  ])

  const set = React.useCallback(
    (dataOrUpdater: IStorage | ((prevValue: IStorage) => IStorage)) => {
      try {
        const data = dataOrUpdater instanceof Function ? dataOrUpdater(value) : dataOrUpdater
        return setValue(key, data)
      } catch (error) {
        throw error
      }
    },
    [key, setValue, value]
  )

  const clear = React.useCallback(() => clearValue(key), [clearValue, key])

  return React.useMemo(() => ({ value, set, clear }), [clear, set, value])
}
