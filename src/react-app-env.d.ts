/// <reference types="react-scripts" />

import { InjectedIntlProps } from 'react-intl';

declare module 'react-intl' {
  type intl = InjectedIntlProps['intl'];
  export function useIntl(): intl {}
}