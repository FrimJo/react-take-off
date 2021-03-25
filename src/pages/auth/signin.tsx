import { GetServerSideProps, NextPage } from 'next'
import { providers, signIn, getSession } from 'next-auth/client'
import { AppProvider } from 'next-auth/providers'
import { useRouter } from 'next/router'
import * as React from 'react'
import 'twin.macro'

const Signin: NextPage<{ providers: Record<string, AppProvider> }> = ({ providers }) => {
  const { query } = useRouter()
  return (
    <div tw="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div tw="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          tw="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 tw="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div tw="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div tw="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form tw="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" tw="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div tw="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled
                  required
                  tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" tw="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div tw="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  disabled
                  required
                  tw="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div tw="flex items-center justify-between">
              <div tw="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  disabled
                  type="checkbox"
                  tw="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" tw="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div tw="text-sm">
                <a href="#" tw="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled
                tw="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>

          <div tw="mt-6">
            <div tw="relative">
              <div tw="absolute inset-0 flex items-center">
                <div tw="w-full border-t border-gray-300"></div>
              </div>
              <div tw="relative flex justify-center text-sm">
                <span tw="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div tw="mt-6 grid grid-cols-3 gap-3">
              {Object.values(providers).map((provider) => (
                <div key={provider.id ?? provider.name}>
                  <div
                    tw="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: query.from
                          ? `http://localhost:3000${query.from}`
                          : 'http://localhost:3000',
                      })
                    }>
                    <span tw="sr-only">Sign in with Facebook</span>
                    <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context
  const session = await getSession(context)
  console.log('signin getServerSideProps')
  if (session !== null) {
    res.writeHead(301, { Location: `/` })
    res.end()
  }

  return {
    props: {
      providers: await providers(),
    },
  }
}

export default Signin
