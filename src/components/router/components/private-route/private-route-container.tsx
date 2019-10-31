import React from 'react'
import {
  Redirect,
  Route as DomRoute,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom'

import Route from 'config/routes'
import { Authentication } from 'components/authentication'

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>
}

export const PrivateRouteContainer: React.FunctionComponent<IProps> = ({
  component: Component,
  ...rest
}) => {
  const { isLoggedIn } = Authentication.useState()
  return (
    <DomRoute
      {...rest}
      render={React.useCallback(
        props => {
          if (!isLoggedIn) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: Route.Start.path }} />
          }

          // authorised so return component
          return <Component {...props} />
        },
        [isLoggedIn]
      )}
    />
  )
}
