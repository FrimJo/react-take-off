import { PropTypes } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import * as React from 'react'

type Color = PropTypes.Color | 'error' | 'success'

type ButtonProps = React.ComponentProps<typeof Button>

export type ContainedButtonProps = Omit<ButtonProps, 'variant' | 'color'> & {
  position?: 'relative' | 'fixed'
  color?: Color
  forwardRef?: ButtonProps['ref']
}

const ContainedButtonView: React.SFC<ContainedButtonProps> = (props) => {
  const { color, forwardRef, position, ...rest } = props
  return (
    <Button
      variant="contained"
      color={color === 'error' || color === 'success' ? 'default' : color}
      ref={forwardRef}
      {...rest}
    />
  )
}

export default ContainedButtonView
