import React, { FunctionComponent } from 'react'
import styled, {
  FlattenInterpolation,
  StyledComponent,
  ThemedStyledProps,
} from 'styled-components'
import { ICountProps } from './Count'
import { IWrapperProps } from './Wrapper'

interface IProps {
  styles?: {
    Wrapper?: FlattenInterpolation<ThemedStyledProps<IWrapperProps, any>>
    Count?: FlattenInterpolation<ThemedStyledProps<ICountProps, any>>
  }
}

interface IGetCounterProps {
  Wrapper: StyledComponent<any, any, IWrapperProps, never>
  Count: StyledComponent<any, any, ICountProps, never>
}

const getCounter = ({
  Wrapper,
  Count,
}: IGetCounterProps): FunctionComponent<IProps> => ({
  children,
  styles = {},
}) => (
  <Wrapper styles={styles.Wrapper} primary={true}>
    <Count styles={styles.Count}>{children}</Count>
  </Wrapper>
)

const Counter = getCounter({
  Wrapper: styled.div<IWrapperProps>`
    background-color: purple;
    height: 100px;
    width: 100px;
    ${props => props.styles}
  `,
  Count: styled.div<ICountProps>`
    color: white;
    display: block;
    text-align: center;
    ${props => props.styles}
  `,
})

export default Counter
