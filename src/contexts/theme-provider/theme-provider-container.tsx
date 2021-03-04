import { Global as EmotionGLobal } from '@emotion/react'
import React from 'react'
import { GlobalStyles as TwinGlobalStyles } from 'twin.macro'
import localGlobalStyles from 'styles/global-styles'

const ThemeProviderContainer: React.FC = (props) => {
  const { children } = props
  return (
    <React.Fragment>
      <TwinGlobalStyles />
      <EmotionGLobal styles={localGlobalStyles} />
      {children}
    </React.Fragment>
  )
}

export default ThemeProviderContainer
