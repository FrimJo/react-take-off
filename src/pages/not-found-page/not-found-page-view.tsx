import { Typography } from '@material-ui/core'
import * as React from 'react'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { browserHistory } from 'utilities/history'

const NotFoundPageView: React.FC = () => {
  return (
    <Page iOSStatusbarColor="black">
      <Typography variant="h1">Page not found</Typography>
      <ContainedButton onClick={() => browserHistory.goBack()}>Go back</ContainedButton>
    </Page>
  )
}

export default NotFoundPageView
