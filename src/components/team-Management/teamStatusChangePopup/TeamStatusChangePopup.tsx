import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

const TeamStatusChangePopup: React.FC<{
  onClose: () => void
  isOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isStatusChangeRow: any
  teamStatusChange(): void
  teamStatusChangeClick(): void
}> = (props) => {
  const isEnabled = props.isStatusChangeRow?.teamStatus?.value?.isEnabled
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
          <Typography gutterBottom>Do you want to Deactivate team <strong>{props.isStatusChangeRow?.teamStatus?.value?.teamName}</strong> ?</Typography>
        ) : (
          <Typography gutterBottom>Do you want to Activate team <strong>{props.isStatusChangeRow?.teamStatus?.value?.teamName}</strong> ?</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ mb: 3 }}>
        <Button
          onClick={() => props.teamStatusChange()}
          autoFocus
          variant="contained"
          className={'btnStyle'}
        >
          Confirm
        </Button>
        <Button
          onClick={() => props.teamStatusChangeClick()}
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

export default TeamStatusChangePopup
