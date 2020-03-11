import { cleanup, render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useOptimisticMutation } from './use-optimistic-mutation'
import { useQuery } from 'react-query'

afterEach(cleanup)

const fetchTest = () =>
  new Promise((resolve, reject) => {
    resolve('test')
  })

const mutateTest = () =>
  new Promise((resolve, reject) => {
    resolve('test')
  })

describe('', () => {
  test('', () => {
    const { result } = renderHook(() => {
      const [mutateFunc, mutateState] = state
      const { status, data, error } = useQuery('hookTest', fetchTest)
      return useOptimisticMutation('hookTest', mutateTest)
    })
  })
})
