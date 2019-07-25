import React from 'react'

import SpinnerStyle from './spinner-style'

export type Props = Readonly<{
  className?: string | null
  color: string
  size?: number
}>

const SpinnerView: React.SFC<Props> = ({ className, size = 64, ...props }) => (
  <SpinnerStyle size={size} className={className || ''} {...props}>
    <div />
    <div />
    <div />
    <div />
  </SpinnerStyle>
)

export default SpinnerView
