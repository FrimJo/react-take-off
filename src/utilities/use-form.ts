import { FormikConfig } from 'formik'
import * as React from 'react'
import { useForm as useHookForm } from 'react-hook-form'
import {
  FieldValues,
  UseFormOptions,
  UnpackNestedValue,
  FieldName,
  UseFormMethods,
} from 'react-hook-form/dist/types/form'
import { getNamesForObject } from './get-names-for-object'

export type OnSubmitFunction<Values extends object> = FormikConfig<Values>['onSubmit']

export function flattenNames(obj: object | string): Array<string> {
  if (typeof obj !== 'object') {
    return [obj]
  }
  return Object.values(obj).flatMap(flattenNames)
}
export function getValuesFor(obj: object, arr: string[]): object {
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

export function usePartialForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  props: UseDefaultFormOptions<TFieldValues, TContext> & {
    register: UseFormMethods<TFieldValues>['register']
  }
): UseFormMethods<TFieldValues> {
  const { register: formRegister, ...formMethods } = useHookForm<TFieldValues, TContext>(props)
  const register: UseFormMethods<TFieldValues>['register'] = (...args: any) => {
    props.register(...args)
    return formRegister(...args)
  }
  return { ...formMethods, register }
}

type UseDefaultFormOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> = Omit<UseFormOptions<TFieldValues, TContext>, 'defaultValues'> & {
  defaultValues: UnpackNestedValue<TFieldValues>
}

export function useDefaultForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(props: UseDefaultFormOptions<TFieldValues, TContext>) {
  const formMethods = useHookForm<TFieldValues, TContext>(props)
  const name = getNamesForObject(props.defaultValues)

  const handlePartialSubmit = React.useCallback(
    function <TFieldName extends keyof TFieldValues>(
      name: string | object,
      callback?: (values: any) => void
    ) {
      const names = flattenNames(name) as FieldName<TFieldValues>[]
      const values = getValuesFor(formMethods.watch(), names)
      // console.log('names', names)

      // const values = getValuesFor(defaultValues, names)
      // const values = formMethods.getValues(Array.isArray(name) ? name : [name])

      // let obj = { a: { b: 'a.b' } }
      // while (instanceof obj === object && Object.keys(obj).length > 0 && (obj = obj[Object.keys(obj)[0]]));

      // while(arr.length && (obj = obj[arr.shift()]));

      // const names = Object.keys(values).flatMap((name) =>
      //   Object.keys(values[name] ?? {}).map((key) => name + '.' + key)
      // ) as FieldName<TFieldValues>[]
      return async () => {
        const result = await formMethods.trigger(names)
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
