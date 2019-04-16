import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import 'jest-dom/extend-expect'
import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  waitForDomChange,
} from 'react-testing-library'
import RandomCounter from './RandomCounter'
import { MyContextProvider } from '../contexts/MyContext'
import axios from 'axios'

afterEach(cleanup)

test('generates a random number on init', async () => {
  const { getByText, getByLabelText, container } = render(
    <MyContextProvider>
      <RandomCounter />
    </MyContextProvider>
  )
  const input = getByLabelText('input-field') as HTMLInputElement
  expect(input.value).toBe('...')
  expect(input.disabled).toBe(true)
  expect(container.firstChild).toMatchSnapshot()

  await waitForDomChange()
  expect(input.value).toBe('5')
  expect(input.disabled).toBe(false)

  expect(axios.get).toHaveBeenCalledTimes(1)
})
