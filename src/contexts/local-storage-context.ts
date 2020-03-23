import { buildContext } from 'utilities/build-context'
import React from 'react'

export function useLocalStorageContext() {
  const [storedValues, setStoredValues] = React.useState(() => {
    const items: Array<{ [key in string]: any }> = []

    for (let index = 0; index < window.localStorage.length; index++) {
      const key = window.localStorage.key(index)
      if (key == null) {
        continue
      }
      try {
        const itemJSON = window.localStorage.getItem(key)
        const value = itemJSON == null ? itemJSON : JSON.parse(itemJSON)
        items.push({ [key]: value })
      } catch (error) {
        continue
      }
    }

    console.log('init', items)
    return Object.assign({}, ...items)
  })

  const setValue = React.useCallback(
    (key: string, value: any) => {
      console.log('setValue', key, value)
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValues[key]) : value
      // Save state
      setStoredValues((prevValues: any) => ({ ...prevValues, [key]: value }))
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    },
    [storedValues]
  )

  const clearValue = (key: string) => {
    console.log('clearValue', key)
    setStoredValues((prevValues: any) => ({ ...prevValues, [key]: null }))
    window.localStorage.removeItem(key)
  }

  return { state: { storedValues }, actions: { setValue, clearValue } }
}

export const LocalStorageContext = buildContext(useLocalStorageContext, 'LocalStorageContext')
