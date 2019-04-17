import { AxiosStatic } from 'axios'

export type AxiosStaticMock = {
  get: jest.Mock
} & AxiosStatic

export default {
  get: jest.fn(),
}
