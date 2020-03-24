/* eslint-disable @typescript-eslint/camelcase */
import { useHttpMiddleware } from 'utilities/use-http-middleware'
import React from 'react'

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  avatar?: string
}
export type ApiUser = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar?: string
}

const API_BASE_URL = 'https://reqres.in'

export function mapApiUserToClientUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
    avatar: apiUser.avatar,
  }
}

function mapClientUserToApiUser(clientUser: Partial<User>): Partial<ApiUser> {
  return {
    id: clientUser.id,
    email: clientUser.email,
    first_name: clientUser.firstName,
    last_name: clientUser.lastName,
    avatar: clientUser.avatar,
  }
}

export const useUserApi = () => {
  const initOptions: RequestInit = React.useMemo(() => ({}), [])
  const http = useHttpMiddleware(initOptions)

  const update = React.useCallback(
    (user: Partial<User>): Promise<Partial<User> & { updatedAt: Date }> => {
      console.log('update', user)
      const content_ = JSON.stringify(mapClientUserToApiUser(user))

      const init: RequestInit = {
        body: content_,
        method: 'PATCH',
      }
      return http
        .fetch(API_BASE_URL + `/api/users/${user.id}`, init)
        .then((response) => response.json())
        .then((result) => result)
    },
    [http]
  )

  const getSingle = React.useCallback(
    (id: number): Promise<User> => {
      const init: RequestInit = {
        method: 'GET',
      }
      return http
        .fetch(API_BASE_URL + `/api/users/${id}`, init)
        .then((response) => response.json())
        .then((result) => result.data)
        .then(mapApiUserToClientUser)
    },
    [http]
  )

  return React.useMemo(
    () => ({
      update,
      getSingle,
    }),
    [getSingle, update]
  )
}
