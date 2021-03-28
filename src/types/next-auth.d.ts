/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
import 'next-auth'

declare module 'next-auth' {
  export interface Session {}
  export interface User {
    id: number
  }
}
