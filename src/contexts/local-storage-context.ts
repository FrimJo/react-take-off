/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { buildContext } from 'utilities/build-context'

type LocalStorgateType = { [key in string]: any }
const LOCAL_STORAGE_KEY = 'reactTakeOff'

function useLocalStorageContext() {
  const [storedValues, setStoredValues] = React.useState<LocalStorgateType>(() => {
    const itemJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    return itemJSON == null ? {} : JSON.parse(itemJSON)
  })

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

  const clearValue = (key: string) => {
    setStoredValues((prevValues: any) => {
      const values = { ...prevValues }
      delete values[key]
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values))
      return values
    })
  }

  return { state: { storedValues }, actions: { setValue, clearValue } }
}

export const LocalStorageContext = buildContext(useLocalStorageContext, 'LocalStorageContext')
