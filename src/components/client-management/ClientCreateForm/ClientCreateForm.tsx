import { Autocomplete, Button, CircularProgress, Grid, TextField } from '@mui/material'
import type { ClientFilterFormDto, SetSbuDto } from '../../../utilities/models'

const ClientCreateForm: React.FC<{
  clientFormData: ClientFilterFormDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clientFormFilterHandle(field: keyof ClientFilterFormDto, value: any): void
  onCreateClient(): void
  onClearFormFields(): void
  clientInputFocusHandle(field: keyof ClientFilterFormDto): void
  sbuList: SetSbuDto[]
  isProcessing?: boolean
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Grid size={{ sm: 12, xs: 12, md: 9 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              label="Client Name"
              placeholder="Enter Client Name"
              size="small"
              variant="outlined"
              fullWidth
              onFocus={() => props.clientInputFocusHandle('clientName')}
              required={props.clientFormData.clientName.isRequired}
              value={
                props.clientFormData.clientName.value ? props.clientFormData.clientName.value : ''
              }
              onChange={(newValue) =>
                props.clientFormFilterHandle('clientName', newValue.target.value)
              }
              error={!!props.clientFormData.clientName?.error}
              helperText={props.clientFormData.clientName?.error}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            {/* <FormControl
              variant="outlined"
              fullWidth
              size="small"
              error={!!props.clientFormData.sbuId.error}
              required={props.clientFormData.sbuId.isRequired}
            >
              <InputLabel id="sbu-select-label">Strategic Business Unit</InputLabel>
              <Select
                labelId="sbu-select-label"
                id="sbu-select"
                value={props.clientFormData.sbuId.value || ''}
                onChange={(event, value) => {
                  props.clientFormFilterHandle('sbuId', value)
                }}
                label="Strategic Business Unit"
              >
                <MenuItem value="">
                  <em>Select SBU</em>
                </MenuItem>
                {props.sbuList.map((sbu) => (
                  <MenuItem key={sbu.sbuId} value={sbu.sbuId}>
                    {sbu.sbuName}
                  </MenuItem>
                ))}
              </Select>
              {props.clientFormData.sbuId.error && (
                <FormHelperText>{props.clientFormData.sbuId.error}</FormHelperText>
              )}
            </FormControl> */}
            <Autocomplete
              value={
                props.sbuList.find((sbu) => sbu.sbuId === props.clientFormData.sbuId.value) || null
              }
              fullWidth
              size="small"
              options={props.sbuList}
              getOptionKey={(option) => option.sbuId}
              isOptionEqualToValue={(option, value) => option.sbuId === value.sbuId}
              getOptionLabel={(option) => option.sbuName}
              onChange={(_event, value) =>
                props.clientFormFilterHandle('sbuId', value?.sbuId ?? null)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Strategic Business Unit"
                  color="primary"
                  onFocus={() => props.clientInputFocusHandle('sbuId')}
                  helperText={
                    props.clientFormData.sbuId.error !== null
                      ? 'Strategic Business Unit is required'
                      : ''
                  }
                  error={!!props.clientFormData.sbuId.error}
                  required={props.clientFormData.sbuId.isRequired}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              label="Client Description"
              placeholder="Enter Description"
              size="medium"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              onFocus={() => props.clientInputFocusHandle('clientDesc')}
              required={props.clientFormData.clientDesc.isRequired}
              value={
                props.clientFormData.clientDesc.value ? props.clientFormData.clientDesc.value : ''
              }
              onChange={(newValue) =>
                props.clientFormFilterHandle('clientDesc', newValue.target.value)
              }
              error={!!props.clientFormData.clientDesc?.error}
              helperText={props.clientFormData.clientDesc?.error}
            />
          </Grid>
          <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 12 }}>
            <Button
              variant="contained"
              size="medium"
              onClick={props.onCreateClient}
              startIcon={props.isProcessing ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {props.isProcessing ? 'Creating...' : 'Create Client'}
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

export default ClientCreateForm
