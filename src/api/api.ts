let DB_USER = { id: 5, name: 'Stina' }

export const api = {
  authenticateAsync: (variables: { username: string; password: string }) => {
    console.log('logInAsync POST')
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        console.log('logInAsync resolve void', variables)
        resolve('asdk4t23421nq')
      }, 2000)
    })
  },
  updateUserAsync: (user: { id: number; name: string }) => {
    console.log('updateUserAsync POST')
    return new Promise<{ id: number; name: string }>((resolve, reject) => {
      setTimeout(() => {
        DB_USER = user
        console.log('updateUserAsync resolve', DB_USER)
        resolve(DB_USER)
        // console.log('updateUserAsync reject', user)
        // reject('Could not fetch user')
      }, 2000)
    })
  },
  getUserAsync: () => {
    console.log('getUserAsync POST')
    return new Promise<{ id: number; name: string }>((resolve, reject) => {
      setTimeout(() => {
        console.log('getUserAsync resolve', DB_USER)
        resolve(DB_USER)
      }, 2000)
    })
  },
}
