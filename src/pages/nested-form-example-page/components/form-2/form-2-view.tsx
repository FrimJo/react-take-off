import { Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as React from 'react'
import { ContainedButton } from 'components/contained-button'
import { SubFormik } from 'components/sub-formik'
import { SubFormikProps } from 'components/sub-formik/sub-formik-container'

type Form = { address: string; city: string }
type Props = SubFormikProps<Form>

export default function (props: Props) {
  console.log('props', props)

  return (
    <SubFormik {...props}>
      {({ name, ...rest }) => {
        return (
          <Form>
            <pre>{JSON.stringify(rest, null, 2)}</pre>
            <Field name={name.address} component={TextField} label="Address" type="text" />
            <Field name={name.city} component={TextField} label="City" type="text" />
            <ContainedButton type="submit">Submit form2</ContainedButton>
          </Form>
        )
      }}
    </SubFormik>
  )
}
