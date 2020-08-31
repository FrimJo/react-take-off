import { FormControl, FormGroup, FormLabel, List } from '@material-ui/core'
import * as React from 'react'
import { ITodoItem } from 'mocks/handlers'
import { useTodos } from 'queries/todo-query'
import { TodoListField } from './components/todo-list-field'
import TodoListItemView from './components/todo-list-item/todo-list-item-view'

type Props = { todos: ITodoItem[] }

export default (props: React.PropsWithChildren<Props>) => {
  const { todos = props.todos } = useTodos()
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">All todos</FormLabel>
        <FormGroup>
          <List dense>
            {todos.map((todo) => (
              <TodoListItemView key={todo.id} todo={todo} />
            ))}
            <TodoListField />
          </List>
        </FormGroup>
      </FormControl>
    </div>
  )
}
