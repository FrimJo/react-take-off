/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Button } from '@material-ui/core'

import { AuthenticationContext } from 'contexts/authentication-context'
import withSpinner from 'utilities/with-spinner'
import { UserPage } from './components/user-page'
import { DisplayUserContainer } from 'components/display-user/display-user-container'

export const StartPageView: React.FC = () => {
  const state = AuthenticationContext.useState()
  const actions = AuthenticationContext.useActions()

  return (
    <div>
      {state.isLoggedIn ? (
        <div>
          <DisplayUserContainer />
          <UserPage />
          <ButtonWithSpinner color="primary" variant="contained" onClick={actions.logOut}>
            logout
          </ButtonWithSpinner>
        </div>
      ) : (
        <ButtonWithSpinner
          color="primary"
          variant="contained"
          showSpinner={state.userQuery.isFetching}
          onClick={() => actions.logIn({ username: 'usr', password: 'psw' })}>
          login
        </ButtonWithSpinner>
      )}
    </div>
  )
}

const ButtonWithSpinner = withSpinner(Button)
