import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { NotFoundPage } from 'pages/not-found'
import { history } from 'utilities/history'
import { PrivateRoute } from './components/private-route'

export const RouterContainer: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route {...PageRoutes.Authenticate} />
        <Route {...PageRoutes.Register} />
        <PrivateRoute>
          <Switch>
            <Route {...PageRoutes.Start} />
            <Route {...PageRoutes.Private} />
          </Switch>
        </PrivateRoute>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}
