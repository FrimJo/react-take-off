import { Typography, useTheme } from '@material-ui/core'
import { NextPage } from 'next'
import React from 'react'
import { css } from 'styled-components'
import { Navigation, PageWrapper } from 'components'

const PageWrapperExample2: NextPage = () => {
  const theme = useTheme()

  return (
    <PageWrapper>
      {{
        top: (
          <div
            css={css`
              background-color: orange;
              height: 45px;
            `}>
            top bar
          </div>
        ),
        body: (
          <div
            css={css`
              height: 2000px;
              background-color: ${theme.palette.primary.main};
            `}>
            <Typography variant="h3">
              Example of using PageWrapper component with child as object
            </Typography>
            <Navigation />
          </div>
        ),
        bottom: (
          <div
            css={css`
              background-color: orange;
              height: 45px;
            `}>
            bottom bar
          </div>
        ),
      }}
    </PageWrapper>
  )
}

export default PageWrapperExample2
