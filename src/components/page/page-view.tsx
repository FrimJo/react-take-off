import { useTheme } from '@material-ui/core'
import * as React from 'react'
import { css } from 'styled-components'
import IosSafeArea from 'components/ios-safe-area'
import { Spinner } from 'components/spinner'
import { isInStandaloneMode } from 'utilities/is-in-standalone-mode'
import { isIos } from 'utilities/is-ios'

const PageView: React.FC<{
  iosStatusbarColor?: string
  bottomNavbarComponent?: false | React.ReactNode
  bgcolor?: string
  appBarComponent?: false | React.ReactNode
  className?: string
}> = ({
  children,
  iosStatusbarColor,
  className,
  bottomNavbarComponent: BottomNavbarComponent,
  bgcolor,
  appBarComponent: AppBarComponent = false,
}) => {
  const theme = useTheme()
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight)
  React.useEffect(() => {
    function updateInnerHeight() {
      setInnerHeight(window.innerHeight)
    }
    window.addEventListener('resize', updateInnerHeight)
    return () => window.removeEventListener('resize', updateInnerHeight)
  }, [])

  return (
    <div
      css={css`
        /* Fall back to fill view to support bottom navbar */
        height: 100vh;

        /*
          If device is iOS and not in standalone mode, set height to inner height of window to prevent Safari bug
         */
        ${isIos() &&
        !isInStandaloneMode() &&
        css`
          height: ${innerHeight}px;
        `}

        /* Browsers which supports fill-available should use it in any scenario */
        @supports (height: fill-available) {
          height: fill-available;
        }

        background-color: ${bgcolor ?? theme.palette.background.default};
        display: flex;
        flex-direction: column;
      `}>
      <IosSafeArea statusbarColor={iosStatusbarColor}>
        {AppBarComponent}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 1;
            overflow-y: auto;
          `}>
          <div
            className={className}
            css={css`
              flex: 1;
              margin: 0 ${theme.spacing(5)}px;

              padding-top: ${theme.spacing(2)}px;
              @media (min-height: 540px) {
                padding-top: ${theme.spacing(4)}px;
              }
            `}>
            <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>
          </div>
        </div>
        {BottomNavbarComponent}
      </IosSafeArea>
    </div>
  )
}

export default PageView
