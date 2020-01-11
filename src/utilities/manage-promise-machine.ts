import { Machine, StateSchema, assign } from 'xstate'

export interface ILightContext {
  error: any[]
  promises: boolean[]
}

interface ILightStateSchema extends StateSchema<ILightContext> {
  states: {
    idle: {}
    pending: {}
  }
}

type LightEvent =
  | {
      type: 'INIT'
      silent?: boolean
    }
  | { type: 'RESOLVE' }
  | { type: 'REJECT'; error: ILightContext['error'][number] }

export const ManagePromiseMachine = Machine<ILightContext, ILightStateSchema, LightEvent>({
  id: 'managePromise',
  initial: 'idle',
  context: {
    error: [],
    promises: [],
  },
  states: {
    idle: {
      on: {
        INIT: {
          target: 'pending',
          actions: assign({
            error: (context, event) => [],
            promises: (context, event) => [...context.promises, !!event.silent],
          }),
        },
      },
    },
    pending: {
      on: {
        '': {
          cond: (context, event) => context.promises.length === 0,
          target: 'idle',
        },
        INIT: {
          actions: assign({
            promises: (context, event) => [...context.promises, !!event.silent],
          }),
        },
        RESOLVE: {
          actions: assign({
            promises: (context, event) => context.promises.slice(0, context.promises.length - 1),
          }),
        },
        REJECT: {
          actions: assign({
            error: (context, event) => [...context.error, event.error],
            promises: (context, event) => context.promises.slice(0, context.promises.length - 1),
          }),
        },
      },
    },
  },
})
