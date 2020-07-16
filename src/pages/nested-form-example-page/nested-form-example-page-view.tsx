import { Formik, Form, FormikConfig } from 'formik'
import * as React from 'react'
import * as yup from 'yup'
import { ContainedButton } from 'components/contained-button'
import { Page } from 'components/page'
import { useForm } from 'utilities/use-form'
import { Form1, Form2 } from './components'

type SubFormProps<Values, Path extends keyof Values> = {
  name: Path
  initialValues: Values[Path]
  validationSchema: yup.Schema<Values[Path]>
}
function getSubForm<Values, P extends keyof Values & string>(
  form: FormikConfig<Values>,
  path: P
): SubFormProps<Values, P> {
  const subForm: SubFormProps<Values, P> = {
    name: path,
    initialValues: form.initialValues[path],
    validationSchema: yup.reach(form.validationSchema, path),
  }
  return subForm
}

export default (props: React.PropsWithChildren<{}>) => {
  const { formikProps } = useForm({
    initialValues: {
      form1: { firstName: '', lastName: '' },
      form2: { address: '', city: '' },
    },
    schema: yup
      .object({
        form1: yup
          .object({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
          })
          .defined(),
        form2: yup
          .object({
            address: yup.string().required(),
            city: yup.string().required(),
          })
          .defined(),
      })
      .defined(),
    onSubmit: (value, actions) => {
      alert(
        `Name: ${value.form1.firstName} ${value.form1.lastName}\nStreet: ${value.form2.address} ${value.form2.city}`
      )
    },
  })

  return (
    <Page>
      <Formik {...formikProps}>
        {(props) => {
          return (
            <Form>
              <pre>{JSON.stringify(props, null, 2)}</pre>
              <Form1
                {...getSubForm(formikProps, 'form1')}
                onSubmit={(value) => alert(`Hi ${value.firstName} ${value.lastName}!`)}
              />
              <Form2
                {...getSubForm(formikProps, 'form2')}
                onSubmit={(value) => alert(`Sunny at ${value.address} in ${value.city}`)}
              />
              <ContainedButton type="submit">Submit full form</ContainedButton>
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}
