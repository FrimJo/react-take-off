import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { TrashCanOutline } from 'mdi-material-ui'
import * as React from 'react'
import { Spinner } from 'components/spinner'
import { ITodoItem } from 'mocks/handlers'
import { useUpateTodo, useDeleteTodo } from 'queries/todo-query'
import { useStaticCallback } from 'utilities/use-static-callback'

export default (props: { todo: ITodoItem }) => {
  const { todo } = props
  const { update, result } = useUpateTodo()
  const { remove } = useDeleteTodo()

  const handleCheckClick = useStaticCallback(() =>
    update(todo.id, { ...todo, completed: !todo.completed })
  )

  const handleRemoveClick = useStaticCallback(() => remove(todo.id))

  return (
    <ListItem dense button onClick={handleCheckClick} role={undefined}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          tabIndex={-1}
          disableRipple
          disabled={todo.id === -1}
          checked={todo.completed}
        />
      </ListItemIcon>
      <ListItemText primary={todo.title} />
      {result.isLoading ? (
        <ListItemSecondaryAction>
          <Spinner size={32} />
        </ListItemSecondaryAction>
      ) : (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleRemoveClick}>
            <TrashCanOutline />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}
