import { Typography } from '@material-ui/core'
import * as React from 'react'
import { Button } from 'components/button/button-view'
import { DisplayUserContainer } from 'components/display-user/display-user-container'
import { useAuthentication } from 'utilities/use-authentication'
import { UserPageContainer } from './components/user-page/user-page-container'

export const StartPageView: React.FC = () => {
  const { logout } = useAuthentication()

  return (
    <div>
      <Typography variant="h1">Start page</Typography>
      <DisplayUserContainer />
      <UserPageContainer />
      <Button color="primary" variant="contained" onClick={logout}>
        logout
      </Button>
    </div>
  )
}
