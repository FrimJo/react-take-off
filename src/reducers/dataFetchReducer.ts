export type FetchState<T extends object = object> = Readonly<{
  isLoading: boolean
  isError: boolean
  error: any
  data: T
}>

export type FetchAction<T extends object = object> = Readonly<
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_FAILURE'; payload: string }
>

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
        error: '',
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
  }
}

export default dataFetchReducer
