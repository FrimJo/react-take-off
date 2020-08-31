import { rest } from 'msw'

const KEY = 'todo-mock'

export interface ITodoItem {
  id: number
  title: string
  completed: boolean
}
export type CreateTodoItem = Omit<ITodoItem, 'id'>
export type UpdateTodoItem = Omit<ITodoItem, 'id'>

const BASE_PATH = process.env.REACT_APP_API_URL

export const handlers = [
  rest.get(`${BASE_PATH}/todos`, (req, res, ctx) => {
    const todos: ITodoItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return res(ctx.status(200), ctx.json(todos))
  }),
  rest.get(`${BASE_PATH}/todos/:todoId`, (req, res, ctx) => {
    const { todoId } = req.params
    const todos: ITodoItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    const todoIndex = todos.findIndex((t) => t.id === Number(todoId))
    debugger
    if (todoIndex === -1) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not found',
        })
      )
    }
    return res(ctx.status(200), ctx.json(todos[todoIndex]))
  }),
  rest.delete(`${BASE_PATH}/todos/:todoId`, (req, res, ctx) => {
    const { todoId } = req.params
    const todos: ITodoItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    const todoIndex = todos.findIndex((t) => t.id === Number(todoId))
    if (todoIndex === -1) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not found',
        })
      )
    }
    const removedTodo = todos[todoIndex]
    const updatedTodos = [...todos.slice(0, todoIndex), ...todos.slice(todoIndex + 1)]
    localStorage.setItem(KEY, JSON.stringify(updatedTodos))
    return res(ctx.status(200), ctx.json(removedTodo))
  }),
  rest.post(`${BASE_PATH}/todos/:todoId`, (req, res, ctx) => {
    const { todoId } = req.params
    const todoItem = JSON.parse(req.body as any) as UpdateTodoItem
    const todos: ITodoItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    const todoIndex = todos.findIndex((t) => t.id === Number(todoId))
    if (todoIndex === -1) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not found',
        })
      )
    }

    const updatedTodos = [
      ...todos.slice(0, todoIndex),
      { id: Number(todoId), ...todoItem },
      ...todos.slice(todoIndex + 1),
    ]
    localStorage.setItem(KEY, JSON.stringify(updatedTodos))
    return res(ctx.status(200), ctx.json(todoItem))
  }),
  rest.post(`${BASE_PATH}/todos`, (req, res, ctx) => {
    const todoItem = JSON.parse(req.body as any)
    const todos: ITodoItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    const createdTodoItem = {
      ...todoItem,
      id: todos.reduce((maxId, { id }) => Math.max(maxId, id), 0) + 1,
    }
    todos.push(createdTodoItem)
    localStorage.setItem(KEY, JSON.stringify(todos))
    return res(ctx.status(200), ctx.json(createdTodoItem))
  }),
]
