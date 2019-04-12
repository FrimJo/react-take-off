import React from 'react'
import RandomCounter from './components/RandomCounter';
import { MyContextProvider } from './contexts/MyContext';

const App = () => {
    return <MyContextProvider><RandomCounter /></MyContextProvider>
}

export default App
