import { lazyProps } from 'lazy-props'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { todosCache } from 'queries/todo-query'
import TodoListView from './todos-list-view'

export default () => {
  const LazyTodosList = React.lazy(() => lazyProps(TodoListView, { todos: todosCache.prefetch() }))
  return (
    <ErrorBoundary fallbackRender={({ error }) => <div>Could not load todos</div>}>
      <React.Suspense fallback={<div>Loading todos…</div>}>
        <LazyTodosList />
      </React.Suspense>
    </ErrorBoundary>
  )
}
