import { Theme, useTheme as useMuiTheme, createMuiTheme } from '@material-ui/core'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { useTheme as useEmotionTheme } from 'emotion-theming'
import { ThemeProvider } from '.'

afterEach(cleanup)

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#147EFB',
      dark: '#116CD7',
      contrastText: '#fff',
    },
  },
}

// Remove functions by stringify -> parse
const mockTheme = JSON.parse(JSON.stringify(createMuiTheme(themeOptions)))

const renderThemeProvider = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={themeOptions}>{component}</ThemeProvider>)
}

const Component: React.FC = () => {
  const eTheme = useEmotionTheme<Theme>()
  const muiTheme = useMuiTheme<Theme>()
  return (
    <>
      <div data-testid="test-e-theme">{JSON.stringify(eTheme)}</div>
      <div data-testid="test-mui-theme">{JSON.stringify(muiTheme)}</div>
    </>
  )
}

describe('', () => {
  test('that we get correct theme for Material UI', () => {
    const { getByTestId } = renderThemeProvider(<Component />)
    const testMuiTheme: Theme = JSON.parse(
      getByTestId('test-mui-theme').textContent || JSON.stringify({})
    )
    expect(testMuiTheme).toEqual(mockTheme)
  })

  test('that we get correct theme for Emotion', () => {
    const { getByTestId } = renderThemeProvider(<Component />)
    const testEmotionTheme: Theme = JSON.parse(
      getByTestId('test-e-theme').textContent || JSON.stringify({})
    )
    expect(testEmotionTheme).toEqual(mockTheme)
  })

  test('that the themes are the same for Material UI and Emotion', () => {
    const { getByTestId } = renderThemeProvider(<Component />)

    const testEmotionTheme: Theme = JSON.parse(
      getByTestId('test-e-theme').textContent || JSON.stringify({})
    )
    const testMuiTheme: Theme = JSON.parse(
      getByTestId('test-mui-theme').textContent || JSON.stringify({})
    )
    expect(testEmotionTheme).toEqual(testMuiTheme)
  })
})
