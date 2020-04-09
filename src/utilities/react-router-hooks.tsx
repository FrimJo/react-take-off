// react-router-hooks.js

import * as H from 'history'
import { useContext } from 'react'
import { __RouterContext as RouterContext, RouteComponentProps, StaticContext } from 'react-router'
import { history } from 'utilities/history'

export type Path = H.Path
export type LocationDescriptorObject = H.LocationDescriptorObject

export function useRouter<
  Params extends object = object,
  S extends H.LocationState = H.LocationState
>() {
  const context = useContext(RouterContext)
  return context as RouteComponentProps<Params, StaticContext, S>
}

export function useParams<
  Params extends object = object,
  S extends H.LocationState = H.LocationState
>() {
  const { match } = useRouter<Params, S>()
  return match.params
}

export function navigate(to: H.Path, { replace = false } = {}) {
  if (replace) {
    history.replace(to, { from: history.location.pathname })
  } else {
    history.push(to, { from: history.location.pathname })
  }
}
