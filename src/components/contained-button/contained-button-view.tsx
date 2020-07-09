import { Button, PropTypes } from '@material-ui/core'
import * as React from 'react'
import { css, useTheme } from 'styled-components'

type Color = PropTypes.Color | 'error' | 'success'

type ButtonProps = React.ComponentProps<typeof Button>

export type ContainedButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'ref'> & {
  position?: 'relative' | 'fixed'
  color?: Color
  forwardRef?: ButtonProps['ref']
}

const ContainedButtonView: React.SFC<ContainedButtonProps> = (props) => {
  const { color = 'primary', forwardRef, position, ...rest } = props
  const theme = useTheme()

  return (
    <Button
      css={css`
        position: ${position}px;

        ${
          position === 'fixed'
            ? css`
                height: 40px;
                border-radius: 0;
                margin-left: -16px;
                margin-right: -16px;
                bottom: 0;

                &.Mui-disabled {
                  background-color: #e0e0e0;
                }
              `
            : undefined
        }

        background-color: ${theme.palette[color].main};
        color: ${theme.palette[color].contrastText};

         &:hover {
           background-color: ${theme.palette[color].dark};
        }
      `}
      variant="contained"
      color={color === 'error' || color === 'success' ? 'default' : color}
      ref={forwardRef}
      {...rest}
    />
  )
}

export default ContainedButtonView
