import { createGlobalStyle, css } from 'styled-components'
import { isInStandaloneMode } from 'utilities/is-in-standalone-mode'

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    html {
      box-sizing: border-box !important;
      flex-grow: 0;
      flex-shrink: 0;
      font-family: ${theme.typography.fontFamily} !important;
      background-color: ${theme.palette.background.default};

      /* If devie is in standaline mode */
      ${isInStandaloneMode() &&
      css`
        /* Show black background on bounce scroll */
        background-color: black;

        /* Fix for: When content is loading, spinner is shown on black background because height is 0 (no content) instead of correct default background */
        & #root {
          /* Keep correct color on background when showing loading spinner */
          background-color: ${theme.palette.background.default};

          /* Have background color cover full screen (only works in standalone mode) */
          height: 100vh;
        }
      `}
    }

    body {
      padding: 0px;
      margin: 0px;
    }
  `
)
