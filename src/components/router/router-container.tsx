import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { routesArray } from 'config/page-routes'
import NotFoundPage from 'pages/not-found'
import history from 'utilities/history'
import { PrivateRoute } from './components/private-route'

export const RouterContainer = () => (
  <Router history={history}>
    <Switch>
      {routesArray.map(route => {
        const RouteType = route.private ? PrivateRoute : Route
        return <RouteType key={route.path} {...route} />
      })}
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
)
