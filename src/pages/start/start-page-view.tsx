/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

import { ExampleForm } from './components/example-form'
import { Authentication } from 'components/authentication'
import withSpinner from 'utilities/with-spinner'
import { Button, Typography } from '@material-ui/core'

export const StartPageView: React.FC = () => {
  const state = Authentication.useState()
  const actions = Authentication.useActions()
  return (
    <div>
      {state.isLoggedIn && (
        <React.Fragment>
          <ButtonWithSpinner
            color="primary"
            variant="contained"
            onClick={() => {
              actions.updateUser({ id: 5, name: 'Rolf' })
            }}>
            Change user
          </ButtonWithSpinner>
          <Typography variant="body1">Loggedin: {state.isLoggedIn ? state.userQuery.data?.name : 'no'}</Typography>
        </React.Fragment>
      )}
      {state.isLoggedIn ? (
        <ButtonWithSpinner
          color="primary"
          variant="contained"
          showSpinner={state.logOutMutation.isLoading}
          onClick={actions.logOut}>
          logout
        </ButtonWithSpinner>
      ) : (
        <ButtonWithSpinner
          color="primary"
          variant="contained"
          showSpinner={state.logInMutation.isLoading}
          onClick={actions.logIn}>
          login
        </ButtonWithSpinner>
      )}
      {state.isLoggedIn && <ExampleForm />}
      <Typography variant="body1" component="pre">
        {JSON.stringify(state, null, 4)}
      </Typography>
    </div>
  )
}

const ButtonWithSpinner = withSpinner(Button)
