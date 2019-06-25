export type FetchState<T extends object = object> = {
  isLoading: boolean
  isError: boolean
  error: any
  data: T
}

export type FetchAction<T extends object = object> =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_FAILURE'; payload: string }

const dataFetchReducer: React.Reducer<FetchState, FetchAction> = (
  state,
  action
): FetchState => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      }
    default:
      throw new Error()
  }
}

export default dataFetchReducer
