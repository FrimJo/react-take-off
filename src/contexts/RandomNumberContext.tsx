import useDraftDataApi from 'hooks/useDraftDataApi'
import useNumber from 'hooks/useNumber'
import React, { useEffect, useMemo } from 'react'
import * as api from 'services/api'

type State = Readonly<{
  isLoading: boolean
  value: number
}>

type Actions = Readonly<{
  fetchDataAsync: () => void
  increment: () => void
  reset: () => void
  setValue: (value: number) => void
}>

const StateContext = React.createContext<State | undefined>(undefined)
const ActionsContext = React.createContext<Actions | undefined>(undefined)

const RandomNumberProvider: React.FunctionComponent = ({ children }) => {
  const [{ data, isLoading }, doFetch] = useDraftDataApi<api.Payload>(
    api.randomNumberUrl,
    {
      type: null,
      length: 0,
      data: [],
      success: false,
    },
    (prevState, action) => action.draft
  )

  const { state, increment, reset, setValue } = useNumber(
    (prevState, action) => action.draft
  )

  useEffect(() => {
    if (
      data instanceof Object &&
      !!data.data &&
      Array.isArray(data.data) &&
      data.data.length > 0
    ) {
      setValue(data.data[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const stateValue: State = useMemo(
    () => ({
      isLoading,
      value: state.value,
    }),
    [isLoading, state.value]
  )

  const actionValue: Actions = useMemo(
    () => ({
      fetchDataAsync: () => {
        doFetch(
          `https://qrng.anu.edu.au/API/jsonI.php?length=${Math.floor(
            Math.random() * 10
          )}&type=uint8`
        )
      },
      increment,
      reset,
      setValue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <StateContext.Provider value={stateValue}>
      <ActionsContext.Provider value={actionValue}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

const useRandomNumberState = () => {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw Error('useMyContextState must be used within a MyContextProvider')
  }
  return context
}

const useRandomNumberActions = () => {
  const context = React.useContext(ActionsContext)
  if (context === undefined) {
    throw Error('useMyContextActions must be used within a MyContextProvider')
  }
  return context
}

export { useRandomNumberState, useRandomNumberActions, RandomNumberProvider }
