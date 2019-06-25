import useDataApi from 'hooks/useDataApi'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useRandomNumber from '../hooks/useRandomNumber'
import * as api from '../services/api'

interface IState {
  readonly isLoading: boolean
  readonly value: number
}
type Actions = Readonly<{
  fetchDataAsync: () => void
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}>

const StateContext = React.createContext({} as IState)
const ActionsContext = React.createContext({} as Actions)

const MyContextProvider: React.FunctionComponent = ({ children }) => {
  const [state, setUrl] = useDataApi(api.randomNumberUrl, {
    type: null,
    length: 0,
    data: [],
    success: false,
  })

  const { value, increment, reset, setValue } = useRandomNumber(
    (currentState, action) => action.changes
  )

  useEffect(() => {
    if (state.data.length > 0) {
      setValue(state.data.data[0])
    }
  }, [setValue, state, state.data])

  const stateValue: IState = useMemo(
    () => ({
      isLoading: state.isLoading,
      value,
    }),
    [state.isLoading, value]
  )

  const actionValue: Actions = useMemo(
    () => ({
      fetchDataAsync: () => {},
      increment,
      reset,
      setValue,
    }),
    [increment, reset, setValue]
  )
  return (
    <StateContext.Provider value={stateValue}>
      <ActionsContext.Provider value={actionValue}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

export { StateContext, ActionsContext, MyContextProvider }
