import styled from '@emotion/styled'
import { User } from 'api/use-user-api'
import { Button } from 'components/button'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useUserForm } from './utilities/use-user-form'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`

type UserPageViewProps = Readonly<{ initialValues: User; onClose?: () => void }>
export const UserPageView: React.FC<UserPageViewProps> = ({ initialValues, onClose }) => {
  const { name, onSubmit, ...formikProps } = useUserForm(initialValues)

  // Highjack to close edit view
  const handleSubmit = React.useCallback<typeof onSubmit>(
    (...args) => {
      onSubmit(...args)
      if (onClose !== undefined) onClose()
    },
    [onClose, onSubmit]
  )

  return (
    <Formik {...formikProps} onSubmit={handleSubmit}>
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form>
            <Wrapper>
              <Field variant={'outlined'} name={name.id} />
              <ErrorMessage name={name.id} />
              <Field variant={'outlined'} name={name.firstName} />
              <ErrorMessage name={name.firstName} />
              <Field variant={'outlined'} name={name.lastName} />
              <ErrorMessage name={name.lastName} />
              <Field variant={'outlined'} name={name.email} />
              <ErrorMessage name={name.email} />
              <Button
                color="success"
                variant="contained"
                type="submit"
                disabled={!dirty || !isValid}
                showSpinner={isSubmitting}>
                Save
              </Button>
              <Button color="error" variant="contained" onClick={onClose} disabled={isSubmitting}>
                Close
              </Button>
            </Wrapper>
          </Form>
        )
      }}
    </Formik>
  )
}
