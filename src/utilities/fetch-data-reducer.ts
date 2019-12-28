export type ManagerState = Readonly<{
  count: number
  error: any[]
}>

export type ManagerAction = Readonly<
  | { type: 'INIT' }
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
      return prevState.count === 0
        ? {
            ...prevState,
            error: [],
            count: 1,
          }
        : { ...prevState, count: prevState.count + 1 }
    }
    case 'SUCCESS': {
      return {
        ...prevState,
        count: prevState.count - 1,
      }
    }
    case 'FAILURE': {
      return {
        ...prevState,
        error: [...prevState.error, action.payload],
        count: prevState.count - 1,
      }
    }
    case 'ABORTED': {
      return {
        ...prevState,
        count: prevState.count - 1,
      }
    }
  }
}
