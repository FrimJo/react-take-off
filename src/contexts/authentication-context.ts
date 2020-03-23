import React from 'react'
import { queryCache, useMutation } from 'react-query'
import { buildContext } from 'utilities/build-context'
import { useAuthenticateApi } from 'api/use-authenticate-api'
import { useTokenData } from 'utilities/token-data'
import { useRegisterStore } from 'utilities/use-register-store'

const useAuthentication = () => {
  const token = useTokenData()
  const registerStore = useRegisterStore()
  const api = useAuthenticateApi()

  const [loginFromApi, loginState] = useMutation(api.login, { throwOnError: true })
  const [registerFromApi, registerState] = useMutation(api.register, { throwOnError: true })

  const isLoggedIn = React.useMemo(() => !!token.storage, [token.storage])

  const logout = React.useCallback(() => {
    queryCache.clear()
    token.clear()
  }, [token])

  const login = React.useCallback(
    (credentials: { username: string; password: string }) =>
      loginFromApi({
        email: credentials.username,
        password: credentials.password,
      }).then((tokenData) => {
        console.log('registerStore.storage', registerStore.storage)
        if (!registerStore.storage) {
          return Promise.reject('Need to register first.')
        }
        const { id: userId } = registerStore.storage
        return queryCache
          .prefetchQuery(['user', userId], (key, id) => api.getLoggedInUser(id))
          .then((user) => {
            token.set({ ...tokenData, id: userId })
            return user
          })
      }),
    [api, loginFromApi, registerStore.storage, token]
  )

  const register = React.useCallback(
    (credentials: { email: string; password: string }) =>
      registerFromApi(credentials).then(({ id }) => registerStore.set({ id })),
    [registerFromApi, registerStore]
  )

  return {
    state: { isLoggedIn, login: loginState, register: registerState },
    actions: { login, logout, register },
  }
}

const Context = buildContext(useAuthentication, 'AuthenticationContext')

const useAuthenticatedState = () => {
  return React.useContext(Context.StateContext)
  // const state = React.useContext(Context.StateContext)
  // if (state === undefined) {
  //   throw Error('Missing AuthenticationProvider for useAuthenticationState')
  // }

  // if (!state.isLoggedIn) {
  //   throw Error('User not logged in')
  // }

  // if (!state.loggedInUser) {
  //   throw Error('Missing user id in AuthenticationContext.provider')
  // }

  // return {
  //   ...state,
  //   loggedInUser: state.loggedInUser,
  // }
}

export const AuthenticationContext = { ...Context, useAuthenticatedState }
