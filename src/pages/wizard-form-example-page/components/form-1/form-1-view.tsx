import { TextField } from '@material-ui/core'
import * as React from 'react'
import { ContainedButton } from 'components/contained-button'
import { useForm } from 'utilities/use-form'
import { UserDTO } from '../../wizard-form-example-page-view'

type FormValues = UserDTO['profile']
type Form1ViewProps = { defaultValues: FormValues; onSubmit: (values: FormValues) => void }
const Form1View: React.FC<Form1ViewProps> = (props) => {
  const { defaultValues, onSubmit } = props
  const { handleSubmit, name, watch, register } = useForm({ defaultValues })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
