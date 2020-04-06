import { LoginPage } from 'pages/account/pages/login-page'
import { RegisterPage } from 'pages/account/pages/register-page'
import { PrivatePage } from 'pages/private-page'
import { StartPage } from 'pages/start-page'
import { UnauthorizedPage } from 'pages/unauthorized-page'
import { RouteProps } from 'react-router'

interface IPageRoute extends Omit<RouteProps, 'path' | 'component'> {
  component: React.ComponentType
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
  Login: {
    path: '/account/login',
    exact: true,
    component: LoginPage,
  },
  Register: {
    path: '/account/register',
    exact: true,
    component: RegisterPage,
  },
  Unauthorized: {
    path: '/unauthorized',
    exact: true,
    component: UnauthorizedPage,
  },
}
