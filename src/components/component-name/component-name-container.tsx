import React from 'react'
import ComponentNameView from './component-name-view'

const ComponentNameContainer: React.FunctionComponent = () => {
  const [name, setName] = React.useState('dafault name')
  return (
    <div>
      <label>ComponentContainer</label>
      <ComponentNameView prop1={name} />
    </div>
  )
}

export default ComponentNameContainer
