import React, { useContext, useCallback } from 'react'
import { MyContext } from './contexts/MyContext'

const App = () => {
  const [state, dispatch] = useContext(MyContext)
  const handleIncrementClick = useCallback(() => dispatch({ type: 'increment' }), [])
  const handleResetClick = useCallback(() => dispatch({ type: 'clear' }), [])
  const handleFetchClick = useCallback(() => dispatch({ type: 'fetch' }), [])
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'setValue', value: +event.target.value }), [])
  return (
    <>
      <div>{state.value}</div>
      <button onClick={handleIncrementClick}>Increment</button>
      <button onClick={handleResetClick}>Clear</button>
      <button onClick={handleFetchClick}>Fetch</button>
      <input value={state.value} onChange={handleChange} />
    </>
  )
}

export default App
