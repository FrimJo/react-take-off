import { RouteProps } from 'react-router'
import { LoginPageView } from 'pages/account/pages/login-page/login-page-view'
import { RegisterPageView } from 'pages/account/pages/register-page/register-page-view'
import { PrivatePageView } from 'pages/private-page/private-page-view'
import { StartPageView } from 'pages/start-page/start-page-view'
import { UnauthorizedPageView } from 'pages/unauthorized-page/unauthorized-page-view'

interface IPageRoute extends Omit<RouteProps, 'path' | 'component'> {
  component: React.ComponentType
  path: string
}

export const PageRoutes: { [Page in string]: IPageRoute } = {
  Start: {
    path: '/',
    exact: true,
    component: StartPageView,
  },
  Private: {
    path: '/private',
    exact: true,
    component: PrivatePageView,
  },
  Login: {
    path: '/account/login',
    exact: true,
    component: LoginPageView,
  },
  Register: {
    path: '/account/register',
    exact: true,
    component: RegisterPageView,
  },
  Unauthorized: {
    path: '/unauthorized',
    exact: true,
    component: UnauthorizedPageView,
  },
}
