import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import * as React from 'react'
import { css } from 'styled-components'
import { ContainedButton } from 'components/contained-button'
import ServiceWorkerContext from 'contexts/service-worker-context'
import { useFormatMessage } from 'localization'

const UpdateSnackbarContainer: React.FC = (props) => {
  const f = useFormatMessage()
  const { newVersionAvailable } = ServiceWorkerContext.useState()
  const { updateServiceWorker } = ServiceWorkerContext.useActions()
  const [open, setOpen] = React.useState(newVersionAvailable)
  React.useEffect(() => {
    setOpen(newVersionAvailable)
  }, [newVersionAvailable])

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      css={css`
        /* Older browsers (do now support CSS Environment variables) */
        padding-bottom: 0;

        /* Browsers which partially support CSS Environment variables (iOS 11.0-11.2) */
        @supports (padding-bottom: constant(safe-area-inset-bottom)) {
          padding-bottom: constant(safe-area-inset-bottom);
        }

        /* Browsers which fully support CSS Environment variables (iOS 11.2+) */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}>
      <MuiAlert
        elevation={5}
        variant="filled"
        action={
          <ContainedButton
            onClick={updateServiceWorker}
            size="small"
            css={css`
              color: ${({ theme }) => theme.palette.success.contrastText};
            `}>
            {f('SERVICE_WORKER_PROVIDER_RELOAD_BUTTON')}
          </ContainedButton>
        }
        severity="success">
        {f('SERVICE_WORKER_PROVIDER_NEW_VERSION')}
      </MuiAlert>
    </Snackbar>
  )
}

export default UpdateSnackbarContainer
