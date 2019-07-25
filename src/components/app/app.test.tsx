import { cleanup, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import React from 'react'
import App from './'

afterEach(cleanup)

it('renders without crashing', () => {
  render(<App />)
})
