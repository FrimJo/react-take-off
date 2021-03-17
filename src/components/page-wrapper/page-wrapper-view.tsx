import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { Children } from 'react'
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

type PageWrapperProps = {
  className?: string
  iOSConfig?: IosSafeAreaProps
  topComponent?: React.ReactNode
  bottomComponent?: React.ReactNode
  children: React.ReactNode | ChildObject
}

const PageWrapperView = (props: React.PropsWithChildren<PageWrapperProps>) => {
  const { children, iOSConfig = {}, className } = props

  if ((props.topComponent || props.bottomComponent) && isChildObject(children)) {
    throw Error('Can not use both component props and child as object')
  }

  const topComponent: React.ReactNode | undefined =
    (isChildObject(children) && children.top) || props.topComponent

  const bodyComponent: React.ReactNode = (isChildObject(children) && children.body) || children

  const bottomComponent: React.ReactNode | undefined =
    (isChildObject(children) && children.bottom) || props.bottomComponent

  return (
    <IOSSafeArea {...iOSConfig}>
      {topComponent && <PageTopView>{topComponent}</PageTopView>}
      <PageBodyView className={className}>{bodyComponent}</PageBodyView>
      {bottomComponent && <PageBottomView>{bottomComponent}</PageBottomView>}
    </IOSSafeArea>
  )
}

const PageTopView: React.FC<{
  iOSConfig?: IosSafeAreaProps
  as?: keyof JSX.IntrinsicElements
}> = ({ children, iOSConfig = {}, as }) => {
  const Component = as ? styled(as)(css``) : React.Fragment
  const { isIOS } = checkForIOS()
  if (!isIOS || !isInStandaloneMode()) {
    return <Component>{children}</Component>
  }
  if (iOSConfig.statusBarColor) {
    return (
      <Component>
        {renderStatusBar(iOSConfig.statusBarColor)}
        {children}
      </Component>
    )
  }
  return <Component css={safeAreaInsetTop}>{children}</Component>
}

const PageBodyView: React.FC<{
  className?: string
  iOSConfig?: { safeAreaTop?: boolean; safeAreaBottom?: boolean }
  as?: keyof JSX.IntrinsicElements
}> = ({ children, className, iOSConfig = { safeAreaTop: false, safeAreaBottom: false }, as }) => {
  const Component = styled(as ?? 'div')(css`
    ${iOSConfig.safeAreaTop && safeAreaInsetTop}
    ${iOSConfig.safeAreaBottom && safeAreaInsetBottom}
   /*
    * Set 'flex-shrink' to '0' to prevent Chrome, Opera, and Safari from
    * letting these items shrink to smaller than their content's default
    * minimum size.
    */
  flex: 1 0 0%;
    overflow-y: auto;
  `)
  return <Component className={className}>{children}</Component>
}

const PageBottomView: React.FC<{ as?: keyof JSX.IntrinsicElements }> = ({ children, as }) => {
  const Component = as ? styled(as)(css``) : React.Fragment
  const child = Children.only(children)
  const { isIOS } = checkForIOS()
  if (!(isIOS && isInStandaloneMode())) {
    return <Component>{child}</Component>
  }

  return <Component css={safeAreaInsetBottom}>{child}</Component>
}

const isChildObject = (child: React.ReactNode | ChildObject): child is ChildObject => {
  const childObject = child as ChildObject
  return (
    childObject.top !== undefined ||
    childObject.body !== undefined ||
    childObject.bottom !== undefined
  )
}

PageWrapperView.Top = PageTopView
PageWrapperView.Body = PageBodyView
PageWrapperView.Bottom = PageBottomView

export default PageWrapperView
