import { Typography, useTheme } from '@material-ui/core'
import { NextPage } from 'next'
import React from 'react'
import { css } from 'styled-components'
import { PageTop, PageBody, PageBottom, Navigation } from 'components'

const PageWrapperExample4: NextPage = () => {
  const theme = useTheme()

  return (
    <>
      <PageTop>
        <div
          css={css`
            background-color: orange;
            height: 45px;
          `}>
          top bar
        </div>
      </PageTop>
      <PageBody>
        <div
          css={css`
            height: 2000px;
            background-color: ${theme.palette.primary.main};
          `}>
          <Typography variant="h4">PageWrapper example 4</Typography>
          <Typography variant="body1">
            Example of using PageWrapper helper component PageTop, PageBody and PageBottom
          </Typography>
          <Navigation />
        </div>
      </PageBody>
      <PageBottom>
        <div
          css={css`
            background-color: orange;
            height: 45px;
          `}>
          bottom bar
        </div>
      </PageBottom>
    </>
  )
}

export default PageWrapperExample4
