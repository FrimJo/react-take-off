import * as React from 'react'
import { asContext } from 'utilities/as-context'

type LocalStorgateType = { [key in string]: any }
const LOCAL_STORAGE_KEY = 'example-app'

export function getLocalStorage() {
  const itemJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  return itemJSON == null ? {} : JSON.parse(itemJSON)
}

export function setLocalStorage(
  value: ((prevValue: LocalStorgateType) => LocalStorgateType) | LocalStorgateType
): void {
  const prevValues = getLocalStorage()
  // Allow value to be a function so we have same API as useState
  const valueToStore = value instanceof Function ? value(prevValues) : value
  // Save to local storage
  return window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(valueToStore))
}

function useLocalStorageContext() {
  const [storedValues, setStoredValues] = React.useState<LocalStorgateType>(() => getLocalStorage())

  const setValue = React.useCallback(
    function <ValueType>(key: string, value: ((prevValue: ValueType) => ValueType) | ValueType) {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValues[key]) : value

      // Save state
      setStoredValues((prevValues) => {
        const updatedValues = { ...prevValues, [key]: valueToStore }
        // Save to local storage
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedValues))
        return updatedValues
      })
    },
    [storedValues]
  )

  const clearValue = React.useCallback((key: string) => {
    setStoredValues((prevValues: any) => {
      const values = { ...prevValues }
      delete values[key]
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values))
      return values
    })
  }, [])

  return React.useMemo(() => ({ state: { storedValues }, actions: { setValue, clearValue } }), [
    clearValue,
    setValue,
    storedValues,
  ])
}

const LocalStorageContext = asContext(useLocalStorageContext, 'LocalStorageContext')
export const LocalStorageProvider = LocalStorageContext.Provider
export const useLocalStorageActions = LocalStorageContext.useActions
export const useLocalStorageState = LocalStorageContext.useState
