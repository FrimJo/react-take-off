import React, { useCallback, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { ActionsContext, StateContext } from '../contexts/MyContext'

const StyledButton = styled.button``

const RandomCounter: React.FunctionComponent = ({ children }) => {
  const context = useContext(StateContext)
  const actions = useContext(ActionsContext)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      actions.setValue(+event.target.value),
    [actions]
  )
  const value = useMemo(() => (context.isLoading ? '...' : context.value), [
    context.isLoading,
    context.value,
  ])
  return (
    <>
      <div>{`Value: ${value}`}</div>
      <StyledButton disabled={context.isLoading} onClick={actions.increment}>
        Increment
      </StyledButton>
      <StyledButton disabled={context.isLoading} onClick={actions.reset}>
        Clear
      </StyledButton>
      <StyledButton
        disabled={context.isLoading}
        onClick={actions.fetchDataAsync}>
        Fetch
      </StyledButton>
      <input
        aria-label="input-field"
        disabled={context.isLoading}
        value={value}
        onChange={handleChange}
      />
      {context.isLoading && <div>is loading</div>}
    </>
  )
}

export default RandomCounter
