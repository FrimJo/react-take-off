import * as yup from 'yup'
import { Name, OnSubmitFunction, Schema } from 'types'
import React from 'react'
import { User } from 'api/use-user-api'
import { AuthenticationContext } from 'contexts/authentication-context'

type UserFormValues = User

// Define the hook to be used to leverage this form
export const useUserForm = (initialValues: UserFormValues) => {
  const actions = AuthenticationContext.useActions()

  const onSubmit: OnSubmitFunction<UserFormValues> = React.useCallback(
    (user) => {
      actions.updateLoggedInUser(user)
    },
    [actions]
  )

  const validationSchema: Schema<UserFormValues> = React.useMemo(
    () =>
      yup.object().shape({
        id: yup.number().required(),
        email: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        avatar: yup.string().required(),
      }),
    []
  )

  const name: Name<UserFormValues> = React.useMemo(
    () => ({
      id: 'id',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      avatar: 'avatar',
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
