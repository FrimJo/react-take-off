import { createBrowserHistory } from 'history'

export type LocationState = { from?: string } | undefined
export default createBrowserHistory<LocationState>()
