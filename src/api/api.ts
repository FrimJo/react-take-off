let DB_USER = { id: 5, name: 'Stina' }

export const api = {
  logInAsync: () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  },
  logOutAsync: () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 4000)
    })
  },
  updateUserAsync: (user: { id: number; name: string }) => {
    return new Promise<{ id: number; name: string }>((resolve, reject) => {
      setTimeout(() => {
        DB_USER = user
        resolve(DB_USER)
      }, 2000)
    })
  },
  getUserAsync: () => {
    return new Promise<{ id: number; name: string }>((resolve, reject) => {
      setTimeout(() => {
        resolve(DB_USER)
      }, 2000)
    })
  },
}
