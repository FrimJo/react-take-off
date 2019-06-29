import {
  useRandomNumberActions,
  useRandomNumberState,
} from 'contexts/RandomNumberContext'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button``

const RandomCounter: React.FunctionComponent = ({ children }) => {
  const context = useRandomNumberState()
  const actions = useRandomNumberActions()

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
