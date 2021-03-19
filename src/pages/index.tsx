import { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import { useQuery, QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { ApplicationShell, Typography } from 'components'
import parseCookies from 'utilities/parse-cookies.server'
import 'twin.macro'

type Joke = {
  categories: string[]
  created_at: string
  icon_url: string
  id: string
  updated_at: string
  url: string
  value: string
}

const getRandomJoke = async (): Promise<Joke> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/random`).then((response) => response.json())
}
// const getRandomJoke = async (): Promise<Joke> => {
//   const { url, init } = await httpMiddleware.pre({
//     fetch,
//     init: { method: 'GET' },
//     url: `${process.env.NEXT_PUBLIC_API_URL}/random`,
//   })

//   const response = await fetch(url, init)

//   const data = await httpMiddleware.post({
//     fetch,
//     init,
//     response,
//     url,
//   })

//   const joke: Joke = await data.json()
//   return joke
// }

const LandingPage: NextPage<{ data: any }> = () => {
  const { data: joke } = useQuery('joke', getRandomJoke)

  return (
    <ApplicationShell title="Dashboard">
      <Typography variant="h4">Home</Typography>
      <Typography variant="body1">Random Chuck Norris joke</Typography>
      {joke?.value && <Typography variant="body1">{joke.value}</Typography>}
    </ApplicationShell>
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
