import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import React from 'react'
import App from './App'

afterEach(cleanup)

it('renders without crashing', () => {
  const { getByText } = render(<App />)
})
