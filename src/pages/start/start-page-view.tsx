import React from 'react'
import { UserPage } from './components/user-page'
import { DisplayUser } from 'components/display-user'
import { ButtonWithSpinner } from 'components/button-with-spinner'
import { useAuthentication } from 'utilities/use-authentication'

export const StartPageView: React.FC = () => {
  const { logout } = useAuthentication()

  return (
    <div>
      <DisplayUser />
      <UserPage />
      <ButtonWithSpinner color="primary" variant="contained" onClick={logout}>
        logout
      </ButtonWithSpinner>
    </div>
  )
}
