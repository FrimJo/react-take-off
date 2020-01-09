// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { Fade, PropTypes, useTheme } from '@material-ui/core'
import React from 'react'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'

import { Spinner } from 'components/spinner'

type Options = Readonly<{
  color?: string
  size?: number
}>

type WithSpinnerProps = Readonly<{ showSpinner?: boolean }>

const ChildrenContainer = styled.div<{ visibility: string }>`
  visibility: ${({ visibility }) => visibility};
`

const SpinnerContainer = styled(Spinner)`
  position: absolute;
`

type WithSpinner = Readonly<{
  color?: PropTypes.Color
  disabled?: boolean
  className?: string
}>

const withSpinner = <P extends WithSpinner>(Component: React.ComponentType<P>, options: Options = {}) => {
  const SpinnerComponent: React.FC<P & WithSpinnerProps> = React.memo(
    ({ children, showSpinner, disabled, className, color: themeColor = 'primary', ...rest }) => {
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
          : ''
      return (
        <Component css={styling} disabled={disabled || showSpinner || false} className={className} color={themeColor} {...(rest as P)}>
          <Fade in={showSpinner} unmountOnExit={true}>
            <SpinnerContainer color={color} size={size} className="mr-1" />
          </Fade>
          {/* We use visibility to keep the size of the button whn showing spinner*/}
          <ChildrenContainer visibility={showSpinner ? 'hidden' : 'visible'}>{children}</ChildrenContainer>
        </Component>
      )
    }
  )

  return SpinnerComponent
}

export default withSpinner
