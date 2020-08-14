import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { Form1 } from './components/form-1'
import { Form2 } from './components/form-2'

export type UserDTO = {
  profile: { firstName: string; lastName: string }
  info: { address: string; city: string }
}

export default (props: React.PropsWithChildren<{}>) => {
  const defaultValues: UserDTO = {
    profile: { firstName: '', lastName: '' },
    info: { address: '', city: '' },
  }
  const [state, setState] = React.useState(defaultValues)
  const [step, setStep] = React.useState(0)
  return (
    <Page>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}>
        {step === 0 && (
          <Form1
            defaultValues={defaultValues.profile}
            onSubmit={(profile) => {
              setState((prevState) => ({ ...prevState, profile }))
              setStep(1)
            }}
          />
        )}
        {step === 1 && (
          <Form2
            defaultValues={defaultValues.info}
            onSubmit={(info) => {
              setState((prevState) => ({ ...prevState, info }))
              setStep(2)
            }}
          />
        )}
        {step === 2 && (
          <ContainedButton
            onClick={() =>
              alert(
                `Name: ${state.profile.firstName} ${state.profile.lastName}\nStreet: ${state.info.address} ${state.info.city}`
              )
            }>
            Submit full form
          </ContainedButton>
        )}
        {JSON.stringify(state, null, 2)}
      </div>
    </Page>
  )
}
