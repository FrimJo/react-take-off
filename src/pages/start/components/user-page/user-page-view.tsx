/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Button } from '@material-ui/core'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { useUserForm } from './utilities/use-user-form'
import withSpinner from 'utilities/with-spinner'
import { User } from 'api/api'

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
              <Field variant={'outlined'} name={name.name} />
              <ErrorMessage name={name.name} />
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

const ButtonWithSpinner = withSpinner(Button)
