import { RouteProps, generatePath } from 'react-router'

type PageRoute = Omit<RouteProps, 'path' | 'component'> & {
  path: string
  component: React.ComponentType
}

export function generateRoute<Params extends {} | void = void>(
  props: {
    pattern: string
  } & Omit<PageRoute, 'path'>
): { props: PageRoute; generatePath: (params: Params) => string } {
  const { pattern, exact, component: Component, ...rest } = props
  return {
    props: {
      path: pattern,
      exact,
      component: Component,
      ...rest,
    },
    generatePath: curryPath<Params>(pattern),
  }
}

function curryPath<T extends {} | void = void>(pattern: string) {
  return function (params: T) {
    if (params === void 0) return pattern
    return generatePath(pattern, params as {})
  }
}
