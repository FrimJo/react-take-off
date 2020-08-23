import { lazyProps } from 'lazy-props'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { todoCache } from 'queries/todo-query'
import TodoItemView from './todo-item-view'

export default (props: React.PropsWithChildren<{ id: number }>) => {
  const { id } = props
  const LazyTodoItemView = React.lazy(() =>
    lazyProps(TodoItemView, { todo: todoCache.prefetch(id) })
  )

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <div>Could not load todo item with id: {id}</div>}>
      <React.Suspense fallback={<div>Loading to do with id {id}…</div>}>
        <LazyTodoItemView />
      </React.Suspense>
    </ErrorBoundary>
  )
}
