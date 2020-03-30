import React from 'react'
import { SpinnerStyle } from './spinner-style'
import { SerializedStyles } from '@emotion/core'

export type Props = Readonly<{
  color: string
  className?: string | null
  size?: number
  css?: SerializedStyles
}>

export const SpinnerView: React.FC<Props> = ({ className, size = 64, ...props }) => (
  <SpinnerStyle size={size} className={className ?? ''} {...props}>
    <div />
    <div />
    <div />
    <div />
  </SpinnerStyle>
)
