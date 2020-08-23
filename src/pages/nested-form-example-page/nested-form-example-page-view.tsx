import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { useForm } from 'utilities/use-form'
import { Form1 } from './components/form-1'
import { Form2 } from './components/form-2'

export type UserDTO = {
  profile: { firstName: string; lastName: string }
  info: { address: string; city: string }
}

export default () => {
  const defaultValues: UserDTO = {
    profile: { firstName: '', lastName: '' },
    info: { address: '', city: '' },
  }

  const { handleSubmit, register, watch, name } = useForm({ defaultValues })

  return (
    <Page>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}>
        <form
          onSubmit={handleSubmit(({ profile, info }) => {
            alert(
              `Name: ${profile.firstName} ${profile.lastName}\nStreet: ${info.address} ${info.city}`
            )
          })}>
          <Form1
            profile={defaultValues.profile}
            onSubmit={(profile) => alert(`Name: ${profile.firstName} ${profile.lastName}`)}
            register={register}
            name={name.profile}
          />
          <Form2
            info={defaultValues.info}
            onSubmit={(info) => alert(`Address: ${info.address} ${info.city}`)}
            register={register}
            name={name.info}
          />
          <ContainedButton type="submit">Submit full form</ContainedButton>
        </form>
        {JSON.stringify(watch(), null, 2)}
      </div>
    </Page>
  )
}
