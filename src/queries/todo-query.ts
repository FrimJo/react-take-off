import * as React from 'react'
import { useQuery, queryCache, useMutation } from 'react-query'
import { Updater } from 'react-query/types/core/utils'
import { ITodoItem, CreateTodoItem, UpdateTodoItem } from 'mocks/handlers'
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
      .then((response) => response.json()),
  createTodo: (props: { item: CreateTodoItem }) =>
    configuration
      .fetchApi(`${configuration.basePath}/todos`, {
        method: 'POST',
        headers: configuration.headers,
        body: JSON.stringify(props.item),
      })
      .then((response) => response.json()),
  updateTodo: (props: { id: number; item: UpdateTodoItem }): Promise<ITodoItem> =>
    configuration
      .fetchApi(`${configuration.basePath}/todos/${props.id}`, {
        method: 'POST',
        headers: configuration.headers,
        body: JSON.stringify(props.item),
      })
      .then((response) => response.json()),
  deleteTodo: (props: { id: number }): Promise<ITodoItem> =>
    configuration
      .fetchApi(`${configuration.basePath}/todos/${props.id}`, {
        method: 'DELETE',
        headers: configuration.headers,
      })
      .then((response) => response.json()),
}

const BASE_KEY = 'todos'
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
  const { data, ...rest } = useQuery(key, (_, { todoId }) => api.getTodoById({ todoId }), {
    initialData: todoCache.getInitialData(todoId),
  })

  return React.useMemo(() => ({ todo: data, ...rest }), [data, rest])
}

export function useTodos() {
  const key = useKey()
  const { data, ...rest } = useQuery(key, (_) => api.getTodos())

  return React.useMemo(() => ({ todos: data, ...rest }), [data, rest])
}

export function useCreateTodo() {
  const [createFromApi, result] = useMutation(api.createTodo, {
    onMutate: ({ item }) => {
      todosCache.cancel()
      const previousTodos = todosCache.getData()
      const todoItem = { id: -1, ...item }
      todosCache.setData(previousTodos ? [...previousTodos, todoItem] : [todoItem])
      return () => {
        todosCache.setData(previousTodos)
      }
    },
    onSuccess: (data, mutationVariables) => {
      const todo = data as ITodoItem
      const previousTodos = todosCache.getData()
      if (previousTodos === undefined) {
        throw Error(`No existing todo items to update.`)
      }
      const todoIndex = previousTodos.findIndex((t) => t.id === -1)

      if (todoIndex === -1) {
        throw Error(`Could not find item with id ${todo.id} to update.`)
      }

      todosCache.setData([
        ...previousTodos.slice(0, todoIndex),
        todo,
        ...previousTodos.slice(todoIndex + 1),
      ])
    },
    onSettled: () => todosCache.invalidate(),
  })

  const create = React.useCallback((item: CreateTodoItem) => createFromApi({ item }), [
    createFromApi,
  ])

  return React.useMemo(() => ({ create, result }), [create, result])
}

export function useUpateTodo() {
  const [updateFromApi, result] = useMutation(api.updateTodo, {
    useErrorBoundary: false,
    onMutate: ({ id, item }) => {
      todosCache.cancel()
      todoCache.cancel(id)

      const previousTodos = todosCache.getData()

      if (previousTodos === undefined) {
        throw Error(`No existing todo items to update.`)
      }
      const todoIndex = previousTodos.findIndex((t) => t.id === id)

      if (todoIndex === -1) {
        throw Error(`Could not find item with id ${id} to update.`)
      }

      const previousTodo = todoCache.getData(id)

      todosCache.setData([
        ...previousTodos.slice(0, todoIndex),
        { id, ...item },
        ...previousTodos.slice(todoIndex + 1),
      ])
      todoCache.setData(id, { id, ...item })
      return () => {
        todosCache.setData(previousTodos)
        todoCache.setData(id, previousTodo)
      }
    },
    onError: (error, varaibles, rollback: () => void) => rollback(),
    onSettled: (todo) => {
      todosCache.invalidate()
      if (todo !== undefined) {
        todoCache.invalidate(todo.id)
      }
    },
  })

  const update = React.useCallback(
    (id: number, item: UpdateTodoItem) => updateFromApi({ id, item }),
    [updateFromApi]
  )

  return React.useMemo(() => ({ update, result }), [result, update])
}

export function useDeleteTodo() {
  const [deleteFromApi, result] = useMutation(api.deleteTodo, {
    useErrorBoundary: false,
    onMutate: ({ id }) => {
      todosCache.cancel()
      todoCache.cancel(id)

      const previousTodos = todosCache.getData()

      if (previousTodos === undefined) {
        throw Error(`No existing todo items to update.`)
      }
      const todoIndex = previousTodos.findIndex((t) => t.id === id)

      if (todoIndex === -1) {
        throw Error(`Could not find item with id ${id} to update.`)
      }

      const previousTodo = todoCache.getData(id)

      todosCache.setData([
        ...previousTodos.slice(0, todoIndex),
        ...previousTodos.slice(todoIndex + 1),
      ])
      todoCache.remove(id)
      return () => {
        todosCache.setData(previousTodos)
        todoCache.setData(id, previousTodo)
      }
    },
    onError: (error, varaibles, rollback: () => void) => rollback(),
    onSettled: (todo) => {
      todosCache.invalidate()
      if (todo !== undefined) {
        todoCache.invalidate(todo.id)
      }
    },
  })

  const remove = React.useCallback((id: number) => deleteFromApi({ id }), [deleteFromApi])

  return React.useMemo(() => ({ remove, result }), [result, remove])
}

export const todosCache = {
  setData: (dataOrUpdater?: Updater<ITodoItem[] | undefined, ITodoItem[] | undefined>) =>
    queryCache.setQueryData(getKey(), dataOrUpdater as any),
  getData: () => queryCache.getQueryData<ITodoItem[]>(getKey()),
  prefetch: () => queryCache.prefetchQuery(getKey(), (_) => api.getTodos()),
  invalidate: () => queryCache.invalidateQueries(getKey()),
  cancel: () => queryCache.cancelQueries(getKey()),
}

export const todoCache = {
  getInitialData: (todoId: number): ITodoItem | undefined =>
    todosCache.getData()?.find((todo) => todo.id === todoId),
  setData: (todoId: number, dataOrUpdater: Updater<ITodoItem | undefined, ITodoItem | undefined>) =>
    queryCache.setQueryData(getKey(todoId), dataOrUpdater as any),
  getData: (todoId: number) => queryCache.getQueryData<ITodoItem>(getKey(todoId)),
  invalidate: (todoId: number) => queryCache.invalidateQueries(getKey(todoId)),
  prefetch: (todoId: number) =>
    queryCache.prefetchQuery(getKey(todoId), (_, { todoId }) => api.getTodoById({ todoId }), {
      initialData: todoCache.getInitialData(todoId),
    }),
  cancel: (todoId: number) => queryCache.cancelQueries(getKey(todoId)),
  remove: (todoId: number) => queryCache.removeQueries(getKey(todoId)),
}
