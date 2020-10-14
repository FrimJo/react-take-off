import { Typography, useTheme } from '@material-ui/core'
import { NextPage } from 'next'
import React from 'react'
import { css } from 'styled-components'
import { Navigation, PageWrapper } from 'components'

const PageWrapperExample1: NextPage = () => {
  const theme = useTheme()

  return (
    <PageWrapper
      topComponent={
        <div
          css={css`
            background-color: orange;
            height: 45px;
          `}>
          top bar
        </div>
      }
      bottomComponent={
        <div
          css={css`
            background-color: orange;
            height: 45px;
          `}>
          bottom bar
        </div>
      }>
      <div
        css={css`
          height: 2000px;
          background-color: ${theme.palette.primary.main};
        `}>
        <Typography variant="h3">
          Example pf using PageWrapper component and its props 'topComponent' and 'bottomComponent'
        </Typography>
        <Navigation />
      </div>
    </PageWrapper>
  )
}

export default PageWrapperExample1
