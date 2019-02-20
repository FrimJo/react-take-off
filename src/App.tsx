import React, { useContext } from 'react'
import { MyContext } from './contexts/MyContext'

const App = () => {
  const myContext = useContext(MyContext)
  const { state, dispatch } = myContext
  return (
    <>
      <div>{state.value}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'clear' })}>Clear</button>
      <input
        value={state.value}
        onChange={event =>
          dispatch({ type: 'setValue', value: +event.target.value })
        }
      />
    </>
  )
}

export default App
