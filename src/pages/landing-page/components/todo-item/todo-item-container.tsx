import { lazyProps } from 'lazy-props'
import * as React from 'react'
import { todoCache } from 'queries/todo-query'
import TodoItemView from './todo-item-view'

export default (props: React.PropsWithChildren<{ id: number }>) => {
  const { id } = props
  const LazyTodoItemView = React.lazy(() =>
    lazyProps(TodoItemView, { todo: todoCache.prefetch(id) })
  )
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyTodoItemView />
    </React.Suspense>
  )
}
