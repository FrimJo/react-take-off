import { RouteComponentProps, RouteProps } from 'react-router'

import PrivatePage from 'pages/private'
import StartPage from 'pages/start'

interface IRoute extends RouteProps {
  private: boolean
  path: string
  component: React.ComponentType<RouteComponentProps<any>>
}

const Route = {
  Start: {
    path: '/',
    exact: true,
    private: false,
    component: StartPage,
  } as IRoute,
  Private: {
    path: '/private',
    exact: true,
    private: true,
    component: PrivatePage,
  } as IRoute,
}

export const routesArray = Object.values(Route)
export default Route
