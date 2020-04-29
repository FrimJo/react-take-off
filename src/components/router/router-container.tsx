import * as React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { NotFoundPageView } from 'pages/not-found-page/not-found-page-view'
import { history } from 'utilities/history'
import { PrivateRouteContainer } from './components/private-route/private-route-container'

export const RouterContainer: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route {...PageRoutes.Login} />
        <Route {...PageRoutes.Register} />
        <PrivateRouteContainer {...PageRoutes.Start} />
        <PrivateRouteContainer {...PageRoutes.Private} />
        <Route component={NotFoundPageView} />
      </Switch>
    </Router>
  )
}
