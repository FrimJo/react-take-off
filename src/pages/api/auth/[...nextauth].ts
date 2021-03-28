/* eslint-disable import/no-named-as-default */
import NextAuth, { User } from 'next-auth'
import Providers from 'next-auth/providers'

if (!process.env.GITHUB_ID) {
  throw Error('Can`t find process.env.GITHUB_ID')
}
if (!process.env.GITHUB_SECRET) {
  throw Error('Can`t find process.env.GITHUB_SECRET')
}

/* Users collection sample */
const USERS: Array<User> = [
  {
    id: 1,
    email: 'example1@example.com',
    image: 'https://i.pravatar.cc/256?img=1',
    name: 'John Doe',
  },
]

export default NextAuth({
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email address', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('authorize credentials', credentials)
        // return null
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        // Any user object returned here will be saved in the JSON Web Token
        const user: User | undefined = USERS.find((user) => user.email === credentials.email)

        if (user) {
          return user
        } else {
          // throw 'http://localhost:3000/auth/signin?error=auth_failed'
          throw new Error('auth_failed')
          // return Promise.reject('http://localhost:3000/test')
          // throw 'http://localhost:3000/auth/signin?error=auth_failed'
        }
      },
    }),
  ],
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(user, account, profile) {
      console.log('signIn', user, account, profile)
      return true
    },
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      console.log('redirect', url, baseUrl)
      return baseUrl
    },
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    async session(session, user) {
      return { ...session }
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user, account, profile, isNewUser) {
      console.log('jwt', token, user, account, profile, isNewUser)
      return token
    },
  },
})
