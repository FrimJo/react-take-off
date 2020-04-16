import * as React from 'react'
import * as yup from 'yup'
import { PageRoutes } from 'config/page-routes'
import { Name, OnSubmitFunction } from 'types'
import { history } from 'utilities/history'
import { navigate } from 'utilities/react-router-hooks'
import { useAuthentication } from 'utilities/use-authentication'

type UserFormValues = Readonly<{
  username: string
  password: string
}>

// Define the hook to be used to leverage this form
export const useLoginForm = (initialValues: UserFormValues) => {
  const {
    location: { state },
  } = React.useMemo(() => history, [])

  const { login } = useAuthentication()

  const onSubmit: OnSubmitFunction<UserFormValues> = React.useCallback(
    (credentials, { setSubmitting }) => {
      login(credentials)
        .then(() => {
          // Navigate user
          if (!state?.from ?? state.from === PageRoutes.Login.path) {
            navigate(PageRoutes.Start.path, { replace: false })
          } else {
            navigate(state.from, { replace: true })
          }
        })
        // Not using finally to prevent "Can't perform a React state update on an unmounted component" warning
        .catch(() => {
          setSubmitting(false)
        })
    },
    [login, state]
  )

  const validationSchema = React.useMemo(
    () =>
      yup.object().shape<UserFormValues>({
        username: yup.string().required(),
        password: yup.string().required(),
      }),
    []
  )

  const name: Name<UserFormValues> = React.useMemo(
    () => ({
      username: 'username',
      password: 'password',
    }),
    []
  )

  return React.useMemo(
    () => ({
      initialValues,
      onSubmit,
      validationSchema,
      name,
    }),
    [initialValues, name, onSubmit, validationSchema]
  )
}
