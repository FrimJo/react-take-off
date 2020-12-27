/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useMemo } from 'react'
import {
  useForm as useHookForm,
  UseFormOptions,
  UseFormMethods,
  FieldValues,
  UnpackNestedValue,
  FieldName,
  DeepPartial,
} from 'react-hook-form'
import getNamesForObject from './get-names-for-object'

export function flattenNames(obj: object | string): Array<string> {
  if (typeof obj !== 'object') {
    return [obj]
  }
  return Object.values(obj).flatMap(flattenNames)
}
export function getPartialValues(obj: object, arr: string[]): object {
  const root = {}

  for (const str of arr) {
    // Splitt the string from 'car.brand' to ['car', 'brand'] used to traverse the object
    const strArry = str.split('.')

    let key, // key variable to store next key to use when traversing the object
      pointer = root, // Start out at the root of the oibject
      parent = JSON.parse(JSON.stringify(obj))

    // While we have keys in the arrays and they exist in object
    while ((key = strArry.shift()) && key !== undefined) {
      if (key in parent === false) {
        throw Error(`Key '${key}' not found in object ${JSON.stringify(obj)}`)
      }
      // Get next level of object
      const child = parent[key]

      // If child is of type object, move pointer and object down one level
      if (typeof child === 'object') {
        pointer = pointer[key] = pointer[key] ?? {}
        parent = child
      } else {
        // Else, save value to pointer (remember that pointer is reffering to root object)
        pointer[key] = child
      }
    }
  }
  return root
}

export function useNestedForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  props: UseFormOptions<TFieldValues, TContext> & {
    register: UseFormMethods<TFieldValues>['register']
  }
): UseFormMethods<TFieldValues> {
  const formMethods = useHookForm<TFieldValues, TContext>(props)

  const register: typeof formMethods.register = useCallback(
    (...args: any[]): typeof propsRefFunc => {
      const propsRefFunc = props.register(...args)
      const formRefFunc = formMethods.register(...args)
      return (ref) => {
        propsRefFunc(ref)
        formRefFunc(ref)
      }
    },
    [formMethods, props]
  )

  const handleSubmit: typeof formMethods.handleSubmit = useCallback(
    (...args) => {
      const callback = formMethods.handleSubmit(...args)
      return (event, ...rest) => {
        event?.stopPropagation()
        event?.preventDefault()
        return callback(event, ...rest)
      }
    },
    [formMethods]
  )

  return useMemo(() => ({ ...formMethods, register, handleSubmit }), [
    formMethods,
    handleSubmit,
    register,
  ])
}

type UseDefaultFormOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = Omit<UseFormOptions<TFieldValues, TContext>, 'defaultValues'> & {
  defaultValues: UnpackNestedValue<DeepPartial<TFieldValues>>
}

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(props: UseDefaultFormOptions<TFieldValues, TContext>) {
  const formMethods = useHookForm<TFieldValues, TContext>(props)
  const name = getNamesForObject(props.defaultValues)

  const handlePartialSubmit = useCallback(
    function (name: string | object, callback?: (values: any) => void) {
      const names = flattenNames(name)
      const values = getPartialValues(formMethods.watch(), names)

      return async () => {
        const result = await formMethods.trigger(names as FieldName<TFieldValues>[])
        if (result) {
          callback?.(values)
        }
      }
    },
    [formMethods]
  )

  return useMemo(() => ({ ...formMethods, name, handlePartialSubmit }), [
    formMethods,
    name,
    handlePartialSubmit,
  ])
}
