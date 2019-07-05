import React from 'react'

export type DraftReducer<S, A> = React.Reducer<Readonly<S>, DraftAction<S, A>>

type DraftAction<S, A> = A & { readonly draft: S }

type UseDraftReducer = <S, A>(
  reducer: React.Reducer<S, A>,
  initialValues: S,
  draftReducer?: DraftReducer<S, A>
) => [Readonly<S>, React.Dispatch<A>]

const useDraftReducer: UseDraftReducer = (
  reducer,
  initialValues,
  draftReducer
) => {
  return React.useReducer<typeof reducer>((prevState, action) => {
    const draft = reducer(prevState, action)
    return draftReducer ? draftReducer(prevState, { ...action, draft }) : draft
  }, initialValues)
}

export default useDraftReducer
