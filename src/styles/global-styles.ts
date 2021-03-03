import { createGlobalStyle } from 'styled-components'
import { theme, css } from 'twin.macro'
import { checkForIOS, isInStandaloneMode } from 'utilities'

const GlobalStyles = createGlobalStyle`

    * {
      font-family: ${theme`fontFamily.sans`};
    }

    html {
      ${
        !(checkForIOS().isIOS && isInStandaloneMode()) &&
        css`
          height: fill-available;
        `
      }

      body {
        min-height: 100vh;
        ${
          !(checkForIOS().isIOS && isInStandaloneMode()) &&
          css`
            min-height: fill-available;
          `
        }

        background-color: ${theme`backgroundColor.primary`};
        padding: 0px;
        margin: 0px;

        display: flex;
        flex-direction: column;

        .MuiTypography-root {
          max-width: ${theme`screens.sm`};
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

export default GlobalStyles
