import { useTheme } from '@material-ui/core'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Router, Switch } from 'react-router'
import { ErrorFallback } from 'components/error-fallback'
import { Spinner } from 'components/spinner'
import {
  NotFoundRoute,
  LandingRoute,
  WizardFormExampleRoute,
  PartialFormExampleRoute,
  NestedFormExampleRoute,
} from 'config/routes'
import { browserHistory } from 'utilities/history'

const RouterContainer: React.FC = () => {
  const theme = useTheme()
  return (
    <Router history={browserHistory}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <React.Suspense fallback={<Spinner color={theme.palette.secondary.main} />}>
          <Switch>
            <Route {...LandingRoute.props} />
            <Route {...WizardFormExampleRoute.props} />
            <Route {...PartialFormExampleRoute.props} />
            <Route {...NestedFormExampleRoute.props} />
            <Route {...NotFoundRoute.props} />
          </Switch>
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  )
}

export default RouterContainer
