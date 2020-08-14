import { TextField } from '@material-ui/core'
import * as React from 'react'
import { UseFormMethods } from 'react-hook-form'
import { ContainedButton } from 'components/contained-button'
import { Name } from 'types'
import { useNestedForm } from 'utilities/use-form'
import { UserDTO } from '../../nested-form-example-page-view'

type FormValues = UserDTO['profile']
type Form1ViewProps = {
  profile: FormValues
  onSubmit: (values: FormValues) => void
  register: UseFormMethods<FormValues>['register']
  name: Name<FormValues>
}
const Form1View: React.FC<Form1ViewProps> = (props) => {
  const { profile, onSubmit, name } = props
  const { handleSubmit, watch, register } = useNestedForm({
    register: props.register,
    defaultValues: { profile },
  })

  return (
    <form onSubmit={handleSubmit(({ profile }) => onSubmit(profile))}>
      <TextField
        variant="outlined"
        label="First name"
        name={name.firstName}
        inputRef={register({ required: true })}
      />
      <TextField
        variant="outlined"
        label="Last name"
        name={name.lastName}
        inputRef={register({ required: true })}
      />
      <ContainedButton type="submit">submit form 1</ContainedButton>
      {JSON.stringify(watch(), null, 2)}
    </form>
  )
}

export default Form1View
