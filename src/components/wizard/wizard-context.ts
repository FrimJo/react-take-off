import * as React from 'react'
import { asContext } from 'utilities/as-context'

type WizardProviderConfig = { totalSteps: number }
type WizardProviderProps = { config: WizardProviderConfig }

const useWizardContext = (props: WizardProviderProps) => {
  const { config } = props

  const [currentStep, setCurrentStep] = React.useState(0)

  const next = React.useCallback(() => {
    if (currentStep !== config.totalSteps - 1) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }, [config.totalSteps, currentStep])

  const previous = React.useCallback(() => {
    if (currentStep !== 0) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }, [currentStep])

  return React.useMemo(() => ({ state: { currentStep }, actions: { previous, next } }), [
    currentStep,
    next,
    previous,
  ])
}

export default asContext(useWizardContext, 'Wizard Context')
