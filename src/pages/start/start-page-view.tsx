import { Typography } from '@material-ui/core'
import { ButtonWithSpinner } from 'components/button-with-spinner'
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
      <ButtonWithSpinner color="primary" variant="contained" onClick={logout}>
        logout
      </ButtonWithSpinner>
    </div>
  )
}
