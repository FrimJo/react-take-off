import React from 'react'
import * as yup from 'yup'

import { Name, OnSubmitFunction } from 'types'

const dummyFnc = (field1: string, field2: string, field3: string) =>
  new Promise<boolean>(resolve => setTimeout(resolve, 2000))

type ExampleForm = Readonly<{
  field1: string
  field2: string
  field3: string
}>

// Define the hook to be used to leverage this form
const useExampleForm = () => {
  const initialValues: ExampleForm = React.useMemo(
    () => ({
      field1: '',
      field2: '',
      field3: '',
    }),
    []
  )

  const onSubmit: OnSubmitFunction<ExampleForm> = React.useCallback(
    ({ field1, field2, field3 }, { setSubmitting }) =>
      dummyFnc(field1, field2, field3).finally(() => setSubmitting(false)),
    []
  )

  const validationSchema = React.useMemo(
    () =>
      yup.object().shape<ExampleForm>({
        field1: yup.string().required(),
        field2: yup.string().required(),
        field3: yup.string().required(),
      }),
    []
  )

  const name: Name<ExampleForm> = React.useMemo(
    () => ({
      field1: 'field1',
      field2: 'field2',
      field3: 'field3',
    }),
    []
  )

  return {
    initialValues,
    onSubmit,
    validationSchema,
    name,
  }
}

export default useExampleForm
