import React, { useCallback, useContext } from 'react'
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

  return (
    <>
      <div>{`Value: ${context.value}`}</div>
      <StyledButton onClick={actions.increment}>Increment</StyledButton>
      <StyledButton onClick={actions.reset}>Clear</StyledButton>
      <input
        aria-label="input-field"
        value={context.value}
        onChange={handleChange}
      />
    </>
  )
}

export default RandomCounter
