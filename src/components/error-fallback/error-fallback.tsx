import { Typography, useTheme, Box, Button } from '@material-ui/core'
import { Reload } from 'mdi-material-ui'
import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton, Page } from 'components'

type FallbackProps = {
  error?: Error
  componentStack?: string
  resetErrorBoundary: () => void
}

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  componentStack,
  resetErrorBoundary,
}) => {
  const theme = useTheme()
  const [resetPressed, setResetPressed] = React.useState(false)
  const handleResetPressed = React.useCallback(() => {
    setResetPressed(true)
    resetErrorBoundary()
  }, [resetErrorBoundary])
  return (
    <Page
      bgcolor={theme.palette.primary.main}
      bottomNavbarComponent={false}
      css={css`
        color: ${theme.palette.primary.contrastText};
        display: flex;
        flex-direction: column;
      `}>
      <Typography variant="h4" color="inherit">
        Sorry, an unhandled error occurred :(
      </Typography>
      <Box pb={2} />
      <Typography variant="body1" color="inherit">
        Please reset to try again, or try log out and log back in again.
      </Typography>
      <Box pb={4} />
      <ContainedButton
        showSpinner={resetPressed}
        endIcon={!resetPressed && <Reload />}
        color="secondary"
        onClick={handleResetPressed}
        css={css`
          align-self: flex-start;
        `}>
        Reset
      </ContainedButton>
      <Box pb={1} />
      <Button
        onClick={() => {
          // TODO
          console.log('Add log out logic here')
        }}
        variant="text"
        color="inherit"
        css={css`
          align-self: flex-start;
        `}>
        Log out
      </Button>
    </Page>
  )
}
