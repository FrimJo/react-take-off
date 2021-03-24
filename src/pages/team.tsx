import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'
import { ApplicationShell } from 'components'

import 'twin.macro'

const TeamPage: NextPage = () => {
  return <ApplicationShell title="Team"></ApplicationShell>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, req } = context
  const session = await getSession(context)
  console.log('team getServerSideProps')
  if (!session) {
    res.writeHead(301, { Location: `/auth/signin?from=${req.url}` })
    res.end()
  }

  return { props: {} }
}

export default TeamPage
