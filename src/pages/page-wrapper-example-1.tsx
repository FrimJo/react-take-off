import { NextPage } from 'next'
import React from 'react'
import { Footer, Header, PageWrapper, SimpleSearch, Typography } from 'components'

const PageWrapperExample1: NextPage = () => {
  return (
    <PageWrapper topComponent={<Header />} bottomComponent={<SimpleSearch />}>
      <div tw="h-96 bg-primary">
        <Typography variant="h4">PageWrapper example 1</Typography>
        <Typography variant="body1">
          Example of using PageWrapper component and its props 'topComponent' and 'bottomComponent'
        </Typography>
      </div>
      <Footer />
    </PageWrapper>
  )
}

export default PageWrapperExample1
