import React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'
import exampleReducer, { Action, State } from 'reducers/exampleReducer'
import useDraftReducer, { DraftReducer } from './useDraftReducer'

afterEach(cleanup)

const initialState = { name: '', age: 0 }

const testDraftReducer: DraftReducer<State, Action> = (prevState, action) =>
  action.draft

const TestComponent: React.FunctionComponent<{
  name: string
  age: number
  draftReducer: DraftReducer<State, Action>
}> = ({ name, age, draftReducer }) => {
  const [value, dispatch] = useDraftReducer(
    exampleReducer,
    initialState,
    draftReducer
  )
  return (
    <div>
      <p data-testid="nameValue">{value.name}</p>
      <p data-testid="ageValue">{value.age}</p>
      <button
        data-testid="setNameButton"
        type="button"
        onClick={() => dispatch({ type: 'SET_NAME', name })}
      />
      <button
        data-testid="setAgeButton"
        type="button"
        onClick={() => dispatch({ type: 'SET_AGE', age })}
      />
    </div>
  )
}

describe('useDraftReducer()', () => {
  test('it renders', () => {
    render(
      <TestComponent name="Lisa" age={5} draftReducer={testDraftReducer} />
    )
  })

  test('has correct default values', () => {
    const { getByTestId } = render(
      <TestComponent name="Lisa" age={5} draftReducer={testDraftReducer} />
    )
    const nameValue = getByTestId('nameValue').textContent
    expect(nameValue).toBe(initialState.name)
    const ageValue = getByTestId('ageValue').textContent
    expect(+(ageValue as string)).toBe(initialState.age)
  })

  test('sets correct name on set name button click', async () => {
    const newName = 'Lisa'
    const { getByTestId } = render(
      <TestComponent name={newName} age={5} draftReducer={testDraftReducer} />
    )
    const setNameButton = getByTestId('setNameButton')
    fireEvent.click(setNameButton)
    const nameValue = getByTestId('nameValue').textContent
    expect(nameValue).toBe(newName)
  })

  test('sets correct age on set age button click', async () => {
    const newAge = 5
    const { getByTestId } = render(
      <TestComponent
        name={'Lisa'}
        age={newAge}
        draftReducer={testDraftReducer}
      />
    )
    const setNameButton = getByTestId('setAgeButton')
    fireEvent.click(setNameButton)
    const ageValue = getByTestId('ageValue').textContent
    expect(+(ageValue as string)).toBe(newAge)
  })

  test('sets correct age on set age button click using draft reducer', async () => {
    const newAge = 5
    const draftAge = 24
    const { getByTestId } = render(
      <TestComponent
        name={'Lisa'}
        age={newAge}
        draftReducer={(prevState, action) => {
          if (action.type === 'SET_AGE') {
            return { ...prevState, age: draftAge }
          }
          return action.draft
        }}
      />
    )
    const setNameButton = getByTestId('setAgeButton')
    fireEvent.click(setNameButton)
    const ageValue = getByTestId('ageValue').textContent
    expect(+(ageValue as string)).toBe(draftAge)
  })
})
