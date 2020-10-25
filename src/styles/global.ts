import { createGlobalStyle, css } from 'styled-components'
import { normalize } from 'styled-normalize'
import { checkForIOS, isInStandaloneMode } from 'utilities'

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    ${normalize}

    * {
      font-family: ${theme.typography.fontFamily};
    }

    html {
      ${!(checkForIOS().isIOS && isInStandaloneMode()) &&
      css`
        height: fill-available;
      `}

      body {
        min-height: 100vh;
        ${!(checkForIOS().isIOS && isInStandaloneMode()) &&
        css`
          min-height: fill-available;
        `}

        background-color: ${theme.palette.background.default};
        padding: 0px;
        margin: 0px;

        display: flex;
        flex-direction: column;

        .MuiTypography-root {
          max-width: ${theme.breakpoints.values.sm}px;
        }
      }

      #__next {
        flex: 1;
        height: 0;
        display: flex;
        flex-direction: column;
      }
    }
  `
)
