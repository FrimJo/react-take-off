import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { PageRoutes } from 'config/page-routes'
import { NotFoundPage } from 'pages/not-found'
import { history } from 'utilities/history'
import { PrivateRoute } from './components/private-route'
import { UserContext } from 'contexts/user-context'
import { Authentication } from 'components/authentication'
import { NavigationContext } from 'components/navigation/navigation-machine'

const Buttons = () => {
  const { events, path } = NavigationContext.useState()
  const { send } = NavigationContext.useActions()
  console.log('events', events)
  return (
    <>
      {events.map(e => (
        <button key={e} onClick={() => send(e)}>
          {e}
        </button>
      ))}
      {path}
    </>
  )
}

export const RouterContainer = () => {
  const userState = UserContext.useState()
  const state = Authentication.useState()
  console.log('render RouterContainer')
  return (
    <Router history={history}>
      <NavigationContext.Provider>
        <Buttons />
        <Switch>
          <Route {...PageRoutes.Authenticate} />
          <Route {...PageRoutes.Start} />
        </Switch>
        {/* <Switch>
        <Route exact={true} {...PageRoutes.Authenticate} />
        <PrivateRoute>
          <Switch>
        <Route exact={true} {...PageRoutes.Start} />
        <Route exact={true} {...PageRoutes.Private} />
        </Switch>
        </PrivateRoute>
        <Route component={NotFoundPage} />
      </Switch>
      <pre>{JSON.stringify(userState, null, '\t')}</pre> */}
        <pre>{JSON.stringify(state, null, '\t')}</pre>
      </NavigationContext.Provider>
    </Router>
  )
}
