let DB_USER = { id: 5, name: 'Stina' }

export type User = { id: number; name: string }

export const api = {
  authenticateAsync: (variables: { username: string; password: string }) => {
    console.log('authenticateAsync POST')
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        console.log('logInAsync resolve void', variables)
        DB_USER = { id: 5, name: variables.username }
        resolve(DB_USER)
      }, 2000)
    })
  },
  updateUserAsync: (user: User) => {
    console.log('updateUserAsync POST')
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        DB_USER = user
        console.log('updateUserAsync resolve', DB_USER)
        resolve(DB_USER)
        // console.log('updateUserAsync reject', user)
        // reject('Could not fetch user')
      }, 2000)
    })
  },
  getUserAsync: (id: number) => {
    console.log('getUserAsync POST')
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        console.log('getUserAsync resolve', { ...DB_USER, id })
        resolve({ ...DB_USER, id })
      }, 2000)
    })
  },
}
