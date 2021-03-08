import { NextPage } from 'next'
import React from 'react'
import { Footer, Header, PageWrapper, SimpleSearch, Typography } from 'components'

const PageWrapperExample2: NextPage = () => {
  return (
    <PageWrapper>
      {{
        top: <Header />,
        body: (
          <React.Fragment>
            <div tw="h-96 bg-primary">
              <Typography variant="h4">PageWrapper example 1</Typography>
              <Typography variant="body1">
                Example of using PageWrapper component with child as object
              </Typography>
            </div>
            <Footer />
          </React.Fragment>
        ),
        bottom: <SimpleSearch />,
      }}
    </PageWrapper>
  )
}

export default PageWrapperExample2
