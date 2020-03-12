import React from 'react'
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core'
import { AlertCircle, Close } from 'mdi-material-ui'
import styled from '@emotion/styled'

type StatusSnackbarViewProps = Readonly<{ hasError: boolean; error: any; onClose: () => void }>

export const StatusSnackbarView: React.FC<StatusSnackbarViewProps> = ({
  hasError,
  error,
  onClose,
}) => {
  const message =
    error instanceof Error ? error.message : 'Unknown error occurred, see console for details'

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={hasError}
      // autoHideDuration={8000}
      onClose={onClose}>
      <ErrorSnackbarContent
        aria-describedby="client-snackbar"
        message={
          <MessageContainer id="client-snackbar">
            <AlertCircle fontSize="small" />
            {message}
          </MessageContainer>
        }
        action={[
          <IconButton key="close" aria-label="close" onClick={onClose}>
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}

const ErrorSnackbarContent = styled(SnackbarContent)`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background-color: ${() => 'red'};

  .MuiSvgIcon-root {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
`

const MessageContainer = styled.span`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);

  .MuiSvgIcon-root {
    padding-right: ${() => '16'}px;
  }
`
