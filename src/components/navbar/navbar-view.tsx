import { Transition } from '@headlessui/react'
import { signOut } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'
import BellMediumIcon from 'assets/icons/bell-medium.svg'
import MenuMediumIcon from 'assets/icons/menu-medium.svg'
import XMediumIcon from 'assets/icons/x-medium.svg'
import { useClickOutside } from 'utilities'

type NavbarProps = { links: Array<{ title: string; href: string }> }

const NavbarView = (props: React.PropsWithRef<NavbarProps>) => {
  const { links } = props
  const { asPath } = useRouter()
  const ref = React.useRef<HTMLDivElement>(null)

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  useClickOutside(ref, () => setIsProfileDropdownOpen(false))

  return (
    <nav tw="bg-gray-800">
      <div tw="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div tw="flex items-center justify-between h-16">
          <div tw="flex items-center">
            <div tw="flex-shrink-0">
              <img
                tw="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div tw="hidden md:block">
              <div tw="ml-10 flex items-baseline space-x-4">
                {links.map((link, index) => (
                  <Link href={link.href} key={index}>
                    <a
                      css={[
                        asPath === link.href
                          ? tw`bg-gray-900 text-white`
                          : tw`text-gray-300 hover:bg-gray-700 hover:text-white`,
                        tw`px-3 py-2 rounded-md text-sm font-medium cursor-pointer`,
                      ]}>
                      {link.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div tw="hidden md:block">
            <div tw="ml-4 flex items-center md:ml-6">
              <button tw="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span tw="sr-only">View notifications</span>
                <BellMediumIcon tw="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div tw="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                    type="button"
                    tw="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true">
                    <span tw="sr-only">Open user menu</span>
                    <img
                      tw="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=Q9RIahEnX4&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
                <Transition
                  show={isProfileDropdownOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <div
                    ref={ref}
                    tw="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu">
                    <Link href="#">
                      <a
                        tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">
                        Your Profile
                      </a>
                    </Link>

                    <Link href="#">
                      <a
                        tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">
                        Settings
                      </a>
                    </Link>
                    <a
                      tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => signOut({ callbackUrl: 'http://localhost:3000/auth/signin' })}>
                      Sign out
                    </a>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          <div tw="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              tw="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen((prev) => !prev)}>
              <span tw="sr-only">Open main menu</span>
              {isMenuOpen ? <XMediumIcon tw="h-6 w-6" /> : <MenuMediumIcon tw="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div tw="md:hidden" id="mobile-menu">
          <div tw="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            {links.map((link, index) => (
              <Link href={link.href} key={index}>
                <a
                  css={[
                    asPath === link.href
                      ? tw`bg-gray-900 text-white`
                      : tw`text-gray-300 hover:bg-gray-700 hover:text-white`,
                    tw`block px-3 py-2 rounded-md text-base font-medium`,
                  ]}>
                  {link.title}
                </a>
              </Link>
            ))}
          </div>
          <div tw="pt-4 pb-3 border-t border-gray-700">
            <div tw="flex items-center px-5">
              <div tw="flex-shrink-0">
                <img
                  tw="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=Q9RIahEnX4&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div tw="ml-3">
                <div tw="text-base font-medium text-white">Tom Cook</div>
                <div tw="text-sm font-medium text-gray-400">tom@example.com</div>
              </div>
              <button tw="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span tw="sr-only">View notifications</span>
                <BellMediumIcon tw="h-6 w-6" />
              </button>
            </div>
            <div tw="mt-3 px-2 space-y-1">
              <Link href="#">
                <a tw="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                  Your Profile
                </a>
              </Link>

              <Link href="#">
                <a tw="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                  Settings
                </a>
              </Link>

              <Link href="#">
                <a tw="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                  Sign out
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavbarView
