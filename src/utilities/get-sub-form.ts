type SubFormProps<TFieldValues, Path extends keyof TFieldValues> = {
  name: Path
  defaultValues: TFieldValues[Path]
}

export function getSubForm<TFieldValues extends object, TPath extends keyof TFieldValues & string>(
  defaultValues: TFieldValues,
  path: TPath
): SubFormProps<TFieldValues, TPath> {
  const subForm: SubFormProps<TFieldValues, TPath> = {
    name: path,
    defaultValues: defaultValues[path],
  }
  return subForm
}
