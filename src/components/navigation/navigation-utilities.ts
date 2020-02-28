export function getObjectPath(obj: object | string, str: string[] = []): string[] {
  if (typeof obj === 'string') {
    return [obj]
  }
  for (const key in obj) {
    str.push(key, ...getObjectPath(obj[key], str))
    break
  }
  return str
}

export function getEvents(path: string[], obj: object): string[] {
  let events: string[] = []
  let localObj = obj
  for (const element of path) {
    events = localObj[element].events
    localObj = localObj[element].states
  }
  return events
}
export function getMeta(path: string[], metaObj: object): any {
  if (typeof metaObj !== 'object') {
    return metaObj
  }
  let localMeta = metaObj
  for (const element of path) {
    localMeta = metaObj[element]
    if (typeof localMeta !== 'object') {
      break
    }
  }
  return localMeta ?? {}
}
