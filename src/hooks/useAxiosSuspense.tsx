import axios from 'axios'
import LRU from 'lru-cache'
import md5 from 'md5'

type CacheObject =
  | Readonly<{ status: 'new' }>
  | Readonly<{ status: 'resolved'; data: object }>

const cache = new LRU<string, CacheObject>(50)

const useAxiosSuspense = <T extends object>(
  url: string,
  fetchOptions = {}
): [T] => {
  const key = `${url}.${md5(JSON.stringify(fetchOptions))}`
  const value: CacheObject = cache.get(key) || { status: 'new' }

  if (value.status === 'resolved') {
    const data = value.data as T
    return [data]
  }

  const promise = axios
    .get<T>(url, {
      params: fetchOptions,
    })
    .then(axiosResponse => axiosResponse.data)

  promise.then(data => {
    const status = 'resolved'
    cache.set(key, { ...value, status, data })
  })

  throw promise
}

export default useAxiosSuspense
