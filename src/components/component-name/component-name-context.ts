import { createContext } from 'utilities/create-context'

export const ComponentNameContext = createContext(() => ({
  state: {},
  actions: {},
}))
