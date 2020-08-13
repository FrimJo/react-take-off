import { Typography, IconButton, Paper, TextField, Checkbox } from '@material-ui/core'
import {} from 'formik-material-ui'
import { Close } from 'mdi-material-ui'
import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { ITodoItem, useCreateTodo } from 'queries/todo-query'
import { browserHistory } from 'utilities/history'
import { useDefaultForm } from 'utilities/use-form'

const CreateTodoPageView: React.FC<{ className?: string }> = ({ className }) => {
  const { createTodo, result } = useCreateTodo({ userId: 1 })

  const { name, register, handleSubmit } = useDefaultForm<Omit<ITodoItem, 'id' | 'userId'>>({
    defaultValues: { completed: false, title: '' },
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

      <form onSubmit={handleSubmit(createTodo)}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}>
          <TextField variant="outlined" label="Title" name={name.title} inputRef={register} />
          <Typography variant="subtitle1" component="label" htmlFor={name.completed}>
            Is completed
            <Checkbox name={name.completed} inputRef={register} />
          </Typography>
          <ContainedButton type="submit" showSpinner={result.isLoading}>
            Create
          </ContainedButton>
        </div>
      </form>
    </Page>
  )
}

export default CreateTodoPageView
