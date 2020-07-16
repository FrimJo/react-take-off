import { Typography, IconButton, Paper } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField, Checkbox } from 'formik-material-ui'
import { Close } from 'mdi-material-ui'
import * as React from 'react'
import { css } from 'styled-components'
import * as yup from 'yup'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { ITodoItem, useCreateTodo } from 'queries/todo-query'
import { browserHistory } from 'utilities/history'
import { useForm } from 'utilities/use-form'

const CreateTodoPageView: React.FC<{ className?: string }> = ({ className }) => {
  const { createTodo } = useCreateTodo({ userId: 1 })

  const { formikProps, name } = useForm<Omit<ITodoItem, 'id' | 'userId'>>({
    initialValues: { completed: false, title: '' },
    schema: yup
      .object({
        title: yup.string().required(),
        completed: yup.boolean().required(),
      })
      .defined(),
    onSubmit: (values, actions) => {
      createTodo(values)
        .then(() => alert('Success'))
        .catch((error) => {
          alert('Error, see terminal')
          throw error
        })
        .finally(() => actions.setSubmitting(false))
    },
  })

  return (
    <Page
      className={className}
      bottomNavbarComponent={false}
      appBarComponent={
        <Paper
          elevation={1}
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 56px;
            border-radius: 0;
            padding: 0 ${({ theme }) => theme.spacing(5)}px;
            background-color: ${({ theme }) => theme.palette.primary.main};
            color: white;
          `}>
          <IconButton
            size="small"
            onClick={() => browserHistory.goBack()}
            css={css`
              color: inherit;
            `}>
            <Close />
          </IconButton>
        </Paper>
      }>
      <Typography variant="h3">Create Todo</Typography>
      <Formik {...formikProps}>
        {(props) => {
          const { isSubmitting } = props
          return (
            <Form>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                `}>
                <Field label="Title" component={TextField} name={name.title} />
                <Typography variant="subtitle1" component="label" htmlFor={name.completed}>
                  Is completed
                  <Field
                    type="checkbox"
                    label={name.completed}
                    component={Checkbox}
                    name={name.completed}
                  />
                </Typography>
                <ContainedButton type="submit" showSpinner={isSubmitting}>
                  Create
                </ContainedButton>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default CreateTodoPageView
