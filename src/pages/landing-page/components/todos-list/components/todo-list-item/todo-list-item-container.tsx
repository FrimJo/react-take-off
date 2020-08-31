import * as React from 'react'
import { ITodoItem } from 'mocks/handlers'
import { useTodo } from 'queries/todo-query'
import TodoItemView from './todo-list-item-view'

export default (props: { todo: ITodoItem }) => {
  const { todo = props.todo } = useTodo(props.todo.id)

  return <TodoItemView todo={todo} />
}
