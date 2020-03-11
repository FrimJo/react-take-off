import { RouteComponentProps, RouteProps } from 'react-router'

import { AuthenticatePage } from 'pages/authenticate'
import { PrivatePage } from 'pages/private'
import { StartPage } from 'pages/start'
import { UnauthorizedPage } from 'pages/unauthorized-page'
import { RegisterPageView } from 'pages/authenticate/pages/register/register-page-view'

interface IPageRoute extends Omit<RouteProps, 'path' | 'component'> {
  path: string
  component: React.ComponentType<RouteComponentProps>
}

export const PageRoutes = {
  Start: {
    path: '/',
    exact: true,
    component: StartPage,
  } as IPageRoute,
  Private: {
    path: '/private',
    exact: true,
    component: PrivatePage,
  } as IPageRoute,
  Authenticate: {
    path: '/authenticate',
    exact: true,
    component: AuthenticatePage,
  } as IPageRoute,
  Register: {
    path: '/authenticate/register',
    exact: true,
    component: RegisterPageView,
  } as IPageRoute,
  Unauthorized: {
    path: '/unauthorized',
    exact: true,
    component: UnauthorizedPage,
  } as IPageRoute,
}
