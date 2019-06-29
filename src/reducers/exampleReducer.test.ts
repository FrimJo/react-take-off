import { cleanup } from 'react-testing-library'
import exampleReducer from './exampleReducer'

afterEach(cleanup)

describe('exampleReducer()', () => {
  const initialState = { name: '', age: 0 }

  test('if no change results in new object and no change to the values', () => {
    const state = exampleReducer(initialState, {
      type: 'SET_AGE',
      age: initialState.age,
    })
    expect(state).not.toBe(initialState)
    expect(state.age).toEqual(initialState.age)
    expect(state.name).toEqual(initialState.name)
  })

  test('if no change results in new object and no change to the values of state property for typ SET_NAME', () => {
    const state = exampleReducer(initialState, {
      type: 'SET_NAME',
      name: initialState.name,
    })
    expect(state).not.toBe(initialState)
    expect(state.age).toEqual(initialState.age)
    expect(state.name).toEqual(initialState.name)
  })

  test('if change to age results in new object, change to age but no change to name', () => {
    const state = exampleReducer(initialState, { type: 'SET_AGE', age: 5 })
    expect(state).not.toBe(initialState)
    expect(state.age).toBe(5)
    expect(state.name).toBe(initialState.name)
  })

  test('if change to name results in new object, no change to age but change to name', () => {
    const state = exampleReducer(initialState, {
      type: 'SET_NAME',
      name: 'Lisa',
    })
    expect(state).not.toBe(initialState)
    expect(state.age).toBe(initialState.age)
    expect(state.name).toBe('Lisa')
  })
})
