import { AxiosStaticMock } from '__mocks__/axios'
import axios from 'axios'
import 'jest-dom/extend-expect'
import React, { Suspense } from 'react'
import { act, cleanup, fireEvent, render, wait } from 'react-testing-library'
import { Payload } from 'services/api'
import { MyContextProvider } from '../contexts/MyContext'
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
    <Suspense fallback={<>loading…</>}>
      <MyContextProvider>
        <RandomCounter />
      </MyContextProvider>
    </Suspense>
  )

  await wait()

  const inputField = getByLabelText('input-field') as HTMLInputElement
  const incrementButton = getByText(/Increment/i) as HTMLButtonElement
  const clearButton = getByText(/Clear/i) as HTMLButtonElement
  const valueText = getByText(/Value/i) as HTMLButtonElement

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(valueText).toHaveTextContent('5')
  expect(inputField.value).toBe('5')
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
})
