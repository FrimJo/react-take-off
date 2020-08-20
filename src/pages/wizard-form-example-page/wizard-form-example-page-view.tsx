import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { Wizard } from 'components/wizard'
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

  return (
    <Page>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}>
        <Wizard>
          <Form1
            defaultValues={state.profile}
            onSubmit={(profile) => {
              setState((prevState) => ({ ...prevState, profile }))
            }}
          />
          <Form2
            defaultValues={state.info}
            onSubmit={(info) => {
              setState((prevState) => ({ ...prevState, info }))
            }}
          />
          <ContainedButton
            onClick={() =>
              alert(
                `Name: ${state.profile.firstName} ${state.profile.lastName}\nStreet: ${state.info.address} ${state.info.city}`
              )
            }>
            Submit full form
          </ContainedButton>
        </Wizard>
      </div>
      {JSON.stringify(state, null, 2)}
    </Page>
  )
}
