import React from 'react'
import { GlobalStyles as TwinGlobalStyles } from 'twin.macro'
import LocalGlobalStyles from 'styles/global-styles'

const ThemeProviderContainer: React.FC = (props) => {
  const { children } = props
  return (
    <React.Fragment>
      <TwinGlobalStyles />
      <LocalGlobalStyles />
      {children}
    </React.Fragment>
  )
}

export default ThemeProviderContainer
