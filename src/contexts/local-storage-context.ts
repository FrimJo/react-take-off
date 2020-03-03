import { buildContext } from 'utilities/build-context'
import React from 'react'

export function useLocalStorageContext(props: { storageKeys: string[] }) {
  const { storageKeys } = props
  const [storedValues, setStoredValues] = React.useState(() => {
    const items = storageKeys.map(k => {
      try {
        const item = window.localStorage.getItem(k)
        return { [k]: item ? JSON.parse(item) : null }
      } catch (error) {
        return null
      }
    })

    return Object.assign({}, ...items)
  })

  const setValue = React.useCallback(
    (key: string, value: any) => {
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
    setStoredValues((prevValues: any) => ({ ...prevValues, [key]: null }))
    window.localStorage.removeItem(key)
  }

  return { state: { storedValues }, actions: { setValue, clearValue } }
}

export const LocalStorageContext = buildContext(useLocalStorageContext, 'LocalStorageContext')
