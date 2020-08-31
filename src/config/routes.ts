import * as React from 'react'
import { generateRoute } from './utilities/generate-route'

/* When importing pages lazily, exported pages needs to be default export */

export const LandingRoute = generateRoute({
  pattern: '/',
  exact: true,
  component: React.lazy(() => import('pages/landing-page')),
})

export const WizardFormExampleRoute = generateRoute({
  pattern: '/wizard-form-example',
  exact: false,
  component: React.lazy(() => import('pages/wizard-form-example-page')),
})

export const PartialFormExampleRoute = generateRoute({
  pattern: '/partial-form-example',
  exact: false,
  component: React.lazy(() => import('pages/partial-form-example-page')),
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
