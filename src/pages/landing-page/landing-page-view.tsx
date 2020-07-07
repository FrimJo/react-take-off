import { Typography } from '@material-ui/core'
import * as React from 'react'
import { css } from 'styled-components'
import { BottomNavigationExample, Page } from 'components'
import { useFormatMessage } from 'localization'
import TodoQuery from 'queries/todo-query'

const LandingPageView: React.FC = () => {
  const id = 4
  const { todo } = TodoQuery.useTodo(id)
  const f = useFormatMessage()
  if (!todo) {
    return <div>no todo item received with id {id}</div>
  }
  return (
    <Page iOSStatusbarColor="black" bottomNavbarComponent={<BottomNavigationExample />}>
      <Typography variant="h1">{f('HELLO')}</Typography>
      <div
        css={css`
          height: 1px;
          width: 100%;
          background-color: ${({ theme }) => theme.palette.text.primary};
        `}
      />
      <Typography variant="h6">{todo.title}</Typography>
      <Typography variant="body1">Completed: {todo.completed ? 'yes' : 'no'}</Typography>
    </Page>
  )
}

export default LandingPageView
