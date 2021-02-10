import { IncomingMessage } from 'http'
import * as cookie from 'cookie'

const parseCookies = (req: IncomingMessage | undefined) =>
  cookie.parse(req ? req.headers.cookie || '' : document.cookie)

export default parseCookies
