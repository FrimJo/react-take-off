export type Name<Value> = {
  [Key in keyof Value]: Value[Key] extends object ? Name<Value[Key]> : string
}
