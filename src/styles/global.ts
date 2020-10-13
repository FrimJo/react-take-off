import { createGlobalStyle, css } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    ${normalize}

    * {
      font-family: ${theme.typography.fontFamily};
    }

    html {
      height: fill-available;

      body {
        min-height: 100vh;
        min-height: fill-available;

        background-color: ${theme.palette.background.default};
        padding: 0px;
        margin: 0px;

        display: flex;
        flex-direction: column;
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
