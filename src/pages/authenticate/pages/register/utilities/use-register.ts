import React from 'react'
import { useStoredRegister } from 'utilities/use-stored-register'
import { useAuthenticateApi } from 'api/use-authenticate-api'
import { useMutation } from 'react-query'

export const useRegister = () => {
  const registerStore = useStoredRegister()
  const api = useAuthenticateApi()
  const [registerFromApi, registerState] = useMutation(api.register, { throwOnError: true })

  const register = React.useCallback(
    (credentials: { email: string; password: string }) =>
      registerFromApi(credentials).then(({ id }) => registerStore.set({ id })),
    [registerFromApi, registerStore]
  )

  return { ...registerState, register }
}
