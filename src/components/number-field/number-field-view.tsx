import { TextField, TextFieldProps, InputProps } from '@material-ui/core'
import * as React from 'react'

export default function (props: TextFieldProps) {
  const { onChange, ...rest } = props
  const handleChange: InputProps['onChange'] = React.useCallback(
    (event) => {
      console.log(
        'value in number-field',
        event.target.value,
        typeof event.target.value === 'number',
        +event.target.value
      )
      return onChange?.({
        ...event,
        target: {
          ...event.target,
          value: +event.target.value,
        },
      })
    },
    [onChange]
  )
  return <TextField type="number" onChange={handleChange} {...rest} />
}
