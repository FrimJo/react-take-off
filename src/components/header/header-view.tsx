import * as React from 'react'
import 'twin.macro'
import RocketIcon from 'assets/icons/rocket.svg'

const HeaderView: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <nav tw="bg-white dark:bg-gray-800  ">
        <div tw="max-w-7xl mx-auto px-8">
          <div tw="flex items-center justify-between h-16">
            <div tw=" flex items-center">
              <a tw="flex-shrink-0" href="/">
                <RocketIcon tw="h-8 w-8" alt="Workflow" />
              </a>
              <div tw="hidden md:block">
                <div tw="ml-10 flex items-baseline space-x-4">
                  <a
                    tw="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/">
                    Home
                  </a>
                  <a
                    tw="text-gray-800 dark:text-white hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/page-wrapper-example-1">
                    Example 1
                  </a>
                  <a
                    tw="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/page-wrapper-example-2">
                    Example 2
                  </a>
                  <a
                    tw="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/page-wrapper-example-3">
                    Example 3
                  </a>
                </div>
              </div>
            </div>
            <div tw="block">
              <div tw="ml-4 flex items-center md:ml-6"></div>
            </div>
            <div tw="-mr-2 flex md:hidden">
              <button
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                tw="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  tw="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {open && (
          <div tw="md:hidden">
            <div tw="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                tw="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/">
                Home
              </a>
              <a
                tw="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/page-wrapper-example-1">
                Example 1
              </a>
              <a
                tw="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/page-wrapper-example-2">
                Example 2
              </a>
              <a
                tw="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/page-wrapper-example-3">
                Example 3
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default HeaderView
