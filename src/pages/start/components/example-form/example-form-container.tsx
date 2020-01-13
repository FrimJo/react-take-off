import { Box, Button } from '@material-ui/core'
import React from 'react'

import { Field, Form, Formik, ErrorMessage } from 'formik'
import { useExampleForm } from './utilities/use-example-form'
import withSpinner from 'utilities/with-spinner'

export const ExampleFormContainer: React.FC = () => {
  const { name, ...formikProps } = useExampleForm()

  return (
    <Formik {...formikProps}>
      {({ isSubmitting, dirty, errors }) => {
        console.log('errors', JSON.stringify(errors, null, '\t'))
        return (
          <Form>
            <Box display="flex" flexDirection="column" width={200}>
              <Field variant={'outlined'} name={name.field1} />
              <ErrorMessage name={name.field1} />
              <Field variant={'outlined'} name={name.field2} />
              <ErrorMessage name={name.field2} />
              <Field variant={'outlined'} name={name.field3} />
              <ErrorMessage name={name.field3} />
              <ButtonWithSpinner color="primary" variant="contained" type="submit" disabled={!dirty} showSpinner={isSubmitting}>
                Submit
              </ButtonWithSpinner>
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}

const ButtonWithSpinner = withSpinner(Button)
