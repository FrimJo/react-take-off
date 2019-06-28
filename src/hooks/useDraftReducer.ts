import React from 'react'
import { DraftReducer } from 'types'

const useDraftReducer = <S extends object, A extends object>(reducer: React.Reducer<S, A>, initialValues: S, draftReducer?: DraftReducer<S, A>) => React.useReducer((prevState: S, action: A)=>{
      const draft = reducer(prevState, action)
      return draftReducer ? draftReducer(prevState, {...action, draft}) : draft
}, initialValues)

export default useDraftReducer


