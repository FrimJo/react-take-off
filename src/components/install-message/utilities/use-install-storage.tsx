import * as React from 'react'
import { isInStandaloneMode } from 'utilities/is-in-standalone-mode'
import { isIos } from 'utilities/is-ios'
import { useLocalStorage } from 'utilities/use-local-storage'
import { useStaticCallback } from 'utilities/use-static-callback'

const LOCAL_STORAGE_KEY = 'installMessage'

export function useInstallStorage() {
  const canShow = React.useMemo(() => isIos() && !isInStandaloneMode(), [])
  const [show, setShow] = React.useState(canShow)
  const {
    set,
    value: { declined },
    clear: clearStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY, {
    declined: false,
  })

  const setDeclined = React.useCallback(
    (declined: boolean) => set((prev) => ({ ...prev, declined })),
    [set]
  )

  const clear = useStaticCallback(() => {
    clearStorage()
    setShow(canShow)
  })

  return React.useMemo(() => ({ declined, show, setDeclined, setShow, clear, canShow }), [
    canShow,
    clear,
    declined,
    setDeclined,
    show,
  ])
}
