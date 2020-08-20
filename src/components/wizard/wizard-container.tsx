import * as React from 'react'
import WizardContext from './wizard-context'
import WizardView from './wizard-view'

export default (props: React.PropsWithChildren<{}>) => {
  const { children } = props
  const childCount = React.Children.count(children)
  return (
    <WizardContext.Provider config={{ totalSteps: childCount }}>
      <WizardView>{children}</WizardView>
    </WizardContext.Provider>
  )
}
