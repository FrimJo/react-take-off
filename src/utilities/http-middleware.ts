import { PageRoutes } from './../config/page-routes'
import { navigate } from './react-router-hooks'
import { AuthenticationNoRefreshApi } from 'api/authentication-no-refresh-api'

type HTTP = Readonly<{
  fetch(url: RequestInfo, init?: RequestInit): Promise<Response>
}>

const auth = new AuthenticationNoRefreshApi()

const handleTokenExpired = (url: RequestInfo, init: RequestInit, refreshToken: string) => {
  return auth
    .generateJwtTokenFromRefreshToken(refreshToken)
    .catch(error => {
      clearTokenData()
      navigate(PageRoutes.Authenticate.path, { replace: false })
      return Promise.reject('Can not refresh auth token, redirecting to login page.')
    })
    .then(resultItem => {
      const requestInit = {
        ...init,
        headers: {
          ...init.headers,
          Authorization: `Bearer ${resultItem.token}`,
        },
      }
      return window.fetch(url, { ...requestInit })
    })
}

const httpMiddleware = (initOptions: RequestInit = {}): HTTP => ({
  fetch: (url, fetchInit = {}): Promise<Response> => {
    const tokenData = getTokenData()
    const init = {
      ...fetchInit,
      ...initOptions,
      headers: {
        ...fetchInit.headers,
        ...initOptions.headers,
        Authorization: `Bearer ${tokenData && tokenData.token}`,
      },
    }
    return window.fetch(url, init).then(result => {
      // If Unauthorized
      if (result.status === 401) {
        // If we do not have token data, redirect user to login screen
        if (tokenData === null) {
          clearTokenData()
          navigate(PageRoutes.Authenticate.path, { replace: false })
          return Promise.reject(
            'No token available, can not refresh auth token, redirecting to login page.'
          )
        }

        // If loged in user has token data, try to refresh auth token
        return handleTokenExpired(url, init, tokenData.refreshToken)
      }

      // If all is OK, return result
      return Promise.resolve(result)
    })
  },
})

export default httpMiddleware
