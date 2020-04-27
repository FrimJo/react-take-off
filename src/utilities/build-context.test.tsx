import { cleanup as cleanUpReact, render as renderReact, act } from '@testing-library/react'
import * as React from 'react'
import { buildContext } from './build-context'

afterEach(() => {
  cleanUpReact()
})

function useCounter(props: { initialCount: number }) {
  const [count, setCount] = React.useState(props.initialCount)
  return { state: { count }, actions: { setCount } }
}

const CounterContext = buildContext(useCounter)

function ExampleUsingConsumerHooks() {
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

function ExampleUsingUseContext() {
  const state = React.useContext(CounterContext.StateContext)
  const actions = React.useContext(CounterContext.ActionsContext)
  return (
    <div>
      <div data-testid="count-value">{state?.count}</div>
      <button data-testid="increment-button" onClick={() => actions?.setCount((prev) => prev + 1)}>
        increment
      </button>
    </div>
  )
}

function ExampelUsingConsumerComponent() {
  return (
    <CounterContext.StateConsumer>
      {({ count }) => (
        <CounterContext.ActionsConsumer>
          {({ setCount }) => (
            <>
              <div data-testid="count-value">{count}</div>
              <button data-testid="increment-button" onClick={() => setCount((prev) => prev + 1)}>
                increment
              </button>
            </>
          )}
        </CounterContext.ActionsConsumer>
      )}
    </CounterContext.StateConsumer>
  )
}

describe('', () => {
  test('Provider using Consumer hooks', () => {
    const { getByTestId } = renderReact(
      <CounterContext.Provider initialCount={0}>
        <ExampleUsingConsumerHooks />
      </CounterContext.Provider>
    )

    const incrementButton = getByTestId('increment-button')

    expect(Number(getByTestId('count-value').textContent)).toEqual(0)
    act(() => incrementButton.click())
    expect(Number(getByTestId('count-value').textContent)).toEqual(1)
  })

  test('Provider using React.useContext', () => {
    const { getByTestId } = renderReact(
      <CounterContext.Provider initialCount={3}>
        <ExampleUsingUseContext />
      </CounterContext.Provider>
    )

    const incrementButton = getByTestId('increment-button')

    expect(Number(getByTestId('count-value').textContent)).toEqual(3)
    act(() => incrementButton.click())
    expect(Number(getByTestId('count-value').textContent)).toEqual(4)
  })

  test('Provider using Consumer component', () => {
    const { getByTestId } = renderReact(
      <CounterContext.Provider initialCount={7}>
        <ExampelUsingConsumerComponent />
      </CounterContext.Provider>
    )

    const incrementButton = getByTestId('increment-button')

    expect(Number(getByTestId('count-value').textContent)).toEqual(7)
    act(() => incrementButton.click())
    expect(Number(getByTestId('count-value').textContent)).toEqual(8)
  })
})
