/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { Button as MuiButton, useTheme } from '@material-ui/core'
import { PaletteColor } from '@material-ui/core/styles/createPalette'
import React from 'react'
import withSpinner from 'utilities/with-spinner'

type MuiButtonProps = React.ComponentProps<typeof MuiButton>
type Color = MuiButtonProps['color'] | 'error' | 'success'

const createSerializedStyles = (paletteColor: PaletteColor): SerializedStyles => {
  console.log('paletteColor', paletteColor)
  return css`
    color: ${paletteColor.contrastText};
    background-color: ${paletteColor.main};
    &:hover {
      background-color: ${paletteColor.dark};
    }
  `
}

const useStateColor = (
  color: Color
): { css?: SerializedStyles; color?: MuiButtonProps['color'] } => {
  const theme = useTheme()
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
}

type ButtonViewProps = Omit<MuiButtonProps, 'color'> & {
  color: Color
}

const ButtonView: React.FC<ButtonViewProps> = ({ color, ...rest }) => {
  const style = useStateColor(color)
  return <MuiButton {...style} {...rest} />
}

export default withSpinner(ButtonView)
