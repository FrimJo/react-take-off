import * as React from 'react'
import * as serviceWorker from 'serviceWorker'
import { asContext } from 'utilities/as-context'

window.addEventListener('error', async (err) => {
  // Since we are handling the error here, we must make
  // sure we log it into the console nonetheless, otherwise
  // it will be very difficult to understand why your app
  // is crashing.
  console.error(err)

  // If no service worker is available, our work ends here
  // because we don't need to unregister the service worker
  // to make sure the user is able to get a newer version of
  // our application.
  if (!navigator.serviceWorker) {
    return
  }

  // On development builds of React, error boundaries don't stop
  // errors from bubbling up to the window error handler, so we don't
  // want to execute this code here because it would be unreliable
  // https://github.com/facebook/react/issues/12897#issuecomment-410036991
  if (process.env.NODE_ENV !== 'development') {
    // We want to run this code only if we detect a new service worker
    // is getting installed or is installed but waiting to be activated.
    // This will make sure we don't run this code on a sane environment
    // that is crashing for an error not related to stale app cache.
    const registration = await navigator.serviceWorker.ready
    if (registration.installing || registration.waiting) {
      navigator.serviceWorker.ready.then(async (registration) => {
        await registration.unregister()
        // Once the service worker is unregistered, we can reload
        // the page to let the browser download a fresh copy of our app
        window.location.reload()
      })
    }
  }
})

function useServiceWorker() {
  const [waitingWorker, setWaitingWorker] = React.useState<ServiceWorker | null>(null)
  const [showReload, setShowReload] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onServiceWorkerUpdate(registration: ServiceWorkerRegistration) {
      setWaitingWorker(registration.waiting)
      setShowReload(true)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onServiceWorkerWaiting(waiting: ServiceWorker) {
      setWaitingWorker(waiting)
      setShowReload(true)
    }
    // TODO: Toggle below line to register service worker, and remove unregsiter call
    //serviceWorker.register({ onUpdate: onServiceWorkerUpdate, onWaiting: onServiceWorkerWaiting })
    serviceWorker.unregister()
  }, [])

  React.useEffect(() => {
    // We setup an event listener to automatically reload the page
    // after the Service Worker has been updated, this will trigger
    // on all the open tabs of our application, so that we don't leave
    // any tab in an incosistent state
    waitingWorker?.addEventListener('statechange', (event) => {
      if ((event.target as any).state === 'activated') {
        window.location.reload()
      }
    })
  }, [waitingWorker])

  const updateServiceWorker = React.useCallback(() => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
  }, [waitingWorker])

  return React.useMemo(
    () => ({
      state: { newVersionAvailable: showReload, newVersionInstalled: false, waitingWorker },
      actions: { updateServiceWorker },
    }),
    [showReload, updateServiceWorker, waitingWorker]
  )
}

const ServiceWorkerContext = asContext(useServiceWorker, 'ServiceWorkerContext')
export default ServiceWorkerContext
