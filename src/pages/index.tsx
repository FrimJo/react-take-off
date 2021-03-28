import { NextPage, GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/client'
import React from 'react'
import { useQuery, QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { ApplicationShell, Typography } from 'components'
import 'twin.macro'

type Joke = {
  id: string
  language: string
  permalink: string
  source: string
  source_url: string
  text: string
}

const getTodaysUselssFacts = async (): Promise<Joke> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/today.json?language=en`).then((response) =>
    response.json()
  )
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
  console.log('document.referrer', document.referrer)
  const [session] = useSession()
  const { data: facts, isError } = useQuery('joke', getTodaysUselssFacts)
  return (
    <ApplicationShell title="Dashboard">
      <Typography variant="h3">Hello, {session?.user.name}</Typography>
      <Typography variant="h4"> Useless Facts of the Day</Typography>
      {facts?.text && <Typography variant="body1">{facts.text}</Typography>}
      {isError && <Typography variant="body1">Couln't fetch todays useless facts</Typography>}
    </ApplicationShell>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, req } = context
  const session = await getSession(context)
  if (!session) {
    res.writeHead(301, { Location: `/auth/signin` })
    res.end()
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('joke', getTodaysUselssFacts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default LandingPage
