import { Name } from 'types'

export function getNamesForObjet<T extends Object>(parent: T, parentStr = ''): Name<T> {
  const returnObj = {}

  for (let key in parent as Object) {
    if (!parent.hasOwnProperty(key)) continue
    const child = parent[key]
    const childStr = parentStr.length === 0 ? key : `${parentStr}.${key}`
    if (child instanceof Object) {
      if (Object.keys(child).length === 0) {
        returnObj[key] = childStr
      } else {
        returnObj[key] = getNamesForObjet(child, childStr)
      }
    } else {
      returnObj[key] = childStr
    }
  }

  return (returnObj as unknown) as Name<T>
}
