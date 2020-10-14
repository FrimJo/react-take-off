import { useCallback, useMemo, useState } from 'react'
import { checkForIOS, isInStandaloneMode, useLocalStorage } from 'utilities'

const LOCAL_STORAGE_KEY = 'installMessage'

export function useInstallStorage() {
  const { isSafari } = checkForIOS()
  const canShow = isSafari && !isInStandaloneMode()
  const [show, setShow] = useState(canShow)
  const [{ declined }, set, clearStorage] = useLocalStorage(LOCAL_STORAGE_KEY, {
    declined: false,
  })

  const setDeclined = useCallback((declined: boolean) => set((prev) => ({ ...prev, declined })), [
    set,
  ])

  const clear = useCallback(() => {
    clearStorage()
    setShow(canShow)
  }, [canShow, clearStorage])

  return useMemo(() => ({ declined, show, setDeclined, setShow, clear, canShow }), [
    declined,
    show,
    setDeclined,
    clear,
    canShow,
  ])
}
