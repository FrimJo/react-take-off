import { TextField } from '@material-ui/core'
import * as React from 'react'
import { ContainedButton } from 'components/contained-button'
import { useWizardActions } from 'components/wizard'
import { useForm } from 'utilities/use-form'
import { UserDTO } from '../../wizard-form-example-page-view'

type FormValues = UserDTO['profile']
type Form1ViewProps = { defaultValues: FormValues; onSubmit: (values: FormValues) => void }
const Form1View: React.FC<Form1ViewProps> = (props) => {
  const { defaultValues, onSubmit } = props
  const { name, watch, register, handleSubmit } = useForm({ defaultValues })
  const { next, previous } = useWizardActions()

  return (
    <form
      onSubmit={handleSubmit((values) => {
        next()
        onSubmit(values)
      })}>
      <ContainedButton onClick={previous}>Previous</ContainedButton>
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
      <ContainedButton type="submit">Next</ContainedButton>
      {JSON.stringify(watch(), null, 2)}
    </form>
  )
}

export default Form1View
