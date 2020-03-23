import {
  useMutation,
  queryCache,
  MutationFunction,
  MutationOptions,
  MutateFunction,
  MutationState,
  QueryKey,
} from 'react-query'
import React from 'react'

type OptimisticMutateFunction<TResults, TVariables extends object> = MutateFunction<
  TResults,
  TVariables
>

/**
 * Proivded updateQuery key is used to expose a function to optimistically mutate that query.
 * When using exposed mutate function, query will be set to provided value, while running the mutation,
 * if the mutation fails, query is reset to previous value.
 *
 * @param queryKey The query key of the query to optimistically mutate.
 * @param mutationFn  The function to use to mutate the query.
 * @param mutationOptions Options to use in the useMutation hook.
 */
export function useOptimisticMutation<TResults, TVariables extends object>(
  queryKey: QueryKey,
  mutationFn: MutationFunction<TResults, TVariables>,
  mutationOptions: MutationOptions<TResults> = {}
): [OptimisticMutateFunction<TResults, TVariables>, MutationState<TResults>] {
  const [mutate, state] = useMutation(mutationFn, {
    ...mutationOptions,
    throwOnError: true, // To be able to catch error and reset to previous value
  })

  /**
   * Sets provided query to provided value while running the mutation,
   * if the mutation fails, query is reset to previous value.
   */
  const optimisticMutation: OptimisticMutateFunction<TResults, TVariables> = React.useCallback(
    (variables, options) => {
      console.log('optimisticMutation', variables, options)
      if (!queryKey) {
        return Promise.resolve()
      }
      const updateQuery: string | [string, object] =
        typeof queryKey === 'string' ? queryKey : [queryKey[0], queryKey[1]]

      // Store our previous variables if something goes wrong
      const prevVariables = queryCache.getQueryData(queryKey)
      //string | [string, object]
      console.log('setQueryData', queryKey, variables)
      // Optimistically set query using our new values
      queryCache.setQueryData(queryKey, variables)
      // Mutate query using provided mutation
      return (
        mutate(variables, { ...options, updateQuery })
          .then(() => {
            console.log('refetchQueries', queryKey)
            return queryCache.refetchQueries(queryKey)
          })
          // If something went wrong
          .catch((error) => {
            // Set the query back to it's previous value
            queryCache.setQueryData(queryKey, prevVariables)
            return error
          })
      )
    },
    [mutate, queryKey]
  )

  return [optimisticMutation, state]
}
