import { cleanup as cleanUpReact, render as renderReact, act } from '@testing-library/react'
import * as React from 'react'
import { buildContext } from './build-context'

afterEach(() => {
  cleanUpReact()
})

function useCounter() {
  const [count, setCount] = React.useState(0)
  return { state: { count }, actions: { setCount } }
}

const CounterContext = buildContext(useCounter)

function ExampelConsumer() {
  const { count } = CounterContext.useState()
  const { setCount } = CounterContext.useActions()

  return (
    <div>
      <div data-testid="count-value">{count}</div>
      <button data-testid="increment-button" onClick={() => setCount((prev) => prev + 1)}>
        increment
      </button>
    </div>
  )
}

describe('', () => {
  test('', () => {
    const { getByTestId } = renderReact(
      <CounterContext.Provider>
        <ExampelConsumer />
      </CounterContext.Provider>
    )

    const incrementButton = getByTestId('increment-button')

    expect(Number(getByTestId('count-value').textContent)).toEqual(0)
    act(() => incrementButton.click())
    expect(Number(getByTestId('count-value').textContent)).toEqual(1)
  })
})
