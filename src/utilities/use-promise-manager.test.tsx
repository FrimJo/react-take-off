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
  test('multiple simultaneous promises ', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePromiseManager())

    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })

    act(() => {
      result.current[1](dummyRejectFuncAsync({ ms: 100 }), { silent: true }).then(() => {
        setTimeout(() => {
          result.current[1](dummyResolveFuncAsync({ ms: 50 }), { silent: true })
          result.current[1](dummyResolveFuncAsync({ ms: 100 })).then(() => {
            setTimeout(() => {
              result.current[1](dummyResolveFuncAsync({ ms: 250 }), { silent: true })
              result.current[1](dummyRejectFuncAsync({ ms: 200 }))
              result.current[1](dummyResolveFuncAsync({ ms: 300 })).then(() => {
                setTimeout(() => {
                  result.current[1](dummyRejectFuncAsync({ ms: 200 }), { silent: true })
                  result.current[1](dummyResolveFuncAsync({ ms: 250 })).then(() => {
                    setTimeout(() => {
                      result.current[1](dummyResolveFuncAsync({ ms: 400 }), { silent: true })
                    }, 300)
                  })
                  setTimeout(() => {
                    result.current[1](dummyResolveFuncAsync({ ms: 50 }))
                  }, 150)
                }, 300)
              })
            }, 300)
          })
        }, 300)
      })
    })
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: false, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: true, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: true, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: false, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: true, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: true, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: true, isResolving: false, error: [ERROR_MESSAGE] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: true, error: [] })
    await waitForNextUpdate()
    expect(result.current[0]).toEqual({ hasError: false, isResolving: false, error: [] })
  })
})
