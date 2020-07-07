import { Configuration } from 'api'
import { httpMiddleware } from 'utilities/http-middleware'

const middleware = [httpMiddleware]
export const configuration = new Configuration({
  middleware,
  basePath: process.env.REACT_APP_API_URL,
})
