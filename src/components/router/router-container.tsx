import * as React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { NotFoundPage } from 'pages/not-found-page'
import { history } from 'utilities/history'
import { PrivateRoute } from './components/private-route'

export const RouterContainer: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route {...PageRoutes.Login} />
        <Route {...PageRoutes.Register} />
        <PrivateRoute {...PageRoutes.Start} />
        <PrivateRoute {...PageRoutes.Private} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}
