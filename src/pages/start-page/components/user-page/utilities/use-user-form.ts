import * as React from 'react'
import * as yup from 'yup'
import { User } from 'api/use-user-api'
import { Name, OnSubmitFunction, Schema } from 'types'
import { useLoggedInUser } from 'utilities/use-logged-in-user'

type UserFormValues = User

// Define the hook to be used to leverage this form
export const useUserForm = (initialValues: UserFormValues) => {
  const { update } = useLoggedInUser()

  const onSubmit: OnSubmitFunction<UserFormValues> = React.useCallback(
    (user) => {
      update(user)
    },
    [update]
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
