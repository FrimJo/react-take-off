import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { getLocale, getLocaleFns } from './get-locale'
import { getMessages } from './messages'

const LocalizationProvider: React.FunctionComponent = ({ children }) => {
  const currentLocale = getLocale()
  const messages = getMessages(currentLocale)
  return (
    <MuiPickersUtilsProvider
      key={currentLocale}
      utils={DateFnsUtils}
      locale={getLocaleFns(currentLocale)}>
      <IntlProvider
        key={currentLocale} // Add the key prop to make sure the app is re-rendered when changing locale
        locale={currentLocale}
        messages={messages}>
        {children}
      </IntlProvider>
    </MuiPickersUtilsProvider>
  )
}

export default LocalizationProvider
