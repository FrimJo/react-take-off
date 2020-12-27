import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { LocalizationProvider } from 'localization'
import { getLocale } from './get-locale'
import useFormatMessage from './use-format-message'

jest.mock('./get-locale')

afterEach(cleanup)

const getLocaleMock = (getLocale as unknown) as jest.Mock<string>

const renderWithLocalization = (component: React.ReactNode) => {
  return render(<LocalizationProvider>{component}</LocalizationProvider>)
}

// Wrap the hook in a component to test it in its context
const FormatMessage: React.FunctionComponent<{
  id: string
  values?: {
    [key: string]: string | number | boolean | Date | null | undefined
  }
}> = ({ id, values }) => {
  const f = useFormatMessage()
  return <div data-testid="format-text">{f(id, values)}</div>
}

describe('useFormatMessage', () => {
  test('returns Öka for locale sv-SE', () => {
    getLocaleMock.mockReturnValueOnce('sv-SE')
    const { getByTestId } = renderWithLocalization(
      <FormatMessage id={'TEST_USE_FORMAT_MESSAGE_TEXT'} />
    )

    expect(getByTestId('format-text').textContent).toBe('Öka')
  })

  test('returns Increment for locale en-US', () => {
    getLocaleMock.mockReturnValueOnce('en-US')
    const { getByTestId } = renderWithLocalization(
      <FormatMessage id={'TEST_USE_FORMAT_MESSAGE_TEXT'} />
    )

    expect(getByTestId('format-text').textContent).toBe('Increment')
  })

  test('returns Value 123 for locale en-US', () => {
    getLocaleMock.mockReturnValueOnce('en-US')
    const { getByTestId } = renderWithLocalization(
      <FormatMessage id={'TEST_USE_FORMAT_MESSAGE_TEXT_AND_VALUE'} values={{ value: 123 }} />
    )

    expect(getByTestId('format-text').textContent).toBe('Value 123')
  })

  test('returns Värde 123 for locale sv-SE', () => {
    getLocaleMock.mockReturnValueOnce('sv-SE')
    const { getByTestId } = renderWithLocalization(
      <FormatMessage id={'TEST_USE_FORMAT_MESSAGE_TEXT_AND_VALUE'} values={{ value: 123 }} />
    )

    expect(getByTestId('format-text').textContent).toBe('Värde 123')
  })
})
