import { RouteComponentProps, RouteProps } from 'react-router'

import { PrivatePage } from 'pages/private'
import { StartPage } from 'pages/start'

interface IPageRoute extends RouteProps {
  private: boolean
  path: string
  component: React.ComponentType<RouteComponentProps<any>>
}

const RouteRoutes = {
  Start: {
    path: '/',
    exact: true,
    private: false,
    component: StartPage,
  } as IPageRoute,
  Private: {
    path: '/private',
    exact: true,
    private: true,
    component: PrivatePage,
  } as IPageRoute,
}

export const routesArray = Object.values(RouteRoutes)
export default RouteRoutes
