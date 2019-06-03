import styled, {
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components'

export interface IProps {
  styles: FlattenInterpolation<ThemedStyledProps<IProps, any>>
  primary: boolean
}

const StyledButton = styled.button<IProps>`
  border-radius: 3px;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  ${props => props.styles}
`

export default StyledButton
