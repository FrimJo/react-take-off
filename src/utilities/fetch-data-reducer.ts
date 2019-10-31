export type FetchState = Readonly<{
  count: number
  error: any[]
}>

export type FetchAction = Readonly<
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_FAILURE'; payload: any }
  | { type: 'FETCH_ABORTED' }
>

export const fetchDataReducer = (
  prevState: FetchState,
  action: FetchAction
): FetchState => {
  switch (action.type) {
    case 'FETCH_INIT': {
      return prevState.count === 0
        ? {
            ...prevState,
            error: [],
            count: 1,
          }
        : { ...prevState, count: prevState.count + 1 }
    }
    case 'FETCH_SUCCESS': {
      return {
        ...prevState,
        count: prevState.count - 1,
      }
    }
    case 'FETCH_FAILURE': {
      return {
        ...prevState,
        error: [...prevState.error, action.payload],
        count: prevState.count - 1,
      }
    }
    case 'FETCH_ABORTED': {
      return {
        ...prevState,
        count: prevState.count - 1,
      }
    }
  }
}
