import * as yup from 'yup'

import { AuthenticationContext } from 'components/authentication/authentication-context'
import { Name, OnSubmitFunction } from 'types'
import { PageRoutes } from 'config/page-routes'
import { navigate } from 'utilities/react-router-hooks'
import { history } from 'utilities/history'
// import { useLocation } from 'utilities/react-router-hooks'

type UserFormValues = Readonly<{
  username: string
  password: string
}>

// Define the hook to be used to leverage this form
export const useLoginForm = (initialValues: UserFormValues) => {
  const {
    location: { state },
  } = history

  const { logIn } = AuthenticationContext.useActions()

  const onSubmit: OnSubmitFunction<UserFormValues> = (credentials, { setSubmitting }) => {
    logIn(credentials)
      .then(() => {
        // Navigate user
        if (!state?.from ?? state.from === PageRoutes.Authenticate.path) {
          navigate(PageRoutes.Start.path, { replace: false })
        } else {
          navigate(state.from, { replace: true })
        }
      })
      .catch(() => setSubmitting(false))
    // No need to set submitting to false because of navigation
    //.finally(() => setSubmitting(false))
  }

  const validationSchema = yup.object().shape<UserFormValues>({
    username: yup.string().required(),
    password: yup.string().required(),
  })

  const name: Name<UserFormValues> = {
    username: 'username',
    password: 'password',
  }

  return {
    initialValues,
    onSubmit,
    validationSchema,
    name,
  }
}
