export const API_USER_DB = 'API_USER_DB'

const TOKEN = '84yn130985vny19'

export type User = { id: number; name: string }

export const api = {
  authenticateAsync: (credentials: { username: string; password: string }) => {
    console.log('authenticateAsync POST')
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        console.log('authenticateAsync resolve', credentials, { token: TOKEN })

        const currentUser = window.localStorage.getItem(API_USER_DB)
        // If we do not have a user in local storage, create on
        if (!currentUser) {
          window.localStorage.setItem(
            API_USER_DB,
            JSON.stringify({ id: 5, name: credentials.username })
          )
        } else if (JSON.parse(currentUser).name !== credentials.username) {
          reject('Wrong username or password')
        }
        resolve({ token: TOKEN })
      }, 2000)
    })
  },
  updateUserAsync: (user: User) => {
    console.log('updateUserAsync POST')
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        console.log('updateUserAsync resolve', user)
        window.localStorage.setItem(API_USER_DB, JSON.stringify(user))
        resolve(user)
        // console.log('updateUserAsync reject', user)
        // reject('Could not fetch user')
      }, 2000)
    })
  },
  getUserAsync: () => {
    console.log('getUserAsync POST')
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const user = window.localStorage.getItem(API_USER_DB)
        console.log('getUserAsync resolve', user)
        if (!user) {
          return reject('No users found in database')
        }
        return resolve(JSON.parse(user))
      }, 2000)
    })
  },
}
