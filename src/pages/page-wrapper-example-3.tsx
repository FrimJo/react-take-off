import { NextPage } from 'next'
import React from 'react'
import { PageTop, PageBody, PageBottom, Navigation, Typography } from 'components'

const PageWrapperExample4: NextPage = () => {
  return (
    <>
      <PageTop>
        <div tw="bg-secondary h-20">top bar</div>
      </PageTop>
      <PageBody>
        <div tw="h-96 bg-primary">
          <Typography variant="h4">PageWrapper example 1</Typography>
          <Typography variant="body1">
            Example of using PageWrapper helper component PageTop, PageBody and PageBottom
          </Typography>
          <Navigation />
        </div>
        <div tw="h-96 bg-primary" />
      </PageBody>
      <PageBottom>
        <div tw="bg-secondary h-20">bottom bar</div>
      </PageBottom>
    </>
  )
}

export default PageWrapperExample4
