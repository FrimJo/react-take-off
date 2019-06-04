import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import App from './App'

afterEach(cleanup)

it('renders without crashing', () => {
  const { getByText } = render(<App />)
})
