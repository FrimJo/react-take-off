import { lazyProps } from 'lazy-props'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { todoCache } from 'queries/todo-query'
import TodoItemContainer from './todo-list-item-container'

export default (props: { id: number }) => {
  const { id } = props
  const TodoListItemLazy = React.lazy(() =>
    lazyProps(TodoItemContainer, { todo: todoCache.prefetch(id) })
  )
  return (
    <ErrorBoundary fallbackRender={({ error }) => <div>Error loading todo with id {id}</div>}>
      <React.Suspense fallback={<div>Loading todo with id {id}</div>}>
        <TodoListItemLazy />
      </React.Suspense>
    </ErrorBoundary>
  )
}
