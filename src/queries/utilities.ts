import { Configuration } from 'api'
import { httpMiddleware } from 'utilities/http-middleware'

const middleware = [httpMiddleware]

function randmoDelay<T>(value: T) {
  const delay = Math.random() * 7000 + 300
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), delay))
}

export const configuration = new Configuration({
  fetchApi: (input: RequestInfo, init?: RequestInit) =>
    window
      .fetch(input, init)
      .then(randmoDelay)
      .then(async (response) => {
        if (response.ok) {
          return response
        }
        return Promise.reject(await response.json())
      }),
  middleware,
  basePath: process.env.REACT_APP_API_URL,
})
