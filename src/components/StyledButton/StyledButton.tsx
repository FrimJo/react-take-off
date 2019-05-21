import styled, {
  FlattenInterpolation,
  ThemedStyledProps,
} from 'styled-components'

export type Props = {
  styles: FlattenInterpolation<ThemedStyledProps<Props, any>>
  primary: boolean
}

const StyledButton = styled.button<Props>`
  border-radius: 3px;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  ${props => props.styles}
`

export default StyledButton
