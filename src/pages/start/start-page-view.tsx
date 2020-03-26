import React from 'react'
import { AuthenticationContext } from 'contexts/authentication-context'
import { UserPage } from './components/user-page'
import { DisplayUser } from 'components/display-user'
import { ButtonWithSpinner } from 'components/button-with-spinner'

export const StartPageView: React.FC = () => {
  const actions = AuthenticationContext.useActions()

  return (
    <div>
      <DisplayUser />
      <UserPage />
      <ButtonWithSpinner color="primary" variant="contained" onClick={actions.logout}>
        logout
      </ButtonWithSpinner>
    </div>
  )
}
