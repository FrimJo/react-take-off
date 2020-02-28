import buildContext from 'utilities/build-context'
import { Machine, send as globalSend, sendParent, interpret, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import { history } from 'utilities/history'
import React from 'react'
import { getObjectPath, getEvents, getMeta } from './navigation-utilities'
import { AuthenticationContext } from 'components/authentication/authentication-context'
import { api } from 'api/api'

const initialPathname = history.location.pathname.slice(1).replace('/', '.')

type UseMachingContext = { isLoading: boolean }
const userMachine = Machine<UseMachingContext>({
  id: 'user',
  initial: 'idle',
  context: {
    isLoading: false,
  },
  states: {
    idle: {
      entry: (context, event) => console.log('user.idle entry', context, event),
      on: {
        FETCH_USER: { target: 'loading', actions: () => console.log('FETCH_USER') },
      },
    },
    loading: {
      entry: () => assign({ isLoading: true }),
      exit: () => assign({ isLoading: false }),
      invoke: {
        id: 'getUser',
        src: context => {
          console.log('user.loading.invoke.src')
          return api.getUserAsync(5)
        },
        onDone: {
          target: 'success',
          actions: () => console.log('user.loading.invoke.onDone'),
        },
        onError: {
          target: 'failure',
          actions: () => console.log('user.loading.invoke.onError'),
        },
      },
    },
    success: {
      type: 'final',
      data: (context, event) => event.data,
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
})

// const userService = interpret(userMachine)
//   .onTransition(state => {
//     console.log('userService', state)
//   })
//   .start()
type NavigationMachingContext = { isLoggedIn: boolean }
const navigationMachine = Machine<NavigationMachingContext>({
  id: 'navigator',
  initial: 'idle',
  context: { isLoggedIn: false },
  states: {
    idle: {
      entry: 'initialize',
      on: {
        CONTINUE: initialPathname,
        LOGOUT: 'account.authenticate',
      },
    },
    account: {
      initial: 'authenticate',
      states: {
        authenticate: {
          invoke: {
            // autoForward: true
            id: 'user',
            src: userMachine,
            onDone: {
              target: '#start',
              actions: () => assign({ isLoggedIn: true }),
            },
            onError: {
              actions: () => console.log('navigator.account.authenticate.userMachine.onError'),
            },
          },
          on: {
            LOGIN: {
              actions: globalSend('FETCH_USER', { to: 'user' }),
            },
            FORGOT_PASSWORD: 'forgot-password',
          },
        },
        'forgot-password': {
          on: {
            BACK: 'authenticate',
          },
        },
      },
    },
    start: {
      id: 'start',
      meta: { isPrivate: true },
      on: {
        LOGOUT: 'account.authenticate',
        BLOG: 'blog',
      },
    },
    blog: {
      meta: { isPrivate: true },
      on: {
        LOGOUT: 'account.authenticate',
        BACK: 'start',
      },
    },
  },
})

function useActions() {
  const { isLoggedIn } = AuthenticationContext.useState()
  const initialize = React.useMemo(
    () =>
      globalSend(() => {
        const continueState = navigationMachine.transition('idle', 'CONTINUE')
        const { isPrivate } = getMeta(getObjectPath(continueState.value), continueState.meta)

        return isPrivate && !isLoggedIn ? { type: 'LOGOUT' } : { type: 'CONTINUE' }
      }),
    [isLoggedIn]
  )
  return { initialize }
}

function useGuards() {
  const { isLoggedIn } = AuthenticationContext.useState()
  const loginGuard = React.useCallback(
    (context, event) => {
      console.log('loginGuard', isLoggedIn, context, event)
      return context.isLoggedIn
    },
    [isLoggedIn]
  )

  return { loginGuard }
}

// function useServices() {
//   const { isLoggedIn } = AuthenticationContext.useState()
//   const getUser = React.useCallback(() => {
//     console.log('getUser', isLoggedIn)
//     return new Promise((resolve, reject) => resolve({ id: 5, name: '' }))
//   }, [isLoggedIn])

//   return { getUser }
// }

function getUrl(path: string[]): string {
  return '/' + path.join('/')
}

export function useNavigationContext() {
  const actions = useActions()
  const guards = useGuards()
  // const services = useServices()
  // const [pingState, pingSend, pingService] = useMachine(pingMachine)
  const [state, send, service] = useMachine(navigationMachine as any, {
    actions,
    guards,
    immediate: true,
  })
  const path = React.useMemo(() => getUrl(getObjectPath(state.value)), [state.value])

  const events = React.useMemo(
    () => getEvents(getObjectPath(state.value), navigationMachine.states),
    [state.value]
  )

  React.useEffect(() => {
    const subscription = service.subscribe(state => {
      console.log('useEffect service', state)
      const to = getUrl(getObjectPath(state.value))
      history.push(to)
    })
    return subscription.unsubscribe
  }, [service])

  return { state: { path, events }, actions: { send } }
}

export const NavigationContext = buildContext(useNavigationContext, 'NavigationContext')
