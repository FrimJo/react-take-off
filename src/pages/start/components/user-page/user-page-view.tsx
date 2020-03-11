/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useUserForm } from './utilities/use-user-form'
import { User } from 'api/use-user-api'
import { ButtonWithSpinner } from 'components/button-with-spinner'

type UserPageViewProps = Readonly<{ initialValues: User }>
export const UserPageView: React.FC<UserPageViewProps> = ({ initialValues }) => {
  const { name, ...formikProps } = useUserForm(initialValues)
  return (
    <Formik {...formikProps}>
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                width: 200;
              `}>
              <Field variant={'outlined'} name={name.id} />
              <ErrorMessage name={name.id} />
              <Field variant={'outlined'} name={name.firstName} />
              <ErrorMessage name={name.firstName} />
              <Field variant={'outlined'} name={name.lastName} />
              <ErrorMessage name={name.lastName} />
              <Field variant={'outlined'} name={name.email} />
              <ErrorMessage name={name.email} />
              <ButtonWithSpinner
                color="primary"
                variant="contained"
                type="submit"
                disabled={!dirty || !isValid}
                showSpinner={isSubmitting}>
                Save
              </ButtonWithSpinner>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
