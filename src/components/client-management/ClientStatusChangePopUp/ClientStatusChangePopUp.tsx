import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ClientStatusChangePopUp: React.FC<{
  isOpen: boolean
  onClose(): void
  onStatusUpdate(): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialClientStatusUpdate: any
}> = (props) => {
  const status = props.initialClientStatusUpdate?.clientStatus?.value?.isEnabled
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="client-status-dialog"
    >
      <DialogTitle
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
        {status ? (
          <Typography gutterBottom>
            {`Do you want to Deactivate Client '${props.initialClientStatusUpdate.clientStatus.value.clientName}'?`}
          </Typography>
        ) : (
          <Typography gutterBottom>
            {`Do you want to Activate Client '${props.initialClientStatusUpdate.clientStatus.value.clientName}'?`}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ mb: 3 }}>
        <Button onClick={props.onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={props.onStatusUpdate} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClientStatusChangePopUp
