import React from 'react'
import RandomCounter from './components/RandomCounter'
import { MyContextProvider } from './contexts/MyContext'
import { css } from 'styled-components'
import Counter from './components/Counter/Counter'
import { WrapperProps } from './components/Counter/Wrapper'
import { CountProps } from './components/Counter/Count'

const styles = {
  Wrapper: css<WrapperProps>`
    background: ${props => (props.primary ? 'yellow' : 'green')};
    padding: 20px;
  `,
  Count: css<CountProps>`
    background: red;
    padding: 20px;
  `,
}

const App = () => {
  return (
    <MyContextProvider>
      <Counter styles={styles}>4815162342</Counter>
      <RandomCounter />
    </MyContextProvider>
  )
}

export default App
