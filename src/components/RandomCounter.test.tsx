import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library'
import RandomCounter from './RandomCounter'

import 'jest-dom/extend-expect'

afterEach(cleanup)

test('generates a random number on init', () => {
  const { getByText } = render(<RandomCounter />)

  const counterButton = getByText(/^value/i)
  expect(counterButton).toHaveTextContent('test')
})
