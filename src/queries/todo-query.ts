import * as React from 'react'
import { useQuery, queryCache, useMutation } from 'react-query'
import { ITodoItem, CreateTodoItem } from 'mocks/handlers'
import { configuration } from './utilities'

// const api = new TodoApi(configuration) // Generated from swagger using openapi-generator (see README.md)
const api = {
  getTodos: (): Promise<ITodoItem[]> =>
    configuration
      .fetchApi(`${configuration.basePath}/todos`, {
        method: 'GET',
        headers: configuration.headers,
      })
      .then((response) => response.json()),
  getTodoById: (props: { todoId: number }): Promise<ITodoItem> =>
    configuration
      .fetchApi(`${configuration.basePath}/todos/${props.todoId}`, {
        method: 'GET',
        headers: configuration.headers,
      })
      .then((response) => {
        console.log('response', response)
        return response.json()
      }),
  createTodo: (props: { userId: number; item: CreateTodoItem }) =>
    configuration
      .fetchApi(`${configuration.basePath}/todos`, {
        method: 'POST',
        headers: configuration.headers,
        body: JSON.stringify(props.item),
      })
      .then((response) => response.json()),
}

const BASE_KEY = 'todo'
type BaseKey = typeof BASE_KEY

function getKey(): [BaseKey]
function getKey(todoId: number): [BaseKey, { todoId: number }]
function getKey(todoId?: number): [BaseKey] | [BaseKey, { todoId: number }] {
  return todoId ? [BASE_KEY, { todoId }] : [BASE_KEY]
}

function useKey(): [BaseKey]
function useKey(todoId: number): [BaseKey, { todoId: number }]
function useKey(todoId?: number): [BaseKey] | [BaseKey, { todoId: number }] {
  return React.useMemo(() => (todoId ? [BASE_KEY, { todoId }] : [BASE_KEY]), [todoId])
}

export function useTodo(todoId: number) {
  const key = useKey(todoId)
  const { todos } = useTodos()
  const { data, ...rest } = useQuery(key, (_, { todoId }) => api.getTodoById({ todoId }), {
    initialData: todos?.find((t) => t.id === todoId),
  })

  return React.useMemo(() => ({ todo: data, ...rest }), [data, rest])
}

export function useTodos() {
  const key = useKey()
  const { data, ...rest } = useQuery(key, (_) => api.getTodos())

  return React.useMemo(() => ({ todos: data, ...rest }), [data, rest])
}

export function useCreateTodo(props: { userId: number }) {
  const { userId } = props
  const [createFromApi, result] = useMutation(api.createTodo, { onMutate: (todoItem) => {} })

  const createTodo = React.useCallback(
    (item: Omit<ITodoItem, 'userId' | 'id'>) => createFromApi({ item, userId }),
    [createFromApi, userId]
  )

  return React.useMemo(() => ({ createTodo, result }), [createTodo, result])
}

export const todosCache = {
  setData: (dataOrUpdater: ITodoItem[] | ((oldData: ITodoItem[] | undefined) => ITodoItem[])) =>
    queryCache.setQueryData(getKey(), dataOrUpdater),
  getData: () => queryCache.getQueryData<ITodoItem[]>(getKey()),
  prefetch: () => queryCache.prefetchQuery(getKey(), (_) => api.getTodos()),
}

export const todoCache = {
  setData: (
    todoId: number,
    dataOrUpdater: ITodoItem | ((oldData: ITodoItem | undefined) => ITodoItem)
  ) => queryCache.setQueryData(getKey(todoId), dataOrUpdater),
  getData: (todoId: number) => queryCache.getQueryData<ITodoItem>(getKey(todoId)),
  invalidate: (todoId: number) => queryCache.invalidateQueries(getKey(todoId)),
  prefetch: (todoId: number) =>
    queryCache.prefetchQuery(
      getKey(todoId),
      (_, { todoId }) => api.getTodoById({ todoId }),
      {},
      {
        throwOnError: true,
      }
    ),
}
