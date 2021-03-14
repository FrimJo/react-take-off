/* eslint-disable @typescript-eslint/naming-convention */
type FetchAPI = typeof window.fetch

interface RequestContext {
  fetch: FetchAPI
  url: string
  init: RequestInit
}

interface ResponseContext {
  fetch: FetchAPI
  url: string
  init: RequestInit
  response: Response
}

interface FetchParams {
  url: string
  init: RequestInit
}

interface Middleware {
  pre(context: RequestContext): Promise<FetchParams>
  post(context: ResponseContext): Promise<Response>
}

const getToken = async (): Promise<false | string> => {
  return 'TODO: Implement fetch token'
}

const httpMiddleware: Middleware = {
  pre: async ({ init: initOptions, url }) => {
    const token = await getToken()
    const init: RequestInit = {
      ...initOptions,
      headers: {
        'Access-Control-Allow-Origin': window.location.origin,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(!!token && { Authorization: `Bearer ${token}` }), // Add Authorization property only if we have a token
        ...initOptions.headers,
      },
    }

    return { url, init }
  },
  post: async ({ fetch, init, response, url }) => {
    if (response.ok) {
      return Promise.resolve(response)
    }

    // Unauthorizede HTTP (Token might have expired, or user is not authorized)
    if (response.status === 401 && !init.headers?.['authStatus']) {
      console.warn(`Error status 401, try refresh token.`)
      const token = await getToken()
      return fetch(url, {
        ...init,
        headers: {
          ...init.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
          authStatus: 'retry',
        },
      })
    }

    return Promise.reject(response)
  },
}

export default httpMiddleware
