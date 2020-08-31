import { useTheme } from '@material-ui/core'
import * as React from 'react'
import { css } from 'styled-components'
import SpinnerStyle from './spinner-style'

export type Props = Readonly<{
  className?: string | null
  color?: string
  size?: number
  css?: ReturnType<typeof css>
}>

const SpinnerView: React.SFC<Props> = ({ className, size = 64, color, ...props }) => {
  const theme = useTheme()
  return (
    <SpinnerStyle
      size={size}
      className={className || undefined}
      color={color ?? theme.palette.secondary.main}
      {...props}>
      <div />
      <div />
      <div />
      <div />
    </SpinnerStyle>
  )
}
export default SpinnerView
