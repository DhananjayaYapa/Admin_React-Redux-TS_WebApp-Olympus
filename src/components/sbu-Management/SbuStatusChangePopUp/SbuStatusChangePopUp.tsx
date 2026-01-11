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

const SbuStatusChangePopUp: React.FC<{
  isOpen: boolean
  onClose(): void
  onStatusUpdate(): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialSbuStatusUpdate: any
}> = (props) => {
  const status = props.initialSbuStatusUpdate?.sbuStatus?.value?.isEnabled
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="banner-preview-dialog"
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
            {`Do you want to Deactivate SBU '${props.initialSbuStatusUpdate.sbuStatus.value.sbuName}'?`}
          </Typography>
        ) : (
          <Typography
            gutterBottom
          >{`Do you want to Activate SBU '${props.initialSbuStatusUpdate.sbuStatus.value.sbuName}'?`}</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ mb: 3 }}>
        <Button autoFocus variant="contained" className={'btnStyle'} onClick={props.onStatusUpdate}>
          Confirm
        </Button>
        <Button
          autoFocus
          variant="contained"
          className={'btnStyle'}
          color={'inherit'}
          onClick={props.onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default SbuStatusChangePopUp
