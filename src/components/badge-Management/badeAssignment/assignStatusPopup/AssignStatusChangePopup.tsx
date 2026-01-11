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

const AssignStausChangePopUp: React.FC<{
  onClose: () => void
  isOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isStatusChangeRow: any
  assignStatusChange(): void
  assignStatusChangeClick(): void
}> = (props) => {
  const name = props.isStatusChangeRow?.assignStatus?.value?.name
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
        <Typography gutterBottom>
          Do you want to Delete employee <strong>{name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ mb: 3 }}>
        <Button
          onClick={() => props.assignStatusChange()}
          autoFocus
          variant="contained"
          className={'btnStyle'}
        >
          Confirm
        </Button>
        <Button
          onClick={() => props.assignStatusChangeClick()}
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

export default AssignStausChangePopUp
