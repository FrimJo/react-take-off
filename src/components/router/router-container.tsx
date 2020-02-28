import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { NotFoundPage } from 'pages/not-found'
import { history } from 'utilities/history'
import { PrivateRoute } from './components/private-route'
import { UserContext } from 'contexts/user-context'
import { AuthenticationContext } from 'contexts/authentication-context'

export const RouterContainer = () => {
  const userState = UserContext.useState()
  const state = AuthenticationContext.useState()

  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} {...PageRoutes.Authenticate} />
        <PrivateRoute>
          <Switch>
            <Route exact={true} {...PageRoutes.Start} />
            <Route exact={true} {...PageRoutes.Private} />
          </Switch>
        </PrivateRoute>
        <Route component={NotFoundPage} />
      </Switch>
      <pre>{JSON.stringify(userState, null, '\t')}</pre>
      <pre>{JSON.stringify(state, null, '\t')}</pre>
    </Router>
  )
}
