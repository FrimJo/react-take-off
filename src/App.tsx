import React, { useContext, useMemo } from 'react'
import { MyContext } from './contexts/MyContext'

const App = () => {
  const myContext = useContext(MyContext)
  const { state, dispatch } = myContext
  const { value, error } = state
  return (
    <>
      {error && <h3>{error}</h3>}
      <div>{value}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'clear' })}>Clear</button>
      <input
        value={value}
        onChange={event =>
          dispatch({ type: 'setValue', value: +event.target.value })
        }
      />
    </>
  )
}

export default App
