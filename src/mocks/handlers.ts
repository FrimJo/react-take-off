import { rest } from 'msw'

const KEY = 'todo-mock'

export interface ITodoItem {
  id: number
  title: string
  completed: boolean
}
export type CreateTodoItem = Omit<ITodoItem, 'id'>

const BASE_PATH = process.env.REACT_APP_API_URL

export const handlers = [
  rest.get(`${BASE_PATH}/todos`, (req, res, ctx) => {
    const todos: ITodoItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return res(ctx.status(200), ctx.json(todos))
  }),
  rest.get(`${BASE_PATH}/todos/:todoId`, (req, res, ctx) => {
    const { todoId } = req.params
    const todos: ITodoItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    const todo = todos.find((t) => t.id === +todoId)
    if (!todo) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not found',
        })
      )
    }
    return res(ctx.status(200), ctx.json(todo))
  }),
  rest.post(`${BASE_PATH}/todos`, (req, res, ctx) => {
    console.log('req.body', req.body)
    const todoItem = JSON.parse(req.body as any)
    console.log('todoItem', todoItem)
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
