import React from 'react'

export type State = Readonly<{
  name: string
  age: number
}>

export type Action = Readonly<
  | {
      type: 'SET_AGE'
      age: number
    }
  | {
      type: 'SET_NAME'
      name: string
    }
>

const exampleReducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'SET_AGE': {
      return { ...prevState, age: action.age }
    }
    case 'SET_NAME': {
      return { ...prevState, name: action.name }
    }
  }
  return { ...prevState }
}

export default exampleReducer
