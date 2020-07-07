import { WrappedComponentProps } from 'react-intl'

declare module 'react-intl' {
  type intl = WrappedComponentProps['intl']
  export function useIntl(): intl
}
