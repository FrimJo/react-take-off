import React from 'react'
import { UserPageView } from './user-page-view'
import { ButtonWithSpinner } from 'components/button-with-spinner'
import { AuthenticationContext } from 'contexts/authentication-context'

export const UserPageContainer: React.FC = () => {
  const loggedInUserState = AuthenticationContext.useLoggedInUserState()
  const [isEdit, setIsEdit] = React.useState(false)

  return (
    <>
      <div>
        {loggedInUserState.error ? (
          <p>{loggedInUserState.error}</p>
        ) : isEdit ? (
          <UserPageView initialValues={loggedInUserState.user} onClose={() => setIsEdit(false)} />
        ) : (
          <ButtonWithSpinner color="primary" variant="contained" onClick={() => setIsEdit(true)}>
            Edit
          </ButtonWithSpinner>
        )}
      </div>
    </>
  )
}
