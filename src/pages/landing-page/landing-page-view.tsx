import { Typography, Box, Link } from '@material-ui/core'
import { lazyProps } from 'lazy-props'
import * as React from 'react'
import { css } from 'styled-components'
import { BottomNavigationExample } from 'components/bottom-navigation-exmaple'
import { Page } from 'components/page'
import {
  CreateTodoRoute,
  WizardFormExampleRoute,
  PartialFormExampleRoute,
  NestedFormExampleRoute,
} from 'config/routes'
import { useFormatMessage } from 'localization'
import { todoCache } from 'queries/todo-query'
import { navigate } from 'utilities/react-router-hooks'
import { TodoItem } from './components/todo-item'

const LandingPageView: React.FC = () => {
  const LazyTodoItem = React.lazy(() => lazyProps(TodoItem, { todo: todoCache.prefetch(4) }))
  const f = useFormatMessage()
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
      <LazyTodoItem />
      <Box pt={5} />
      <Link onClick={() => navigate(CreateTodoRoute.generatePath())}>Create todo</Link>
      <Link onClick={() => navigate(WizardFormExampleRoute.generatePath())}>
        Wizard form example
      </Link>
      <Link onClick={() => navigate(PartialFormExampleRoute.generatePath())}>
        Partial form example
      </Link>
      <Link onClick={() => navigate(NestedFormExampleRoute.generatePath())}>
        Nested form example
      </Link>
    </Page>
  )
}

export default LandingPageView
