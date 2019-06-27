import axios from 'axios'
import React from 'react'
import dataFetchReducer, { FetchState } from './dataFetchReducer'

const useDataApi = <T extends object = object>(
  initialUrl: string,
  initialData: T
): [FetchState<T>, (url: string) => void] => {
  const [url, setUrl] = React.useState(initialUrl)

  const [state, dispatch] = React.useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    error: null,
    data: initialData,
  })

  React.useEffect(() => {
    let didCancel = false

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const result = await axios(url)

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: error })
        }
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, [url])

  return [state as FetchState<T>, setUrl]
}

export default useDataApi
