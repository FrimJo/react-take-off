let DB_USER = { id: 5, name: 'Stina' }
const TOKEN = '84yn130985vny19'

export type User = { id: number; name: string }

export const api = {
  authenticateAsync: (credentials: { username: string; password: string }) => {
    console.log('authenticateAsync POST')
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        console.log('authenticateAsync resolve', credentials, { token: TOKEN })
        resolve({ token: TOKEN })
      }, 2000)
    })
  },
  updateUserAsync: (user: User) => {
    console.log('updateUserAsync POST')
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        // DB_USER = user
        // console.log('updateUserAsync resolve', DB_USER)
        // resolve(DB_USER)
        console.log('updateUserAsync reject', user)
        reject('Could not fetch user')
      }, 2000)
    })
  },
  getUserAsync: () => {
    console.log('getUserAsync POST')
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        console.log('getUserAsync resolve', DB_USER)
        resolve(DB_USER)
      }, 2000)
    })
  },
}
