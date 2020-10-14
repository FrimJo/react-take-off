import React, { Children } from 'react'
import { css } from 'styled-components'
import {
  IOSSafeArea,
  SafeAreaTop,
  SafeAreaBottom,
  renderStatusBar,
  safeAreaInsetTop,
  safeAreaInsetBottom,
  IosSafeAreaProps,
} from 'components'
import { checkForIOS, isInStandaloneMode } from 'utilities'

type ChildObject = { top?: React.ReactNode; body?: React.ReactNode; bottom?: React.ReactNode }

type Props = {
  className?: string
  iOSConfig?: IosSafeAreaProps
  topComponent?: React.ReactNode
  bottomComponent?: React.ReactNode
  children: React.ReactNode | ChildObject
}

const PageWrapperView: React.FC<Props> = (props) => {
  const { children, iOSConfig = {}, className, topComponent, bottomComponent } = props

  if ((topComponent || bottomComponent) && isChildObject(children)) {
    throw Error('Can not both use component props and child as object')
  }

  const renderTopComponent = () =>
    (isChildObject(children) && children.top) ||
    (Children.count(children) === 3 && Children.toArray(children)[0]) ||
    topComponent

  const renderBodyComponent = () =>
    (isChildObject(children) && children.body) ||
    (Children.count(children) === 3 && Children.toArray(children)[1]) ||
    children

  const renderBottomComponent = () =>
    (isChildObject(children) && children.bottom) ||
    (Children.count(children) === 3 && Children.toArray(children)[2]) ||
    bottomComponent

  return (
    <IOSSafeArea {...iOSConfig}>
      <PageTop>{renderTopComponent()}</PageTop>
      <PageBody className={className}>{renderBodyComponent()}</PageBody>
      <PageBottom>{renderBottomComponent()}</PageBottom>
    </IOSSafeArea>
  )
}

export const PageTop: React.FC<{ iOSConfig?: IosSafeAreaProps }> = ({
  children,
  iOSConfig = {},
}) => {
  const child = Children.only(children)
  const { isIOS } = checkForIOS()
  if (!(isIOS && isInStandaloneMode())) {
    return <>{child}</>
  }
  if (iOSConfig.statusBarColor) {
    return (
      <>
        {renderStatusBar(iOSConfig.statusBarColor)}
        {child}
      </>
    )
  }
  return <SafeAreaTop>{child}</SafeAreaTop>
}

export const PageBody: React.FC<{
  className?: string
  iOSConfig?: { safeAreaTop?: boolean; safeAreaBottom?: boolean }
}> = ({ children, className, iOSConfig = { safeAreaTop: false, safeAreaBottom: false } }) => {
  return (
    <div
      className={className}
      css={css`
        ${iOSConfig.safeAreaTop && safeAreaInsetTop}
        ${iOSConfig.safeAreaBottom && safeAreaInsetBottom}
         /*
          * Set 'flex-shrink' to '0' to prevent Chrome, Opera, and Safari from
          * letting these items shrink to smaller than their content's default
          * minimum size.
          */
        flex: 1 0 0%;
        overflow-y: auto;
      `}>
      {children}
    </div>
  )
}

export const PageBottom: React.FC = ({ children }) => {
  const child = Children.only(children)
  const { isIOS } = checkForIOS()
  if (!(isIOS && isInStandaloneMode())) {
    return <>{child}</>
  }

  return <SafeAreaBottom>{child}</SafeAreaBottom>
}

const isChildObject = (child: React.ReactNode | ChildObject): child is ChildObject => {
  const childObject = child as ChildObject
  return (
    childObject.top !== undefined ||
    childObject.body !== undefined ||
    childObject.bottom !== undefined
  )
}

export default PageWrapperView
