import * as React from 'react'
import { Button } from 'components/button'
import { useLoggedInUser } from 'utilities/use-logged-in-user'
import { UserPageView } from './user-page-view'

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
        <Button color="primary" variant="contained" onClick={() => setIsEdit(true)}>
          Edit
        </Button>
      )}
    </div>
  )
}
