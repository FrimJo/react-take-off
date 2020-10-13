/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
    BASE_URL?: string
    API_URL?: string
    GOOGLE_TAG_MANAGER_ID?: string
  }
}
