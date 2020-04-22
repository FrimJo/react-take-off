import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { history } from 'utilities/history'
import { useAuthentication } from 'utilities/use-authentication'
import { useTokenStorage } from 'utilities/use-token-storage'
import { useUser } from 'utilities/use-user'

const PrivateComponent: React.FC = ({ children }) => {
  // Fetch status of logged in user
  const tokenStorage = useTokenStorage()
  const { status } = useUser(tokenStorage.value?.id)

  if (status === 'success') {
    // authorized and user received so return component
    return <React.Fragment>{children}</React.Fragment>
  }

  if (status === 'loading') {
    return <span>Is fetching user</span>
  }
  if (status === 'error') {
    return <span>Could not fetch user</span>
  }

  throw Error(
    'No user fetched, please make sure that user is fetching or has been fetch beforer navigating using private route.'
  )
}

interface IProps extends RouteProps {
  component?: React.ComponentType
}

export const PrivateRouteContainer: React.FC<IProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { isLoggedIn } = useAuthentication()
  if (!isLoggedIn) {
    // Not authorized, redirect to login page with the return url
    return (
      <Redirect
        to={{
          pathname: PageRoutes.Login.path,
          state: { from: history.location.pathname },
        }}
      />
    )
  }
  return (
    <Route {...rest}>
      <PrivateComponent>{Component ? <Component /> : children}</PrivateComponent>
    </Route>
  )
}
