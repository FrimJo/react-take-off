import * as yup from 'yup'

import { Name, OnSubmitFunction } from 'types'
import { UserContext } from 'contexts/user-context'

type UserFormValues = Readonly<{
  id: number
  name: string
}>

// Define the hook to be used to leverage this form
export const useUserForm = (initialValues: UserFormValues) => {
  const actions = UserContext.useActions()

  const onSubmit: OnSubmitFunction<UserFormValues> = user => {
    actions.updateUser(user)
    actions.setIsEdit(false)
  }

  const validationSchema = yup.object().shape<UserFormValues>({
    id: yup.number().required(),
    name: yup.string().required(),
  })

  const name: Name<UserFormValues> = {
    id: 'id',
    name: 'name',
  }

  return {
    initialValues,
    onSubmit,
    validationSchema,
    name,
  }
}
