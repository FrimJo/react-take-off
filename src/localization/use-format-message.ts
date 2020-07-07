import { useIntl } from 'react-intl'

const useFormatMessage = () => {
  const intl = useIntl()
  return (
    id: string,
    values?: { [key: string]: string | number | boolean | Date | null | undefined }
  ) => intl.formatMessage({ id }, values)
}

export default useFormatMessage
