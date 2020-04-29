import { Button as MuiButton, Typography } from '@material-ui/core'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Button from 'components/button/button-view'
import { PageRoutes } from 'config/page-routes'
import { useAuthentication } from 'utilities/use-authentication'
import { useLoginForm } from './utilities/use-login-form'

export const LoginPageView: React.FC = () => {
  const { status, error } = useAuthentication()
  const { name, ...formikProps } = useLoginForm({
    username: 'george.bluth@reqres.in',
    password: '',
  })
  return (
    <>
      <Typography variant="h1">Authenticate</Typography>
      <Formik {...formikProps}>
        {({ isSubmitting, dirty, isValid, status: formikStatus }) => (
          <Form>
            <Field name={name.username} />
            <ErrorMessage name={name.username} />
            <Field name={name.password} type="password" />
            <ErrorMessage name={name.password} />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              showSpinner={isSubmitting}
              disabled={!dirty || !isValid}>
              login
            </Button>
            {status === 'error' && <pre>{JSON.stringify(error, null, '\t')}</pre>}
            {!!formikStatus?.error && formikStatus?.error.message}
          </Form>
        )}
      </Formik>
      <MuiButton color="primary" variant="text" component={Link} to={PageRoutes.Register.path}>
        Register
      </MuiButton>
    </>
  )
}
