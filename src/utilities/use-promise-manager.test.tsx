import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { usePromiseManager } from './use-promise-manager'

afterEach(cleanup)

const ERROR_MESSAGE = 'unknown error'

const dummyResolveFuncAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 4000)
  })
}
const dummyRejectFuncAsync = () => {
  return new Promise((resolve, reject) => {
    reject(ERROR_MESSAGE)
  })
}

describe('', () => {
  test('that initial state is correct', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())
    const [state, manage] = result.current
    expect(state).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      manage(dummyResolveFuncAsync())
    }) //.catch(err => console.log('error:', err)))

    expect(state).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(state).toEqual({ hasError: false, isResolving: false, error: [] })
  })
})
