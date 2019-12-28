export type ManagerState = Readonly<{
  count: number
  error: any[]
}>

export type ManagerAction = Readonly<
  | { type: 'INIT'; payload?: boolean }
  | { type: 'SUCCESS' }
  | { type: 'FAILURE'; payload: any }
  | { type: 'ABORTED' }
>

export const managerReducer = (
  prevState: ManagerState,
  action: ManagerAction
): ManagerState => {
  switch (action.type) {
    case 'INIT': {
      const error = prevState.count === 0 ? [] : [...prevState.error]
      const count = action.payload
        ? prevState.count
        : prevState.count === 0
        ? 1
        : prevState.count + 1
      return {
        error,
        count,
      }
    }
    case 'SUCCESS': {
      return {
        ...prevState,
        count: Math.max(0, prevState.count - 1),
      }
    }
    case 'FAILURE': {
      return {
        ...prevState,
        error: [...prevState.error, action.payload],
        count: Math.max(0, prevState.count - 1),
      }
    }
    case 'ABORTED': {
      return {
        ...prevState,
        count: Math.max(0, prevState.count - 1),
      }
    }
  }
}
