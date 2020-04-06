import { Typography } from '@material-ui/core'
import { Button } from 'components/button'
import { DisplayUser } from 'components/display-user'
import React from 'react'
import { useAuthentication } from 'utilities/use-authentication'
import { UserPage } from './components/user-page'

export const StartPageView: React.FC = () => {
  const { logout } = useAuthentication()

  return (
    <div>
      <Typography variant="h1">Start page</Typography>
      <DisplayUser />
      <UserPage />
      <Button color="primary" variant="contained" onClick={logout}>
        logout
      </Button>
    </div>
  )
}
