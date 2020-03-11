import React from 'react'
import { UserPageView } from './user-page-view'
import { UserContext } from 'contexts/user-context'
import { ButtonWithSpinner } from 'components/button-with-spinner'

export const UserPageContainer: React.FC = () => {
  const userState = UserContext.useState()
  const userActions = UserContext.useActions()

  if (!userState.user) {
    throw Error('No user received!')
  }

  return (
    <>
      <div>
        {userState.status.error ? (
          <p>{userState.status.error}</p>
        ) : userState.isEdit ? (
          <UserPageView initialValues={userState.user} />
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
