import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'
import React from 'react'

import { Field, Form, Formik } from 'formik'
import useExampleForm from './utilities/use-example-form'

const ExampleFormContainer: React.FC = () => {
  const { initialValues, onSubmit, validationSchema, name } = useExampleForm()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <Box display="flex" flexDirection="column" width={200}>
            <Field
              variant={'outlined'}
              name={name.field1}
              component={TextField}
            />
            <Field
              variant={'outlined'}
              name={name.field2}
              component={TextField}
            />
            <Field
              variant={'outlined'}
              name={name.field3}
              component={TextField}
            />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default ExampleFormContainer
