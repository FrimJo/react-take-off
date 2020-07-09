import { Middleware, FetchParams } from 'api'
import { NotFoundRoute } from 'config/routes'
import { navigate } from './react-router-hooks'

const abortController = new AbortController()
export const httpMiddleware: Middleware = {
  pre: ({ init: initOptions, url }) => {
    const authResult = { accessToken: '' } // TODO: Get access token here
    if (!authResult) {
      // TODO Redirect user to log in screen here
      return Promise.reject('No auth result found')
    }

    const init: RequestInit = {
      signal: abortController.signal,
      ...initOptions,
      headers: {
        'Access-Control-Allow-Origin': window.location.origin,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Baic ${authResult.accessToken}`,
        ...initOptions.headers,
      },
    }

    // Add cancel property to promise object for react-query to cancel request if aborted
    const promise: Promise<FetchParams> & {
      cancel?: typeof abortController.abort
    } = Promise.resolve({
      url,
      init: { ...initOptions, ...init },
    })

    promise.cancel = abortController.abort
    return promise
  },
  post: async ({ fetch, init, response, url }) => {
    if (response.ok) {
      return Promise.resolve(response)
    }

    // Unauthorizede HTTP (Token might have expired)
    if (response.status === 401) {
      console.log('Error status 401, try check session')
      // TODO Refetch auth result and send request again
      throw Error('Need implementation')
    } else if (response.status === 404) {
      navigate(NotFoundRoute.generatePath(), { replace: true })
      return Promise.resolve(undefined)
    }

    const json = await response.json()

    // Add properties for different status codes
    const statusContainer = {
      ...(response.status === 400 && { errors: convertKeys(toLowerCamelCase)(json.errors) }), // Bad Request (Typically form error)
      ...(response.status === 409 && { status: json.detail }), // Conflict
    }

    // If no keys were added, reject json, else reject status container
    if (Object.keys(statusContainer).length === 0) return Promise.reject(json)
    return Promise.reject(statusContainer)
  },
}

const convertKeys = (func: (key: string) => string) => (object: Object): Object => {
  return Object.keys(object).reduce((prev, key) => ({ ...prev, [func(key)]: object[key] }), {})
}

function toLowerCamelCase(str: string): string {
  if (str.length === 0) {
    return ''
  }
  return str[0].toLowerCase() + str.slice(1, str.length)
}
