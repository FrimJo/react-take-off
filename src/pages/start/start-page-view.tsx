/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { AuthenticationContext } from 'contexts/authentication-context'
import { UserPage } from './components/user-page'
import { DisplayUserContainer } from 'components/display-user/display-user-container'
import { UserContext } from 'contexts/user-context'
import { ButtonWithSpinner } from 'components/button-with-spinner'

export const StartPageView: React.FC = () => {
  const authenticationState = AuthenticationContext.useState()
  const actions = AuthenticationContext.useActions()
  const userState = UserContext.useState()

  return (
    <div>
      {authenticationState.isLoggedIn ? (
        <div>
          <DisplayUserContainer />
          <UserPage />
          <ButtonWithSpinner color="primary" variant="contained" onClick={actions.logout}>
            logout
          </ButtonWithSpinner>
        </div>
      ) : (
        <ButtonWithSpinner
          color="primary"
          variant="contained"
          showSpinner={userState.state.isFetching}
          onClick={() => actions.login({ username: 'usr', password: 'psw' })}>
          login
        </ButtonWithSpinner>
      )}
    </div>
  )
}
