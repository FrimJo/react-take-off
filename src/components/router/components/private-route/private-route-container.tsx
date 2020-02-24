import React from 'react'
import { Redirect, Route as DomRoute, RouteComponentProps, RouteProps } from 'react-router-dom'

import { PageRoutes } from 'config/page-routes'
import { Authentication } from 'components/authentication'
import { history } from 'utilities/history'

interface IProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps>
}

export const PrivateRouteContainer: React.FunctionComponent<IProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { isLoggedIn } = Authentication.useState()
  const renderRoute = React.useCallback(
    props => {
      if (!isLoggedIn) {
        // not authorised so redirect to login page with the return url

        return (
          <Redirect
            to={{
              pathname: PageRoutes.Authenticate.path,
              state: { from: history.location.pathname },
            }}
          />
        )
      }

      // authorised so return component
      return Component ? <Component {...props} /> : children
    },
    [Component, children, isLoggedIn]
  )
  return <DomRoute {...rest} render={renderRoute} />
}
