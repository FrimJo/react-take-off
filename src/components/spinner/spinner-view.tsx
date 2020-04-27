import { SerializedStyles } from '@emotion/core'
import * as React from 'react'
import { SpinnerStyle } from './spinner-style'

export type Props = Readonly<{
  color: string
  className?: string
  size?: number
  css?: SerializedStyles
}>

export const SpinnerView: React.FC<Props> = ({ className, size = 64, ...rest }) => (
  <SpinnerStyle size={size} className={className} {...rest}>
    <div />
    <div />
    <div />
    <div />
  </SpinnerStyle>
)
