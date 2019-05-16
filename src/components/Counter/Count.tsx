import styled, {
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components'

export type CountProps = {
  styles: FlattenInterpolation<ThemedStyledProps<CountProps, any>>
}

const Count = styled.div<CountProps>`
  ${props => props.styles}
`

export default Count
