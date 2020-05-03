/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { Button as MuiButton, useTheme } from '@material-ui/core'
import { PaletteColor } from '@material-ui/core/styles/createPalette'
import * as React from 'react'
import { withSpinner } from 'utilities/with-spinner'

type MuiButtonProps = React.ComponentProps<typeof MuiButton>
type Color = MuiButtonProps['color'] | 'error' | 'success'

const createSerializedStyles = (paletteColor: PaletteColor): SerializedStyles => {
  return css`
    color: ${paletteColor.contrastText};
    background-color: ${paletteColor.main};
    &:hover {
      background-color: ${paletteColor.dark};
    }
  `
}

export const useStateColor = (
  color: Color
): { css?: SerializedStyles; color?: MuiButtonProps['color'] } => {
  const theme = useTheme()
  return React.useMemo(() => {
    switch (color) {
      case 'error':
      case 'success':
        return {
          css: createSerializedStyles(theme.palette[color]),
        }
      default:
        return {
          color,
        }
    }
  }, [color, theme.palette])
}

type ButtonViewProps = Omit<MuiButtonProps, 'color'> & {
  color: Color
}

const ButtonView: React.FC<ButtonViewProps> = (props) => {
  const { color, ...rest } = props
  const style = useStateColor(color)
  return <MuiButton {...style} {...rest} />
}

export const Button = withSpinner(ButtonView)
