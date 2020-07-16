import { Formik, useField, FormikConfig, FormikProps } from 'formik'
import * as React from 'react'
import * as yup from 'yup'
import {} from 'components/contained-button'
import { Name } from 'types'
import { useForm } from 'utilities/use-form'

export type SubFormikProps<Values> = {
  name: string
  validationSchema: yup.Schema<Values>
  initialValues: Values
  onSubmit?: FormikConfig<Values>['onSubmit']
  children?:
    | ((props: { name: Name<Values> } & FormikProps<Values>) => React.ReactNode)
    | React.ReactNode
}

export default function <Values extends object>(props: SubFormikProps<Values>) {
  const [, , helpers] = useField(props.name)

  const { formikProps, name } = useForm({
    initialValues: props.initialValues,
    schema: props.validationSchema,
    onSubmit: (values, ...rest) => {
      helpers.setValue(values)
      props.onSubmit?.(values, ...rest)
    },
  })

  return (
    <Formik {...formikProps}>
      {(subFormProps) =>
        props.children instanceof Function
          ? props.children?.({ name, ...subFormProps })
          : props.children
      }
    </Formik>
  )
}
