import { RouteComponentProps, RouteProps } from 'react-router'

import 'components/navigation/navigation-machine'
import { AuthenticatePage } from 'pages/authenticate'
import { PrivatePage } from 'pages/private'
import { StartPage } from 'pages/start'

interface IPageRoute extends Omit<RouteProps, 'path' | 'component'> {
  path: string
  component: React.ComponentType<RouteComponentProps<any>>
}

export const PageRoutes = {
  Start: {
    path: '/start',
    exact: true,
    component: StartPage,
  } as IPageRoute,
  Private: {
    path: '/private',
    exact: true,
    component: PrivatePage,
  } as IPageRoute,
  Authenticate: {
    path: '/account/authenticate',
    exact: true,
    component: AuthenticatePage,
  } as IPageRoute,
}
