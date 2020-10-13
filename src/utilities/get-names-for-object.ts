export type Name<Value> = {
  [Key in keyof Value]: Value[Key] extends Dictionary ? Name<Value[Key]> : string
}

type Dictionary = Record<string, any>

function getNamesForObject<T extends Dictionary>(parent: T, parentStr = ''): Name<T> {
  const returnObj: Dictionary = {}

  for (const key in parent) {
    if (!Object.prototype.hasOwnProperty.call(parent, key)) continue

    const child = parent[key]
    const childStr = parentStr.length === 0 ? key : `${parentStr}.${key}`

    if (typeof child === 'object' && child !== null && Object.keys(child).length > 0) {
      returnObj[key] = getNamesForObject(child, childStr)
    } else {
      returnObj[key] = childStr
    }
  }

  return returnObj as Name<T>
}

export default getNamesForObject
