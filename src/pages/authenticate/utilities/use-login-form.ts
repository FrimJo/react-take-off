import * as yup from 'yup'
import { AuthenticationContext } from 'contexts/authentication-context'
import { Name, OnSubmitFunction } from 'types'
import { PageRoutes } from 'config/page-routes'
import { navigate } from 'utilities/react-router-hooks'
import { history } from 'utilities/history'
import React from 'react'

type UserFormValues = Readonly<{
  username: string
  password: string
}>

// Define the hook to be used to leverage this form
export const useLoginForm = (initialValues: UserFormValues) => {
  const {
    location: { state },
  } = React.useMemo(() => history, [])

  const actions = AuthenticationContext.useActions()

  const onSubmit: OnSubmitFunction<UserFormValues> = React.useCallback(
    (credentials, { setSubmitting }) => {
      actions
        .login(credentials)
        .then(() => {
          // Navigate user
          if (!state?.from ?? state.from === PageRoutes.Authenticate.path) {
            navigate(PageRoutes.Start.path, { replace: false })
          } else {
            navigate(state.from, { replace: true })
          }
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
    [actions, state]
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
