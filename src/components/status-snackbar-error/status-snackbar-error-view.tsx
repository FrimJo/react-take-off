/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Snackbar, IconButton, SnackbarContent, Theme } from '@material-ui/core'
import { useTheme } from 'emotion-theming'
import { AlertCircle, Close } from 'mdi-material-ui'
import * as React from 'react'

type StatusSnackbarErrorViewProps = Readonly<{
  open: boolean
  message: React.ReactNode
  onClose?: () => void
}>
export const StatusSnackbarErrorView: React.FC<StatusSnackbarErrorViewProps> = (props) => {
  const { open, message, onClose } = props
  const theme = useTheme<Theme>()
  const onCloseRef = React.useRef(onClose)

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      onClose={onCloseRef.current}>
      <SnackbarContent
        css={css`
          background-color: ${theme.palette.error.main};
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
            <AlertCircle fontSize="small" />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" onClick={onCloseRef.current}>
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}
