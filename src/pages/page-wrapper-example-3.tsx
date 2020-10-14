import { Typography, useTheme } from '@material-ui/core'
import { NextPage } from 'next'
import React from 'react'
import { css } from 'styled-components'
import { Navigation, PageWrapper } from 'components'

const PageWrapperExample3: NextPage = () => {
  const theme = useTheme()

  return (
    <PageWrapper>
      <div
        css={css`
          background-color: orange;
          height: 45px;
        `}>
        top bar
      </div>
      <div
        css={css`
          height: 2000px;
          background-color: ${theme.palette.primary.main};
        `}>
        <Typography variant="h3">
          Example of using PageWrapper component with regular child
        </Typography>
        <Navigation />
      </div>
      <div
        css={css`
          background-color: orange;
          height: 45px;
        `}>
        bottom bar
      </div>
    </PageWrapper>
  )
}

export default PageWrapperExample3
