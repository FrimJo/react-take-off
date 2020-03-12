import {
  useMutation,
  queryCache,
  MutationFunction,
  MutationOptions,
  MutateFunction,
  MutationState,
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
 * @param updateQuery The query key of the query to optimistically mutate.
 * @param mutationFn  The function to use to mutate the query.
 * @param mutationOptions Options to use in the useMutation hook.
 */
export function useOptimisticMutation<TResults, TVariables extends object>(
  updateQuery: string,
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
      // Store our previous variables if something goes wrong
      const prevVariables = queryCache.getQueryData(updateQuery)

      // Optimistically set query using our new values
      queryCache.setQueryData(updateQuery, variables)

      // Mutate query using provided mutation
      return (
        mutate(variables, { ...options, updateQuery })
          // If something went wrong
          .catch(error => {
            // Set the query back to it's previous value
            queryCache.setQueryData(updateQuery, prevVariables)
            return error
          })
      )
    },
    [mutate, updateQuery]
  )

  return [optimisticMutation, state]
}
