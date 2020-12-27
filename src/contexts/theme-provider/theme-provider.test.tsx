import { Theme, responsiveFontSizes, createMuiTheme } from '@material-ui/core'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { useTheme } from '@material-ui/styles'
import { cleanup, render } from '@testing-library/react'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import ThemeProvider from './theme-provider-container'

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

const mockTheme = JSON.parse(JSON.stringify(responsiveFontSizes(createMuiTheme(themeOptions))))

const renderThemeProvider = (component: React.ReactNode, themeOptions: ThemeOptions) => {
  return render(<ThemeProvider theme={themeOptions}>{component}</ThemeProvider>)
}

const Component: React.FunctionComponent = () => {
  const scTheme = useContext(ThemeContext)
  const muiTheme = useTheme<Theme>()
  return (
    <>
      <div data-testid="test-sc-theme">{JSON.stringify(scTheme)}</div>
      <div data-testid="test-mui-theme">{JSON.stringify(muiTheme)}</div>
    </>
  )
}

describe('', () => {
  test('that we get correct theme for Material UI', () => {
    const { getByTestId } = renderThemeProvider(<Component />, themeOptions)
    const testMuiTheme: Theme = JSON.parse(getByTestId('test-mui-theme').textContent || '')
    expect(testMuiTheme).toEqual(mockTheme)
  })

  test('that we get correct theme for Styled Components', () => {
    const { getByTestId } = renderThemeProvider(<Component />, themeOptions)
    const testScTheme: Theme = JSON.parse(getByTestId('test-sc-theme').textContent || '')
    expect(testScTheme).toEqual(mockTheme)
  })

  test('that the themes are the same for Material UI and Styled Components', () => {
    const { getByTestId } = renderThemeProvider(<Component />, themeOptions)
    const testScTheme: Theme = JSON.parse(getByTestId('test-sc-theme').textContent || '')
    const testMuiTheme: Theme = JSON.parse(getByTestId('test-mui-theme').textContent || '')
    expect(testScTheme).toEqual(testMuiTheme)
  })
})
