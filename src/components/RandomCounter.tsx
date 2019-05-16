import React, { useContext, useCallback, useMemo } from 'react'
import { MyContext } from '../contexts/MyContext'
import styled from 'styled-components'

const StyledButton = styled.button``

const RandomCounter: React.FunctionComponent = ({ children }) => {
  const [state, actions] = useContext(MyContext)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      actions.setValue(+event.target.value),
    [actions]
  )
  const value = useMemo(() => (state.isLoading ? '...' : state.value), [
    state.isLoading,
    state.value,
  ])
  return (
    <>
      <div>{`Value: ${value}`}</div>
      <StyledButton disabled={state.isLoading} onClick={actions.increment}>
        Increment
      </StyledButton>
      <StyledButton disabled={state.isLoading} onClick={actions.reset}>
        Clear
      </StyledButton>
      <StyledButton disabled={state.isLoading} onClick={actions.fetchDataAsync}>
        Fetch
      </StyledButton>
      <input
        aria-label="input-field"
        disabled={state.isLoading}
        value={value}
        onChange={handleChange}
      />
      {state.isLoading && <div>is loading</div>}
    </>
  )
}

export default RandomCounter
