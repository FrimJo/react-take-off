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
  const { children, iOSConfig = {}, className } = props

  if ((props.topComponent || props.bottomComponent) && isChildObject(children)) {
    throw Error('Can not both use component props and child as object')
  }

  const topComponent: React.ReactNode | undefined =
    (isChildObject(children) && children.top) || props.topComponent

  const bodyComponent: React.ReactNode = (isChildObject(children) && children.body) || children

  const bottomComponent: React.ReactNode | undefined =
    (isChildObject(children) && children.bottom) || props.bottomComponent

  return (
    <IOSSafeArea {...iOSConfig}>
      {topComponent && <PageTop>{topComponent}</PageTop>}
      <PageBody className={className}>{bodyComponent}</PageBody>
      {bottomComponent && <PageBottom>{bottomComponent}</PageBottom>}
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
