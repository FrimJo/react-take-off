import styled, {
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components'

export interface ICountProps {
  styles: FlattenInterpolation<ThemedStyledProps<ICountProps, any>>
}

const Count = styled.div<ICountProps>`
  ${props => props.styles}
`

export default Count
