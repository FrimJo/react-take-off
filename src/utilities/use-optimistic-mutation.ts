import { useMutation, queryCache } from 'react-query'

export function useOptimisticMutation(
  updateQuery: string,
  func: any,
  options?: any,
  ...props: any[]
) {
  const [mutate, state] = useMutation(func, { ...options, throwOnError: true }, ...props)

  const optimisticMutation = (variables: any, options: any, ...props: any[]) => {
    // Get our previous variables to use if something goes wrong
    const prevVariables = queryCache.getQueryData(updateQuery)

    // Set the query data of query for proivded query key using our new values
    queryCache.setQueryData(updateQuery, variables, { shouldRefetch: false })

    return (
      mutate(variables, { ...options, updateQuery }, ...props)
        // If something wen't wrong
        .catch((error: any) => {
          // Reset the mutation state
          state.reset()

          // Set the query data of provided query key to it's previous value
          queryCache.setQueryData(updateQuery, prevVariables, { shouldRefetch: false })
          return error
        })
    )
  }

  return [optimisticMutation, state]
}
