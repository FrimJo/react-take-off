import buildContext from 'utilities/build-context'

export const ComponentNameContext = buildContext(
  () => ({
    state: {},
    actions: {},
  }),
  'ComponentNameContext'
)
