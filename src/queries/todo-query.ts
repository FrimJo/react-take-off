import * as React from 'react'
import { useQuery, queryCache, useMutation } from 'react-query'
import { configuration } from './utilities'

/* Usualy this is imported from the generated API */
export interface ITodoItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

// const api = new TodoApi(configuration) // Generated from swagger using openapi-generator (see README.md)
const api = {
  getTodoById: (props: { todoId: number }): Promise<ITodoItem> =>
    configuration
      .fetchApi('https://jsonplaceholder.typicode.com/todos/' + props.todoId, {
        method: 'GET',
        headers: configuration.headers,
      })
      .then((response) => response.json()),
  createTodo: (props: { userId: number; item: Omit<ITodoItem, 'userId' | 'id'> }) =>
    configuration
      .fetchApi('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: configuration.headers,
      })
      .then((response) => response.json()),
}
const BASE_KEY = 'todo'
type BaseKey = typeof BASE_KEY

function getKey(todoId: number): [BaseKey, { todoId: number }] {
  return [BASE_KEY, { todoId }]
}

function useKey(todoId: number, from?: Date, to?: Date): [BaseKey, { todoId: number }] {
  return React.useMemo(() => [BASE_KEY, { todoId }], [todoId])
}

function useTodo(todoId: number) {
  const key = useKey(todoId)
  const { data, ...rest } = useQuery(key, (_, { todoId }) => api.getTodoById({ todoId }))

  return React.useMemo(() => ({ todo: data, ...rest }), [data, rest])
}

function useCreateTodo(props: { userId: number }) {
  const { userId } = props
  const [createFromApi, result] = useMutation(api.createTodo)

  const createTodo = React.useCallback(
    (item: Omit<ITodoItem, 'userId' | 'id'>) => createFromApi({ item, userId }),
    [createFromApi, userId]
  )

  return React.useMemo(() => ({ createTodo, result }), [createTodo, result])
}

const setTodoData = (
  todoId: number,
  dataOrUpdater: ITodoItem | ((oldData: ITodoItem | undefined) => ITodoItem)
) => {
  const key = getKey(todoId)
  if (!key) {
    return
  }
  queryCache.setQueryData(key, dataOrUpdater)
}

const getTodoData = (todoId: number) => {
  const key = getKey(todoId)
  if (!key) {
    return undefined
  }
  return queryCache.getQueryData<ITodoItem>(key)
}

const invalidateTodo = (todoId: number) => queryCache.invalidateQueries<ITodoItem>(getKey(todoId))
const prefetcheTodo = (todoId: number) =>
  queryCache.prefetchQuery(getKey(todoId), (_, { todoId }) => api.getTodoById({ todoId }))

export const todoCache = {
  getTodoData,
  setTodoData,
  invalidateTodo,
  prefetcheTodo,
}

const TodoQuery = {
  useTodo,
  useCreateTodo,
}

export default TodoQuery
