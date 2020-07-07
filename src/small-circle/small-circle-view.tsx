import { useTheme, fade } from '@material-ui/core'
import { ArrowDown } from 'mdi-material-ui'
import * as React from 'react'
import { css } from 'styled-components'

type SmallCircleViewProps = {
  size: number
  color?: string
  className?: string
}

const SmallCircleView: React.FC<SmallCircleViewProps> = (props) => {
  const { color: colorProp = 'primary', size, className } = props
  const theme = useTheme()
  const color = theme.palette[colorProp]?.main ?? colorProp
  const backgroundColor = fade(color, 0.2)
  return (
    <div
      className={className}
      css={css`
        position: relative;
        background-color: ${backgroundColor};
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
      `}>
      <ArrowDown
        css={css`
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 50%;
          color: ${color};
        `}
      />
    </div>
  )
}

export default SmallCircleView
