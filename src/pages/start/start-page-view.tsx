import React from 'react'

import { ExampleForm } from './components/example-form'
import { Authentication } from 'components/authentication'
import withSpinner from 'utilities/with-spinner'
import { Button } from '@material-ui/core'

export const StartPageView: React.SFC = () => {
  const state = Authentication.useState()
  const actions = Authentication.useActions()
  return (
    <div>
      Start
      <p>Loggedin: {state.isLoggedIn ? 'yes' : 'no'}</p>
      {state.isLoggedIn ? (
        <ButtonWithSpinner
          color="primary"
          variant="contained"
          showSpinner={state.isResolving}
          onClick={() => {
            console.log('loout click ')
            actions.logOut()
          }}>
          logout
        </ButtonWithSpinner>
      ) : (
        <ButtonWithSpinner
          color="primary"
          variant="contained"
          showSpinner={state.isResolving}
          onClick={() => {
            console.log('login click')
            actions.logIn()
          }}>
          login
        </ButtonWithSpinner>
      )}
      <ExampleForm />
    </div>
  )
}

const ButtonWithSpinner = withSpinner(Button)
