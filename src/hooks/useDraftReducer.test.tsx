import { act, renderHook } from '@testing-library/react-hooks'
import exampleReducer, { Action, State } from 'reducers/exampleReducer'
import useDraftReducer, { DraftReducer } from './useDraftReducer'

describe('useDraftReducer()', () => {
  test('it runs', () => {
    const draftReducer: DraftReducer<State, Action> = (prevState, action) =>
      action.draft
    const initialState: State = { name: '', age: 0 }
    renderHook(() =>
      useDraftReducer(exampleReducer, initialState, draftReducer)
    )
  })

  test('it runs width deafult state', () => {
    const draftReducer: DraftReducer<State, Action> = (prevState, action) =>
      action.draft
    const initialState: State = { name: '', age: 0 }
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState, draftReducer)
    )

    const [value] = result.current
    expect(value.name).toBe('')
    expect(value.age).toBe(0)
  })

  test('sets name to Lisa on SET_NAME dispatch', () => {
    const draftReducer: DraftReducer<State, Action> = (prevState, action) =>
      action.draft
    const initialState: State = { name: '', age: 0 }
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState, draftReducer)
    )

    const [, dispatch] = result.current

    const name = 'Lisa'
    act(() => dispatch({ type: 'SET_NAME', name }))
    const [value] = result.current
    expect(value.name).toBe(name)
  })

  test('sets age to 7 on SET_AGE dispatch', () => {
    const draftReducer: DraftReducer<State, Action> = (prevState, action) =>
      action.draft
    const initialState: State = { name: '', age: 0 }
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState, draftReducer)
    )
    const [, dispatch] = result.current

    const age = 7
    act(() => dispatch({ type: 'SET_AGE', age }))
    const [value] = result.current
    expect(value.age).toBe(age)
  })
})
