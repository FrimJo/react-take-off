import { TextField } from '@material-ui/core'
import * as React from 'react'
import { UseFormMethods } from 'react-hook-form'
import { ContainedButton } from 'components/contained-button'
import { Name } from 'types'
import { useNestedForm } from 'utilities/use-form'
import { UserDTO } from '../../nested-form-example-page-view'

type FormValues = UserDTO['info']
type Form2ViewProps = {
  info: FormValues
  onSubmit: (values: FormValues) => void
  register: UseFormMethods<FormValues>['register']
  name: Name<FormValues>
}
const Form2View: React.FC<Form2ViewProps> = (props) => {
  const { info, onSubmit, name } = props
  const { handleSubmit, watch, register } = useNestedForm<Form2ViewProps>({
    register: props.register,
    defaultValues: { info },
  })
  return (
    <form onSubmit={handleSubmit(({ info }) => onSubmit(info))}>
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
      <ContainedButton type="submit">submit form 2</ContainedButton>
      {JSON.stringify(watch(), null, 2)}
    </form>
  )
}

export default Form2View
