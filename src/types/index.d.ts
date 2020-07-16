export type Name<Value> = {
  [Key in keyof Value]: Value[Key] extends string | Function | Array<any> | number | Date | boolean
    ? string
    : Name<Value[Key]>
}
