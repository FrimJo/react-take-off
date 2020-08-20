import { TextField } from '@material-ui/core'
import * as React from 'react'
import { ContainedButton } from 'components/contained-button'
import { useWizardActions } from 'components/wizard'
import { useForm } from 'utilities/use-form'
import { UserDTO } from '../../wizard-form-example-page-view'

type FormValues = UserDTO['info']
type Form2ViewProps = { defaultValues: FormValues; onSubmit: (values: FormValues) => void }
const Form2View: React.FC<Form2ViewProps> = (props) => {
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
        label="Address"
        name={name.address}
        inputRef={register({ required: true })}
      />
      <TextField
        variant="outlined"
        label="City"
        name={name.city}
        inputRef={register({ required: true })}
      />
      <ContainedButton type="submit">Next</ContainedButton>

      {JSON.stringify(watch(), null, 2)}
    </form>
  )
}

export default Form2View
