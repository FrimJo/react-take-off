import enUS from './messages.en-us'
import svSE from './messages.sv-se'

type Locale = 'sv-SE' | 'en-US'

export { svSE, enUS }

export const getMessages = (locale: Locale) => (locale === 'en-US' ? enUS : svSE)
