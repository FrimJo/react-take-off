import { Typography } from '@material-ui/core'
import * as React from 'react'
import { ITodoItem } from 'queries/todo-query'

export default (props: React.PropsWithChildren<{ todo: ITodoItem }>) => {
  const { todo } = props
  return (
    <>
      <Typography variant="h6">{todo.title}</Typography>
      <Typography variant="body1">Completed: {todo.completed ? 'yes' : 'no'}</Typography>
    </>
  )
}
