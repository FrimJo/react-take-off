// eslint-disable-next-line import/no-duplicates
import enLocale from 'date-fns/locale/en-US'
// eslint-disable-next-line import/no-duplicates
import svLocale from 'date-fns/locale/sv'

const getLocale = () => (navigator && navigator.language === 'en-US' ? 'en-US' : 'sv-SE')

type Locales = ReturnType<typeof getLocale>

const localeMap: { [key in Locales]: Locale } = {
  'sv-SE': svLocale,
  'en-US': enLocale,
}

const getLocaleFns = (locale: Locales) => localeMap[locale]

export { getLocale, getLocaleFns }
