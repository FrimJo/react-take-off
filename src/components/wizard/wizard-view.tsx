import * as React from 'react'
import WizardContext from './wizard-context'

export default (props: React.PropsWithChildren<{}>) => {
  const { children } = props
  const { currentStep } = WizardContext.useState()
  const childrenArray = React.Children.toArray(children)
  const currentChild = childrenArray[currentStep]
  return <>{currentChild}</>
}
