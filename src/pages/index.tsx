import { Typography, useTheme } from '@material-ui/core'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useQuery, QueryCache } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { css } from 'styled-components'
import { PageTop, PageBody, PageBottom } from 'components'

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
  fetch('https://api.chucknorris.io/jokes/random').then((response) => response.json())

const Landing: NextPage = () => {
  const theme = useTheme()
  const { data } = useQuery('joke', getRandomJoke)

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
          <Typography variant="h3">Random Chuck Norris joke</Typography>
          {data?.value && <Typography variant="body1">{data.value}</Typography>}
          <Link href="/test">
            <a>this page!</a>
          </Link>
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

export async function getServerSideProps() {
  const queryCache = new QueryCache()

  await queryCache.prefetchQuery('joke', getRandomJoke)

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  }
}

export default Landing
