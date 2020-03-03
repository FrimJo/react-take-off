import React from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { AuthenticationContext } from 'contexts/authentication-context'
import { history } from 'utilities/history'
import { UserContext } from 'contexts/user-context'

interface IProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps>
}

export const PrivateRouteContainer: React.FC<IProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { isLoggedIn } = AuthenticationContext.useState()
  const {
    userQuery: { data: user },
  } = UserContext.useState()
  console.log('isLoggedIn', isLoggedIn)
  const renderRoute = React.useCallback(
    props => {
      if (!isLoggedIn || !user) {
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
  return <Route {...rest} render={renderRoute} />
}
