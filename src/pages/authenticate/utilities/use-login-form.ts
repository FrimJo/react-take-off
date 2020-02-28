import * as yup from 'yup'

import { AuthenticationContext } from 'components/authentication/authentication-context'
import { Name, OnSubmitFunction } from 'types'
import { PageRoutes } from 'config/page-routes'
import { navigate } from 'utilities/react-router-hooks'
import { history } from 'utilities/history'
import { NavigationContext } from 'components/navigation/navigation-machine'
import React from 'react'
import { Machine, send as globalSend, sendParent, interpret, assign } from 'xstate'
// import { useLocation } from 'utilities/react-router-hooks'

type UserFormValues = Readonly<{
  username: string
  password: string
}>

// Define the hook to be used to leverage this form
export const useLoginForm = (initialValues: UserFormValues) => {
  const { send } = NavigationContext.useActions()
  const { isLoggedIn, userQuery } = AuthenticationContext.useState()
  const { logIn } = AuthenticationContext.useActions()

  // React.useEffect(() => {
  //   pingSend('PING')
  // }, [pingSend])

  const onSubmit: OnSubmitFunction<UserFormValues> = React.useCallback(
    (credentials, { setSubmitting }) => {
      console.log('Send LOGIN to navigator')
      send('LOGIN')

      // pingSend('PING')
      // send('FETCH_USER', { to: 'user' })
      setSubmitting(false)
      // logIn(credentials)
      //   .then(() => {
      //     // setTimeout(() => console.log('useForm', isLoggedIn, userQuery.data), 500)

      //     // Navigate user
      //     // if (!state?.from ?? state.from === PageRoutes.Authenticate.path) {
      //     //   navigate(PageRoutes.Start.path, { replace: false })
      //     // } else {
      //     //   navigate(state.from, { replace: true })
      //     // }
      //   })
      //   .catch(() => setSubmitting(false))
      // // No need to set submitting to false because of navigation
      // //.finally(() => setSubmitting(false))
    },
    [send]
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

  return {
    initialValues,
    onSubmit,
    validationSchema,
    name,
  }
}
