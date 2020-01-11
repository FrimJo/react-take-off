import { Machine, StateSchema, assign } from 'xstate'

export interface IContext {
  error: any[]
  count: number
}

interface IStateSchema extends StateSchema<IContext> {
  states: {
    idle: {}
    pending: {}
  }
}

type Event = { type: 'INIT' } | { type: 'RESOLVE' } | { type: 'REJECT'; error: IContext['error'][number] }

export const ManagePromiseMachine = Machine<IContext, IStateSchema, Event>({
  id: 'managePromise',
  initial: 'idle',
  context: {
    error: [],
    count: 0,
  },
  states: {
    idle: {
      on: {
        INIT: {
          target: 'pending',
          actions: assign({
            error: (context, event) => [],
            count: (context, event) => 1,
          }),
        },
      },
    },
    pending: {
      on: {
        '': {
          cond: (context, event) => context.count === 0,
          target: 'idle',
        },
        INIT: {
          actions: assign({
            count: (context, event) => context.count + 1,
          }),
        },
        RESOLVE: {
          actions: assign({
            count: (context, event) => context.count - 1,
          }),
        },
        REJECT: {
          actions: assign({
            error: (context, event) => [...context.error, event.error],
            count: (context, event) => context.count - 1,
          }),
        },
      },
    },
  },
})
