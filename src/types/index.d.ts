export type Name<Values extends object> = {
  [key in keyof Values]: Values extends object ? Name<key> : string
}
