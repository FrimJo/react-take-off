import * as React from 'react'
import { useMutation } from 'react-query'
import { useAuthenticateApi } from 'api/use-authenticate-api'
import { useRegisterStorage } from 'utilities/use-register-storage'

const conf = { throwOnError: true }
export const useRegister = () => {
  const registerStorage = useRegisterStorage()
  const api = useAuthenticateApi()
  const [registerFromApi, registerState] = useMutation(api.register, conf)

  React.useEffect(() => {
    console.log('registerState')
  }, [registerState])

  const register = React.useCallback(
    (credentials: { email: string; password: string }) =>
      registerFromApi(credentials).then(({ id }) => registerStorage.set({ id })),
    [registerFromApi, registerStorage]
  )

  return React.useMemo(() => ({ ...registerState, register }), [register, registerState])
}
