import { lazyProps } from 'lazy-props'
import * as React from 'react'

type Promisify<T> = { [K in keyof T]: Promise<T[K]> | T[K] }

export function lazyComponent<PartialProps extends {}, Props extends PartialProps>(
  component: (props: Props) => JSX.Element,
  willBeProps: Promisify<PartialProps>,
  fallback: (error?: Error) => React.ReactElement<any, any>
) {
  return React.lazy(() =>
    lazyProps(component, willBeProps).catch((error) => ({
      default: () => fallback(error),
    }))
  )
}
