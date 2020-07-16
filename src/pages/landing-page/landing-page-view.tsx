import { Typography, Box, Link } from '@material-ui/core'
import * as React from 'react'
import { css } from 'styled-components'
import { BottomNavigationExample } from 'components/bottom-navigation-exmaple'
import { Page } from 'components/page'
import { CreateTodoRoute, NestedFormExampleRoute } from 'config/routes'
import { useFormatMessage } from 'localization'
import { useTodo } from 'queries/todo-query'
import { navigate } from 'utilities/react-router-hooks'

const LandingPageView: React.FC = () => {
  const id = 4
  const { todo } = useTodo(id)
  const f = useFormatMessage()
  if (!todo) {
    return <div>no todo item received with id {id}</div>
  }
  return (
    <Page
      iosStatusbarColor="black"
      bottomNavbarComponent={<BottomNavigationExample />}
      css={css`
        display: flex;
        flex-direction: column;
      `}>
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
      <Box pt={5} />
      <Link onClick={() => navigate(CreateTodoRoute.generatePath())}>Create todo</Link>
      <Link onClick={() => navigate(NestedFormExampleRoute.generatePath())}>
        Nested form example
      </Link>
    </Page>
  )
}

export default LandingPageView
