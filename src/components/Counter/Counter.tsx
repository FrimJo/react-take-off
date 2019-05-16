import React, { FunctionComponent } from 'react'
import { WrapperProps } from './Wrapper'
import { CountProps } from './Count'
import styled, {
  FlattenInterpolation,
  ThemedStyledProps,
  StyledComponent,
} from 'styled-components'

type Props = {
  styles?: {
    Wrapper?: FlattenInterpolation<ThemedStyledProps<WrapperProps, any>>
    Count?: FlattenInterpolation<ThemedStyledProps<CountProps, any>>
  }
}

type PassThrough = (
  nodeName: 'Wrapper' | 'Counter',
  props: object,
  instance: any
) => object

type getCounterProps = {
  Wrapper: StyledComponent<any, any, WrapperProps, never>
  Count: StyledComponent<any, any, CountProps, never>
}

const getCounter = ({
  Wrapper,
  Count,
}: getCounterProps): FunctionComponent<Props> => ({
  children,
  styles = {},
}) => (
  <Wrapper styles={styles.Wrapper} primary>
    <Count styles={styles.Count}>{children}</Count>
  </Wrapper>
)

const Counter = getCounter({
  Wrapper: styled.div<WrapperProps>`
    background-color: purple;
    height: 100px;
    width: 100px;
    ${props => props.styles}
  `,
  Count: styled.div<CountProps>`
    color: white;
    display: block;
    text-align: center;
    ${props => props.styles}
  `,
})

export default Counter
