import { FormikConfig } from 'formik'
import * as yup from 'yup'

export type OnSubmitFunction<Values extends object> = FormikConfig<
  Values
>['onSubmit']
export type Schema<Values extends object> = yup.ObjectSchema<
  yup.Shape<object, Values>
>

export type Name<Values extends object> = Required<
  {
    [key in keyof Values]: keyof Values
  }
>

export type UseFormHook<Values extends object> = (
  ...args: any
) => {
  initialValues: Values
  onSubmit: OnSubmitFunction<Values>
  validationSchema: Schema<Values>
  name: Name<Values>
}
