import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import React from 'react'

type Props = Readonly<{
  theme: ThemeOptions
}>

export const ThemeProviderContainer: React.FC<Props> = ({ theme, children }) => {
  const themeInstance = React.useMemo(() => responsiveFontSizes(createMuiTheme(theme)), [theme])
  return (
    <EmotionThemeProvider theme={themeInstance}>
      <MuiThemeProvider theme={themeInstance}>{children}</MuiThemeProvider>
    </EmotionThemeProvider>
  )
}
