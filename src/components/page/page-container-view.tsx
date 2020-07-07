import { useTheme } from '@material-ui/core'
import * as React from 'react'
import { css } from 'styled-components'
import Spinner from 'components/spinner'
import { isInStandaloneMode } from 'utilities/is-in-standalone-mode'
import { isIos } from 'utilities/is-ios'

export const PageContainerView: React.FC<{
  iOSStatusbarColor?: string
  bottomNavbarComponent?: false | React.ReactNode
  bgcolor?: string
  appBarComponent?: false | React.ReactNode
  className?: string
}> = ({
  children,
  iOSStatusbarColor,
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
        height: ${isInStandaloneMode() ? '100vh' : `${innerHeight}px`};
        background-color: ${bgcolor ?? theme.palette.background.default};
        display: flex;
        flex-direction: column;

        & > *:first-child {
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
        }

        & > *:last-child {
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
        }
      `}>
      {/*
        If we do not have enough contrast to display the status bar and app is in standalone mode:
        Show black border which receives the top padding provided by parent div styling above.
        */}
      {iOSStatusbarColor && isIos() && isInStandaloneMode() && (
        <div
          css={css`
            background-color: ${iOSStatusbarColor};

            /* Older browsers (do now support CSS Environment variables) */
            padding-top: 40px;

            /* Browsers which partially support CSS Environment variables (iOS 11.0-11.2) */
            @supports (padding-top: constant(safe-area-inset-top)) and (padding-top: max(0px)) {
              padding-top: max(${40}px, constant(safe-area-inset-top));
            }

            /* Browsers which fully support CSS Environment variables (iOS 11.2+) */
            @supports (padding-top: env(safe-area-inset-top)) and (padding-top: max(0px)) {
              padding-top: max(${40}px, env(safe-area-inset-top));
            }
          `}
        />
      )}
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
    </div>
  )
}
