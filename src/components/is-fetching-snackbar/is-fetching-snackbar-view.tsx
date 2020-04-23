/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Snackbar, SnackbarContent, Theme } from '@material-ui/core'
import { useTheme } from 'emotion-theming'
import * as React from 'react'
import { useIsFetching } from 'react-query'
import { Spinner } from 'components/spinner'
import { useDebounce } from 'utilities/use-debounce'

const DEBOUNCE_DELAY_IN_MILLISECONDS = 400

export const IsFetchingSnackbarView: React.FC = () => {
  const theme = useTheme<Theme>()
  const fetchCount = useIsFetching()
  const isFetching = React.useMemo(() => fetchCount > 0, [fetchCount])
  const debouncedIsFetching = useDebounce(isFetching, DEBOUNCE_DELAY_IN_MILLISECONDS)

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={isFetching && debouncedIsFetching}>
      <SnackbarContent
        css={css`
          background-color: ${theme.palette.primary.main};
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;

          .MuiSvgIcon-root {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.8);
          }
        `}
        aria-describedby="client-snackbar"
        message={
          <span
            css={css`
              display: flex;
              align-items: center;
              color: rgba(255, 255, 255, 0.8);

              .MuiSvgIcon-root {
                padding-right: 16px;
              }
            `}
            id="client-snackbar">
            <Spinner
              color="white"
              size={20}
              css={css`
                margin-right: 8px;
              `}
            />
            {'Loading...'}
          </span>
        }
      />
    </Snackbar>
  )
}
