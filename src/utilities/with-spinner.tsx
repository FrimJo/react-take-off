/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { Fade, PropTypes, useTheme } from '@material-ui/core'
import * as React from 'react'
import { SpinnerView } from 'components/spinner/spinner-view'

type Options = Readonly<{
  color?: string
  size?: number
}>

type WithSpinnerProps = Readonly<{ showSpinner?: boolean }>

const ChildrenContainer = styled.div<{ visibility: string }>`
  visibility: ${({ visibility }) => visibility};
`

const SpinnerContainer = styled(SpinnerView)`
  position: absolute;
`

type WithSpinner = Readonly<{
  color?: PropTypes.Color
  disabled?: boolean
  className?: string
}>

export function withSpinner<P extends WithSpinner>(
  Component: React.ComponentType<P>,
  options: Options = {}
) {
  function WrapedComponent(props: React.PropsWithChildren<P & WithSpinnerProps>) {
    const {
      children,
      showSpinner,
      disabled,
      className,
      color: themeColor = 'primary',
      ...rest
    } = props

    const { color = 'white', size = 16 } = options
    const theme = useTheme()

    /*
      Change default disabled background-color and text color
      for a dsiabled button if we are using a spinner.
    */
    const hasColorProp = Object.prototype.hasOwnProperty.call(theme.palette, themeColor)
    const styling =
      showSpinner !== undefined && hasColorProp
        ? css`
            &.MuiButton-contained.Mui-disabled {
              color: ${theme.palette[themeColor].contrastText};
              background-color: ${theme.palette[themeColor].dark};
            }
          `
        : css``
    return (
      <Component
        css={styling}
        disabled={disabled || showSpinner || false}
        className={className}
        color={themeColor}
        {...(rest as P)}>
        <Fade in={showSpinner} unmountOnExit={true}>
          <SpinnerContainer color={color} size={size} className="mr-1" />
        </Fade>
        {/* We use visibility to keep the size of the button when showing spinner*/}
        <ChildrenContainer visibility={showSpinner ? 'hidden' : 'visible'}>
          {children}
        </ChildrenContainer>
      </Component>
    )
  }
  return React.memo(WrapedComponent)
}
