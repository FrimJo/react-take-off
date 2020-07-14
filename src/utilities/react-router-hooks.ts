// react-router-hooks.js

import * as H from 'history'
import { useContext } from 'react'
import { __RouterContext as RouterContext, RouteComponentProps, StaticContext } from 'react-router'
import { browserHistory, LocationState } from 'utilities/history'

export type Path = H.Path
export type LocationDescriptorObject = H.LocationDescriptorObject

export function useRouter<
  Params extends object = object,
  S extends LocationState = LocationState
>() {
  const context = useContext(RouterContext)
  return context as RouteComponentProps<Params, StaticContext, S>
}

export function useParams<Params extends object = object>() {
  const { match } = useRouter<Params, LocationState>()
  return match.params
}
export function useNavigationState<S extends LocationState = LocationState>() {
  const { location } = useRouter<object, S>()
  return location.state
}

type NavigationConfig = { replace?: boolean; newWindow?: boolean; state?: LocationState }
export function navigate(to: string, config: NavigationConfig = {}) {
  // If we try to navigate to same page, prevent navigation
  if (to === config.state?.from) {
    return
  }
  if (config.newWindow) {
    window.open(to)
    return
  }
  if (config?.replace) {
    browserHistory.replace(to, config.state)
    return
  }

  browserHistory.push(to, config.state)
}
