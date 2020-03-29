import React from 'react'
import { UserPageView } from './user-page-view'
import { ButtonWithSpinner } from 'components/button-with-spinner'
import { useLoggedInUser } from 'utilities/use-logged-in-user'

export const UserPageContainer: React.FC = () => {
  const { error, user } = useLoggedInUser()
  const [isEdit, setIsEdit] = React.useState(false)

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : isEdit ? (
        <UserPageView initialValues={user} onClose={() => setIsEdit(false)} />
      ) : (
        <ButtonWithSpinner color="primary" variant="contained" onClick={() => setIsEdit(true)}>
          Edit
        </ButtonWithSpinner>
      )}
    </div>
  )
}
