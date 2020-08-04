import { Name } from 'types'

export function getNamesForObject<T extends Object>(parent: T, parentStr = ''): Name<T> {
  const returnObj = {}

  for (const key in parent as Object) {
    if (!parent.hasOwnProperty(key)) continue

    const child = parent[key]
    const childStr = parentStr.length === 0 ? key : `${parentStr}.${key}`

    if (child instanceof Object && Object.keys(child).length > 0) {
      returnObj[key] = getNamesForObject(child, childStr)
    } else {
      returnObj[key] = childStr
    }
  }

  return returnObj as Name<T>
}
