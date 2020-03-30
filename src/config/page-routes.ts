import { RouteProps } from 'react-router'
import { AuthenticatePage } from 'pages/authenticate'
import { PrivatePage } from 'pages/private'
import { StartPage } from 'pages/start'
import { UnauthorizedPage } from 'pages/unauthorized-page'
import { RegisterPageView } from 'pages/authenticate/pages/register/register-page-view'

interface IPageRoute extends Omit<RouteProps, 'path'> {
  path: string
}

export const PageRoutes: { [Page in string]: IPageRoute } = {
  Start: {
    path: '/',
    exact: true,
    component: StartPage,
  },
  Private: {
    path: '/private',
    exact: true,
    component: PrivatePage,
  },
  Authenticate: {
    path: '/authenticate/login',
    exact: true,
    component: AuthenticatePage,
  },
  Register: {
    path: '/authenticate/register',
    exact: true,
    component: RegisterPageView,
  },
  Unauthorized: {
    path: '/unauthorized',
    exact: true,
    component: UnauthorizedPage,
  },
}
