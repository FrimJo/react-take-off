import { Payload } from '../services/api'

const data: Payload = {
  type: 'number',
  length: 2,
  data: [5],
  success: true,
}

export default {
  get: jest.fn(() => Promise.resolve({ data })),
}
