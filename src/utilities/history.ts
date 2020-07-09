import { createBrowserHistory } from 'history'

export type LocationState = { from?: string } | undefined
export const browserHistory = createBrowserHistory<LocationState>()
