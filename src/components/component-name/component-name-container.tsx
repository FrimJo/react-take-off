import React from 'react'
import { ComponentNameContext } from './component-name-context'
import { ComponentNameView } from './component-name-view'

export const ComponentNameContainer: React.FC = () => {
  const [name, setName] = React.useState('dafault name')
  return (
    <ComponentNameContext.Provider>
      <span>ComponentContainer</span>
      <ComponentNameView prop1={name} />
    </ComponentNameContext.Provider>
  )
}
