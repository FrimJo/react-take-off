import React from 'react'
import { ComponentNameView } from './component-name-view'
import { ComponentNameContext } from './component-name-context'

export const ComponentNameContainer: React.FC = () => {
  const [name, setName] = React.useState('dafault name')
  return (
    <ComponentNameContext.Provider>
      <label>ComponentContainer</label>
      <ComponentNameView prop1={name} />
    </ComponentNameContext.Provider>
  )
}
