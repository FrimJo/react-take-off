import { Typography, useTheme } from '@material-ui/core'
import { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import { useQuery, QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { css } from 'styled-components'
import { Navigation, PageWrapper } from 'components'
import parseCookies from 'utilities/parse-cookies.server'

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

const LandingPage: NextPage<{ data: any }> = ({ data }) => {
  const theme = useTheme()
  const { data: joke } = useQuery('joke', getRandomJoke)

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
        {joke?.value && <Typography variant="body1">{joke.value}</Typography>}
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient()
  const data = parseCookies(req)

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: '/login' })
      res.end()
    }
  }

  await queryClient.prefetchQuery('joke', getRandomJoke)

  return {
    props: {
      data: data && data,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default LandingPage
