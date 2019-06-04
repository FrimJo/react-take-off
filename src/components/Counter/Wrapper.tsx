import styled, {
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components'

export interface IWrapperProps {
  styles?: FlattenInterpolation<ThemedStyledProps<IWrapperProps, any>>
  primary: boolean
}

const Wrapper = styled.div<IWrapperProps>`
  ${props => props.styles}
`

export default Wrapper
