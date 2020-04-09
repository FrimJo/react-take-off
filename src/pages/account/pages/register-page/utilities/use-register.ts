import { useAuthenticateApi } from 'api/use-authenticate-api'
import React from 'react'
import { useMutation } from 'react-query'
import { useRegisterStorage } from 'utilities/use-register-storage'

export const useRegister = () => {
  const registerStorage = useRegisterStorage()
  const api = useAuthenticateApi()
  const [registerFromApi, registerState] = useMutation(api.register, { throwOnError: true })

  const register = React.useCallback(
    (credentials: { email: string; password: string }) =>
      registerFromApi(credentials).then(({ id }) => registerStorage.set({ id })),
    [registerFromApi, registerStorage]
  )

  return { ...registerState, register }
}
