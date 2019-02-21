type Payload = Readonly<{ type: string; length: number; data: Array<number>; success: boolean }>

export const fetchRandomNumberAsync = async (signal: AbortSignal): Promise<Payload> =>
  await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8', { signal }).then(response => response.json())
