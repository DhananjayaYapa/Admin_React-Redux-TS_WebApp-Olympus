import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { SbuUpdateFormDto } from '../../../utilities/models'

const SbuEditPopUp: React.FC<{
  isOpen: boolean
  onClose(): void
  initialUpdateSbuData: SbuUpdateFormDto
  onUpdateSbu(): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditSbuHandleChange(field: string, value: any): void
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="sbu-preview-dialog"
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'right',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <span>{'Edit SBU Details'}</span>
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
        <DialogContent>
          <Grid container spacing={2} m={1}>
            <Grid size={{ sm: 12, xs: 12, md: 12 }} mt={2}>
              <TextField
                label="SBU Title"
                placeholder="Enter SBU Title"
                variant="outlined"
                size="medium"
                fullWidth
                value={props.initialUpdateSbuData.sbuName.value}
                onChange={(e) => props.onEditSbuHandleChange('sbuName', e.target.value)}
              />
              <Grid size={{ sm: 12, xs: 12, md: 12 }} mt={3}>
                <TextField
                  label="SBU Description"
                  placeholder="Enter SBU Description"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  value={props.initialUpdateSbuData.sbuDesc.value || ''}
                  onChange={(e) => props.onEditSbuHandleChange('suDesc', e.target.value)}
                />
              </Grid>
              <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 4 }} mt={3}>
                <Button variant="contained" size="medium" onClick={props.onUpdateSbu}>
                  Update SBU
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default SbuEditPopUp
