import * as yup from 'yup'

import { Name, OnSubmitFunction } from 'types'
import { UserContext } from 'contexts/user-context'
import React from 'react'

type UserFormValues = Readonly<{
  id: number
  name: string
}>

// Define the hook to be used to leverage this form
export const useUserForm = (initialValues: UserFormValues) => {
  const actions = UserContext.useActions()

  const onSubmit: OnSubmitFunction<UserFormValues> = React.useCallback(
    user => {
      actions.updateUser(user)
      actions.setIsEdit(false)
    },
    [actions]
  )

  const validationSchema = React.useMemo(
    () =>
      yup.object().shape<UserFormValues>({
        id: yup.number().required(),
        name: yup.string().required(),
      }),
    []
  )

  const name: Name<UserFormValues> = React.useMemo(
    () => ({
      id: 'id',
      name: 'name',
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
