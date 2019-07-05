import React from 'react'
import { hot } from 'react-hot-loader/root'
import { css } from 'styled-components'
import { ICountProps } from './components/Counter/Count'
import Counter from './components/Counter/Counter'
import { IWrapperProps } from './components/Counter/Wrapper'
import RandomCounter from './components/RandomCounter'
import { RandomNumberProvider } from './contexts/RandomNumberContext'

const styles = {
  Wrapper: css<IWrapperProps>`
    background: ${props => (props.primary ? 'yellow' : 'green')};
    padding: 20px;
  `,
  Count: css<ICountProps>`
    background: red;
    padding: 20px;
  `,
}

const App = () => {
  return (
    <RandomNumberProvider>
      <Counter styles={styles}>200</Counter>
      <RandomCounter />
      <TempComopnent />
    </RandomNumberProvider>
  )
}

const TempComopnent = () => {
  const [value, setValue] = React.useState(0)
  return (
    <div>
      <div>{value}</div>
      <button onClick={() => setValue(v => v + 1)}>increment</button>
    </div>
  )
}

export default hot(App)
