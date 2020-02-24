import React from 'react'
import withSpinner from 'utilities/with-spinner'
import { Button } from '@material-ui/core'

import { useLoginForm } from './utilities/use-login-form'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export const AuthenticatePageView: React.FC = () => {
  const { name, ...formikProps } = useLoginForm({ username: '', password: '' })
  return (
    <Formik {...formikProps}>
      {({ isSubmitting }) => (
        <Form>
          <Field name={name.username} />
          <ErrorMessage name={name.username} />
          <Field name={name.password} type="password" />
          <ErrorMessage name={name.password} />
          <ButtonWithSpinner
            type="submit"
            color="primary"
            variant="contained"
            showSpinner={isSubmitting}>
            login
          </ButtonWithSpinner>
        </Form>
      )}
    </Formik>
  )
}

const ButtonWithSpinner = withSpinner(Button)
