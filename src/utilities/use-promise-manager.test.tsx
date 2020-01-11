import { cleanup, wait } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { usePromiseManager } from './use-promise-manager'

afterEach(cleanup)

const ERROR_MESSAGE = 'unknown error'

const dummyResolveFuncAsync = ({ ms }: { ms: number }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), ms)
  })
}
const dummyRejectFuncAsync = ({ ms }: { ms: number }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(ERROR_MESSAGE), ms)
  })
}

describe('', () => {
  test('single resolve promise', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())

    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      result.current[1](dummyResolveFuncAsync({ ms: 100 }))
    })
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })
  })

  test('single reject promise', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())

    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      result.current[1](dummyRejectFuncAsync({ ms: 100 }))
    })
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: false, error: [ERROR_MESSAGE] })
  })

  test('single reject promise resets when new promise is managed', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())

    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      result.current[1](dummyRejectFuncAsync({ ms: 100 }))
      setTimeout(() => {
        result.current[1](dummyResolveFuncAsync({ ms: 100 }))
      }, 110)
    })
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: false, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })
  })

  test('paralel resolve promises', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())

    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      result.current[1](dummyResolveFuncAsync({ ms: 100 }))
      setTimeout(() => {
        result.current[1](dummyResolveFuncAsync({ ms: 100 }))
      }, 50)
    })
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })
  })

  test('paralel reject promises', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())

    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      result.current[1](dummyRejectFuncAsync({ ms: 100 }))
      setTimeout(() => {
        result.current[1](dummyRejectFuncAsync({ ms: 100 }))
      }, 50)
    })
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: true, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: false, error: [ERROR_MESSAGE, ERROR_MESSAGE] })
  })

  test('paralel mixed resolve and reject promises', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())

    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      result.current[1](dummyRejectFuncAsync({ ms: 100 }))
      setTimeout(() => {
        result.current[1](dummyResolveFuncAsync({ ms: 100 }))
      }, 50)
    })
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: true, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: false, error: [ERROR_MESSAGE] })
  })
})
