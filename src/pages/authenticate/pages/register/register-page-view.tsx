import React from 'react'
import { useRegisterForm } from './utilities/use-register-form'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AuthenticationContext } from 'contexts/authentication-context'
import { ButtonWithSpinner } from 'components/button-with-spinner'
import { Typography } from '@material-ui/core'

export const RegisterPageView: React.FC = () => {
  const { register } = AuthenticationContext.useState()
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
            <ButtonWithSpinner
              type="submit"
              color="primary"
              variant="contained"
              showSpinner={isSubmitting}
              disabled={!dirty || !isValid}>
              register
            </ButtonWithSpinner>
            {register.status === 'error' && <pre>{JSON.stringify(register.error, null, '\t')}</pre>}
          </Form>
        )}
      </Formik>
    </>
  )
}
