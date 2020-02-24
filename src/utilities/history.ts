import { createBrowserHistory, LocationDescriptorObject as LDO, Path, LocationState } from 'history'

export const history = createBrowserHistory<({ from: Path } & LocationState) | undefined>()
export type LocationDescriptorObject = LDO
