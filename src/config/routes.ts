import * as React from 'react'
import { generateRoute } from './utilities/generate-route'

/* When importing pages lazily, exported pages needs to be default export */

export const LandingRoute = generateRoute({
  pattern: '/',
  exact: true,
  component: React.lazy(() => import('pages/landing-page')),
})

export const CreateTodoRoute = generateRoute({
  pattern: '/create-todo',
  exact: false,
  component: React.lazy(() => import('pages/create-todo-page')),
})

export const NestedFormExampleRoute = generateRoute({
  pattern: '/nested-form-example',
  exact: false,
  component: React.lazy(() => import('pages/nested-form-example-page')),
})

export const NotFoundRoute = generateRoute({
  pattern: '/not-found',
  exact: false,
  component: React.lazy(() => import('pages/not-found-page')),
})
