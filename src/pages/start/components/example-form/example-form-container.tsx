import { Box, Button } from '@material-ui/core'
import React from 'react'

import { Field, Form, Formik } from 'formik'
import { useExampleForm } from './utilities/use-example-form'
import withSpinner from 'utilities/with-spinner'

export const ExampleFormContainer: React.FC = () => {
  const { initialValues, onSubmit, validationSchema, name } = useExampleForm()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ isSubmitting, dirty }) => (
        <Form>
          <Box display="flex" flexDirection="column" width={200}>
            <Field variant={'outlined'} name={name.field1} />
            <Field variant={'outlined'} name={name.field2} />
            <Field variant={'outlined'} name={name.field3} />
            <ButtonWithSpinner
              color="primary"
              variant="contained"
              type="submit"
              disabled={!dirty}
              showSpinner={isSubmitting}>
              Submit
            </ButtonWithSpinner>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

const ButtonWithSpinner = withSpinner(Button)
