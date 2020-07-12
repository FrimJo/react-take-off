import * as React from 'react'
import { css } from 'styled-components'
import { isInStandaloneMode } from 'utilities/is-in-standalone-mode'
import { isIos } from 'utilities/is-ios'

type IosSafeAreaProps = {
  statusbarColor?: string
}

const DEFAULT_STATUSBAR_PADDING = 40

const IosSafeArea: React.FC<IosSafeAreaProps> = (props) => {
  const { children, statusbarColor } = props
  if (!isIos() || !isInStandaloneMode()) return <>{children}</>
  return (
    <div
      css={css`
        height: 100%;
        width: 100%;

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
      {statusbarColor !== undefined && (
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
      )}
      {children}
    </div>
  )
}

export default IosSafeArea
