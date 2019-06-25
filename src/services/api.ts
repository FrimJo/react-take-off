import axios from 'axios'

export type Payload = Readonly<{
  type: string
  length: number
  data: number[]
  success: boolean
}>

export const randomNumberUrl =
  'https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8'

export const fetchRandomNumberAsync = async (): Promise<Payload> =>
  await axios
    .get<Payload>('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8')
    .then(response => response.data)
// await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8', { signal }).then(response => response.json())
