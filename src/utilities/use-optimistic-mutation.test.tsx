import { cleanup, render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useOptimisticMutation } from './use-optimistic-mutation'
import { useQuery, useMutation } from 'react-query'
// import {act} from react-dom/test-utils
import React from 'react'
// import TestRenderer from 'react-test-renderer'

// const { act } = TestRenderer

afterEach(cleanup)

const fetchTest = (): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('test'), 1000)
  })

const mutateTest = (): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('test'), 1000)
  })

function useCounter() {
  const [count, setCount] = React.useState(0)

  const increment = React.useCallback(() => setCount((x) => x + 1), [])

  return { count, increment }
}

describe('', () => {
  test('', async () => {
    function Page() {
      const queryState = useQuery('hookTest', fetchTest)
      return (
        <>
          <div data-testid="use-query">{JSON.stringify(queryState)}</div>
        </>
      )
    }
    const { getByTestId } = render(<Page />)
    const queryState = JSON.parse(getByTestId('use-query').textContent || JSON.stringify({}))
    expect(queryState.data).toEqual(undefined)

    const { result, waitForNextUpdate } = renderHook(() =>
      useOptimisticMutation('hookTest', mutateTest)
    )
    const [mutate, data] = result.current
    await act(async () => {
      await mutate()
    })

    await waitForNextUpdate()

    // expect(queryState.data).toEqual('test')
  })
})
