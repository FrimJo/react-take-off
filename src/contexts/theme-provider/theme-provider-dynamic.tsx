import dynamic from 'next/dynamic'

const ThemeProviderDynamic = dynamic(
  () => {
    return import('./theme-provider-container')
  },
  { ssr: false }
)

export default ThemeProviderDynamic
