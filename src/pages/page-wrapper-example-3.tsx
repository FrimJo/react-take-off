import { NextPage } from 'next'
import React from 'react'
import { PageTop, PageBody, PageBottom, Typography, Footer, Header, SimpleSearch } from 'components'

const PageWrapperExample4: NextPage = () => {
  return (
    <React.Fragment>
      <PageTop>
        <Header />
      </PageTop>
      <PageBody>
        <div tw="h-96 bg-primary">
          <Typography variant="h4">PageWrapper example 1</Typography>
          <Typography variant="body1">
            Example of using PageWrapper helper component PageTop, PageBody and PageBottom
          </Typography>
        </div>
        <Footer />
      </PageBody>
      <PageBottom>
        <SimpleSearch />
      </PageBottom>
    </React.Fragment>
  )
}

export default PageWrapperExample4
