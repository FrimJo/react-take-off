import { keyframes, css } from '@emotion/core'
import styled from '@emotion/styled'

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

type StyledProps = Readonly<{
  color: string
  size: number
}>

export const SpinnerStyle = styled.div<StyledProps>(
  ({ size, color }) => css`
    display: inline-block;
    position: relative;
    width: ${size}px;
    height: ${size}px;

    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: ${size * 0.8}px;
      height: ${size * 0.8}px;
      max-width: ${size * 0.8}px;
      max-height: ${size * 0.8}px;
      margin: ${size * 0.09375}px;
      border: ${size * 0.09375}px solid ${color};
      border-radius: 50%;
      animation: ${rotate360} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${color} transparent transparent transparent;

      &:nth-of-type(1) {
        animation-delay: -0.45s;
      }
      &:nth-of-type(2) {
        animation-delay: -0.3s;
      }
      &:nth-of-type(3) {
        animation-delay: -0.15s;
      }
    }
  `
)
