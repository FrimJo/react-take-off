/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

import { ExampleForm } from './components/example-form'
import { Authentication } from 'components/authentication'
import withSpinner from 'utilities/with-spinner'
import { Button } from '@material-ui/core'

export const StartPageView: React.FC = () => {
  const state = Authentication.useState()
  const actions = Authentication.useActions()
  return (
    <div>
      <p
        css={css`
          font-size: 1rem;
          letter-spacing: 0.15;
          font-weight: 400;
          line-height: '1.25rem';
        `}>
        Loggedin: {state.isLoggedIn ? 'yes' : 'no'}
      </p>
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
      {state.isLoggedIn && <ExampleForm />}
    </div>
  )
}

const ButtonWithSpinner = withSpinner(Button)
