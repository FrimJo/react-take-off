import { Button as MuiButton, Typography } from '@material-ui/core'
import { Button } from 'components/button'
import { PageRoutes } from 'config/page-routes'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from './utilities/use-register'
import { useRegisterForm } from './utilities/use-register-form'

export const RegisterPageView: React.FC = () => {
  const { status, error } = useRegister()
  const { name, ...formikProps } = useRegisterForm({
    email: 'george.bluth@reqres.in',
    password: 'qwerty123!',
    repeatPassword: '',
  })
  return (
    <>
      <Typography variant="h1">Register</Typography>
      <Formik {...formikProps}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Field name={name.email} />
            <ErrorMessage name={name.email} />
            <Field name={name.password} type="password" />
            <ErrorMessage name={name.password} />
            <Field name={name.repeatPassword} type="password" />
            <ErrorMessage name={name.repeatPassword} />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              showSpinner={isSubmitting}
              disabled={!dirty || !isValid}>
              {' '}
              register
            </Button>
            {status === 'error' && <pre>{JSON.stringify(error, null, '\t')}</pre>}
          </Form>
        )}
      </Formik>
      <MuiButton color="primary" variant="text" component={Link} to={PageRoutes.Login.path}>
        Logg In
      </MuiButton>
    </>
  )
}
