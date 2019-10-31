import React from 'react'

import { ExampleForm } from './components/example-form'
import { Authentication } from 'components/authentication'

export const StartPageView: React.SFC = () => {
  const state = Authentication.useState()
  const actions = Authentication.useActions()
  return (
    <div>
      Start
      <p>Loggedin: {state.isLoggedIn ? 'yes' : 'no'}</p>
      <button
        onClick={() => {
          console.log('click2')
          actions.logIn()
        }}>
        login
      </button>
      <ExampleForm />
    </div>
  )
}
