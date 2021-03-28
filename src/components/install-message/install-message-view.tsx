import { Transition } from '@headlessui/react'
import React from 'react'
import 'twin.macro'
import { DeviceMobileMediumIcon, PlusAppIcon, ShareIcon, XMediumIcon } from 'assets/icons'
import { Typography } from 'components'
import { useInstallStorage } from './utilities/use-install-storage'

const InstallMessageView: React.FC = () => {
  const { declined, show, setDeclined, setShow } = useInstallStorage()
  const handleClose = React.useCallback(() => setShow(false), [setShow])
  const handleDecline = React.useCallback(() => setDeclined(true), [setDeclined])

  return (
    <Transition
      show={!declined && show}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
      <div tw="fixed z-10 inset-0 overflow-y-auto">
        <div tw="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
          <div
            tw="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline">
            <div tw="block absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                onClick={handleClose}
                tw="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span tw="sr-only">Close</span>

                <XMediumIcon tw="h-6 w-6" />
              </button>
            </div>
            <div tw="sm:flex sm:items-start">
              <div tw="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <DeviceMobileMediumIcon tw="h-6 w-6 text-blue-600" />
              </div>
              <div tw="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 tw="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Add to home screen
                </h3>
                <div tw="mt-2">
                  <Typography variant="body2" tw="text-gray-500">
                    To install this webapp on your device. Tap{' '}
                    <ShareIcon tw="h-6 w-6 color[rgb(0,122,255)] fill-current align-text-bottom inline-block" />{' '}
                    then tap <i>Add to Home Screen</i>{' '}
                    <PlusAppIcon tw="h-6 w-6 color[rgb(0,122,255)] fill-current align-text-bottom inline-block" />
                  </Typography>
                </div>
              </div>
            </div>
            <div tw="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleDecline}
                tw="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                Don't ask again
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default InstallMessageView
