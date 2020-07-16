import { FormikConfig } from 'formik'
import * as yup from 'yup'

type SubFormProps<Values, Path extends keyof Values> = {
  name: Path
  initialValues: Values[Path]
  validationSchema: yup.Schema<Values[Path]>
}

export function getSubForm<Values, P extends keyof Values & string>(
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
