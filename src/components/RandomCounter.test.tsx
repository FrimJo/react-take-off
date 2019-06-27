import { AxiosStaticMock } from '__mocks__/axios'
import axios from 'axios'
import 'jest-dom/extend-expect'
import React from 'react'
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitForDomChange,
} from 'react-testing-library'
import { Payload } from 'services/api'
import { RandomNumberProvider } from '../contexts/RandomNumberContext'
import RandomCounter from './RandomCounter'

afterEach(cleanup)

const axiosMock = axios as AxiosStaticMock

test('RandomCounter makes an API call and displays the value', async () => {
  const data: Payload = {
    type: 'number',
    length: 2,
    data: [5],
    success: true,
  }

  axiosMock.get.mockResolvedValueOnce({ data })

  const { getByText, getByLabelText, container } = render(
    <RandomNumberProvider>
      <RandomCounter />
    </RandomNumberProvider>
  )

  const inputField = getByLabelText('input-field') as HTMLInputElement
  const incrementButton = getByText(/Increment/i) as HTMLButtonElement
  const clearButton = getByText(/Clear/i) as HTMLButtonElement
  const fetchButton = getByText(/Fetch/i) as HTMLButtonElement
  const valueText = getByText(/Value/i) as HTMLButtonElement

  expect(inputField.value).toBe('...')
  expect(inputField.disabled).toBe(true)
  expect(incrementButton.disabled).toBe(true)
  expect(clearButton.disabled).toBe(true)
  expect(fetchButton.disabled).toBe(true)
  expect(container.firstChild).toMatchSnapshot('loading')

  await waitForDomChange()
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(valueText).toHaveTextContent('5')
  expect(inputField.value).toBe('5')
  expect(inputField.disabled).toBe(false)
  expect(incrementButton.disabled).toBe(false)
  expect(clearButton.disabled).toBe(false)
  expect(fetchButton.disabled).toBe(false)
  expect(container.firstChild).toMatchSnapshot('idle')

  act(() => {
    fireEvent.change(inputField, { target: { value: '34' } })
  })

  expect(inputField.value).toBe('34')
  act(() => {
    fireEvent.click(incrementButton)
  })
  expect(inputField.value).toBe('35')

  act(() => {
    fireEvent.click(clearButton)
  })
  expect(inputField.value).toBe('0')

  axiosMock.get.mockResolvedValueOnce({ data })
  act(() => {
    fireEvent.click(fetchButton)
  })
  expect(inputField.value).toBe('...')
  expect(inputField.disabled).toBe(true)
  expect(incrementButton.disabled).toBe(true)
  expect(clearButton.disabled).toBe(true)
  expect(fetchButton.disabled).toBe(true)
  expect(container.firstChild).toMatchSnapshot('loading')

  await waitForDomChange()
  expect(inputField.value).toBe('5')
  expect(valueText).toHaveTextContent('5')
  expect(inputField.disabled).toBe(false)
  expect(incrementButton.disabled).toBe(false)
  expect(clearButton.disabled).toBe(false)
  expect(fetchButton.disabled).toBe(false)
})
