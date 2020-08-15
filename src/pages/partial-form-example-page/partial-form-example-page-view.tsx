import { TextField } from '@material-ui/core'
import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { useForm } from 'utilities/use-form'

export type UserDTO = {
  profile: { firstName: string; lastName: string }
  info: { address: string; city: string }
}

export default (props: React.PropsWithChildren<{}>) => {
  const defaultValues: UserDTO = {
    profile: { firstName: '', lastName: '' },
    info: { address: '', city: '' },
  }

  const { name, handlePartialSubmit, handleSubmit, register, watch } = useForm({ defaultValues })

  return (
    <Page>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}>
        <form
          onSubmit={handleSubmit(({ profile, info }) =>
            alert(
              `Name: ${profile.firstName} ${profile.lastName}\nStreet: ${info.address} ${info.city}`
            )
          )}>
          <TextField
            variant="outlined"
            label="First name"
            name={name.profile.firstName}
            inputRef={register({ required: true })}
          />
          <TextField
            variant="outlined"
            label="Last name"
            name={name.profile.lastName}
            inputRef={register({ required: true })}
          />
          <ContainedButton
            onClick={handlePartialSubmit([name.profile], ({ profile }) => {
              alert(`First name: ${profile.firstName}\nLast name: ${profile.lastName}`)
            })}>
            submit form 1
          </ContainedButton>

          <TextField
            variant="outlined"
            label="Address"
            name={name.info.address}
            inputRef={register({ required: true })}
          />
          <TextField
            variant="outlined"
            label="City"
            name={name.info.city}
            inputRef={register({ required: true })}
          />
          <ContainedButton
            onClick={handlePartialSubmit([name.info], ({ info }) =>
              alert(`Address: ${info.address}\nCity: ${info.city}`)
            )}>
            submit form 2
          </ContainedButton>

          <ContainedButton type="submit">Submit full form</ContainedButton>
        </form>
        {JSON.stringify(watch(), null, 2)}
      </div>
    </Page>
  )
}
