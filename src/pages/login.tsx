import { NextPage } from 'next'
import { useCookies } from 'react-cookie'

const TOKEN = {}

const LoginPage: NextPage = () => {
  const [cookie, setCookie] = useCookies(['user'])

  const handleSignIn = async () => {
    setCookie('user', JSON.stringify(TOKEN), { path: '/', maxAge: 3600, sameSite: true })
  }

  return (
    <label htmlFor="username">
      <input type="text" placeholder="enter username" />
      <button onClick={handleSignIn}>Sign In</button>
    </label>
  )
}

export default LoginPage
