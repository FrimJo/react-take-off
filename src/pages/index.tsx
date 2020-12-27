import { Typography, useTheme } from '@material-ui/core'
import { NextPage } from 'next'
import React from 'react'
import { useQuery, QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { css } from 'styled-components'
import { Navigation, PageWrapper } from 'components'

type Joke = {
  categories: string[]
  created_at: string
  icon_url: string
  id: string
  updated_at: string
  url: string
  value: string
}

const getRandomJoke = (): Promise<Joke> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/random`).then((response) => response.json())

const LandingPage: NextPage = () => {
  const theme = useTheme()
  const { data } = useQuery('joke', getRandomJoke)

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
        <Typography variant="h4">Home</Typography>
        <Typography variant="body1">Random Chuck Norris joke</Typography>
        {data?.value && <Typography variant="body1">{data.value}</Typography>}
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

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('joke', getRandomJoke)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default LandingPage
