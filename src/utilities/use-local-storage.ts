import { useCallback, useMemo } from 'react'
import {
  useLocalStorageState,
  useLocalStorageActions,
  getLocalStorage,
  setLocalStorage,
} from 'contexts/local-storage'

export function getLocalStorageFor<IStorage>(key: string): IStorage | undefined {
  return getLocalStorage()[key] ?? undefined
}

export function clearLocalStorageFor(key: string): void {
  return setLocalStorageFor(key)(null)
}

export const setLocalStorageFor = <IStorage>(key: string) => (
  value: ((prevValue: IStorage | undefined) => IStorage | undefined) | IStorage | undefined
): void => {
  return setLocalStorage((prevStorage) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(prevStorage[key]) : value
    // Save state
    return { ...prevStorage, [key]: valueToStore }
  })
}

export function useLocalStorage<IStorage>(
  key: string
): [
  IStorage | undefined,
  (dataOrUpdater: (IStorage | undefined) | ((prevValue: IStorage | undefined) => IStorage)) => void,
  () => void
]
export function useLocalStorage<IStorage>(
  key: string,
  defaultValue: IStorage
): [
  IStorage,
  (dataOrUpdater: (IStorage | undefined) | ((prevValue: IStorage | undefined) => IStorage)) => void,
  () => void
]
export function useLocalStorage<IStorage>(
  key: string,
  defaultValue?: IStorage
): [
  IStorage | undefined,
  (dataOrUpdater: (IStorage | undefined) | ((prevValue: IStorage | undefined) => IStorage)) => void,
  () => void
] {
  const { storedValues } = useLocalStorageState()
  const { setValue, clearValue } = useLocalStorageActions()
  const value: IStorage | undefined = useMemo(() => storedValues[key] ?? defaultValue, [
    defaultValue,
    key,
    storedValues,
  ])

  const set = useCallback(
    (dataOrUpdater: (IStorage | undefined) | ((prevValue: IStorage | undefined) => IStorage)) => {
      const data = dataOrUpdater instanceof Function ? dataOrUpdater(value) : dataOrUpdater
      setValue(key, data)
    },
    [key, setValue, value]
  )

  const clear = useCallback(() => clearValue(key), [clearValue, key])

  return useMemo(() => [value, set, clear], [clear, set, value])
}
