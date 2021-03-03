import { NextPage } from 'next'
import React from 'react'
import { Navigation, PageWrapper, Typography } from 'components'

const PageWrapperExample1: NextPage = () => {
  return (
    <PageWrapper
      topComponent={<div tw="bg-secondary h-20">top bar</div>}
      bottomComponent={<div tw="bg-secondary h-20">bottom bar</div>}>
      <div tw="h-96 bg-primary">
        <Typography variant="h4">PageWrapper example 1</Typography>
        <Typography variant="body1">
          Example of using PageWrapper component and its props 'topComponent' and 'bottomComponent'
        </Typography>
        <Navigation />
      </div>
      <div tw="h-96 bg-primary" />
    </PageWrapper>
  )
}

export default PageWrapperExample1
