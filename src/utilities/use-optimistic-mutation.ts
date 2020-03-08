import {
  useMutation,
  queryCache,
  MutationFunction,
  MutationOptions,
  MutateFunction,
  MutationState,
} from 'react-query'
import React from 'react'

export function useOptimisticMutation<TResults, TVariables extends object>(
  updateQuery: string,
  mutationFn: MutationFunction<TResults, TVariables>,
  mutationOptions?: MutationOptions<TResults>
): [MutateFunction<TResults, TVariables>, MutationState<TResults>] {
  const [mutate, state] = useMutation<TResults, TVariables>(mutationFn, {
    ...mutationOptions,
    throwOnError: true,
  })

  const optimisticMutation: typeof mutate = React.useCallback(
    (variables, options) => {
      // Get our previous variables to use if something goes wrong
      const prevVariables = queryCache.getQueryData(updateQuery)

      // Set the query data of query for proivded query key using our new values
      queryCache.setQueryData(updateQuery, variables)

      return (
        mutate(variables, { ...options, updateQuery })
          // If something wen't wrong
          .catch(error => {
            // Set the query data of provided query key to it's previous value
            queryCache.setQueryData(updateQuery, prevVariables)
            return error
          })
      )
    },
    [mutate, updateQuery]
  )

  return [optimisticMutation, state]
}
