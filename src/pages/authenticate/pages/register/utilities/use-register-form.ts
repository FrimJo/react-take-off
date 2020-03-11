import * as yup from 'yup'
import { AuthenticationContext } from 'contexts/authentication-context'
import { Name, OnSubmitFunction } from 'types'
import React from 'react'

type FormValues = Readonly<{
  email: string
  password: string
  repeatPassword: string
}>

// Define the hook to be used to leverage this form
export const useRegisterForm = (initialValues: FormValues) => {
  const { register } = AuthenticationContext.useActions()

  const onSubmit: OnSubmitFunction<FormValues> = React.useCallback(
    (values, { setSubmitting }) => {
      register({ email: values.email, password: values.password })
        .then(() => {
          console.log('register onSubmit')
        })
        .catch(error => console.log('error in use register form', error))
        .finally(() => {
          setSubmitting(false)
        })
    },
    [register]
  )

  const validationSchema = React.useMemo(
    () =>
      yup.object().shape<FormValues>({
        email: yup.string().required(),
        password: yup.string().required(),
        repeatPassword: yup
          .string()
          .oneOf([yup.ref('password')], 'Passwords must match')
          .required(),
      }),
    []
  )

  const name: Name<FormValues> = React.useMemo(
    () => ({
      email: 'email',
      password: 'password',
      repeatPassword: 'repeatPassword',
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
