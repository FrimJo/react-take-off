export type Name<Value> = {
  [Key in keyof Value]: Value[Key] extends object ? Name<Value[Key]> : string
}

const $NestedValue: unique symbol

export type NestedValue<TValue extends any[] | object = any[] | object> = {
  [$NestedValue]: never
} & TValue

export type IsFlatObject<T extends object> = Extract<
  Exclude<T[keyof T], NestedValue | Date | FileList>,
  any[] | object
> extends never
  ? true
  : false

export type FieldName<TFieldValues> = IsFlatObject<TFieldValues> extends true
  ? Extract<keyof TFieldValues, string>
  : string

type A = Extract<keyof { name: string; home: { street: 'a street' } }, string>
type B = IsFlatObject<{ name: string; home: { street: 'a street' } }>
type C = FieldName<{ name: string; home: { street: 'a street' } }>
