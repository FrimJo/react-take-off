import {
  Card,
  CardContent,
  Typography,
  SvgIcon,
  Slide,
  CardActions,
  Button,
  IconButton,
} from '@material-ui/core'
import { Close } from 'mdi-material-ui'
import * as React from 'react'
import { css } from 'styled-components'
import { ReactComponent as PlusAppIcon } from '../../assets/plus-app.svg'
import { ReactComponent as ShareIcon } from '../../assets/share.svg'
import { useInstallStorage } from './utilities/use-install-storage'

type InstallMessageViewProps = {}

const InstallMessageView: React.FC<InstallMessageViewProps> = () => {
  const { declined, show, setDeclined, setShow } = useInstallStorage()
  const handleClose = React.useCallback(() => setShow(false), [setShow])
  const handleDecline = React.useCallback(() => setDeclined(true), [setDeclined])
  return (
    <Slide direction="up" in={!declined && show} mountOnEnter unmountOnExit>
      <Card
        css={css`
          position: fixed;
          bottom: 20px;
          left: 20px;
          right: 20px;
        `}>
        <CardContent
          css={css`
            position: relative;
          `}>
          <IconButton
            onClick={handleClose}
            css={css`
              position: absolute;
              top: 0;
              right: 0;
            `}>
            <Close />
          </IconButton>
          <Typography color="textPrimary" variant="h6">
            Add to home screen
          </Typography>
          <Typography color="textPrimary" variant="body2">
            Install this webapp on your device.
          </Typography>
          <Typography color="textPrimary" variant="body2">
            Tap{' '}
            {
              <SvgIcon
                htmlColor="rgb(0,122,255)"
                fontSize="small"
                component={ShareIcon}
                css={css`
                  vertical-align: text-bottom;
                `}
              />
            }{' '}
            then tap Add to Home Screen{' '}
            {
              <SvgIcon
                fontSize="small"
                component={PlusAppIcon}
                css={css`
                  vertical-align: text-bottom;
                `}
              />
            }
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleDecline} size="small">
            Don't ask again
          </Button>
        </CardActions>
      </Card>
    </Slide>
  )
}

export default InstallMessageView
