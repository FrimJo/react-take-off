/* eslint-disable import/no-named-as-default */
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

if (!process.env.GITHUB_ID) {
  throw Error('Can`t find process.env.GITHUB_ID')
}
if (!process.env.GITHUB_SECRET) {
  throw Error('Can`t find process.env.GITHUB_SECRET')
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
})
