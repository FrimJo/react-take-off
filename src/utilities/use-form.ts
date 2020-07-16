import { FormikConfig } from 'formik'
import * as React from 'react'
import * as yup from 'yup'
import { getNamesForObject } from './get-names-for-object'

export type OnSubmitFunction<Values extends object> = FormikConfig<Values>['onSubmit']

// function createSchema<Value extends object>(value: yup.Schema<Value>) {
//   return yup.object(value).defined()
// }

export function useForm<Values extends object>(props: {
  initialValues: Values
  schema: yup.Schema<Values>
  onSubmit: OnSubmitFunction<Values>
}) {
  const onSubmitRef = React.useRef(props.onSubmit)
  return React.useMemo(
    () => ({
      formikProps: {
        initialValues: props.initialValues,
        onSubmit: onSubmitRef.current,
        validationSchema: props.schema,
      },
      name: getNamesForObject(props.initialValues),
    }),
    [props.initialValues, props.schema]
  )
}
