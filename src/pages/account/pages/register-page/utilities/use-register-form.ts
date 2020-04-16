import * as React from 'react'
import * as yup from 'yup'
import { PageRoutes } from 'config/page-routes'
import { Name, OnSubmitFunction } from 'types'
import { navigate } from 'utilities/react-router-hooks'
import { useRegister } from './use-register'

type FormValues = Readonly<{
  email: string
  password: string
  repeatPassword: string
}>

// Define the hook to be used to leverage this form
export const useRegisterForm = (initialValues: FormValues) => {
  const { register } = useRegister()

  const onSubmit: OnSubmitFunction<FormValues> = React.useCallback(
    (values, { setSubmitting }) => {
      register({ email: values.email, password: values.password })
        .then(() => {
          navigate(PageRoutes.Start.path, { replace: false })
        })
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
