import { AxiosStaticMock } from '__mocks__/axios'
import axios from 'axios'
import 'jest-dom/extend-expect'
import React, { Suspense } from 'react'
import { cleanup, render, wait } from 'react-testing-library'
import { Payload } from 'services/api'
import useAxiosSuspense from './useAxiosSuspense'

afterEach(cleanup)

const axiosMock = axios as AxiosStaticMock

const Main = () => {
  const [data] = useAxiosSuspense<Payload>('')
  return <div aria-label="fetch-data">{data.data}</div>
}

test('useAxiosSuspense returns the mocked data', async () => {
  const mockData: Payload = {
    type: 'number',
    length: 2,
    data: [5],
    success: true,
  }

  axiosMock.get.mockResolvedValueOnce({ data: mockData })

  const { getByLabelText } = render(
    <Suspense fallback={<div aria-label="fetch-data">loading…</div>}>
      <Main />
    </Suspense>
  )

  await wait()

  const dataDiv = getByLabelText('fetch-data') as HTMLDivElement
  expect(dataDiv).toHaveTextContent('5')
})
