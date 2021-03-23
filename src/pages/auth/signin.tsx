import { GetServerSideProps, NextPage } from 'next'
import { providers, signIn, signOut, useSession } from 'next-auth/client'
import { AppProvider } from 'next-auth/providers'
import { useRouter } from 'next/router'
import * as React from 'react'

const Signin: NextPage<{ providers: Record<string, AppProvider> }> = ({ providers }) => {
  console.log('providers', providers)
  const { query } = useRouter()
  console.log('from', query.from)
  const [session, loading] = useSession()
  if (loading) {
    return <React.Fragment>Loading…</React.Fragment>
  }
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          {Object.values(providers).map((provider) => (
            <div key={provider.id ?? provider.name}>
              <button onClick={() => signIn(provider.id, { callbackUrl: query.from as string })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await providers(),
    },
  }
}

export default Signin
