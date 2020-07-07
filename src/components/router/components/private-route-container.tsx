import * as React from 'react'
import { Route as DomRoute, RouteProps } from 'react-router'
import Spinner from 'components/spinner'

interface IProps extends RouteProps {
  component?: React.ComponentType
}

const AuthenticateRoute: React.FC = ({ children }) => {
  // TODO Check for use authentication before returning children
  throw Error('Needs implementation')

  // eslint-disable-next-line no-unreachable
  return <React.Fragment>{children}</React.Fragment>
}

const PrivateRoute: React.FunctionComponent<IProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  return (
    <DomRoute {...rest}>
      <React.Suspense fallback={<Spinner />}>
        <AuthenticateRoute>{Component ? <Component /> : children}</AuthenticateRoute>
      </React.Suspense>
    </DomRoute>
  )
}

export default PrivateRoute
