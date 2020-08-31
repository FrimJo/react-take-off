import { ListItem, TextField } from '@material-ui/core'
import * as React from 'react'
import { useCreateTodo } from 'queries/todo-query'

export default () => {
  const { create } = useCreateTodo()
  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.length !== 0) {
        create({ title: event.currentTarget.value, completed: false })
        event.currentTarget.value = ''
      }
    },
    [create]
  )
  const handleKeyPress = React.useCallback(
    (event: any) => {
      debugger
      if (event.keyCode === 13 && event.currentTarget.value.length !== 0) {
        create({ title: event.currentTarget.value, completed: false })
        event.currentTarget.value = ''
      }
    },
    [create]
  )
  return (
    <ListItem>
      <TextField onBlur={handleBlur} onChange={handleKeyPress} label="What to do?" />
    </ListItem>
  )
}
