import React from 'react'
import { IntlProvider } from 'react-intl'
import { getLocale } from './get-locale'
import { getMessages } from './messages'

const LocalizationProvider: React.FunctionComponent = ({ children }) => {
  const currentLocale = getLocale()
  const messages = getMessages(currentLocale)
  return (
    <IntlProvider
      key={currentLocale} // Add the key prop to make sure the app is re-rendered when changing locale
      locale={currentLocale}
      messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default LocalizationProvider
