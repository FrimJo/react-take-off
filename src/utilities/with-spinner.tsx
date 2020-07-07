import { Fade, PropTypes } from '@material-ui/core'
import * as React from 'react'
import styled, { css } from 'styled-components'
import Spinner from 'components/spinner'

type Options = Readonly<{
  color?: string
  size?: number
  css?: ReturnType<typeof css>
}>

type WithSpinnerProps = Readonly<{ showSpinner?: boolean; options?: Options }>

const ChildrenContainer = styled.div<{ visibility: string }>`
  visibility: ${({ visibility }) => visibility};
`

export type WithSpinner = Readonly<{
  color?: PropTypes.Color | string
  disabled?: boolean
}>

const withSpinner = <P extends WithSpinner>(
  Component: React.ComponentType<P>,
  options: Options = {}
) => {
  const SpinnerComponent: React.SFC<P & WithSpinnerProps> = ({
    children,
    showSpinner,
    disabled,
    options: extOptions = {},
    ...rest
  }) => {
    const disabledLocal =
      disabled !== undefined ? disabled : showSpinner !== undefined ? showSpinner : undefined

    return (
      <Component disabled={disabledLocal} {...(rest as P)}>
        <Fade in={showSpinner} unmountOnExit={true}>
          <Spinner
            color={extOptions.color || options.color || 'white'}
            size={extOptions.size || options.size || 16}
            css={extOptions.css || options.css}
            className="mr-1"
          />
        </Fade>
        {/* We use visibility to keep the size of the button when showing spinner*/}
        <ChildrenContainer visibility={showSpinner ? 'hidden' : 'visible'}>
          {children}
        </ChildrenContainer>
      </Component>
    )
  }
  /*
    Change default disabled background-color and text color
    for a dsiabled button if we are using a spinner and we have
    provided a color type that exists as property of the
    theme palette.
    */
  return styled(SpinnerComponent)(({ theme, color, showSpinner }) =>
    showSpinner === true && color !== undefined && theme.palette.hasOwnProperty(color)
      ? css`
          &.MuiButton-contained.Mui-disabled {
            color: ${theme.palette[color].contrastText};
            background-color: ${theme.palette[color].main};
          }
        `
      : ''
  )
}

export default withSpinner
