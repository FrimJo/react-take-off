import { Checkbox, FormControlLabel, CheckboxProps } from '@material-ui/core'
import * as React from 'react'
import { ITodoItem } from 'mocks/handlers'

type Props = { todo: ITodoItem } & CheckboxProps
export default (props: React.PropsWithChildren<Props>) => {
  const { todo, ...rest } = props

  return (
    <FormControlLabel
      control={<Checkbox checked={todo.completed} {...rest} />}
      label={todo.title}
    />
  )
}
