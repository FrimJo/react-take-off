import React from 'react'

type Props = Readonly<{ prop1: string }>

export const ComponentNameView: React.FunctionComponent<Props> = ({
  prop1,
}) => {
  return <div>{prop1}</div>
}
