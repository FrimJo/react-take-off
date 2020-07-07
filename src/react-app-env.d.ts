/* eslint-disable @typescript-eslint/interface-name-prefix */
/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
    REACT_APP_BASE_URL?: string
    REACT_APP_API_URL?: string
    REACT_GOOGLE_TAG_MANAGER_ID?: string
    HTTPS: boolean
  }
}
