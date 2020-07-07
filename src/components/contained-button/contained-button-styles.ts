import styled, { css } from 'styled-components/macro'
import ContainedButtonContainer from './contained-button-container'

const ContainedButtonStyle = styled(ContainedButtonContainer)`
  ${({ position = 'relative' }) => css`
    position: ${position};
    ${position === 'fixed' &&
    css`
      height: 40px;
      border-radius: 0;
      margin-left: -16px;
      margin-right: -16px;
      bottom: 0;

      &.Mui-disabled {
        background-color: #e0e0e0;
      }
    `}
  `}

  ${({ color = 'primary', theme }) => css`
    background-color: ${theme.palette[color].main};
    color: ${theme.palette[color].contrastText};

    &:hover {
      background-color: ${theme.palette[color].dark};
    }
  `}
`

export default ContainedButtonStyle
