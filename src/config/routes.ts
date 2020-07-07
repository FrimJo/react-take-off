import * as React from 'react'
import { generateRoute } from './utilities/generate-route'

/* When importing pages lazily, exported pages needs to be default export */

export const LandingPage = generateRoute({
  pattern: '/',
  exact: true,
  component: React.lazy(() => import('pages/landing-page')),
})

export const NotFoundRoute = generateRoute({
  pattern: '/not-found',
  exact: false,
  component: React.lazy(() => import('pages/not-found-page')),
})
