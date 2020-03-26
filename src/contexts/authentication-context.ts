import React from 'react'
import { useMutation, queryCache } from 'react-query'
import { buildContext } from 'utilities/build-context'
import { useAuthenticateApi } from 'api/use-authenticate-api'
import { useStoredToken } from 'utilities/use-stored-token'
import { useStoredRegister } from 'utilities/use-stored-register'
import { useUser } from './user-context'

const useAuthentication = () => {
  const storedToken = useStoredToken()
  const loggedInUser = useUser({ id: storedToken.storage?.id })

  const registerStore = useStoredRegister()
  const api = useAuthenticateApi()

  const [loginFromApi, loginState] = useMutation(api.login, { throwOnError: true })
  const [registerFromApi, registerState] = useMutation(api.register, { throwOnError: true })

  const isLoggedIn = React.useMemo(() => storedToken.storage !== null, [storedToken.storage])

  const logout = React.useCallback(() => {
    queryCache.clear()
    storedToken.clear()
  }, [storedToken])

  const login = React.useCallback(
    (credentials: { username: string; password: string }) =>
      loginFromApi({
        email: credentials.username,
        password: credentials.password,
      }).then((tokenData) => {
        if (!registerStore.storage) {
          return Promise.reject('Need to register first.')
        }
        const { id } = registerStore.storage
        return queryCache
          .prefetchQuery(['user', id], (key, id) => api.getLoggedInUser(id))
          .then((user) => {
            storedToken.set({ ...tokenData, id })
            return user
          })
      }),
    [api, loginFromApi, registerStore.storage, storedToken]
  )

  const register = React.useCallback(
    (credentials: { email: string; password: string }) =>
      registerFromApi(credentials).then(({ id }) => registerStore.set({ id })),
    [registerFromApi, registerStore]
  )

  return {
    state: {
      userStatus: loggedInUser.state.status, // Used for verifying if we are fetching a user or already have one outside of PriateRoute
      loginState: { ...loginState, isLoggedIn },
      registerState,
      loggedInUserState: loggedInUser.state,
    },
    actions: {
      login,
      logout,
      register,
      updateLoggedInUser: loggedInUser.actions.update,
      refetchLoggedInUser: loggedInUser.actions.refetch,
      clearLoggedInUser: loggedInUser.actions.clear,
    },
  }
}

const Context = buildContext(useAuthentication, 'AuthenticationContext')

const useLoginState = () => {
  const baseState = Context.useState()
  return baseState.loginState
}

const useRegisterState = () => {
  const baseState = Context.useState()
  return baseState.registerState
}

const useLoggedInUserState = () => {
  const baseState = Context.useState()
  if (baseState.loggedInUserState.user === undefined) {
    throw Error('Logged in user is only accessible within a PrivateRoute')
  }
  return { ...baseState.loggedInUserState, user: baseState.loggedInUserState.user }
}

export const AuthenticationContext = {
  ...Context,
  useLoginState,
  useRegisterState,
  useLoggedInUserState,
}
