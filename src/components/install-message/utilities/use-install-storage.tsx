import React from 'react'
import { checkForIOS, isInStandaloneMode, useLocalStorage } from 'utilities'

const LOCAL_STORAGE_KEY = 'installMessage'

export function useInstallStorage() {
  const canShow = checkForIOS().isIOS && !isInStandaloneMode()

  const [show, setShow] = React.useState(() => canShow)

  const [{ declined }, set, clearStorage] = useLocalStorage(LOCAL_STORAGE_KEY, {
    declined: false,
  })

  const setDeclined = React.useCallback(
    (declined: boolean) => set((prev) => ({ ...prev, declined })),
    [set]
  )

  const clear = React.useCallback(() => {
    clearStorage()
    setShow(canShow)
  }, [clearStorage, canShow])

  return React.useMemo(() => ({ declined, show, setDeclined, setShow, clear, canShow }), [
    declined,
    show,
    setDeclined,
    clear,
    canShow,
  ])
}
