import { useCallback, useMemo, useRef, useState } from 'react'
import asContext from 'utilities/as-context'

type LocalStorgateType = { [key in string]: any }
const LOCAL_STORAGE_KEY = 'nextjs-example-app'

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

function useLocalStorage() {
  const [storedValues, setStoredValues] = useState<LocalStorgateType>(getLocalStorage())

  const setValue = useCallback(
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

  const clearValue = useCallback((key: string) => {
    setStoredValues((prevValues: any) => {
      const values = { ...prevValues }
      delete values[key]
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values))
      return values
    })
  }, [])

  const clearValueRef = useRef(clearValue)
  const setValueRef = useRef(setValue)

  return useMemo(
    () => ({
      state: { storedValues },
      actions: { setValue: setValueRef.current, clearValue: clearValueRef.current },
    }),
    [storedValues]
  )
}

const LocalStorageContext = asContext(useLocalStorage, 'LocalStorageContext')
const LocalStorageProvider = LocalStorageContext.Provider

export const useLocalStorageActions = LocalStorageContext.useActions
export const useLocalStorageState = LocalStorageContext.useState
export default LocalStorageProvider
