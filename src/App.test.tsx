import { AxiosStaticMock } from '__mocks__/axios'
import axios from 'axios'
import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { Payload } from 'services/api'
import App from './App'

afterEach(cleanup)

const axiosMock = axios as AxiosStaticMock

it('renders without crashing', () => {
  const data: Payload = {
    type: 'number',
    length: 2,
    data: [5],
    success: true,
  }

  axiosMock.get.mockResolvedValueOnce({ data })
  render(<App />)
})
