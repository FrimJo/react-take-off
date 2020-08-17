import { createGlobalStyle, css } from 'styled-components'
import { isInStandaloneMode } from 'utilities/is-in-standalone-mode'

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    * {
      box-sizing: border-box;
      font-family: ${theme.typography.fontFamily};
    }

    html {
      flex-grow: 0;
      flex-shrink: 0;
      background-color: ${theme.palette.background.default};
      overflow: hidden;

      /* If device is in standalone mode */
      ${isInStandaloneMode() &&
      css`
        /* Show black background on bounce scroll */
        background-color: black;

        /* Fix for: When content is loading, spinner is shown on black background because height 0 (no content) instead of correct default background */
        & #root {
          /* Keep correct default color on background when showing loading spinner */
          background-color: ${theme.palette.background.default};

          /* Have background color cover full screen (only works in standalone mode) */
          height: 100vh;

          /* Browsers which supports fill-available should use it */
          @supports (height: fill-available) {
            height: fill-available;
          }
        }
      `}

      body {
        padding: 0px;
        margin: 0px;
      }
    }
  `
)
