import React from 'react'
import { Typography } from '@material-ui/core'
import { useLoginForm } from './utilities/use-login-form'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AuthenticationContext } from 'contexts/authentication-context'
import { ButtonWithSpinner } from 'components/button-with-spinner'

export const AuthenticatePageView: React.FC = () => {
  const loginState = AuthenticationContext.useLoginState()
  const { name, ...formikProps } = useLoginForm({
    username: 'george.bluth@reqres.in',
    password: '',
  })
  return (
    <>
      <Typography variant="h1">Authenticate</Typography>
      <Formik {...formikProps}>
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Field name={name.username} />
            <ErrorMessage name={name.username} />
            <Field name={name.password} type="password" />
            <ErrorMessage name={name.password} />
            <ButtonWithSpinner
              type="submit"
              color="primary"
              variant="contained"
              showSpinner={isSubmitting}
              disabled={!dirty || !isValid}>
              login
            </ButtonWithSpinner>
            {loginState.status === 'error' && (
              <pre>{JSON.stringify(loginState.error, null, '\t')}</pre>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}
