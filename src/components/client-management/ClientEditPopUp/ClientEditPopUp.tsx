import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ClientUpdateFormDto, SetSbuDto } from '../../../utilities/models'

const ClientEditPopUp: React.FC<{
  isOpen: boolean
  onClose(): void
  initialUpdateClientData: ClientUpdateFormDto
  onUpdateClient(): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditClientHandleChange(field: string, value: any): void
  sbuList: SetSbuDto[]
  isProcessing: boolean
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="client-edit-dialog"
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
          <span>Edit Client Details</span>
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
                label="Client Name"
                placeholder="Client Name"
                variant="outlined"
                size="medium"
                fullWidth
                required
                value={props.initialUpdateClientData.clientName.value}
                onChange={(e) => props.onEditClientHandleChange('clientName', e.target.value)}
                error={!!props.initialUpdateClientData.clientName.error}
                helperText={props.initialUpdateClientData.clientName.error}
              />
              <Grid size={{ sm: 12, xs: 12, md: 12 }} mt={3}>
                <FormControl fullWidth required error={!!props.initialUpdateClientData.sbuId.error}>
                  <InputLabel id="sbu-select-label">Strategic Business Unit</InputLabel>
                  <Select
                    labelId="sbu-select-label"
                    id="sbu-select"
                    value={props.initialUpdateClientData.sbuId.value?.toString() || ''}
                    label="Strategic Business Unit"
                    onChange={(event: SelectChangeEvent) => {
                      props.onEditClientHandleChange('sbuId', parseInt(event.target.value))
                    }}
                  >
                    {props.sbuList.map((sbu) => (
                      <MenuItem key={sbu.sbuId} value={sbu.sbuId}>
                        {sbu.sbuName}
                      </MenuItem>
                    ))}
                  </Select>
                  {props.initialUpdateClientData.sbuId.error && (
                    <p style={{ color: '#d32f2f', fontSize: '0.75rem', marginLeft: '14px' }}>
                      {props.initialUpdateClientData.sbuId.error}
                    </p>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ sm: 12, xs: 12, md: 12 }} mt={3}>
                <TextField
                  label="Client Description"
                  placeholder="Client Description"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  value={props.initialUpdateClientData.clientDesc.value || ''}
                  onChange={(e) => props.onEditClientHandleChange('clientDesc', e.target.value)}
                  error={!!props.initialUpdateClientData.clientDesc.error}
                  helperText={props.initialUpdateClientData.clientDesc.error}
                />
              </Grid>
              <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 4 }} mt={3}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={props.onUpdateClient}
                  disabled={props.isProcessing}
                >
                  {props.isProcessing ? (
                    <>
                      <CircularProgress size={20} style={{ marginRight: 10 }} />
                      Updating...
                    </>
                  ) : (
                    'Update Client'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default ClientEditPopUp
