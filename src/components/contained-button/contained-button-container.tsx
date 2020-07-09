import { withSpinner } from 'utilities/with-spinner'
import ContainedButtonView from './contained-button-view'

console.log('ContainedButtonView', ContainedButtonView)
console.log('withSpinner', withSpinner)
const ContainedButtonContainer = withSpinner(ContainedButtonView)

export default ContainedButtonContainer
