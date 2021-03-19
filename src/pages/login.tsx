import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useMutation } from 'react-query'

const loginUser = () => fetch('/api/login', { method: 'POST' })

const LoginPage: NextPage = () => {
  const [, setCookie] = useCookies(['user'])
  const mutation = useMutation(loginUser)
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      mutation.mutate(undefined, {
        onSuccess: async (response) => {
          const { token } = await response.json()
          setCookie('user', JSON.stringify(token), { path: '/', maxAge: 3600, sameSite: true })
          router.push('/')
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <label htmlFor="username">
      <input type="text" placeholder="enter username" disabled={mutation.isLoading} />
      <button disabled={mutation.isLoading} onClick={handleSignIn}>
        Sign In
      </button>
      <div>{mutation.status}</div>
    </label>
  )
}

export default LoginPage
