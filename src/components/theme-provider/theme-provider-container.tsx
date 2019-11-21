import { createMuiTheme } from '@material-ui/core'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

type Props = Readonly<{
  theme: ThemeOptions
}>

export const ThemeProviderContainer: React.FunctionComponent<Props> = ({
  theme,
  children,
}) => {
  const themeInstance = React.useMemo(() => createMuiTheme(theme), [theme])
  return (
    <EmotionThemeProvider theme={themeInstance}>
      <MuiThemeProvider theme={themeInstance}>{children}</MuiThemeProvider>
    </EmotionThemeProvider>
  )
}
