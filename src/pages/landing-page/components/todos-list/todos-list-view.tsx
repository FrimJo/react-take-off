import {
  FormControl,
  FormGroup,
  FormLabel,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import * as React from 'react'
import { Controller } from 'react-hook-form'
import { ContainedButton } from 'components/contained-button'
import { NumberField } from 'components/number-field'
import { ITodoItem } from 'mocks/handlers'
import { useForm } from 'utilities/use-form'

type Props = { todos: ITodoItem[] }

export default (props: React.PropsWithChildren<Props>) => {
  const { todos } = props
  const { handleSubmit, register, name, control } = useForm({
    defaultValues: { todos },
  })

  return (
    <div>
      <form onSubmit={handleSubmit((values) => console.log('values', values))}>
        <FormControl component="fieldset">
          <FormLabel component="legend">All toods</FormLabel>
          <FormGroup>
            <List dense>
              {todos.map((todo, index) => (
                <ListItem key={todo.id}>
                  <Controller
                    control={control}
                    name={name.todos[index].id}
                    as={NumberField}
                    type="hidden"
                  />
                  <input type="hidden" ref={register} name={name.todos[index].title} />
                  <ListItemIcon>
                    <Checkbox
                      defaultChecked={todo.completed}
                      name={name.todos[index].completed}
                      inputRef={register}
                    />
                  </ListItemIcon>
                  <ListItemText>{todo.title}</ListItemText>
                </ListItem>
              ))}
            </List>
          </FormGroup>
          <ContainedButton type="submit">Save</ContainedButton>
        </FormControl>
      </form>
    </div>
  )
}
