/** @jsx jsx */
import React from 'react'
import { Snackbar, IconButton, SnackbarContent, Theme } from '@material-ui/core'
import { AlertCircle, Close } from 'mdi-material-ui'
import { jsx, css, SerializedStyles } from '@emotion/core'
import { useTheme } from 'emotion-theming'

function useSnackbarContentStyle(type: 'succes' | 'error' | 'default'): SerializedStyles {
  const theme = useTheme<Theme>()
  switch (type) {
    case 'succes':
      return css`
        background-color: ${theme.palette.success.main};
      `
    case 'error':
      return css`
        background-color: ${theme.palette.error.main};
      `
    case 'default':
      return css`
        background-color: ${theme.palette.primary.main};
      `
  }
}

type StatusSnackbarViewProps = Readonly<{
  open: boolean
  message: React.ReactNode
  onClose?: () => void
  type?: 'succes' | 'error' | 'default'
  autoHide?: boolean
}>
export const StatusSnackbarView: React.FC<StatusSnackbarViewProps> = ({
  open,
  message,
  onClose,
  type = 'default',
  autoHide = false,
}) => {
  const contentSnackbarStyle = useSnackbarContentStyle(type)
  const onCloseRef = React.useRef(onClose)

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={autoHide ? 8000 : undefined}
      onClose={onCloseRef.current}>
      <SnackbarContent
        css={css`
          ${contentSnackbarStyle}
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
