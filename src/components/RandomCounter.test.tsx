import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import 'jest-dom/extend-expect'
import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForDomChange,
} from 'react-testing-library'
import RandomCounter from './RandomCounter'
import { MyContextProvider } from '../contexts/MyContext'
import axios from 'axios'
import { Payload } from 'src/services/api'
import { AxiosStaticMock } from 'src/__mocks__/axios'

afterEach(cleanup)

const axiosMock = axios as AxiosStaticMock
// What When
test('RandomCounter makes an API call and displays the value when load-greeting is clicked', async () => {
  const data: Payload = {
    type: 'number',
    length: 2,
    data: [5],
    success: true,
  }

  axiosMock.get.mockResolvedValueOnce({ data })

  const { getByText, getByLabelText, container } = render(
    <MyContextProvider>
      <RandomCounter />
    </MyContextProvider>
  )

  const input = getByLabelText('input-field') as HTMLInputElement
  const increment = getByText(/Increment/i) as HTMLButtonElement
  const clear = getByText(/Clear/i) as HTMLButtonElement
  const fetch = getByText(/Fetch/i) as HTMLButtonElement

  expect(input.value).toBe('...')
  expect(input.disabled).toBe(true)
  expect(increment.disabled).toBe(true)
  expect(clear.disabled).toBe(true)
  expect(fetch.disabled).toBe(true)
  expect(container.firstChild).toMatchSnapshot('loading')

  await waitForDomChange()
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(input.value).toBe('5')
  expect(input.disabled).toBe(false)
  expect(increment.disabled).toBe(false)
  expect(clear.disabled).toBe(false)
  expect(fetch.disabled).toBe(false)
  expect(container.firstChild).toMatchSnapshot('idle')

  fireEvent.change(input, { target: { value: '34' } })
  expect(input.value).toBe('34')

  fireEvent.click(increment)
  expect(input.value).toBe('35')

  fireEvent.click(clear)
  expect(input.value).toBe('0')

  axiosMock.get.mockResolvedValueOnce({ data })
  fireEvent.click(fetch)
  expect(input.value).toBe('...')
  expect(input.disabled).toBe(true)
  expect(increment.disabled).toBe(true)
  expect(clear.disabled).toBe(true)
  expect(fetch.disabled).toBe(true)
  expect(container.firstChild).toMatchSnapshot('loading')

  await waitForDomChange()
  expect(input.value).toBe('5')
  expect(input.disabled).toBe(false)
  expect(increment.disabled).toBe(false)
  expect(clear.disabled).toBe(false)
  expect(fetch.disabled).toBe(false)
})
