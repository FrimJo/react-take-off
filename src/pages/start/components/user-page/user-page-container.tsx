import React from 'react'
import { UserPageView } from './user-page-view'
import withSpinner from 'utilities/with-spinner'
import { Button } from '@material-ui/core'
import { AuthenticationContext } from 'contexts/authentication-context'
import { UserContext } from 'contexts/user-context'

export const UserPageContainer: React.FC = () => {
  const userState = UserContext.useState()
  const userActions = UserContext.useActions()
  const authenticationState = AuthenticationContext.useAuthenticatedState()

  return (
    <>
      <div>
        {userState.userMutation.error ? (
          <p>{userState.userMutation.error}</p>
        ) : userState.isEdit ? (
          <UserPageView initialValues={authenticationState.user} />
        ) : (
          <ButtonWithSpinner
            color="primary"
            variant="contained"
            onClick={() => userActions.setIsEdit(true)}>
            Edit
          </ButtonWithSpinner>
        )}
      </div>
    </>
  )
}

const ButtonWithSpinner = withSpinner(Button)
