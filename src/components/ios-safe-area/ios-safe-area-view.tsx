import { css } from '@emotion/react'
import React, { Children, cloneElement, isValidElement } from 'react'
import { checkForIOS, isInStandaloneMode } from 'utilities'

const DEFAULT_STATUSBAR_PADDING = 40

export const safeAreaInsetTop = css`
  /* Older browsers (do now support CSS Environment variables) */
  padding-top: 0px;

  /* Browsers which partially support CSS Environment variables (iOS 11.0-11.2) */
  @supports (padding-top: constant(safe-area-inset-top)) {
    padding-top: constant(safe-area-inset-top);
  }

  /* Browsers which fully support CSS Environment variables (iOS 11.2+) */
  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: env(safe-area-inset-top);
  }
`

export const safeAreaInsetBottom = css`
  /* Older browsers (do now support CSS Environment variables) */
  padding-bottom: 0px;

  /* Browsers which partially support CSS Environment variables (iOS 11.0-11.2) */
  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: constant(safe-area-inset-bottom);
  }

  /* Browsers which fully support CSS Environment variables (iOS 11.2+) */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: env(safe-area-inset-bottom);
  }
`

/*
 * Renders the statusbar. Note! This will only work if meta-tag
 * apple-mobile-web-app-status-bar-style is set to black-translucent in _app.tsx
 */
export const renderStatusBar = (statusbarColor: string) => (
  <div
    css={css`
      background-color: ${statusbarColor};

      /* Older browsers (do now support CSS Environment variables or css max function) */
      padding-top: ${DEFAULT_STATUSBAR_PADDING}px;

      /* Browsers which partially support CSS Environment variables (iOS 11.0-11.2) and css max function */
      @supports (padding-top: constant(safe-area-inset-top)) and (padding-top: max(0px)) {
        padding-top: max(${DEFAULT_STATUSBAR_PADDING}px, constant(safe-area-inset-top));
      }

      /* Browsers which fully support CSS Environment variables (iOS 11.2+) and css max function */
      @supports (padding-top: env(safe-area-inset-top)) and (padding-top: max(0px)) {
        padding-top: max(${DEFAULT_STATUSBAR_PADDING}px, env(safe-area-inset-top));
      }
    `}
  />
)

export const OnlyChild: React.FC<{ className?: string }> = ({ className, children }) => {
  const child = Children.only(children)
  return (
    <React.Fragment>
      {isValidElement(child) ? cloneElement(child, { className }) : child}
    </React.Fragment>
  )
}

/*
 * Component to add safe area top without using IosSafeArea
 */
export const SafeAreaTop: React.FC<{ className?: string }> = ({ className, children }) => {
  return (
    <OnlyChild className={className} css={safeAreaInsetTop}>
      {children}
    </OnlyChild>
  )
}

/*
 * Component to add safe area bottom without using IosSafeArea
 */
export const SafeAreaBottom: React.FC<{ className?: string }> = ({ className, children }) => {
  return (
    <OnlyChild className={className} css={safeAreaInsetBottom}>
      {children}
    </OnlyChild>
  )
}

const renderIOSChildren = (children: React.ReactNode, statusBarColor: string | false = false) => {
  const childrenArray = Children.toArray(children)

  // If we are in stand-alone mode and we have received a color for the status bar, render status bar
  if (isInStandaloneMode() && statusBarColor) {
    // Render statusbar as first child, status bar will have safe area top added
    childrenArray.unshift(renderStatusBar(statusBarColor))
  } else {
    // If not, add safe area top to first valid child
    const firstChildIndex = childrenArray.findIndex((child) => isValidElement(child))
    if (firstChildIndex !== -1) {
      childrenArray[firstChildIndex] = (
        <OnlyChild css={safeAreaInsetTop}>{childrenArray[firstChildIndex]}</OnlyChild>
      )
    }
  }

  // To find the last child which is valid, reverse the array
  const lastChildReverseIndex = childrenArray
    .slice() // To not alter the original array when reversing
    .reverse() // To find first valid child from end of array
    .findIndex((child) => isValidElement(child))

  if (lastChildReverseIndex !== -1) {
    // Get correct index for last child
    const lastChildIndex = childrenArray.length - 1 - lastChildReverseIndex
    childrenArray[lastChildIndex] = (
      <OnlyChild css={safeAreaInsetBottom}>{childrenArray[lastChildIndex]}</OnlyChild>
    )
  }

  return (
    <React.Fragment>
      {childrenArray.map((child, index) =>
        isValidElement(child) ? cloneElement(child, { key: index }) : child
      )}
    </React.Fragment>
  )
}

export type IosSafeAreaProps = {
  statusBarColor?: string | false
}

const IosSafeArea: React.FC<IosSafeAreaProps> = (props) => {
  const { children, statusBarColor = false } = props
  const { isIOS } = checkForIOS()

  return (
    <React.Fragment>
      {isIOS ? renderIOSChildren(children, statusBarColor) : children}
    </React.Fragment>
  )
}

export default IosSafeArea
