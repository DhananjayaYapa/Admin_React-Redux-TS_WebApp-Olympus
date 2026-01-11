import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import type { SbuFilterFormDto } from '../../../utilities/models'

const SbuCreateForm: React.FC<{
  sbuFormData: SbuFilterFormDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sbuFormFilterHandle(field: keyof SbuFilterFormDto, value: any): void
  onCreateSbu(): void
  onClearFormFields(): void
  sbuInputFocusHandle(field: keyof SbuFilterFormDto): void
  isCreating: boolean
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Grid size={{ sm: 12, xs: 12, md: 9 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              label="SBU Name"
              placeholder="Enter SBU Name"
              size="small"
              variant="outlined"
              fullWidth
              onFocus={() => props.sbuInputFocusHandle('sbuName')}
              required={props.sbuFormData.sbuName.isRequired}
              value={props.sbuFormData.sbuName.value ? props.sbuFormData.sbuName.value : ''}
              onChange={(newValue) => props.sbuFormFilterHandle('sbuName', newValue.target.value)}
              error={!!props.sbuFormData.sbuName?.error}
              helperText={props.sbuFormData.sbuName?.error}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              label={'SBU Description'}
              placeholder="Enter SBU Description"
              size="medium"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              onFocus={() => props.sbuInputFocusHandle('sbuDesc')}
              required={props.sbuFormData.sbuDesc.isRequired}
              value={props.sbuFormData.sbuDesc.value ? props.sbuFormData.sbuDesc.value : ''}
              onChange={(newValue) => props.sbuFormFilterHandle('sbuDesc', newValue.target.value)}
              error={!!props.sbuFormData.sbuDesc?.error}
              helperText={props.sbuFormData.sbuDesc?.error}
            />
          </Grid>
          <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 12 }}>
            <Button
              variant="contained"
              size="medium"
              onClick={props.onCreateSbu}
              startIcon={props.isCreating ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {props.isCreating ? 'Creating...' : 'Create SBU'}
            </Button>
            <Button variant="contained" color="primary" onClick={props.onClearFormFields}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SbuCreateForm
