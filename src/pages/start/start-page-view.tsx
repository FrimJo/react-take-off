/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Button } from '@material-ui/core'

import { Authentication } from 'components/authentication'
import withSpinner from 'utilities/with-spinner'
import { UserPage } from './components/user-page'
import { DisplayUserContainer } from 'components/display-user/display-user-container'

export const StartPageView: React.FC = () => {
  const state = Authentication.useState()
  const actions = Authentication.useActions()

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
          showSpinner={state.userQuery.isLoading}
          onClick={() => actions.logIn({ username: 'usr', password: 'psw' })}>
          login
        </ButtonWithSpinner>
      )}
    </div>
  )
}

const ButtonWithSpinner = withSpinner(Button)
