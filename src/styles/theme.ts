import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { Colors } from './colors'

export const THEME: Readonly<ThemeOptions> = {
  palette: {
    primary: {
      main: Colors.FuchsiaBlue,
    },
    error: {
      main: Colors.PersianRed,
    },
    success: {
      main: Colors.SeaGreen,
    },
  },
  typography: {
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontSize: 16,
    h1: {
      fontSize: '6rem',
      letterSpacing: -1.5,
      fontWeight: 300,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    h2: {
      fontSize: '3.175rem',
      letterSpacing: -0.5,
      fontWeight: 300,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    h3: {
      fontSize: '3rem',
      letterSpacing: 0.0,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    h4: {
      fontSize: '2.125rem',
      letterSpacing: 0.25,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    h5: {
      fontSize: '1.5rem',
      letterSpacing: 0,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    h6: {
      fontSize: '1.25rem',
      letterSpacing: 0.15,
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    subtitle1: {
      fontSize: '1rem',
      letterSpacing: 0.15,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    subtitle2: {
      fontSize: '0.875rem',
      letterSpacing: 0.1,
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: 0.5,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: 0.25,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    button: {
      fontSize: '0.875rem',
      letterSpacing: 1.25,
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: 0.4,
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.82)',
    },
    overline: {
      fontSize: '0.625rem',
      letterSpacing: 1.5,
      fontWeight: 400,
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.82)',
    },
  },
}
