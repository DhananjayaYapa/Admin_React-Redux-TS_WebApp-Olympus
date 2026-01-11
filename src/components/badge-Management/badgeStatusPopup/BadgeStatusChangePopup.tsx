import {
  DialogTitle,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

const BadgeStausChangePopUp: React.FC<{
  onClose: () => void
  isOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isStatusChangeRow: any
  badgeStatusChange(): void
  badgeStatusChangeClick(): void
}> = (props) => {
  const isEnabled = props.isStatusChangeRow?.bannerStatus?.value?.isEnabled

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="banner-preview-dialog"
    >
      <DialogTitle
        id="banner-preview-dialog"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'right',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <span>{'Please Confirm'}</span>
        <IconButton
          aria-label="close"
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        {isEnabled ? (
          <Typography gutterBottom>Do you want to Disable the Banner?</Typography>
        ) : (
          <Typography gutterBottom>Do you want to Enable the Banner?</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ mb: 3 }}>
        <Button
          onClick={() => props.badgeStatusChange()}
          autoFocus
          variant="contained"
          className={'btnStyle'}
        >
          Confirm
        </Button>
        <Button
          onClick={() => props.badgeStatusChangeClick()}
          autoFocus
          variant="contained"
          className={'btnStyle'}
          color={'inherit'}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BadgeStausChangePopUp
