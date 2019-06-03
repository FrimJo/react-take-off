import React from 'react'
import { hot } from 'react-hot-loader/root'
import { css } from 'styled-components'
import { ICountProps } from './components/Counter/Count'
import Counter from './components/Counter/Counter'
import { IWrapperProps } from './components/Counter/Wrapper'
import RandomCounter from './components/RandomCounter'
import { MyContextProvider } from './contexts/MyContext'

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

const App = () => (
  <MyContextProvider>
    <Counter styles={styles}>4815162342</Counter>
    <RandomCounter />
  </MyContextProvider>
)

export default hot(App)
