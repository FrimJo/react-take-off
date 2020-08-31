import * as React from 'react'
import { asContext } from 'utilities/as-context'
import { useStaticCallback } from 'utilities/use-static-callback'

type WizardProviderConfig = { totalSteps: number }
type WizardProviderProps = { config: WizardProviderConfig }

const useWizardContext = (props: WizardProviderProps) => {
  const { config } = props

  const [currentStep, setCurrentStep] = React.useState(0)

  const next = useStaticCallback(() => {
    if (currentStep !== config.totalSteps - 1) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  })

  const previous = useStaticCallback(() => {
    if (currentStep !== 0) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  })

  return React.useMemo(() => ({ state: { currentStep }, actions: { previous, next } }), [
    currentStep,
    next,
    previous,
  ])
}

export default asContext(useWizardContext, 'Wizard Context')
