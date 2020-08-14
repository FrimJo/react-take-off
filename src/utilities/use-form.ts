import * as React from 'react'
import { useForm as useHookForm, UseFormOptions, UseFormMethods } from 'react-hook-form'
import { FieldValues, UnpackNestedValue, FieldName } from 'react-hook-form/dist/types/form'
import { getNamesForObject } from './get-names-for-object'

export function flattenNames(obj: object | string): Array<string> {
  if (typeof obj !== 'object') {
    return [obj]
  }
  return Object.values(obj).flatMap(flattenNames)
}
export function getPartialValues(obj: object, arr: string[]): object {
  if (Object.keys(obj).length === 0) {
    return {}
  }
  const retObj = {}
  for (const str of arr) {
    let clone = JSON.parse(JSON.stringify(obj))
    const strArry = str.split('.')
    const last = strArry[strArry.length - 1]
    let key
    while ((key = strArry.shift()) && key !== undefined && key in clone) {
      clone = clone[key]
    }
    retObj[last] = clone
  }
  return retObj
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

  const register: typeof formMethods.register = React.useCallback(
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

  const handleSubmit: typeof formMethods.handleSubmit = React.useCallback(
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

  return React.useMemo(() => ({ ...formMethods, register, handleSubmit }), [
    formMethods,
    handleSubmit,
    register,
  ])
}

type UseDefaultFormOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = Omit<UseFormOptions<TFieldValues, TContext>, 'defaultValues'> & {
  defaultValues: UnpackNestedValue<TFieldValues>
}

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(props: UseDefaultFormOptions<TFieldValues, TContext>) {
  const formMethods = useHookForm<TFieldValues, TContext>(props)
  const name = getNamesForObject(props.defaultValues)

  const handlePartialSubmit = React.useCallback(
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

  return React.useMemo(() => ({ ...formMethods, name, handlePartialSubmit }), [
    formMethods,
    name,
    handlePartialSubmit,
  ])
}
