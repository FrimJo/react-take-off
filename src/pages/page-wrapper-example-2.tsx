import { NextPage } from 'next'
import React from 'react'
import { Navigation, PageWrapper, Typography } from 'components'

const PageWrapperExample2: NextPage = () => {
  return (
    <PageWrapper>
      {{
        top: <div tw="bg-secondary h-20">top bar</div>,
        body: (
          <>
            <div tw="h-96 bg-primary">
              <Typography variant="h4">PageWrapper example 1</Typography>
              <Typography variant="body1">
                Example of using PageWrapper component with child as object
              </Typography>
              <Navigation />
            </div>
            <div tw="h-96 bg-primary" />
          </>
        ),
        bottom: <div tw="bg-secondary h-20">bottom bar</div>,
      }}
    </PageWrapper>
  )
}

export default PageWrapperExample2
