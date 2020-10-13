import dynamic from 'next/dynamic'

const LocalStorageDynamic = dynamic(
  () => {
    return import('./local-storage-context')
  },
  { ssr: false }
)

export default LocalStorageDynamic
