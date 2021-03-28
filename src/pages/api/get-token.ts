import type { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'next-auth/jwt'

const secret = process.env.SECRET ?? ''

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await jwt.getToken({ req, secret })
  if (token) {
    // Signed in
    console.log('JSON Web Token', JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
