// react-router-hooks.js

import * as H from 'history'
import { useContext } from 'react'
import { __RouterContext as RouterContext, RouteComponentProps, StaticContext } from 'react-router'

export function useRouter<Params extends object = object, S extends H.LocationState = H.LocationState>() {
  const context = useContext(RouterContext)
  return context as RouteComponentProps<Params, StaticContext, S>
}

export function useParams<Params extends object = object, S extends H.LocationState = H.LocationState>() {
  const { match } = useRouter<Params, S>()
  return match.params
}

export function useLocation<S extends H.LocationState = H.LocationState>() {
  const { location, history } = useRouter<{}, S>()

  function navigate(to: string, { replace = false } = {}) {
    if (replace) {
      history.replace(to)
    } else {
      history.push(to)
    }
  }

  return {
    location,
    navigate,
  }
}
