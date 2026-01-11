import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import type { initialFilterFormDto } from '../../../utilities/models'
import DatePickerToolbarStyles from '../../../assets/theme/mobileDatePicker'
import moment from 'moment'

const AddResignationEntryForm: React.FC<{
  resignationfilterFormData: initialFilterFormDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterFormHandleChange(field: keyof initialFilterFormDto, value: any): void
  onCreateresignation(): void
  onClearFormFields(): void
  isCreating: boolean
  isMainGrid: boolean
}> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid container spacing={2} mb={2}>
        {props.isMainGrid === false && (
          <>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography fontSize={25} fontWeight="bold" flexBasis={1} mt={2}>
                Resignation Management
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Typography fontSize={20} flexBasis={1}>
                Request Resignation
              </Typography>
            </Grid>
          </>
        )}
        <Grid size={{ xs: 12, sm: 12, md: props.isMainGrid ? 6 : 6, lg: props.isMainGrid ? 6 : 4 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
              value={
                props.resignationfilterFormData.resignationGivenDate.value
                  ? moment(props.resignationfilterFormData.resignationGivenDate.value)
                  : null
              }
              onChange={(newValue) =>
                props.filterFormHandleChange('resignationGivenDate', newValue)
              }
              closeOnSelect
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  variant: 'outlined',
                  label: 'Resignation Given Date',
                  size: 'small',
                  fullWidth: true,
                  required: props.resignationfilterFormData.resignationGivenDate.isRequired,
                  error: !!props.resignationfilterFormData.resignationGivenDate.error,
                  helperText: props.resignationfilterFormData.resignationGivenDate.error,
                },
                inputAdornment: { position: 'end' },
                actionBar: {
                  actions: ['cancel', 'accept'],
                },
                toolbar: DatePickerToolbarStyles,
              }}
              localeText={{
                toolbarTitle: props.resignationfilterFormData.resignationGivenDate.value
                  ? moment(props.resignationfilterFormData.resignationGivenDate.value)
                      .year()
                      .toString()
                  : moment().year().toString(),
              }}
              onOpen={() => {
                if (!props.resignationfilterFormData.resignationGivenDate.value) {
                  props.filterFormHandleChange('resignationGivenDate', new Date())
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: props.isMainGrid ? 6 : 6, lg: props.isMainGrid ? 6 : 4 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
              value={
                props.resignationfilterFormData.resignationDate.value
                  ? moment(props.resignationfilterFormData.resignationDate.value)
                  : null
              }
              onChange={(newValue) => props.filterFormHandleChange('resignationDate', newValue)}
              minDate={
                props.resignationfilterFormData.resignationGivenDate.value
                  ? moment(props.resignationfilterFormData.resignationGivenDate.value)
                  : undefined
              }
              closeOnSelect
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  variant: 'outlined',
                  label: 'Last Working Date',
                  size: 'small',
                  fullWidth: true,
                  required: props.resignationfilterFormData.resignationDate.isRequired,
                  error: !!props.resignationfilterFormData.resignationDate.error,
                  helperText: props.resignationfilterFormData.resignationDate.error,
                },
                inputAdornment: { position: 'end' },
                actionBar: {
                  actions: ['cancel', 'accept'],
                },
                toolbar: DatePickerToolbarStyles,
              }}
              localeText={{
                toolbarTitle: props.resignationfilterFormData.resignationDate.value
                  ? moment(props.resignationfilterFormData.resignationDate.value).year().toString()
                  : moment().year().toString(),
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: props.isMainGrid ? 0 : 4 }}></Grid>
        <Grid size={{ xs: 12, sm: 12, lg: props.isMainGrid ? 12 : 8 }}>
          <TextField
            value={props.resignationfilterFormData.comment.value}
            onChange={(e) => props.filterFormHandleChange('comment', e.target.value)}
            label="Comment"
            placeholder="Type your comment here"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 12 }}>
          <Button
            variant="contained"
            size="medium"
            onClick={props.onCreateresignation}
            startIcon={props.isCreating ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {props.isCreating ? 'Creating...' : 'Create Resignation'}
          </Button>
          <Button variant="contained" color="primary" onClick={props.onClearFormFields}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddResignationEntryForm
