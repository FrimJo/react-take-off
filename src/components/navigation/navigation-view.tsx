import Link from 'next/link'

const NavigationView = () => (
  <ul>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/page-wrapper-example-1">PageWrapper example 1</Link>
    </li>
    <li>
      <Link href="/page-wrapper-example-2">PageWrapper example 2</Link>
    </li>
    <li>
      <Link href="/page-wrapper-example-3">PageWrapper example 3</Link>
    </li>
    <li>
      <Link href="/page-wrapper-example-4">PageWrapper example 4</Link>
    </li>
  </ul>
)

export default NavigationView
