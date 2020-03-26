import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { history } from 'utilities/history'
import { AuthenticationContext } from 'contexts/authentication-context'

interface IProps extends RouteProps {
  component?: React.ComponentType
}

export const PrivateRouteContainer: React.FC<IProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const logginState = AuthenticationContext.useLoginState()
  const { userStatus } = AuthenticationContext.useState()

  const renderRoute = React.useCallback(() => {
    if (!logginState.isLoggedIn) {
      // Not authorized redirect to login page with the return url
      return (
        <Redirect
          to={{
            pathname: PageRoutes.Authenticate.path,
            state: { from: history.location.pathname },
          }}
        />
      )
    }

    if (userStatus === 'success') {
      // authorized so return component
      return Component ? <Component /> : children
    }

    if (userStatus === 'loading') {
      return <span>Is fetching user</span>
    }
    if (userStatus === 'error') {
      return <span>Could not fetch user</span>
    }

    throw Error(
      'No user fetched, please make sure that user is fetching or has been fetch beforer navigating using private route.'
    )
  }, [Component, children, logginState.isLoggedIn, userStatus])
  return <Route {...rest} render={renderRoute} />
}
