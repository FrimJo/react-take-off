import { theme, css } from 'twin.macro'
import { checkForIOS, isInStandaloneMode } from 'utilities'

const globalStyles = css`
  * {
    font-family: ${theme`fontFamily.sans`};
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

      background-color: ${theme`colors.gray.50`};
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

export default globalStyles
