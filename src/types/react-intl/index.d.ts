import { InjectedIntlProps } from 'react-intl'

export function useIntl(): intl {
  // do nothing.
}

declare module 'react-intl' {
  type intl = InjectedIntlProps['intl']
}
