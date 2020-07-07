import { useTheme } from '@material-ui/core'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Router, Switch } from 'react-router'
import { ErrorFallback, Spinner } from 'components'
import { NotFoundRoute, LandingPage } from 'config/routes'
import history from 'utilities/history'

const RouterContainer: React.FC = () => {
  const theme = useTheme()
  return (
    <Router history={history}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <React.Suspense fallback={<Spinner color={theme.palette.secondary.main} />}>
          <Switch>
            <Route {...LandingPage.props} />
            <Route {...NotFoundRoute.props} />
          </Switch>
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  )
}

export default RouterContainer
