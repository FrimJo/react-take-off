import { TextField } from '@material-ui/core'
import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { useDefaultForm } from 'utilities/use-form'

export default (props: React.PropsWithChildren<{}>) => {
  const defaultValues = {
    profile: { firstName: 'Fredrik', lastName: 'Johnasson' },
    info: { address: 'Norra Majorsgatan 24A', city: 'Umeå' },
  }
  const { name, register, handleSubmit, formState, handlePartialSubmit } = useDefaultForm({
    defaultValues,
  })

  return (
    <Page>
      <form
        onSubmit={handleSubmit((value) =>
          alert(
            `Name: ${value.profile.firstName} ${value.profile.lastName}\nStreet: ${value.info.address} ${value.info.city}`
          )
        )}
        css={css`
          display: flex;
          flex-direction: column;
        `}>
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
          onClick={handlePartialSubmit([name.profile], (values) =>
            alert(`Hi ${values.profile.firstName} ${values.profile.lastName}!`)
          )}>
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
          onClick={handlePartialSubmit([name.info], (values) => console.log('test', values))}>
          submit form 2
        </ContainedButton>
        <ContainedButton type="submit">Submit full form</ContainedButton>
        {JSON.stringify(formState, null, 2)}
      </form>
    </Page>
  )

  // return (
  //   <Page>
  //     <form>
  //       <pre>{JSON.stringify(props, null, 2)}</pre>
  //       <Form1
  //         defaultValues={defaultValues.form1}
  //         onSubmit={(value) => alert(`Hi ${value.firstName} ${value.lastName}!`)}
  //       />
  //       <Form2 />
  //       <ContainedButton type="submit">Submit full form</ContainedButton>
  //     </form>
  //   </Page>
  // )
}
